import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Pini — Free Brain Games for Kids K-12",
  description:
    "Learn about Pini, a free educational gaming platform with 900+ brain-training games for kids and students K-12. No signup, no cost — just play!",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 bg-checker">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-gray-500 mb-4 font-bold">
        <Link href="/" className="hover:text-[#5CA4E7]">
          Home
        </Link>
        <span className="text-gray-300">&gt;</span>
        <span className="text-[#2d2d2d]">About</span>
      </nav>

      <h1 className="font-pixel text-sm sm:text-base text-[#2d2d2d] mb-6">
        ABOUT PINI
      </h1>

      {/* Hero */}
      <section className="pixel-border bg-[#5CA4E7] text-white p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="shrink-0 char-bounce">
            <Image
              src="/pini_ch.png"
              alt="Pini"
              width={128}
              height={128}
              className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
              unoptimized
            />
          </div>
          <div>
            <h2 className="font-pixel text-xs sm:text-sm mb-3">
              PLAY SMART. PLAY FREE.
            </h2>
            <p className="text-sm text-white/80 leading-relaxed">
              Pini is a free educational gaming platform with 900+ brain-training
              games for kids and students in grades K-12. No accounts, no
              payments, no tracking — just play and grow.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mb-8">
        <h2 className="font-pixel text-xs text-[#2d2d2d] mb-4">
          ★ OUR MISSION ★
        </h2>
        <div className="pixel-border bg-white p-5 sm:p-6">
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            We believe every child deserves access to high-quality educational
            games — regardless of their family&apos;s income. That&apos;s why Pini is
            and always will be <strong>100% free</strong>.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Our games are carefully selected and organized by{" "}
            <strong>7 thinking skill categories</strong> and{" "}
            <strong>4 grade levels</strong>, so every child can find games that
            match their age and challenge level.
          </p>
        </div>
      </section>

      {/* What Makes Pini Different */}
      <section className="mb-8">
        <h2 className="font-pixel text-xs text-[#2d2d2d] mb-4">
          ★ WHAT MAKES PINI DIFFERENT ★
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="pixel-card p-5 text-center">
            <span className="text-3xl block mb-2">🆓</span>
            <h3 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
              ALWAYS FREE
            </h3>
            <p className="text-xs text-gray-600">
              No subscriptions, no premium tiers, no hidden costs. Every game is
              free forever.
            </p>
          </div>
          <div className="pixel-card p-5 text-center">
            <span className="text-3xl block mb-2">🛡️</span>
            <h3 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
              KID-SAFE
            </h3>
            <p className="text-xs text-gray-600">
              Every game is reviewed for child safety. No violence, no scary
              content, no in-app purchases.
            </p>
          </div>
          <div className="pixel-card p-5 text-center">
            <span className="text-3xl block mb-2">🧠</span>
            <h3 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
              BRAIN-TRAINING
            </h3>
            <p className="text-xs text-gray-600">
              Games develop real thinking skills: logic, math, strategy, memory,
              and more.
            </p>
          </div>
          <div className="pixel-card p-5 text-center">
            <span className="text-3xl block mb-2">🔒</span>
            <h3 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
              PRIVACY-FIRST
            </h3>
            <p className="text-xs text-gray-600">
              No sign-ups, no personal data collected. Everything stays on your
              device.
            </p>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="mb-8">
        <h2 className="font-pixel text-xs text-[#2d2d2d] mb-4">
          ★ PINI BY THE NUMBERS ★
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="pixel-border bg-[#FFD54F] p-4 text-center">
            <div className="font-pixel text-lg text-[#2d2d2d]">958</div>
            <div className="text-xs text-[#2d2d2d]/70">Games</div>
          </div>
          <div className="pixel-border bg-[#5CA4E7] p-4 text-center">
            <div className="font-pixel text-lg text-white">7</div>
            <div className="text-xs text-white/70">Skill Categories</div>
          </div>
          <div className="pixel-border bg-[#F26B4E] p-4 text-center">
            <div className="font-pixel text-lg text-white">4</div>
            <div className="text-xs text-white/70">Grade Levels</div>
          </div>
          <div className="pixel-border bg-[#2d2d2d] p-4 text-center">
            <div className="font-pixel text-lg text-[#FFD54F]">$0</div>
            <div className="text-xs text-gray-400">Cost</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center pixel-border bg-[#FFD54F]/20 p-6">
        <h3 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
          READY TO PLAY?
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Jump right in — no signup needed.
        </p>
        <Link
          href="/games"
          className="pixel-btn bg-[#5CA4E7] text-white px-6 py-2 font-pixel text-[10px] inline-block"
        >
          ★ BROWSE ALL GAMES ★
        </Link>
      </div>
    </div>
  );
}
