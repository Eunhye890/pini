export interface SafetyPromise {
  emoji: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ThinkingSkillExplainer {
  categoryId: string;
  name: string;
  emoji: string;
  whatItIs: string;
  whyItMatters: string;
}

export const safetyPromises: SafetyPromise[] = [
  {
    emoji: "🛡️",
    title: "No Violence",
    description:
      "All games are age-appropriate brain-training puzzles and challenges. No violent or inappropriate content.",
  },
  {
    emoji: "🔒",
    title: "No Signup Required",
    description:
      "Your child can play instantly. We never collect personal information, emails, or account data.",
  },
  {
    emoji: "💚",
    title: "100% Free Forever",
    description:
      "Every game is completely free. No hidden paywalls, no premium tiers, no in-app purchases.",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Is Pini really free? Are there hidden costs?",
    answer:
      "Yes, Pini is 100% free. All 900+ games can be played without any payment, subscription, or in-app purchases. We believe every child deserves access to educational games.",
  },
  {
    question: "Does my child need to create an account?",
    answer:
      "No account is needed! Just open the site and start playing. Brain Score progress is saved locally on the device, so no personal data is collected.",
  },
  {
    question: "What ages are the games for?",
    answer:
      "Our games cover ages 5-18 (Kindergarten through 12th grade). Use the grade level filter to find games matched to your child's age: K-2 (ages 5-8), 3-5 (ages 8-11), 6-8 (ages 11-14), or 9-12 (ages 14-18).",
  },
  {
    question: "Are the games educational?",
    answer:
      "Every game on Pini develops one of 7 thinking skills: puzzle-solving, pattern recognition, spatial awareness, mathematical thinking, verbal reasoning, strategic thinking, or memory & focus. These skills support learning across all school subjects.",
  },
  {
    question: "How much screen time should my child spend on Pini?",
    answer:
      "We recommend the Daily Brain Challenge (one game per day, about 5-15 minutes) as a healthy starting point. The Brain Score feature encourages balanced play across different thinking skills rather than excessive time on any single game.",
  },
  {
    question: "Can I see what my child has played?",
    answer:
      "The Brain Score page (/my-brain) shows a radar chart of which thinking skills your child has practiced and how many games they have played. It is stored locally on the device.",
  },
];

export const thinkingSkills: ThinkingSkillExplainer[] = [
  {
    categoryId: "logic-reasoning",
    name: "Puzzle Solving",
    emoji: "🧩",
    whatItIs: "Working through problems step by step using clues and rules",
    whyItMatters: "Builds critical thinking used in math, science, and everyday decisions",
  },
  {
    categoryId: "pattern-recognition",
    name: "Pattern Recognition",
    emoji: "🔍",
    whatItIs: "Spotting sequences, repetitions, and rules in visual or numerical data",
    whyItMatters: "Core skill for reading, math, and understanding the world around us",
  },
  {
    categoryId: "spatial-awareness",
    name: "Shapes & Space",
    emoji: "📐",
    whatItIs: "Understanding how objects relate in space, mentally rotating shapes",
    whyItMatters: "Essential for geometry, engineering, art, and navigation",
  },
  {
    categoryId: "mathematical-thinking",
    name: "Number Sense",
    emoji: "🔢",
    whatItIs: "Quick mental math, estimating, and understanding number relationships",
    whyItMatters: "Foundation for all math learning from arithmetic to algebra",
  },
  {
    categoryId: "verbal-reasoning",
    name: "Word Skills",
    emoji: "📝",
    whatItIs: "Vocabulary, word puzzles, and language-based problem solving",
    whyItMatters: "Supports reading comprehension, writing, and communication",
  },
  {
    categoryId: "strategy-decision",
    name: "Strategic Thinking",
    emoji: "♟️",
    whatItIs: "Planning ahead, weighing options, and making decisions under uncertainty",
    whyItMatters: "Develops executive function skills used in school and life",
  },
  {
    categoryId: "memory-focus",
    name: "Memory & Focus",
    emoji: "🧠",
    whatItIs: "Remembering information, concentrating, and avoiding distractions",
    whyItMatters: "Working memory is the #1 predictor of academic success",
  },
];
