import { Game } from "@/lib/games";
import GameCard from "./GameCard";

interface GameGridProps {
  games: Game[];
  title?: string;
  subtitle?: string;
}

export default function GameGrid({ games, title, subtitle }: GameGridProps) {
  if (games.length === 0) {
    return (
      <div className="text-center py-12">
        <span className="text-5xl mb-4 block">🎮</span>
        <p className="text-gray-500 text-lg">No games found in this category yet.</p>
        <p className="text-gray-400 text-sm mt-1">Check back soon — we&apos;re adding new games regularly!</p>
      </div>
    );
  }

  return (
    <section>
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h2 className="text-2xl font-bold text-gray-800">{title}</h2>}
          {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
}
