"use client";

import { useEffect, useRef, useState } from "react";

export function useReveal<T extends Element = HTMLDivElement>(
  rootMargin: string = "-40px"
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [rootMargin]);

  return { ref, inView } as const;
}
