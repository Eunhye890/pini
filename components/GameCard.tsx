"use client";

import Link from "next/link";
import { useState } from "react";
import { Game, getCategoryInfo, getGradeLevelInfo } from "@/lib/games";

interface GameCardProps {
  game: Game;
}

const categoryPixelColors: Record<string, string> = {
  "logic-reasoning": "bg-[#5CA4E7]",
  "pattern-recognition": "bg-[#F26B4E]",
  "spatial-awareness": "bg-[#FFD54F]",
  "mathematical-thinking": "bg-[#5CA4E7]/80",
  "verbal-reasoning": "bg-[#F26B4E]/80",
  "strategy-decision": "bg-[#FFD54F]/80",
  "memory-focus": "bg-[#5CA4E7]/60",
};

const difficultyPixel: Record<string, { bg: string; text: string; label: string }> = {
  easy: { bg: "bg-[#5CA4E7]", text: "text-white", label: "EASY" },
  medium: { bg: "bg-[#FFD54F]", text: "text-[#2d2d2d]", label: "MED" },
  hard: { bg: "bg-[#F26B4E]", text: "text-white", label: "HARD" },
  expert: { bg: "bg-[#2d2d2d]", text: "text-[#FFD54F]", label: "PRO" },
};

export default function GameCard({ game }: GameCardProps) {
  const category = getCategoryInfo(game.category);
  const gradeInfo = getGradeLevelInfo(game.gradeLevel);
  const colorClass = categoryPixelColors[game.category] || "bg-gray-400";
  const diff = difficultyPixel[game.difficulty] || difficultyPixel.easy;
  const [imgError, setImgError] = useState(false);
  const showImage = game.thumbnail && game.thumbnail.length > 0 && !imgError;

  return (
    <Link href={`/games/${game.id}`} className="block h-full">
      <div className="pixel-card group cursor-pointer h-full flex flex-col">
        {/* Thumbnail */}
        <div className={`h-28 sm:h-32 ${colorClass} flex items-center justify-center relative overflow-hidden`}>
          {showImage ? (
            <img
              src={game.thumbnail}
              alt={game.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="text-4xl group-hover:scale-125 transition-transform duration-200">
              {category?.emoji || "🎮"}
            </span>
          )}

          {/* FREE tag */}
          <div className="absolute top-0 left-0">
            <div className="pixel-tag bg-[#F26B4E] text-white">FREE</div>
          </div>

          {/* Featured */}
          {game.featured && (
            <div className="absolute top-0 right-0">
              <div className="pixel-tag bg-[#FFD54F] text-[#2d2d2d]">★</div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-2.5 bg-white flex-1 flex flex-col">
          <h3 className="font-pixel text-[9px] sm:text-[10px] text-[#2d2d2d] mb-1 line-clamp-1 leading-relaxed">
            {game.title}
          </h3>
          <p className="text-[11px] text-gray-500 mb-2 line-clamp-2 leading-relaxed flex-1">
            {game.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className={`pixel-tag ${diff.bg} ${diff.text}`}>
              {diff.label}
            </div>
            <div className="pixel-tag bg-gray-100 text-gray-600">
              Lv.{game.gradeLevel} {gradeInfo?.name}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
