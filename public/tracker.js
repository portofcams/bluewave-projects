/* Analytics tracker — no cookies, privacy-friendly.
 * <script src="https://ai.portofcams.com/static/tracker.js" data-site="portofcams"></script> */
(function() {
  'use strict';
  var EP = 'https://ai.portofcams.com/api/analytics/collect';
  var cs = document.currentScript;
  var site = cs ? cs.getAttribute('data-site') || 'unknown' : 'unknown';
  var ua = navigator.userAgent, loc = location, doc = document, win = window;
  var q = [], sH = {}, vS = Date.now(), vT = 0, sD = null, vids = [];

  // Session ID — anonymous, per-tab
  var sid; try { sid = sessionStorage.getItem('_as'); } catch(e) {}
  if (!sid) { sid = ''; for (var i = 0; i < 12; i++) sid += 'abcdefghijklmnopqrstuvwxyz0123456789'[Math.random()*36|0]; try { sessionStorage.setItem('_as', sid); } catch(e) {} }

  function h(s,p) { return s.indexOf(p)>-1; }
  function enq(t, d) { var e = {site:site,session_id:sid,event_type:t,timestamp:new Date().toISOString()}; if(d) for(var k in d) d.hasOwnProperty(k)&&(e[k]=d[k]); q.push(e); }
  function flush() { if(!q.length) return; var p=JSON.stringify(q); q=[]; try { navigator.sendBeacon ? navigator.sendBeacon(EP, new Blob([p],{type:'application/json'})) : (function(){var x=new XMLHttpRequest();x.open('POST',EP,true);x.setRequestHeader('Content-Type','application/json');x.send(p);})(); } catch(e){} }

  // 1. Pageviews
  function pv() {
    var c = {url:loc.href,path:loc.pathname,title:doc.title,referrer:doc.referrer,screen_width:screen.width,screen_height:screen.height,language:navigator.language||''};
    c.device_type = /iPad|Tablet/i.test(ua)?'tablet':/Mobile|Android|iPhone/i.test(ua)?'mobile':'desktop';
    c.browser = h(ua,'Firefox')?'Firefox':h(ua,'Edg')?'Edge':h(ua,'Chrome')?'Chrome':h(ua,'Safari')?'Safari':'Other';
    c.os = h(ua,'Windows')?'Windows':h(ua,'Android')?'Android':/iPhone|iPad/.test(ua)?'iOS':h(ua,'Mac')?'macOS':h(ua,'Linux')?'Linux':'Other';
    try { var p=new URLSearchParams(loc.search),u=['utm_source','utm_medium','utm_campaign','utm_term','utm_content']; for(var i=0;i<5;i++) c[u[i]]=p.get(u[i])||''; } catch(e){}
    enq('pageview',c); sH={}; vS=Date.now(); vT=0;
  }
  pv();
  function wrap(m) { var o=history[m]; if(o) history[m]=function(){var r=o.apply(this,arguments);pv();return r;}; }
  wrap('pushState'); wrap('replaceState');
  win.addEventListener('popstate', pv);

  // 2. Clicks
  doc.addEventListener('click', function(ev) {
    try { var el=ev.target;
      for(var i=0;i<5&&el&&el!==doc;i++,el=el.parentElement){var t=(el.tagName||'').toUpperCase();
        if(t==='A'||t==='BUTTON'||(t==='INPUT'&&/^(submit|button)$/i.test(el.type))||el.getAttribute('role')==='button'||el.hasAttribute('data-track'))
          return enq('click',{path:loc.pathname,tag:t.toLowerCase(),text:(el.textContent||'').replace(/\s+/g,' ').trim().substring(0,50),href:el.href||el.getAttribute('href')||''});
    }} catch(e){}
  }, true);

  // 3. Scroll depth (25/50/75/100%)
  win.addEventListener('scroll', function() { if(sD) return;
    sD=setTimeout(function(){sD=null;try{var dh=Math.max(doc.body.scrollHeight||0,doc.documentElement.scrollHeight||0),wh=win.innerHeight; if(dh<=wh)return; var p=((win.pageYOffset+wh)/dh)*100,ts=[25,50,75,100]; for(var i=0;i<4;i++) if(p>=ts[i]&&!sH[ts[i]]){sH[ts[i]]=1;enq('scroll',{path:loc.pathname,depth:ts[i]});}}catch(e){}},200);
  }, {passive:true});

  // 4. Visible time on page
  function snd(){if(vS){vT+=Date.now()-vS;vS=0;} if(vT>500) enq('engagement',{path:loc.pathname,time_on_page:Math.round(vT/1000)});}
  doc.addEventListener('visibilitychange', function(){if(doc.visibilityState==='hidden'){snd();flush();}else vS=Date.now();});
  win.addEventListener('beforeunload', function(){snd();flush();});

  // 5. Video engagement (native <video> only, skips YouTube iframes)
  var wm; try{wm=new WeakMap();}catch(e){wm=null;}
  function bV(v){if(!wm||vids.indexOf(v)>-1)return;vids.push(v);wm.set(v,{s:0,t:0});var src=(v.currentSrc||v.src||'').substring(0,200);
    function ve(a){var d=wm.get(v);if(d&&d.s){d.t+=Date.now()-d.s;d.s=0;}enq('video',{action:a,path:loc.pathname,video_src:src,watch_time:d?Math.round(d.t/1000):0});}
    v.addEventListener('play',function(){var d=wm.get(v);if(d)d.s=Date.now();enq('video',{action:'play',path:loc.pathname,video_src:src});});
    v.addEventListener('pause',function(){ve('pause');}); v.addEventListener('ended',function(){ve('ended');});}
  function sc(){try{var vs=doc.querySelectorAll('video');for(var i=0;i<vs.length;i++)bV(vs[i]);}catch(e){}}
  doc.readyState==='loading'?doc.addEventListener('DOMContentLoaded',sc):sc();
  setInterval(sc,3000); setInterval(flush,5000);
})();
