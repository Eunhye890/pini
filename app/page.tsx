"use client";

import { useState, useMemo } from "react";
import GameCard from "@/components/GameCard";
import AdSlot from "@/components/AdSlot";
import { getAllGames, categories, gradeLevels } from "@/lib/games";

export default function HomePage() {
  const allGames = getAllGames();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedGrade, setSelectedGrade] = useState<number>(0);
  const [visibleCount, setVisibleCount] = useState(24);

  const filteredGames = useMemo(() => {
    return allGames.filter((game) => {
      const matchCat = selectedCategory === "all" || game.category === selectedCategory;
      const matchGrade = selectedGrade === 0 || game.gradeLevel === selectedGrade;
      return matchCat && matchGrade;
    });
  }, [allGames, selectedCategory, selectedGrade]);

  return (
    <>
      {/* Pixel Hero */}
      <section className="bg-[#5CA4E7] text-white py-6 sm:py-8 relative scanlines overflow-hidden">
        {/* Pixel star decorations */}
        <div className="absolute top-3 left-[10%] w-2 h-2 bg-[#FFD54F] star-twinkle" />
        <div className="absolute top-6 left-[25%] w-1.5 h-1.5 bg-[#FFD54F]/70 star-twinkle" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-4 right-[15%] w-2 h-2 bg-[#FFD54F] star-twinkle" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-3 right-[30%] w-1 h-1 bg-white/50 star-twinkle" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-8 right-[45%] w-1.5 h-1.5 bg-[#F26B4E]/60 star-twinkle" style={{ animationDelay: "0.7s" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div>
                <h1 className="font-pixel text-lg sm:text-xl leading-relaxed mb-2">
                  <span className="text-[#FFD54F]">★</span> PLAY SMART. PLAY FREE. <span className="text-[#FFD54F]">★</span>
                </h1>
                <p className="text-sm sm:text-base text-white/80">
                  Train your brain with {allGames.length}+ free games. No signup needed!
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-4 text-center">
                <div>
                  <div className="font-pixel text-lg text-[#FFD54F]">{allGames.length}</div>
                  <div className="text-[10px] text-white/50">GAMES</div>
                </div>
                <div>
                  <div className="font-pixel text-lg text-[#FFD54F]">K-12</div>
                  <div className="text-[10px] text-white/50">GRADES</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Why Pini? */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2 bg-checker">
        <h2 className="font-pixel text-xs text-[#2d2d2d] text-center mb-4">★ WHY PINI? ★</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-2">
          <div className="pixel-border bg-white p-4 text-center">
            <span className="text-2xl block mb-2">🛡️</span>
            <div className="font-pixel text-[9px] text-[#2d2d2d] mb-1">KID-SAFE FILTERED</div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Every game passes our child-safety filter — violence, in-app purchases, and inappropriate content are all screened out before kids ever see them.
            </p>
          </div>
          <div className="pixel-border bg-white p-4 text-center">
            <span className="text-2xl block mb-2">🎓</span>
            <div className="font-pixel text-[9px] text-[#2d2d2d] mb-1">BUILT FOR LEARNING</div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Each game trains 1 of 7 thinking skills, mapped to real classroom subjects.
            </p>
          </div>
          <div className="pixel-border bg-white p-4 text-center">
            <span className="text-2xl block mb-2">🆓</span>
            <div className="font-pixel text-[9px] text-[#2d2d2d] mb-1">100% FREE, NO SIGNUP</div>
            <p className="text-xs text-gray-500 leading-relaxed">
              No accounts, no payments, no tracking. Just play.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 bg-checker">

        {/* Grade Level Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="font-pixel text-[10px] text-gray-500 mr-1">AGE:</span>
          <button
            onClick={() => setSelectedGrade(0)}
            className={`pixel-btn text-xs font-bold px-4 py-1.5 ${
              selectedGrade === 0 ? "bg-[#2d2d2d] text-white" : "bg-white text-[#2d2d2d]"
            }`}
          >
            ALL
          </button>
          {gradeLevels.map((grade) => {
            const colors = [
              { active: "bg-[#FFD54F] text-[#2d2d2d]", idle: "bg-[#FFD54F]/20 text-[#2d2d2d]" },
              { active: "bg-[#5CA4E7] text-white", idle: "bg-[#5CA4E7]/20 text-[#2d2d2d]" },
              { active: "bg-[#F26B4E] text-white", idle: "bg-[#F26B4E]/20 text-[#2d2d2d]" },
              { active: "bg-[#2d2d2d] text-[#FFD54F]", idle: "bg-gray-200 text-[#2d2d2d]" },
            ];
            const c = colors[grade.level - 1];
            return (
              <button
                key={grade.level}
                onClick={() => { setSelectedGrade(selectedGrade === grade.level ? 0 : grade.level); setVisibleCount(24); }}
                className={`pixel-btn text-xs font-bold px-4 py-1.5 ${
                  selectedGrade === grade.level ? c.active : c.idle
                }`}
              >
                Lv.{grade.level} {grade.name}
              </button>
            );
          })}
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="font-pixel text-[10px] text-gray-500 mr-1">TYPE:</span>
          <button
            onClick={() => setSelectedCategory("all")}
            className={`pixel-btn text-xs font-bold px-4 py-1.5 ${
              selectedCategory === "all" ? "bg-[#2d2d2d] text-white" : "bg-white text-[#2d2d2d]"
            }`}
          >
            ALL
          </button>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(selectedCategory === cat.id ? "all" : cat.id); setVisibleCount(24); }}
                className={`pixel-btn text-xs font-bold px-3 py-1.5 ${
                  isActive ? "bg-[#FFD54F] text-[#2d2d2d]" : "bg-white text-[#2d2d2d]"
                }`}
              >
                {cat.emoji} {cat.name}
              </button>
            );
          })}
        </div>

        {/* FREE reminder bar */}
        <div className="pixel-border bg-[#FFD54F]/20 px-4 py-2 mb-5 flex items-center gap-3">
          <span className="text-xl">🎮</span>
          <span className="font-bold text-sm text-[#2d2d2d]">
            All {allGames.length} games are <span className="text-[#F26B4E] font-pixel text-[10px]">FREE</span> — tap any game and go!
          </span>
        </div>

        {/* Result count */}
        <div className="flex items-center justify-between mb-4">
          <p className="font-pixel text-[8px] text-gray-500">
            {filteredGames.length} GAMES FOUND
            {selectedCategory !== "all" && (
              <span> IN {categories.find(c => c.id === selectedCategory)?.name?.toUpperCase()}</span>
            )}
            {selectedGrade !== 0 && (
              <span> FOR LV.{selectedGrade}</span>
            )}
          </p>
          {(selectedCategory !== "all" || selectedGrade !== 0) && (
            <button
              onClick={() => { setSelectedCategory("all"); setSelectedGrade(0); }}
              className="pixel-btn bg-white text-[#2d2d2d] px-3 py-0.5 font-pixel text-[8px]"
            >
              START OVER
            </button>
          )}
        </div>

        {/* Game Grid */}
        {filteredGames.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredGames.slice(0, visibleCount).map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
            {visibleCount < filteredGames.length && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 24)}
                  className="pixel-btn bg-[#5CA4E7] text-white px-6 py-2 font-pixel text-[10px] hover:bg-[#4a93d6] transition-colors"
                >
                  LOAD MORE ({filteredGames.length - visibleCount} left)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 pixel-border bg-white">
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="font-pixel text-[10px] text-gray-500 mb-3">OOPS! NOTHING HERE</p>
            <button
              onClick={() => { setSelectedCategory("all"); setSelectedGrade(0); }}
              className="pixel-btn bg-[#FFD54F] text-[#2d2d2d] px-4 py-1.5 font-pixel text-[9px]"
            >
              SHOW ME ALL
            </button>
          </div>
        )}

        {/* Ad: Bottom of game list */}
        <div className="mt-8">
          <AdSlot slot="home-bottom" format="horizontal" />
        </div>

      </div>
    </>
  );
}
