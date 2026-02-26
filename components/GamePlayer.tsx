"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface GamePlayerProps {
  embedUrl: string;
  title: string;
}

export default function GamePlayer({ embedUrl, title }: GamePlayerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Listen for native fullscreen changes (e.g. user presses Escape)
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const enterFullscreen = useCallback(async () => {
    const el = containerRef.current;
    if (!el) return;

    try {
      if (el.requestFullscreen) {
        await el.requestFullscreen();
      } else if ((el as HTMLDivElement & { webkitRequestFullscreen?: () => Promise<void> }).webkitRequestFullscreen) {
        await (el as HTMLDivElement & { webkitRequestFullscreen: () => Promise<void> }).webkitRequestFullscreen();
      }
    } catch {
      // Fullscreen API not available
    }

    setIsFullscreen(true);
  }, []);

  const exitFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch {
      // ignore
    }
    setIsFullscreen(false);
  }, []);

  return (
    <div ref={containerRef} className={isFullscreen ? "game-player-fullscreen" : "relative"}>
      {/* Fullscreen exit */}
      {isFullscreen && (
        <button
          onClick={exitFullscreen}
          className="absolute top-3 right-3 z-50 pixel-btn bg-[#FFD54F] text-[#2d2d2d] px-3 py-1 font-pixel text-[8px]"
        >
          ✕ EXIT
        </button>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#FFF8E7] pixel-border z-10">
          <div className="text-center">
            <img
              src="/pini_ch_edit.png"
              alt="Pini loading"
              className="w-16 h-16 object-contain animate-bounce mx-auto mb-2"
            />
            <div className="font-pixel text-xs text-[#2d2d2d] animate-pulse">LOADING...</div>
          </div>
        </div>
      )}

      {/* Game iframe */}
      <div className={`${isFullscreen ? "w-full h-full" : "w-full aspect-[16/10] pixel-border overflow-hidden"}`}>
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full"
          allow="autoplay; fullscreen; gamepad"
          sandbox="allow-scripts allow-same-origin allow-popups"
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Fullscreen button */}
      {!isFullscreen && (
        <div className="flex justify-center mt-4">
          <button
            onClick={enterFullscreen}
            className="pixel-btn bg-[#5CA4E7] text-white px-5 py-2 font-pixel text-[9px]"
          >
            ⛶ FULLSCREEN
          </button>
        </div>
      )}
    </div>
  );
}
