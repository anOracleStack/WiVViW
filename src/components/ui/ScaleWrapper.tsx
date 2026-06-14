"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

export const DESIGN_WIDTH = 1440;

export default function ScaleWrapper({ children }: { children: ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [outerHeight, setOuterHeight] = useState<number | null>(null);

  const measure = () => {
    const nextScale = Math.min(1, window.innerWidth / DESIGN_WIDTH);
    setScale(nextScale);
    if (innerRef.current) {
      setOuterHeight(innerRef.current.offsetHeight * nextScale);
    }
  };

  useLayoutEffect(() => {
    measure();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", measure);
    const observer = new ResizeObserver(measure);
    if (innerRef.current) observer.observe(innerRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="w-full min-h-screen overflow-x-hidden"
      style={outerHeight != null ? { height: outerHeight } : undefined}
    >
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
