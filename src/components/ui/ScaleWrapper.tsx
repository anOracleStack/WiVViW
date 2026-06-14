"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export const DESIGN_WIDTH = 1440;

function subscribeWindow(cb: () => void) {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
}

function getWindowWidth() {
  return window.innerWidth;
}

function getServerWidth() {
  return DESIGN_WIDTH;
}

export default function ScaleWrapper({ children }: { children: ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const width = useSyncExternalStore(subscribeWindow, getWindowWidth, getServerWidth);
  const scale = Math.min(1, width / DESIGN_WIDTH);

  const syncHeight = useCallback(() => {
    if (!innerRef.current || !outerRef.current) return;
    outerRef.current.style.height = `${innerRef.current.offsetHeight * scale}px`;
  }, [scale]);

  useEffect(() => {
    syncHeight();
    const node = innerRef.current;
    if (!node) return;
    const observer = new ResizeObserver(syncHeight);
    observer.observe(node);
    return () => observer.disconnect();
  }, [syncHeight]);

  return (
    <div ref={outerRef} className="w-full min-h-screen overflow-x-hidden">
      <div
        ref={innerRef}
        className="origin-top-left"
        style={{
          width: DESIGN_WIDTH,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
