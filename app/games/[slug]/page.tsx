import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GamePlayer from "@/components/GamePlayer";
import GameCard from "@/components/GameCard";
import ShareButton from "@/components/ShareButton";
import {
  getAllGames,
  getGameBySlug,
  getRelatedGames,
  getCategoryInfo,
  getGradeLevelInfo,
} from "@/lib/games";
import { GameJsonLd } from "@/components/JsonLd";
import TrackGamePlay from "@/components/TrackGamePlay";
import AdSlot from "@/components/AdSlot";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const games = getAllGames();
  return games.map((game) => ({ slug: game.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return { title: "Game Not Found" };

  const category = getCategoryInfo(game.category);
  return {
    title: `${game.title} — ${category?.name || "Thinking Game"}`,
    description: game.description,
    openGraph: {
      title: `${game.title} | Pini`,
      description: game.description,
      type: "website",
      ...(game.thumbnail ? { images: [{ url: game.thumbnail, width: 512, height: 384 }] } : {}),
    },
  };
}

const diffPixel: Record<string, { bg: string; label: string }> = {
  easy: { bg: "bg-[#5CA4E7]", label: "EASY" },
  medium: { bg: "bg-[#FFD54F]", label: "MEDIUM" },
  hard: { bg: "bg-[#F26B4E]", label: "HARD" },
  expert: { bg: "bg-[#2d2d2d]", label: "EXPERT" },
};

export default async function GamePage({ params }: PageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  const category = getCategoryInfo(game.category);
  const gradeInfo = getGradeLevelInfo(game.gradeLevel);
  const relatedGames = getRelatedGames(game, 4);
  const diff = diffPixel[game.difficulty] || diffPixel.easy;
  const diffText = game.difficulty === "expert" ? "text-[#FFD54F]" : game.difficulty === "medium" ? "text-[#2d2d2d]" : "text-white";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 bg-checker">
      <GameJsonLd game={game} />
      <TrackGamePlay category={game.category} />
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-gray-500 mb-4 font-bold">
        <Link href="/" className="hover:text-[#5CA4E7]">Home</Link>
        <span className="text-gray-300">&gt;</span>
        <Link href={`/category/${game.category}`} className="hover:text-[#5CA4E7]">
          {category?.emoji} {category?.name}
        </Link>
        <span className="text-gray-300">&gt;</span>
        <span className="text-[#2d2d2d]">{game.title}</span>
      </nav>

      {/* Game Header */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h1 className="font-pixel text-sm sm:text-base text-[#2d2d2d]">{game.title}</h1>
        <div className="pixel-tag bg-[#F26B4E] text-white">FREE</div>
        <div className={`pixel-tag ${diff.bg} ${diffText}`}>{diff.label}</div>
        <div className="pixel-tag bg-gray-200 text-gray-700">Lv.{game.gradeLevel} {gradeInfo?.name}</div>
      </div>
      <p className="text-sm text-gray-600 mb-5 leading-relaxed">{game.description}</p>

      {/* Game Player */}
      <div className="mb-4">
        <GamePlayer embedUrl={game.embedUrl} title={game.title} />
      </div>

      {/* Share Bar */}
      <div className="flex items-center justify-between mb-8 pixel-border bg-[#FFD54F]/10 px-4 py-3">
        <span className="font-pixel text-[8px] text-gray-500">SHARE WITH FRIENDS</span>
        <ShareButton
          title={game.title}
          text={`Play ${game.title} for FREE! 🎮`}
          url={`https://playpini.com/games/${game.id}`}
          className="bg-[#5CA4E7] text-white px-4 py-1.5"
        />
      </div>

      {/* Game Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="pixel-card p-4">
          <h3 className="font-pixel text-[9px] text-[#2d2d2d] mb-3">GAME INFO</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Category</span>
              <Link href={`/category/${game.category}`} className="text-[#5CA4E7] hover:underline font-bold">
                {category?.emoji} {category?.name}
              </Link>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Grade</span>
              <Link href={`/grade/${game.gradeLevel}`} className="text-[#5CA4E7] hover:underline font-bold">
                Lv.{game.gradeLevel} {gradeInfo?.name}
              </Link>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Play Time</span>
              <span className="font-bold">{game.playTime}</span>
            </div>
          </div>
        </div>

        <div className="pixel-card p-4">
          <h3 className="font-pixel text-[9px] text-[#2d2d2d] mb-3">TAGS</h3>
          <div className="flex flex-wrap gap-1.5">
            {game.tags.map((tag) => (
              <span key={tag} className="pixel-tag bg-[#5CA4E7]/15 text-[#2d2d2d]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="pixel-card p-4">
          <h3 className="font-pixel text-[9px] text-[#2d2d2d] mb-3">ABOUT</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            For <strong>{gradeInfo?.description}</strong> ({gradeInfo?.ageRange}).
            Develops <strong>{category?.name?.toLowerCase()}</strong> skills through interactive play.
          </p>
        </div>
      </div>

      {/* Ad: Above related games */}
      <div className="mb-8">
        <AdSlot slot="game-below-player" format="horizontal" />
      </div>

      {/* Related Games */}
      {relatedGames.length > 0 && (
        <section>
          <h2 className="font-pixel text-xs text-[#2d2d2d] mb-4">★ MORE GAMES ★</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedGames.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
