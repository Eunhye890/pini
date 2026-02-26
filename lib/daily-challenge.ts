import { categories, getGamesByCategory } from "@/lib/games";
import type { Game } from "@/lib/games";

const EPOCH = new Date("2025-01-01").getTime();
const STORAGE_KEY = "pini_daily_challenge";

export interface DailyChallengeData {
  lastPlayedDay: number;
  currentStreak: number;
  longestStreak: number;
  totalDaysPlayed: number;
  history: number[];
}

function getDayNumber(): number {
  const now = new Date();
  return Math.floor(
    (Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - EPOCH) /
      (1000 * 60 * 60 * 24)
  );
}

export function getDailyChallenge(): {
  game: Game;
  categoryIndex: number;
  categoryId: string;
  dayNumber: number;
} {
  const dayNumber = getDayNumber();
  const categoryIndex = dayNumber % categories.length;
  const category = categories[categoryIndex];
  const categoryGames = getGamesByCategory(category.id);

  // Deterministic game pick based on day
  const gameIndex = categoryGames.length > 0 ? dayNumber % categoryGames.length : 0;

  return {
    game: categoryGames[gameIndex],
    categoryIndex,
    categoryId: category.id,
    dayNumber,
  };
}

export function getWeekProgress(data: DailyChallengeData | null): boolean[] {
  const today = getDayNumber();
  const weekStart = today - ((today % 7 === 0 ? 7 : today % 7) - 1);
  const result: boolean[] = [];

  for (let i = 0; i < 7; i++) {
    const day = weekStart + i;
    result.push(data?.history?.includes(day) ?? false);
  }
  return result;
}

export function loadDailyData(): DailyChallengeData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DailyChallengeData;
  } catch {
    return null;
  }
}

export function markDailyPlayed(): DailyChallengeData {
  const today = getDayNumber();
  const existing = loadDailyData();

  if (existing && existing.history.includes(today)) {
    return existing; // already played today
  }

  const isConsecutive = existing ? existing.lastPlayedDay === today - 1 : false;
  const newStreak = isConsecutive ? (existing?.currentStreak ?? 0) + 1 : 1;
  const longestStreak = Math.max(newStreak, existing?.longestStreak ?? 0);

  const data: DailyChallengeData = {
    lastPlayedDay: today,
    currentStreak: newStreak,
    longestStreak,
    totalDaysPlayed: (existing?.totalDaysPlayed ?? 0) + 1,
    history: [...(existing?.history ?? []), today].slice(-90), // keep last 90 days
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
  return data;
}
