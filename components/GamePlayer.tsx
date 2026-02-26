"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface GamePlayerProps {
  embedUrl: string;
  title: string;
}

export default function GamePlayer({ embedUrl, title }: GamePlayerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [showFullscreenHint, setShowFullscreenHint] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || "ontouchstart" in window;
      setIsMobile(mobile);
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
      // Try native Fullscreen API first (hides address bar)
      if (el.requestFullscreen) {
        await el.requestFullscreen();
      } else if ((el as HTMLDivElement & { webkitRequestFullscreen?: () => Promise<void> }).webkitRequestFullscreen) {
        await (el as HTMLDivElement & { webkitRequestFullscreen: () => Promise<void> }).webkitRequestFullscreen();
      }
    } catch {
      // Fullscreen API not available — fallback to CSS fullscreen
    }

    setIsFullscreen(true);
    setShowFullscreenHint(false);
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

  // Show fullscreen hint on mobile after game loads
  useEffect(() => {
    if (!isLoading && isMobile && !isFullscreen) {
      setShowFullscreenHint(true);
    }
  }, [isLoading, isMobile, isFullscreen]);

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
            <div className="font-pixel text-xs text-[#2d2d2d] animate-pulse mb-2">LOADING...</div>
            <div className="flex gap-1 justify-center">
              <div className="w-3 h-3 bg-[#FFD54F] animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-3 h-3 bg-[#5CA4E7] animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-3 h-3 bg-[#F26B4E] animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
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
          sandbox="allow-scripts allow-same-origin"
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Mobile: Fullscreen hint overlay */}
      {showFullscreenHint && !isFullscreen && (
        <div
          className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 cursor-pointer"
          onClick={enterFullscreen}
        >
          <div className="text-center px-6 py-4 bg-[#2d2d2d] pixel-border">
            <div className="text-3xl mb-2">📱</div>
            <div className="font-pixel text-[10px] text-[#FFD54F] mb-2">TAP TO GO FULLSCREEN</div>
            <div className="text-xs text-white/60">Best experience in landscape mode</div>
            <button
              className="mt-3 text-[10px] text-white/40 underline"
              onClick={(e) => { e.stopPropagation(); setShowFullscreenHint(false); }}
            >
              skip
            </button>
          </div>
        </div>
      )}

      {/* Mobile fullscreen: Portrait rotation guide */}
      {isFullscreen && isMobile && isPortrait && (
        <div className="absolute inset-0 bg-[#2d2d2d]/90 flex items-center justify-center z-40 pointer-events-none">
          <div className="text-center animate-pulse">
            <div className="text-5xl mb-3">🔄</div>
            <div className="font-pixel text-[10px] text-[#FFD54F]">ROTATE YOUR DEVICE</div>
            <div className="text-xs text-white/50 mt-1">Landscape mode recommended</div>
          </div>
        </div>
      )}

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
