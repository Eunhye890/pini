import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GameCard from "@/components/GameCard";
import { getGamesByCategory, getCategoryInfo, categories, gradeLevels } from "@/lib/games";
import { GameListJsonLd } from "@/components/JsonLd";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const catInfo = getCategoryInfo(category);
  if (!catInfo) return { title: "Category Not Found" };

  return {
    title: `${catInfo.name} Games — Free Thinking Games`,
    description: `Play free ${catInfo.name.toLowerCase()} games for students K-12. Build ${catInfo.name.toLowerCase()} skills through interactive play.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const catInfo = getCategoryInfo(category);
  if (!catInfo) notFound();

  const games = getGamesByCategory(category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 bg-checker">
      <GameListJsonLd
        name={`${catInfo.name} Games — Pini`}
        games={games}
        url={`https://pini.vercel.app/category/${category}`}
      />
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-gray-500 mb-4 font-bold">
        <Link href="/" className="hover:text-[#5CA4E7]">Home</Link>
        <span className="text-gray-300">&gt;</span>
        <span className="text-[#2d2d2d]">{catInfo.emoji} {catInfo.name}</span>
      </nav>

      {/* Category Header */}
      <div className="pixel-border bg-[#FFD54F]/20 p-5 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{catInfo.emoji}</span>
          <div>
            <h1 className="font-pixel text-sm text-[#2d2d2d]">{catInfo.name}</h1>
            <p className="text-sm text-gray-500">{games.length} free games</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {gradeLevels.map((grade) => {
            const count = games.filter((g) => g.gradeLevel === grade.level).length;
            return (
              <span key={grade.level} className="pixel-tag bg-white text-gray-600">
                Lv.{grade.level} {grade.name}: {count}
              </span>
            );
          })}
        </div>
      </div>

      {/* Games by Grade Level */}
      {gradeLevels.map((grade) => {
        const gradeGames = games.filter((g) => g.gradeLevel === grade.level);
        if (gradeGames.length === 0) return null;
        return (
          <div key={grade.level} className="mb-8">
            <h2 className="font-pixel text-[10px] text-[#2d2d2d] mb-3">
              LV.{grade.level} {grade.name} ({grade.ageRange})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {gradeGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
