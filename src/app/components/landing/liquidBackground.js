"use client";

import { useEffect, useRef } from "react";
import { createLiquidGradient } from "./liquidGradient";

export default function LiquidBackground({ colorPalette = 1 }) {
  const containerRef = useRef(null);
  const appInstanceRef = useRef(null);

  // 초기 인스턴스 생성
  useEffect(() => {
    if (!containerRef.current || appInstanceRef.current) return;
    
    const app = createLiquidGradient(containerRef.current, colorPalette);
    appInstanceRef.current = app;
    
    return () => {
      if (appInstanceRef.current && appInstanceRef.current.dispose) {
        appInstanceRef.current.dispose();
        appInstanceRef.current = null;
      }
    };
  }, []);

  // 색상 팔레트 변경 시 업데이트
  useEffect(() => {
    if (appInstanceRef.current && appInstanceRef.current.updatePalette) {
      appInstanceRef.current.updatePalette(colorPalette);
    }
  }, [colorPalette]);

  return <div ref={containerRef} className="w-full h-full" />;
}


