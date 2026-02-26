import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { gradeLevels } from "@/lib/games";
import { safetyPromises, faqItems, thinkingSkills } from "@/lib/parent-data";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "For Parents — Safe, Free Brain Games for Kids",
  description:
    "Safe, free, and educational. 900+ brain-training games for kids K-12. No violence, no signup, no cost. Discover how Pini helps your child develop 7 key thinking skills.",
  openGraph: {
    title: "For Parents | Pini",
    description:
      "Safe, free brain games for kids. No violence, no signup, no cost. 7 thinking skills developed through play.",
  },
};

export default function ForParentsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 bg-checker">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-gray-500 mb-4 font-bold">
        <Link href="/" className="hover:text-[#5CA4E7]">
          Home
        </Link>
        <span className="text-gray-300">&gt;</span>
        <span className="text-[#2d2d2d]">For Parents</span>
      </nav>

      {/* Hero */}
      <section className="pixel-border bg-[#FFD54F] text-[#2d2d2d] p-6 sm:p-8 mb-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="shrink-0 char-bounce">
            <Image src="/pini_ch.png" alt="Pini" width={128} height={128} className="w-24 h-24 sm:w-32 sm:h-32 object-contain" unoptimized />
          </div>
          <div>
            <h1 className="font-pixel text-sm sm:text-base mb-3">
              ★ SAFE. FREE. EDUCATIONAL. ★
            </h1>
            <p className="text-sm sm:text-base text-[#2d2d2d]/70 mb-4">
              Brain-training games your kids will love — and you can feel good
              about. No violence, no signup, no cost.
            </p>
            <Link
              href="/games"
              className="pixel-btn bg-[#5CA4E7] text-white px-5 py-2 font-pixel text-[10px] inline-block"
            >
              SEE ALL GAMES
            </Link>
          </div>
        </div>
      </section>

      {/* Safety Promises */}
      <section className="mb-8">
        <h2 className="font-pixel text-xs text-[#2d2d2d] mb-4">
          ★ OUR PROMISES TO YOU ★
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {safetyPromises.map((promise) => (
            <div key={promise.title} className="pixel-card p-5 text-center">
              <div className="text-4xl mb-3">{promise.emoji}</div>
              <h3 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
                {promise.title.toUpperCase()}
              </h3>
              <p className="text-xs text-gray-600">{promise.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why You Can Trust Pini */}
      <section className="mb-8">
        <h2 className="font-pixel text-xs text-[#2d2d2d] mb-4">
          ★ WHY YOU CAN TRUST PINI ★
        </h2>
        <div className="pixel-border bg-[#FFD54F]/10 p-5">
          <p className="text-sm text-gray-600 mb-4">
            We don&apos;t just add any game. Here&apos;s how we keep it safe and smart:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-xl shrink-0">🔍</span>
              <div>
                <div className="font-bold text-sm text-[#2d2d2d]">Hand-Picked</div>
                <p className="text-xs text-gray-500">Every game is reviewed before it&apos;s added to Pini.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl shrink-0">🧠</span>
              <div>
                <div className="font-bold text-sm text-[#2d2d2d]">Brain-Training Only</div>
                <p className="text-xs text-gray-500">Only games that develop real thinking skills make the cut.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl shrink-0">🚫</span>
              <div>
                <div className="font-bold text-sm text-[#2d2d2d]">Bad Stuff Filtered Out</div>
                <p className="text-xs text-gray-500">Violence, in-app purchases, and scary content — all removed.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl shrink-0">👶</span>
              <div>
                <div className="font-bold text-sm text-[#2d2d2d]">Age-Sorted</div>
                <p className="text-xs text-gray-500">4 difficulty levels so your child always plays at the right challenge.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Age Recommendations */}
      <section className="mb-8">
        <h2 className="font-pixel text-xs text-[#2d2d2d] mb-4">
          ★ FIND THE RIGHT LEVEL ★
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {gradeLevels.map((grade) => {
            const colors = [
              "bg-[#FFD54F]",
              "bg-[#5CA4E7]",
              "bg-[#F26B4E]",
              "bg-[#2d2d2d]",
            ];
            const textColors = [
              "text-[#2d2d2d]",
              "text-white",
              "text-white",
              "text-[#FFD54F]",
            ];
            return (
              <Link
                key={grade.level}
                href={`/grade/${grade.level}`}
                className={`pixel-card ${textColors[grade.level - 1]} text-left p-0 cursor-pointer overflow-hidden block`}
              >
                <div className={`${colors[grade.level - 1]} p-3`}>
                  <div className="font-pixel text-[10px] mb-1">
                    LV.{grade.level}
                  </div>
                  <div className="font-bold text-lg">Grade {grade.name}</div>
                  <div className="text-xs opacity-70">{grade.ageRange}</div>
                  <div className="text-xs opacity-60 mt-1">
                    {grade.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 7 Thinking Skills */}
      <section className="mb-8">
        <h2 className="font-pixel text-xs text-[#2d2d2d] mb-4">
          ★ 7 THINKING SKILLS ★
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Every game on Pini develops one of these core thinking skills:
        </p>
        <div className="space-y-3">
          {thinkingSkills.map((skill) => (
            <div
              key={skill.categoryId}
              className="pixel-border bg-white p-4 flex items-start gap-3"
            >
              <span className="text-2xl shrink-0">{skill.emoji}</span>
              <div>
                <Link
                  href={`/category/${skill.categoryId}`}
                  className="font-pixel text-[10px] text-[#2d2d2d] hover:text-[#5CA4E7]"
                >
                  {skill.name.toUpperCase()}
                </Link>
                <p className="text-xs text-gray-600 mt-1">{skill.whatItIs}</p>
                <p className="text-xs text-[#5CA4E7] font-bold mt-1">
                  Why it matters: {skill.whyItMatters}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brain Score Introduction */}
      <section className="mb-8">
        <h2 className="font-pixel text-xs text-[#2d2d2d] mb-4">
          ★ BRAIN SCORE ★
        </h2>
        <div className="pixel-border bg-[#5CA4E7]/10 p-5">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-5xl">🧠</span>
            <div>
              <h3 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
                TRACK YOUR CHILD&apos;S PROGRESS
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Brain Score is a built-in radar chart that shows which thinking
                skills your child has practiced. It encourages balanced
                development across all 7 categories — no competitive rankings,
                just personal growth.
              </p>
              <Link
                href="/my-brain"
                className="pixel-btn bg-[#5CA4E7] text-white px-4 py-1.5 font-pixel text-[9px] inline-block"
              >
                SEE BRAIN SCORE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-8">
        <h2 className="font-pixel text-xs text-[#2d2d2d] mb-4">
          ★ COMMON QUESTIONS ★
        </h2>
        <FaqAccordion items={faqItems} />
      </section>

      {/* CTA */}
      <div className="text-center pixel-border bg-[#FFD54F]/20 p-6">
        <div className="char-bounce inline-block mb-3">
          <Image src="/pini_ch.png" alt="Pini" width={48} height={48} className="w-12 h-12 object-contain" unoptimized />
        </div>
        <h3 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
          LET YOUR CHILD PLAY SMART
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Free games that train the brain. No signup needed.
        </p>
        <Link
          href="/"
          className="pixel-btn bg-[#FFD54F] text-[#2d2d2d] px-6 py-2 font-pixel text-[10px] inline-block"
        >
          ★ START PLAYING ★
        </Link>
      </div>
    </div>
  );
}
