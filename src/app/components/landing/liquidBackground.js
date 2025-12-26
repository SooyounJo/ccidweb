"use client";

import { useEffect, useRef } from "react";
import { createLiquidGradient } from "./liquidGradient";

export default function LiquidBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cleanup = createLiquidGradient(containerRef.current);
    return cleanup;
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}


