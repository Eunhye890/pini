import { categories } from "@/lib/games";

const STORAGE_KEY = "pini_brain_score";

export interface BrainScoreData {
  version: number;
  scores: Record<string, number>;
  totalPlays: number;
  lastUpdated: string;
  badges: string[];
}

export interface BrainBadge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  condition: (data: BrainScoreData) => boolean;
}

export const BRAIN_BADGES: BrainBadge[] = [
  {
    id: "first-play",
    name: "FIRST STEP",
    emoji: "👶",
    description: "Play your first game",
    condition: (d) => d.totalPlays >= 1,
  },
  {
    id: "explorer",
    name: "EXPLORER",
    emoji: "🧭",
    description: "Play games in 3+ categories",
    condition: (d) => Object.values(d.scores).filter((v) => v > 0).length >= 3,
  },
  {
    id: "all-rounder",
    name: "ALL-ROUNDER",
    emoji: "🌟",
    description: "Play games in all 7 categories",
    condition: (d) => Object.values(d.scores).every((v) => v > 0),
  },
  {
    id: "balanced",
    name: "BALANCED BRAIN",
    emoji: "⚖️",
    description: "All categories within 30% of average",
    condition: (d) => {
      const vals = Object.values(d.scores).filter((v) => v > 0);
      if (vals.length < 7) return false;
      const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
      if (avg === 0) return false;
      return vals.every((v) => Math.abs(v - avg) / avg < 0.3);
    },
  },
  {
    id: "specialist",
    name: "SPECIALIST",
    emoji: "🎯",
    description: "Play 20+ games in one category",
    condition: (d) => Math.max(...Object.values(d.scores)) >= 20,
  },
  {
    id: "brain-master",
    name: "BRAIN MASTER",
    emoji: "🧠",
    description: "Play 100+ games total",
    condition: (d) => d.totalPlays >= 100,
  },
];

function createEmptyData(): BrainScoreData {
  const scores: Record<string, number> = {};
  for (const cat of categories) {
    scores[cat.id] = 0;
  }
  return {
    version: 1,
    scores,
    totalPlays: 0,
    lastUpdated: new Date().toISOString(),
    badges: [],
  };
}

export function loadBrainScore(): BrainScoreData {
  if (typeof window === "undefined") return createEmptyData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createEmptyData();
    const parsed = JSON.parse(raw) as BrainScoreData;
    // Ensure all categories exist
    for (const cat of categories) {
      if (typeof parsed.scores[cat.id] !== "number") {
        parsed.scores[cat.id] = 0;
      }
    }
    return parsed;
  } catch {
    return createEmptyData();
  }
}

export function incrementScore(categoryId: string): BrainScoreData {
  const data = loadBrainScore();
  if (typeof data.scores[categoryId] === "number") {
    data.scores[categoryId] += 1;
  }
  data.totalPlays += 1;
  data.lastUpdated = new Date().toISOString();

  // Check badges
  const newBadges: string[] = [];
  for (const badge of BRAIN_BADGES) {
    if (!data.badges.includes(badge.id) && badge.condition(data)) {
      data.badges.push(badge.id);
      newBadges.push(badge.id);
    }
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  return data;
}

export function generateShareText(data: BrainScoreData): string {
  const maxScore = Math.max(...Object.values(data.scores), 1);
  const lines = categories.map((cat) => {
    const score = data.scores[cat.id] || 0;
    const barLength = Math.round((score / maxScore) * 6);
    const bar = "█".repeat(barLength) + "░".repeat(6 - barLength);
    return `${cat.emoji} ${cat.name}: ${bar} ${score}`;
  });

  return `My Pini Brain Score 🧠\n${lines.join("\n")}\n\nPlay free at playpini.com`;
}
