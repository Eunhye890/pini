import type { Metadata } from "next";
import Link from "next/link";
import DailyChallenge from "@/components/DailyChallenge";
import BrainScorePanel from "@/components/BrainScorePanel";

export const metadata: Metadata = {
  title: "My Brain — Daily Challenge & Brain Score",
  description:
    "Complete your Daily Brain Challenge and track your thinking skills across 7 categories. Play free brain games to level up your score!",
  openGraph: {
    title: "My Brain | Pini",
    description:
      "Daily challenges + Brain Score radar chart. Track 7 thinking skills for free!",
  },
};

export default function MyBrainPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 bg-checker">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6 font-bold">
        <Link href="/" className="hover:text-[#5CA4E7]">
          Home
        </Link>
        <span className="text-gray-300">&gt;</span>
        <span className="text-[#2d2d2d]">My Brain</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-pixel text-base sm:text-lg text-[#2d2d2d] mb-3">
          ★ MY BRAIN ★
        </h1>
        <p className="text-base text-gray-500">
          Train daily, track your skills, and unlock badges!
        </p>
      </div>

      {/* Section 1: Brain Score */}
      <section className="mb-10">
        <h2 className="font-pixel text-xs text-[#2d2d2d] mb-4">
          YOUR BRAIN SCORE
        </h2>
        <BrainScorePanel />
      </section>

      {/* Section 2: Daily Challenge */}
      <section className="mb-10">
        <h2 className="font-pixel text-xs text-[#2d2d2d] mb-4">
          TODAY&apos;S CHALLENGE
        </h2>
        <DailyChallenge />
      </section>

      {/* Data Notice */}
      <div className="pixel-border bg-[#FFD54F]/15 px-5 py-4 mb-10">
        <div className="flex items-start gap-3">
          <span className="text-2xl shrink-0">💾</span>
          <div>
            <div className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
              HOW YOUR SCORE IS SAVED
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your Brain Score is saved on <strong>this browser only</strong>.
              It will stay here as long as you use the same browser on the same device.
              But if you switch to a different device, use a different browser,
              or clear your browser data, your score will start over.
              So stick with your favorite browser to keep your progress safe!
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <Link
          href="/"
          className="pixel-btn bg-[#FFD54F] text-[#2d2d2d] px-8 py-3 font-pixel text-xs"
        >
          ★ PLAY MORE GAMES ★
        </Link>
      </div>
    </div>
  );
}
