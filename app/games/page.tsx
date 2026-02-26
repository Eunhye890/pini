"use client";

import { useState, useMemo } from "react";
import GameCard from "@/components/GameCard";
import { getAllGames, categories, gradeLevels } from "@/lib/games";

const GAMES_PER_PAGE = 24;

export default function AllGamesPage() {
  const allGames = getAllGames();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedGrade, setSelectedGrade] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(GAMES_PER_PAGE);

  const filteredGames = useMemo(() => {
    return allGames.filter((game) => {
      const matchesCategory = selectedCategory === "all" || game.category === selectedCategory;
      const matchesGrade = selectedGrade === 0 || game.gradeLevel === selectedGrade;
      const matchesSearch =
        searchQuery === "" ||
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesGrade && matchesSearch;
    });
  }, [allGames, selectedCategory, selectedGrade, searchQuery]);

  // 필터 변경 시 visibleCount 리셋
  const resetAndFilter = (setter: () => void) => {
    setter();
    setVisibleCount(GAMES_PER_PAGE);
  };

  const visibleGames = filteredGames.slice(0, visibleCount);
  const hasMore = visibleCount < filteredGames.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 bg-checker">
      <h1 className="font-pixel text-sm text-[#2d2d2d] mb-1">★ ALL GAMES ★</h1>
      <p className="text-sm text-gray-500 mb-4">{allGames.length} free games to play</p>

      {/* Filters */}
      <div className="pixel-border bg-[#FFD54F]/15 p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="font-pixel text-[8px] text-gray-500 block mb-1">SEARCH</label>
            <input
              type="text"
              placeholder="Type to search..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(GAMES_PER_PAGE); }}
              className="w-full px-3 py-2 pixel-border-sm bg-white text-sm outline-none focus:bg-[#FFF8E7]"
            />
          </div>
          <div>
            <label className="font-pixel text-[8px] text-gray-500 block mb-1">TYPE</label>
            <select
              value={selectedCategory}
              onChange={(e) => resetAndFilter(() => setSelectedCategory(e.target.value))}
              className="w-full px-3 py-2 pixel-border-sm bg-white text-sm outline-none"
            >
              <option value="all">All Types</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.emoji} {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-pixel text-[8px] text-gray-500 block mb-1">AGE</label>
            <select
              value={selectedGrade}
              onChange={(e) => resetAndFilter(() => setSelectedGrade(Number(e.target.value)))}
              className="w-full px-3 py-2 pixel-border-sm bg-white text-sm outline-none"
            >
              <option value={0}>All Levels</option>
              {gradeLevels.map((grade) => (
                <option key={grade.level} value={grade.level}>
                  Lv.{grade.level} {grade.name} ({grade.ageRange})
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-2 font-pixel text-[8px] text-gray-400">
          {filteredGames.length} / {allGames.length} GAMES
        </div>
      </div>

      {/* Results */}
      {filteredGames.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {visibleGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={() => setVisibleCount((prev) => prev + GAMES_PER_PAGE)}
                className="pixel-btn bg-[#5CA4E7] text-white px-6 py-2 font-pixel text-[10px] hover:bg-[#4a93d6] transition-colors"
              >
                LOAD MORE ({filteredGames.length - visibleCount} left)
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 pixel-border bg-white">
          <span className="text-5xl block mb-4">🔍</span>
          <p className="font-pixel text-[10px] text-gray-500 mb-3">OOPS! NOTHING HERE</p>
          <button
            onClick={() => { setSelectedCategory("all"); setSelectedGrade(0); setSearchQuery(""); setVisibleCount(GAMES_PER_PAGE); }}
            className="pixel-btn bg-[#FFD54F] text-[#2d2d2d] px-4 py-1.5 font-pixel text-[9px]"
          >
            START OVER
          </button>
        </div>
      )}
    </div>
  );
}
