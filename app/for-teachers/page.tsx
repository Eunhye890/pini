import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { categories, gradeLevels, getAllGames, getGamesByCategory } from "@/lib/games";
import {
  curriculumMappings,
  classroomTips,
  subjectPlaylists,
  getQuickStats,
} from "@/lib/teacher-data";

export const metadata: Metadata = {
  title: "For Teachers — Free Classroom Games K-12",
  description:
    "Discover 900+ free brain-training games organized by thinking skill and grade level. Curriculum-aligned, no signup required. Perfect for brain breaks, stations, and enrichment.",
  openGraph: {
    title: "For Teachers | Pini",
    description:
      "900+ free classroom games K-12. Organized by thinking skill. No signup needed!",
  },
};

export default function ForTeachersPage() {
  const allGames = getAllGames();
  const stats = getQuickStats();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 bg-checker">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-gray-500 mb-4 font-bold">
        <Link href="/" className="hover:text-[#5CA4E7]">
          Home
        </Link>
        <span className="text-gray-300">&gt;</span>
        <span className="text-[#2d2d2d]">For Teachers</span>
      </nav>

      {/* Hero Section */}
      <section className="pixel-border bg-[#5CA4E7] text-white p-6 sm:p-8 mb-8 relative overflow-hidden scanlines">
        <div className="absolute top-3 right-[15%] w-2 h-2 bg-[#FFD54F] star-twinkle" />
        <div
          className="absolute bottom-4 left-[10%] w-1.5 h-1.5 bg-[#FFD54F]/70 star-twinkle"
          style={{ animationDelay: "0.5s" }}
        />

        <div className="flex flex-col sm:flex-row items-center gap-6 relative">
          <div className="shrink-0 char-bounce">
            <Image src="/pini_ch.png" alt="Pini" width={128} height={128} className="w-24 h-24 sm:w-32 sm:h-32 object-contain" unoptimized />
          </div>
          <div>
            <h1 className="font-pixel text-sm sm:text-base mb-3">
              ★ FREE GAMES FOR YOUR CLASSROOM ★
            </h1>
            <p className="text-sm sm:text-base text-white/80 mb-4">
              {allGames.length}+ brain-training games organized by thinking skill
              and grade level. No accounts, no fees, no distractions.
            </p>
            <Link
              href="/games"
              className="pixel-btn bg-[#FFD54F] text-[#2d2d2d] px-5 py-2 font-pixel text-[10px] inline-block"
            >
              BROWSE ALL GAMES
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="grid grid-cols-3 gap-2 sm:gap-3 mb-8">
        <div className="pixel-border bg-white p-2 sm:p-4 text-center">
          <div className="font-pixel text-sm sm:text-lg text-[#5CA4E7]">
            {allGames.length}+
          </div>
          <div className="text-[8px] sm:text-[9px] text-gray-500 font-bold">FREE GAMES</div>
        </div>
        <div className="pixel-border bg-white p-2 sm:p-4 text-center">
          <div className="font-pixel text-sm sm:text-lg text-[#FFD54F]">
            {stats.totalCategories}
          </div>
          <div className="text-[8px] sm:text-[9px] text-gray-500 font-bold">
            SKILLS
          </div>
        </div>
        <div className="pixel-border bg-white p-2 sm:p-4 text-center">
          <div className="font-pixel text-sm sm:text-lg text-[#F26B4E]">K-12</div>
          <div className="text-[8px] sm:text-[9px] text-gray-500 font-bold">GRADES</div>
        </div>
      </section>

      {/* How We Pick Our Games */}
      <section className="mb-8">
        <h2 className="font-pixel text-xs text-[#2d2d2d] mb-4">
          ★ HOW WE PICK OUR GAMES ★
        </h2>
        <div className="pixel-border bg-[#5CA4E7]/10 p-5">
          <p className="text-sm text-gray-600 mb-4">
            Not just any game makes it onto Pini. Every game goes through our selection process:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="font-pixel text-[10px] text-[#5CA4E7] shrink-0 mt-0.5">✅</span>
              <div>
                <div className="font-bold text-sm text-[#2d2d2d]">Educational Value</div>
                <p className="text-xs text-gray-500">Every game maps to 1 of 7 thinking skills — puzzle solving, pattern recognition, spatial awareness, and more.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-pixel text-[10px] text-[#5CA4E7] shrink-0 mt-0.5">✅</span>
              <div>
                <div className="font-bold text-sm text-[#2d2d2d]">Content Safety</div>
                <p className="text-xs text-gray-500">No violence, inappropriate content, or scary themes. Safe for all ages.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-pixel text-[10px] text-[#5CA4E7] shrink-0 mt-0.5">✅</span>
              <div>
                <div className="font-bold text-sm text-[#2d2d2d]">No In-Game Payments</div>
                <p className="text-xs text-gray-500">Zero pop-ups, zero in-app purchases. Students can focus on playing and learning.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-pixel text-[10px] text-[#5CA4E7] shrink-0 mt-0.5">✅</span>
              <div>
                <div className="font-bold text-sm text-[#2d2d2d]">Grade-Appropriate</div>
                <p className="text-xs text-gray-500">Every game is sorted into 4 difficulty levels from K-2 to 9-12, so you can match games to your class.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Mapping Table */}
      <section className="mb-8">
        <h2 className="font-pixel text-xs text-[#2d2d2d] mb-4">
          ★ CURRICULUM MAPPING ★
        </h2>
        <div className="pixel-border bg-white overflow-hidden">
          <p className="text-[9px] text-gray-400 text-right px-3 pt-2 sm:hidden">← Swipe to see more →</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="bg-[#2d2d2d] text-white">
                  <th className="font-pixel text-[8px] text-left px-3 py-2">
                    THINKING SKILL
                  </th>
                  <th className="font-pixel text-[8px] text-left px-3 py-2">
                    SCHOOL SUBJECTS
                  </th>
                  <th className="font-pixel text-[8px] text-left px-3 py-2 hidden sm:table-cell">
                    SKILLS DEVELOPED
                  </th>
                  <th className="font-pixel text-[8px] text-center px-3 py-2">
                    GAMES
                  </th>
                </tr>
              </thead>
              <tbody>
                {curriculumMappings.map((mapping, i) => (
                  <tr
                    key={mapping.categoryId}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#FFF8E7]"}
                  >
                    <td className="px-3 py-2 font-bold">
                      <Link
                        href={`/category/${mapping.categoryId}`}
                        className="hover:text-[#5CA4E7]"
                      >
                        {mapping.emoji} {mapping.categoryName}
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-gray-600">
                      {mapping.subjects.join(", ")}
                    </td>
                    <td className="px-3 py-2 text-gray-600 text-xs hidden sm:table-cell">
                      {mapping.skills.join(", ")}
                    </td>
                    <td className="px-3 py-2 text-center font-pixel text-[10px] text-[#5CA4E7]">
                      {getGamesByCategory(mapping.categoryId).length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Classroom Tips */}
      <section className="mb-8">
        <h2 className="font-pixel text-xs text-[#2d2d2d] mb-4">
          ★ CLASSROOM IDEAS ★
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {classroomTips.map((tip) => (
            <div key={tip.title} className="pixel-card p-4">
              <div className="text-3xl mb-2">{tip.emoji}</div>
              <h3 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
                {tip.title.toUpperCase()}
              </h3>
              <p className="text-xs text-gray-600 mb-3">{tip.description}</p>
              <ol className="text-xs text-gray-500 space-y-1 list-decimal list-inside">
                {tip.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* Subject Playlists */}
      <section className="mb-8">
        <h2 className="font-pixel text-xs text-[#2d2d2d] mb-4">
          ★ PLAYLISTS BY SUBJECT ★
        </h2>
        <div className="space-y-3">
          {subjectPlaylists.map((playlist) => (
            <div key={playlist.subject} className="pixel-border bg-white p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-2xl">{playlist.emoji}</span>
                  <div>
                    <div className="font-pixel text-[10px] text-[#2d2d2d]">
                      {playlist.subject.toUpperCase()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {playlist.description}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:ml-auto shrink-0">
                  {playlist.categoryIds.map((catId) => {
                    const cat = categories.find((c) => c.id === catId);
                    return cat ? (
                      <Link
                        key={catId}
                        href={`/category/${catId}`}
                        className="pixel-tag bg-[#5CA4E7]/15 text-[#2d2d2d] hover:bg-[#5CA4E7] hover:text-white transition-colors"
                      >
                        {cat.emoji} {cat.name}
                      </Link>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grade Levels Quick Access */}
      <section className="mb-8">
        <h2 className="font-pixel text-xs text-[#2d2d2d] mb-4">
          ★ BY GRADE LEVEL ★
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
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center pixel-border bg-[#FFD54F]/20 p-6">
        <div className="char-bounce inline-block mb-3">
          <Image src="/pini_ch.png" alt="Pini" width={48} height={48} className="w-12 h-12 object-contain" unoptimized />
        </div>
        <h3 className="font-pixel text-[10px] text-[#2d2d2d] mb-2">
          READY TO GET STARTED?
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          All games are free. No signup. No downloads.
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
