import { categories, gradeLevels, getGamesByCategory } from "@/lib/games";

export interface CurriculumMapping {
  categoryId: string;
  categoryName: string;
  emoji: string;
  subjects: string[];
  skills: string[];
}

export interface ClassroomTip {
  title: string;
  emoji: string;
  description: string;
  steps: string[];
}

export interface SubjectPlaylist {
  subject: string;
  emoji: string;
  description: string;
  categoryIds: string[];
}

export const curriculumMappings: CurriculumMapping[] = [
  {
    categoryId: "logic-reasoning",
    categoryName: "Puzzle",
    emoji: "🧩",
    subjects: ["Math", "Computer Science", "Critical Thinking"],
    skills: ["Deductive reasoning", "Sequential thinking", "Problem decomposition"],
  },
  {
    categoryId: "pattern-recognition",
    categoryName: "Patterns",
    emoji: "🔍",
    subjects: ["Math", "Science", "Art"],
    skills: ["Sequence identification", "Rule discovery", "Visual analysis"],
  },
  {
    categoryId: "spatial-awareness",
    categoryName: "Shapes & Space",
    emoji: "📐",
    subjects: ["Math (Geometry)", "Art", "Engineering/STEM"],
    skills: ["Spatial rotation", "Geometric reasoning", "Visualization"],
  },
  {
    categoryId: "mathematical-thinking",
    categoryName: "Numbers",
    emoji: "🔢",
    subjects: ["Math (Arithmetic)", "Math (Algebra)", "Science"],
    skills: ["Mental math", "Number sense", "Quantitative reasoning"],
  },
  {
    categoryId: "verbal-reasoning",
    categoryName: "Words",
    emoji: "📝",
    subjects: ["English Language Arts", "Vocabulary", "Reading"],
    skills: ["Word recognition", "Vocabulary building", "Language processing"],
  },
  {
    categoryId: "strategy-decision",
    categoryName: "Strategy",
    emoji: "♟️",
    subjects: ["Math", "Social Studies", "Computer Science"],
    skills: ["Planning ahead", "Decision-making", "Resource management"],
  },
  {
    categoryId: "memory-focus",
    categoryName: "Memory",
    emoji: "🧠",
    subjects: ["All Subjects", "Study Skills", "Health/Wellness"],
    skills: ["Working memory", "Concentration", "Information retention"],
  },
];

export const classroomTips: ClassroomTip[] = [
  {
    title: "Brain Break Station",
    emoji: "⏰",
    description:
      "Set up a 5-minute brain break rotation where students play one game from a different thinking category each day.",
    steps: [
      "Assign each weekday a different category (e.g., Monday = Puzzle, Tuesday = Patterns)",
      "Project a game on the board or let students choose from that category",
      "Discuss what thinking skill they used afterward",
    ],
  },
  {
    title: "Thinking Skill of the Week",
    emoji: "📅",
    description:
      "Feature one thinking category per week. Students explore games from that category and journal about strategies they used.",
    steps: [
      "Introduce the thinking skill on Monday with a whole-class game",
      "Let students explore 2-3 games from that category during the week",
      "Friday reflection: What strategies did you discover?",
    ],
  },
  {
    title: "Brain Score Challenge",
    emoji: "🏆",
    description:
      "Use the built-in Brain Score feature to encourage balanced skill development across all 7 categories.",
    steps: [
      "Show students the Brain Score radar chart on /my-brain",
      "Challenge: Try to make your radar chart as balanced as possible",
      "Discuss which thinking skills feel strongest/weakest for each student",
    ],
  },
];

export const subjectPlaylists: SubjectPlaylist[] = [
  {
    subject: "Math",
    emoji: "➕",
    description: "Games that build number sense, geometry, and logical thinking",
    categoryIds: ["mathematical-thinking", "logic-reasoning", "spatial-awareness", "pattern-recognition"],
  },
  {
    subject: "English Language Arts",
    emoji: "📖",
    description: "Vocabulary, word games, and verbal reasoning challenges",
    categoryIds: ["verbal-reasoning"],
  },
  {
    subject: "Science & STEM",
    emoji: "🔬",
    description: "Pattern recognition, spatial reasoning, and strategic thinking for scientific minds",
    categoryIds: ["pattern-recognition", "spatial-awareness", "strategy-decision"],
  },
  {
    subject: "Computer Science",
    emoji: "💻",
    description: "Logic puzzles and strategy games that mirror computational thinking",
    categoryIds: ["logic-reasoning", "strategy-decision"],
  },
  {
    subject: "Study Skills & Focus",
    emoji: "📚",
    description: "Memory and concentration games to build better study habits",
    categoryIds: ["memory-focus"],
  },
];

export function getQuickStats() {
  return {
    totalCategories: categories.length,
    gradeLevels: gradeLevels,
  };
}

export function getCategoryGameCount(categoryId: string): number {
  return getGamesByCategory(categoryId).length;
}
