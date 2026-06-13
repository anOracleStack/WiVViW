"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export const DESIGN_WIDTH = 1440;

export default function ScaleWrapper({ children }: { children: ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [outerHeight, setOuterHeight] = useState<number | undefined>();

  useEffect(() => {
    const update = () => {
      const nextScale = Math.min(1, window.innerWidth / DESIGN_WIDTH);
      setScale(nextScale);
      if (innerRef.current) {
        setOuterHeight(innerRef.current.offsetHeight * nextScale);
      }
    };

    update();
    window.addEventListener("resize", update);

    const observer = new ResizeObserver(update);
    if (innerRef.current) observer.observe(innerRef.current);

    return () => {
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="w-full overflow-x-hidden" style={{ height: outerHeight }}>
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
