"""
ais_proxy.py — tiny AIS relay for the BlueWave "charter fleet tracker" demo.

WHY THIS EXISTS: aisstream.io is free but (a) needs an API key and (b) does NOT
allow browser CORS WebSocket connections. So the browser can't talk to it
directly. This module holds the key, keeps one WebSocket open to aisstream,
caches the latest position per vessel for a bounding box, and serves it as a
plain CORS-enabled JSON snapshot the static demo page can poll:

    GET https://ai.portofcams.com/marine/ais
    -> {"vessels":[{mmsi,name,lat,lon,sog,cog,heading,type,status,updated}],
        "generated":"<iso>","source":"aisstream.io","count":N}

The demo's _wx/ais.ts already expects exactly this shape, so no front-end change
is needed once this is live.

------------------------------------------------------------------------------
DEPLOY (ai-app FastAPI box):
  1. Get a free key at https://aisstream.io/apikeys
  2. pip install websockets   (add to the ai-app image/requirements)
  3. scp this file:  scp ais_proxy.py root@144.202.116.229:~/server/ai-services/app/
  4. In main.py add:
         from ais_proxy import router as ais_router, start_ais_proxy
         app.include_router(ais_router)
         @app.on_event("startup")
         async def _ais(): start_ais_proxy()
     (or call start_ais_proxy() from your existing lifespan startup)
  5. Set the env var and restart:
         docker exec -e AISSTREAM_API_KEY=... ...   # or add to the container env
         docker restart ai-app
  Verify:  curl -s https://ai.portofcams.com/marine/ais | head

NOTE: this runs ONE background asyncio task in the shared ai-app worker. It's
lightweight (a single WS + a dict), reconnects on drop, and prunes stale
targets. The bounding box below is SEWARD / Resurrection Bay to match the demo.
------------------------------------------------------------------------------
"""

import asyncio
import json
import os
import time
from datetime import datetime, timezone

from fastapi import APIRouter
from fastapi.responses import JSONResponse

try:
    import websockets  # pip install websockets
except ImportError:  # pragma: no cover
    websockets = None

router = APIRouter()

AISSTREAM_URL = "wss://stream.aisstream.io/v0/stream"
# Seward / Resurrection Bay (lat, lon), two opposite corners — aisstream wants
# latitude FIRST. Matches the demo's SEWARD_BBOX.
BOUNDING_BOX = [[[59.80, -149.60], [60.15, -149.25]]]
STALE_SECONDS = 15 * 60  # drop a vessel we haven't heard from in 15 min

# mmsi -> latest merged record
_positions: dict[int, dict] = {}
_statics: dict[int, dict] = {}  # mmsi -> {name, type_code}
_started = False


def _vessel_type(code):
    if code is None:
        return "other"
    if code == 30:
        return "fishing"
    if 60 <= code <= 69:
        return "passenger"
    if 70 <= code <= 79:
        return "cargo"
    if 80 <= code <= 89:
        return "tanker"
    if code in (36, 37):
        return "pleasure"
    return "other"


_NAV_STATUS = {
    0: "Underway", 1: "At anchor", 2: "Not under command", 3: "Restricted",
    4: "Constrained", 5: "Moored", 6: "Aground", 7: "Fishing", 8: "Sailing",
}


async def _run():
    """One resilient WebSocket loop: subscribe, ingest, cache, reconnect."""
    if websockets is None:
        print("[ais_proxy] `websockets` not installed; proxy disabled")
        return
    key = os.environ.get("AISSTREAM_API_KEY")
    if not key:
        print("[ais_proxy] AISSTREAM_API_KEY not set; proxy disabled")
        return
    sub = {
        "APIKey": key,
        "BoundingBoxes": BOUNDING_BOX,
        "FilterMessageTypes": ["PositionReport", "ShipStaticData"],
    }
    while True:
        try:
            async with websockets.connect(AISSTREAM_URL, ping_interval=20) as ws:
                await ws.send(json.dumps(sub))  # must arrive within 3s of open
                async for raw in ws:
                    _ingest(json.loads(raw))
        except Exception as e:  # noqa: BLE001 — reconnect on any error
            print(f"[ais_proxy] ws error: {e}; reconnecting in 5s")
            await asyncio.sleep(5)


def _ingest(msg: dict):
    mtype = msg.get("MessageType")
    meta = msg.get("MetaData") or {}
    mmsi = meta.get("MMSI")
    if not isinstance(mmsi, int):
        return
    if mtype == "PositionReport":
        pr = (msg.get("Message") or {}).get("PositionReport") or {}
        _positions[mmsi] = {
            "mmsi": mmsi,
            "lat": meta.get("latitude"),
            "lon": meta.get("longitude"),
            "sog": pr.get("Sog"),
            "cog": pr.get("Cog"),
            "heading": pr.get("TrueHeading") if pr.get("TrueHeading", 511) != 511 else None,
            "status": _NAV_STATUS.get(pr.get("NavigationalStatus")),
            "updated": meta.get("time_utc"),
            "_ts": time.time(),
        }
    elif mtype == "ShipStaticData":
        sd = (msg.get("Message") or {}).get("ShipStaticData") or {}
        _statics[mmsi] = {
            "name": (meta.get("ShipName") or sd.get("Name") or "").strip() or None,
            "type_code": sd.get("Type"),
        }


def start_ais_proxy():
    """Idempotently launch the background task on the running event loop."""
    global _started
    if _started:
        return
    _started = True
    asyncio.get_event_loop().create_task(_run())


@router.get("/marine/ais")
async def marine_ais():
    now = time.time()
    vessels = []
    for mmsi, p in list(_positions.items()):
        if now - p.get("_ts", 0) > STALE_SECONDS:
            _positions.pop(mmsi, None)
            continue
        if p.get("lat") is None or p.get("lon") is None:
            continue
        st = _statics.get(mmsi, {})
        vessels.append({
            "mmsi": mmsi,
            "name": st.get("name"),
            "lat": p["lat"],
            "lon": p["lon"],
            "sog": p.get("sog"),
            "cog": p.get("cog"),
            "heading": p.get("heading"),
            "type": _vessel_type(st.get("type_code")),
            "status": p.get("status"),
            "updated": p.get("updated"),
        })
    body = {
        "vessels": vessels,
        "count": len(vessels),
        "generated": datetime.now(timezone.utc).isoformat(),
        "source": "aisstream.io",
    }
    # CORS so the static bluewaveprojects.com page can fetch this cross-origin.
    return JSONResponse(body, headers={"Access-Control-Allow-Origin": "*", "Cache-Control": "no-store"})
