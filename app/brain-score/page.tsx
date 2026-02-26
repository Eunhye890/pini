import type { Metadata } from "next";
import BrainScorePanel from "@/components/BrainScorePanel";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Brain Score — Track Your Thinking Skills",
  description:
    "See your Brain Score across 7 thinking skills: Puzzle, Patterns, Shapes, Numbers, Words, Strategy, and Memory. Play more to level up!",
  openGraph: {
    title: "My Brain Score | Pini",
    description:
      "Track your thinking skills across 7 categories. Play free brain games and see your radar chart grow!",
  },
};

export default function BrainScorePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 bg-checker">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-gray-500 mb-4 font-bold">
        <Link href="/" className="hover:text-[#5CA4E7]">
          Home
        </Link>
        <span className="text-gray-300">&gt;</span>
        <span className="text-[#2d2d2d]">Brain Score</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="font-pixel text-sm sm:text-base text-[#2d2d2d] mb-2">
          🧠 YOUR BRAIN SCORE
        </h1>
        <p className="text-sm text-gray-500">
          Play games across all 7 thinking skills to build a balanced brain!
        </p>
      </div>

      {/* Full Brain Score Panel */}
      <BrainScorePanel />

      {/* Back to games */}
      <div className="text-center mt-8">
        <Link
          href="/"
          className="pixel-btn bg-[#FFD54F] text-[#2d2d2d] px-6 py-2 font-pixel text-[10px]"
        >
          ★ PLAY MORE GAMES ★
        </Link>
      </div>
    </div>
  );
}
