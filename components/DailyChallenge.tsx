"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getDailyChallenge,
  loadDailyData,
  markDailyPlayed,
  getWeekProgress,
  type DailyChallengeData,
} from "@/lib/daily-challenge";
import { getCategoryInfo } from "@/lib/games";

export default function DailyChallenge() {
  const [data, setData] = useState<DailyChallengeData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setData(loadDailyData());
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="pixel-border bg-gradient-to-r from-[#5CA4E7]/10 to-[#FFD54F]/10 p-4 mb-5">
        <div className="h-24 animate-pulse bg-gray-100 rounded" />
      </div>
    );
  }

  const { game, categoryId, dayNumber } = getDailyChallenge();
  const category = getCategoryInfo(categoryId);
  const weekProgress = getWeekProgress(data);
  const todayIndex = dayNumber % 7;
  const alreadyPlayed = data?.history?.includes(dayNumber) ?? false;

  const handlePlay = () => {
    const updated = markDailyPlayed();
    setData(updated);
  };

  const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="pixel-border bg-gradient-to-r from-[#5CA4E7]/10 via-[#FFD54F]/10 to-[#F26B4E]/10 p-5 sm:p-6 mb-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        {/* Left: Challenge info */}
        <div className="flex-1 min-w-0">
          <div className="font-pixel text-[10px] sm:text-xs text-[#2d2d2d] mb-3">
            ★ TODAY&apos;S BRAIN CHALLENGE ★
          </div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{category?.emoji}</span>
            <div>
              <div className="font-bold text-base text-[#2d2d2d]">
                {category?.name} Day
              </div>
              <div className="text-sm text-gray-500 truncate max-w-[220px] sm:max-w-none">
                {game?.title}
              </div>
            </div>
          </div>

          {/* Streak + Week Progress */}
          <div className="flex items-center gap-4">
            {(data?.currentStreak ?? 0) > 0 && (
              <span className="font-pixel text-[9px] text-[#F26B4E]">
                🔥 {data?.currentStreak}-DAY STREAK
              </span>
            )}
            <div className="flex items-center gap-1.5">
              {weekProgress.map((played, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`w-5 h-5 border-2 border-[#2d2d2d] ${
                      played
                        ? "bg-[#FFD54F]"
                        : i === todayIndex
                        ? "bg-[#FFD54F]/30"
                        : "bg-white"
                    }`}
                  />
                  <span className="text-[8px] text-gray-400 mt-0.5">
                    {dayLabels[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Play button */}
        <div className="shrink-0">
          {game && (
            <Link
              href={`/games/${game.id}`}
              onClick={handlePlay}
              className={`pixel-btn px-6 py-3 font-pixel text-xs block text-center ${
                alreadyPlayed
                  ? "bg-[#FFD54F] text-[#2d2d2d]"
                  : "bg-[#F26B4E] text-white"
              }`}
            >
              {alreadyPlayed ? "✓ PLAYED" : "▶ PLAY NOW"}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
