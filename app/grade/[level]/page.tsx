import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GameCard from "@/components/GameCard";
import { getGamesByGradeLevel, getGradeLevelInfo, gradeLevels, categories } from "@/lib/games";

interface PageProps {
  params: Promise<{ level: string }>;
}

export async function generateStaticParams() {
  return gradeLevels.map((grade) => ({ level: String(grade.level) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { level } = await params;
  const gradeInfo = getGradeLevelInfo(Number(level));
  if (!gradeInfo) return { title: "Grade Level Not Found" };

  return {
    title: `Grade ${gradeInfo.name} Games (${gradeInfo.ageRange})`,
    description: `Free thinking games for ${gradeInfo.description} (${gradeInfo.ageRange}). Logic, math, coding, and more brain-training games.`,
  };
}

export default async function GradeLevelPage({ params }: PageProps) {
  const { level } = await params;
  const levelNum = Number(level);
  const gradeInfo = getGradeLevelInfo(levelNum);
  if (!gradeInfo) notFound();

  const games = getGamesByGradeLevel(levelNum);

  const levelColors = ["bg-[#FFD54F]", "bg-[#5CA4E7]", "bg-[#F26B4E]", "bg-[#2d2d2d]"];
  const levelTextColors = ["text-[#2d2d2d]", "text-white", "text-white", "text-[#FFD54F]"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 bg-checker">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-gray-500 mb-4 font-bold">
        <Link href="/" className="hover:text-[#5CA4E7]">Home</Link>
        <span className="text-gray-300">&gt;</span>
        <span className="text-[#2d2d2d]">Lv.{gradeInfo.level} {gradeInfo.name}</span>
      </nav>

      {/* Grade Header */}
      <div className={`pixel-border ${levelColors[levelNum - 1]} ${levelTextColors[levelNum - 1]} p-5 mb-6`}>
        <h1 className="font-pixel text-sm mb-1">
          LV.{gradeInfo.level} GRADE {gradeInfo.name}
        </h1>
        <p className="text-sm opacity-70">{gradeInfo.description} &middot; {gradeInfo.ageRange}</p>
        <p className="text-xs opacity-50 mt-1">{games.length} free games</p>

        {/* Other levels */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {gradeLevels.filter((g) => g.level !== levelNum).map((grade) => (
            <Link
              key={grade.level}
              href={`/grade/${grade.level}`}
              className="pixel-btn bg-white/80 text-[#2d2d2d] px-3 py-1 text-[10px] font-bold"
            >
              Lv.{grade.level} {grade.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Games by Category */}
      {categories.map((cat) => {
        const catGames = games.filter((g) => g.category === cat.id);
        if (catGames.length === 0) return null;
        return (
          <div key={cat.id} className="mb-8">
            <h2 className="font-pixel text-[10px] text-[#2d2d2d] mb-3">
              {cat.emoji} {cat.name}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {catGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
