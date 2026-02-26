"use client";

import { useState } from "react";
import Link from "next/link";
import BrainRadarChart from "./BrainRadarChart";
import { useBrainScore } from "./BrainScoreProvider";
import { BRAIN_BADGES, generateShareText } from "@/lib/brain-score";
import { categories } from "@/lib/games";

interface BrainScorePanelProps {
  compact?: boolean;
}

export default function BrainScorePanel({ compact = false }: BrainScorePanelProps) {
  const { data } = useBrainScore();
  const [shareStatus, setShareStatus] = useState<"idle" | "copied">("idle");

  const handleShare = async () => {
    const text = generateShareText(data);

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "My Pini Brain Score", text });
        return;
      } catch {
        // fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      setShareStatus("copied");
      setTimeout(() => setShareStatus("idle"), 2000);
    } catch {
      // silent fail
    }
  };

  const unlockedBadges = BRAIN_BADGES.filter((b) =>
    data.badges.includes(b.id)
  );
  const lockedBadges = BRAIN_BADGES.filter(
    (b) => !data.badges.includes(b.id)
  );

  if (data.totalPlays === 0 && compact) {
    // Show a teaser when no games played yet
    return (
      <div className="pixel-border bg-[#5CA4E7]/10 p-4 mb-5">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🧠</span>
          <div>
            <div className="font-pixel text-[9px] text-[#2d2d2d] mb-1">
              YOUR BRAIN SCORE
            </div>
            <p className="text-xs text-gray-500">
              Play games to build your Brain Score! Track progress across 7 thinking skills.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="pixel-border bg-[#5CA4E7]/10 p-4 mb-5">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="shrink-0">
            <BrainRadarChart scores={data.scores} compact />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="font-pixel text-[9px] text-[#2d2d2d] mb-1">
              🧠 YOUR BRAIN SCORE
            </div>
            <div className="font-pixel text-lg text-[#5CA4E7] mb-1">
              {data.totalPlays}
            </div>
            <div className="text-[10px] text-gray-500 mb-2">GAMES PLAYED</div>
            {unlockedBadges.length > 0 && (
              <div className="flex gap-1 justify-center sm:justify-start mb-2">
                {unlockedBadges.slice(0, 4).map((b) => (
                  <span
                    key={b.id}
                    className="pixel-tag bg-[#FFD54F] text-[#2d2d2d]"
                    title={b.name}
                  >
                    {b.emoji}
                  </span>
                ))}
              </div>
            )}
            <Link
              href="/my-brain"
              className="pixel-btn bg-[#5CA4E7] text-white px-4 py-1 font-pixel text-[8px] inline-block"
            >
              VIEW FULL SCORE
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Full panel (for /brain-score page)
  return (
    <div>
      {/* Radar Chart */}
      <div className="flex justify-center mb-8">
        <BrainRadarChart scores={data.scores} />
      </div>

      {/* Stats with detail lists */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* GAMES */}
        <div className="pixel-border bg-white p-4">
          <div className="text-center mb-3">
            <div className="font-pixel text-xl text-[#5CA4E7]">{data.totalPlays}</div>
            <div className="text-xs text-gray-500 font-bold">GAMES</div>
          </div>
          {data.totalPlays > 0 && (
            <div className="border-t border-gray-100 pt-3 space-y-1.5">
              {categories
                .filter((cat) => (data.scores[cat.id] || 0) > 0)
                .map((cat) => (
                  <div key={cat.id} className="flex items-center justify-between text-sm">
                    <span>{cat.emoji} {cat.name}</span>
                    <span className="font-pixel text-[10px] text-[#5CA4E7]">{data.scores[cat.id]}</span>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* SKILLS */}
        <div className="pixel-border bg-white p-4">
          <div className="text-center mb-3">
            <div className="font-pixel text-xl text-[#FFD54F]">
              {Object.values(data.scores).filter((v) => v > 0).length}
            </div>
            <div className="text-xs text-gray-500 font-bold">SKILLS</div>
          </div>
          <div className="border-t border-gray-100 pt-3 space-y-1.5">
            {categories.map((cat) => {
              const active = (data.scores[cat.id] || 0) > 0;
              return (
                <div key={cat.id} className={`flex items-center gap-2 text-sm ${active ? "" : "opacity-30"}`}>
                  <span>{cat.emoji}</span>
                  <span className={active ? "text-[#2d2d2d]" : "text-gray-400"}>{cat.name}</span>
                  {active && <span className="ml-auto text-[#FFD54F]">✓</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* BADGES */}
        <div className="pixel-border bg-white p-4">
          <div className="text-center mb-3">
            <div className="font-pixel text-xl text-[#F26B4E]">
              {unlockedBadges.length}
            </div>
            <div className="text-xs text-gray-500 font-bold">BADGES</div>
          </div>
          <div className="border-t border-gray-100 pt-3 space-y-2">
            {unlockedBadges.map((badge) => (
              <div key={badge.id} className="flex items-center gap-2 text-sm">
                <span className="text-lg">{badge.emoji}</span>
                <div>
                  <div className="font-pixel text-[8px] text-[#2d2d2d]">{badge.name}</div>
                </div>
              </div>
            ))}
            {lockedBadges.map((badge) => (
              <div key={badge.id} className="flex items-center gap-2 text-sm opacity-30">
                <span className="text-lg">🔒</span>
                <div>
                  <div className="font-pixel text-[8px] text-gray-400">???</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Personalized Tips */}
      {(() => {
        const tips: { emoji: string; text: string; link?: string }[] = [];
        const played = categories.filter((c) => (data.scores[c.id] || 0) > 0);
        const notPlayed = categories.filter((c) => (data.scores[c.id] || 0) === 0);
        const sorted = [...categories].sort((a, b) => (data.scores[a.id] || 0) - (data.scores[b.id] || 0));
        const weakest = played.length > 0 ? sorted.find((c) => (data.scores[c.id] || 0) > 0) : null;
        const strongest = played.length > 0 ? sorted[sorted.length - 1] : null;

        if (data.totalPlays === 0) {
          tips.push({ emoji: "🚀", text: "Play your first game to start building your Brain Score!" });
        } else {
          if (notPlayed.length > 0 && notPlayed.length <= 4) {
            const names = notPlayed.map((c) => `${c.emoji} ${c.name}`).join(", ");
            tips.push({ emoji: "🎯", text: `You haven't tried ${names} yet — give ${notPlayed.length === 1 ? "it" : "them"} a go!` });
          } else if (notPlayed.length > 4) {
            tips.push({ emoji: "🌍", text: `You've only explored ${played.length} of 7 skills. Try something new!` });
          }

          if (weakest && strongest && weakest.id !== strongest.id && played.length >= 3) {
            const gap = (data.scores[strongest.id] || 0) - (data.scores[weakest.id] || 0);
            if (gap >= 3) {
              tips.push({
                emoji: "💪",
                text: `Your ${weakest.emoji} ${weakest.name} needs more love — play a few more to balance out!`,
                link: `/category/${weakest.id}`,
              });
            }
          }

          if (played.length === 7) {
            const vals = Object.values(data.scores);
            const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
            const balanced = vals.every((v) => Math.abs(v - avg) / Math.max(avg, 1) < 0.3);
            if (balanced) {
              tips.push({ emoji: "⚖️", text: "Amazing balance! You're training all 7 skills evenly. Keep it up!" });
            }
          }

          if (strongest && (data.scores[strongest.id] || 0) >= 10) {
            tips.push({ emoji: "⭐", text: `You're a ${strongest.emoji} ${strongest.name} pro! ${(data.scores[strongest.id] || 0)} games and counting!` });
          }
        }

        if (tips.length === 0) return null;

        return (
          <div className="pixel-border bg-[#5CA4E7]/10 p-5 mb-8">
            <div className="font-pixel text-[10px] text-[#2d2d2d] mb-3">💡 TIPS FOR YOU</div>
            <div className="space-y-3">
              {tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-lg shrink-0">{tip.emoji}</span>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {tip.text}
                    {tip.link && (
                      <Link href={tip.link} className="ml-1 text-[#5CA4E7] font-bold hover:underline">
                        Play now →
                      </Link>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Share */}
      <div className="text-center">
        <button
          onClick={handleShare}
          className="pixel-btn bg-[#5CA4E7] text-white px-8 py-3 font-pixel text-xs"
        >
          {shareStatus === "copied" ? "✓ COPIED!" : "↗ SHARE BRAIN SCORE"}
        </button>
      </div>
    </div>
  );
}
