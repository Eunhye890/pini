import gamesData from "@/data/games.json";

export interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
  gradeLevel: number;
  embedUrl: string;
  thumbnail: string;
  tags: string[];
  difficulty: string;
  playTime: string;
  featured: boolean;
}

export const categories = [
  { id: "logic-reasoning", name: "Puzzle", emoji: "🧩", color: "bg-[#5CA4E7]" },
  { id: "pattern-recognition", name: "Patterns", emoji: "🔍", color: "bg-[#F26B4E]" },
  { id: "spatial-awareness", name: "Shapes & Space", emoji: "📐", color: "bg-[#FFD54F]" },
  { id: "mathematical-thinking", name: "Numbers", emoji: "🔢", color: "bg-[#5CA4E7]" },
  { id: "verbal-reasoning", name: "Words", emoji: "📝", color: "bg-[#F26B4E]" },
  { id: "strategy-decision", name: "Strategy", emoji: "♟️", color: "bg-[#FFD54F]" },
  { id: "memory-focus", name: "Memory", emoji: "🧠", color: "bg-[#5CA4E7]" },
] as const;

export const gradeLevels = [
  { level: 1, name: "K-2", ageRange: "Ages 5-8", description: "Kindergarten to 2nd Grade" },
  { level: 2, name: "3-5", ageRange: "Ages 8-11", description: "3rd to 5th Grade" },
  { level: 3, name: "6-8", ageRange: "Ages 11-14", description: "6th to 8th Grade" },
  { level: 4, name: "9-12", ageRange: "Ages 14-18", description: "9th to 12th Grade" },
] as const;

export function getAllGames(): Game[] {
  return gamesData as Game[];
}

export function getGameBySlug(slug: string): Game | undefined {
  return (gamesData as Game[]).find((g) => g.id === slug);
}

export function getGamesByCategory(categoryId: string): Game[] {
  return (gamesData as Game[]).filter((g) => g.category === categoryId);
}

export function getGamesByGradeLevel(level: number): Game[] {
  return (gamesData as Game[]).filter((g) => g.gradeLevel === level);
}

export function getFeaturedGames(): Game[] {
  return (gamesData as Game[]).filter((g) => g.featured);
}

export function getRelatedGames(game: Game, limit: number = 4): Game[] {
  return (gamesData as Game[])
    .filter((g) => g.id !== game.id && (g.category === game.category || g.gradeLevel === game.gradeLevel))
    .slice(0, limit);
}

export function getCategoryInfo(categoryId: string) {
  return categories.find((c) => c.id === categoryId);
}

export function getGradeLevelInfo(level: number) {
  return gradeLevels.find((g) => g.level === level);
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "easy": return "text-[#5CA4E7] bg-[#5CA4E7]/10";
    case "medium": return "text-[#FFD54F] bg-[#FFD54F]/10";
    case "hard": return "text-[#F26B4E] bg-[#F26B4E]/10";
    case "expert": return "text-[#c62828] bg-red-100";
    default: return "text-gray-600 bg-gray-100";
  }
}
