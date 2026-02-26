/**
 * GameDistribution v2.0 API에서 1000+ 게임을 가져와 games.json을 생성
 * 사용법: node scripts/fetch-games.mjs
 */

const API_BASE = "https://catalog.api.gamedistribution.com/api/v2.0/rss/All/";

// 7개 카테고리 (통폐합 완료)
const ourCategories = [
  "logic-reasoning",       // Puzzle (+ scientific-thinking 흡수)
  "pattern-recognition",   // Patterns
  "spatial-awareness",     // Shapes & Space (+ creative-problem-solving 흡수)
  "mathematical-thinking", // Numbers
  "verbal-reasoning",      // Words
  "strategy-decision",     // Strategy
  "memory-focus",          // Memory
];

// GD 카테고리 → 우리 카테고리 (fallback)
const categoryMap = {
  "Puzzle": "logic-reasoning",
  "Match-3": "pattern-recognition",
  "Mahjong & Connect": "pattern-recognition",
  "Boardgames": "strategy-decision",
  "Cards": "strategy-decision",
  "Strategy": "strategy-decision",
  "Merge": "pattern-recognition",
  "Educational": "mathematical-thinking",
  "Simulation": "spatial-awareness",
};

// 태그 기반 카테고리 매핑
function assignCategory(tags, gdCategories) {
  const t = tags.map(x => x.toLowerCase());

  // memory (최우선 — 부족한 카테고리)
  if (t.some(x => ["memory", "memorize", "remember", "simon", "pair", "pairs", "concentration", "recall", "flip", "mind", "attention", "focus", "spot-the-difference", "spot", "difference", "differences", "find-difference"].includes(x)))
    return "memory-focus";

  // words (부족한 카테고리 — 넓게)
  if (t.some(x => ["word", "crossword", "wordsearch", "wordscapes", "spelling", "vocabulary", "trivia", "quiz", "anagram", "hangman", "scrabble", "letter", "letters", "text", "type", "typing", "english", "language", "abc", "alphabet", "grammar", "story", "riddle", "knowledge"].includes(x)))
    return "verbal-reasoning";

  // numbers
  if (t.some(x => ["math", "number", "counting", "calculate", "2048", "addition", "multiply", "fraction", "arithmetic", "sudoku", "numbers"].includes(x)))
    return "mathematical-thinking";

  // puzzle / logic (+ science 흡수)
  if (t.some(x => ["maze", "escape", "roomescape", "find", "hidden", "detective", "mystery", "clue", "science", "physics", "experiment", "gravity", "chemistry", "biology", "nature"].includes(x)))
    return "logic-reasoning";

  // shapes & space (+ creative 흡수)
  if (t.some(x => ["block", "tetris", "arrange", "slide", "sliding-puzzle", "sliding", "tangram", "jigsaw", "3d", "rotation", "spatial", "creative", "craft", "build", "construction", "drawing", "design", "maker", "sandbox"].includes(x)))
    return "spatial-awareness";

  // patterns
  if (t.some(x => ["colormatch", "jewels", "match3", "gems", "merge", "chain", "color", "matching", "sorting", "pattern", "sequence", "connect", "mahjong", "tile", "tiles"].includes(x)))
    return "pattern-recognition";

  // logic (broader)
  if (t.some(x => ["logic", "thinking", "brain", "puzzle", "riddle", "deduction", "iq", "brainteaser"].includes(x)))
    return "logic-reasoning";

  // strategy
  if (t.some(x => ["strategy", "tower", "defence", "defense", "real-time-strategy", "tactics", "chess", "board", "card", "cards", "solitaire", "checkers", "backgammon", "tycoon", "management", "idle", "clicker"].includes(x)))
    return "strategy-decision";

  // spatial fallback
  if (t.some(x => ["ball", "pinball", "pin", "hook", "rope", "stack", "balance", "physics"].includes(x)))
    return "spatial-awareness";

  // GD 카테고리 fallback
  for (const gc of gdCategories) {
    if (categoryMap[gc]) return categoryMap[gc];
  }

  return null;
}

// 안전 필터 - 확장된 bad tags/categories
const BAD_TAGS = new Set([
  "horror", "scary", "zombie", "blood", "gun", "shoot-em-up", "fighting",
  "war", "shooter", "kill", "murder", "death", "dead", "violence", "violent",
  "weapon", "sniper", "assault", "army", "military", "bomb", "explosion",
  "knife", "sword", "slaughter", "torture", "gore", "brutal", "demon",
  "hell", "devil", "drugs", "alcohol", "gambling", "bet", "casino",
  "sexy", "bikini", "kiss", "dating", "romance", "girlfriend", "boyfriend",
]);

const BAD_GD_CATEGORIES = new Set([
  "Dress-up", "Shooter", "Racing", "Action",
]);

// description에 부적절한 단어가 있는지 검사
const BAD_DESC_WORDS = /\b(kill|murder|blood|gore|shoot|gun|weapon|sniper|torture|slaughter|vampire|zombie|demon|hell|devil)\b/i;

function isKidSafe(g) {
  const tags = Array.isArray(g.Tag) ? g.Tag : [];
  const gdCats = Array.isArray(g.Category) ? g.Category : [];

  // Kids Friendly 또는 No Blood 태그 필수
  const hasKidTag = tags.includes("Kids Friendly") || tags.includes("No Blood");
  if (!hasKidTag) return false;

  // bad tags 체크
  if (tags.some(t => BAD_TAGS.has(t.toLowerCase()))) return false;

  // bad GD categories 체크
  if (gdCats.some(c => BAD_GD_CATEGORIES.has(c))) return false;

  // description 체크
  const desc = g.Description || "";
  if (BAD_DESC_WORDS.test(desc)) return false;

  return true;
}

function estimateDifficulty(tags) {
  const t = tags.map(x => x.toLowerCase());
  if (t.some(x => ["hard", "expert", "advanced", "complex", "challenging"].includes(x))) return "hard";
  if (t.some(x => ["easy", "simple", "relax", "relaxing", "casual", "kids"].includes(x))) return "easy";
  return "medium";
}

function makeSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 50)
    .replace(/-$/, "");
}

// v2.0 API 페이지네이션으로 전체 카탈로그 수집
async function fetchAllGames() {
  const allGames = [];
  let page = 1;

  while (true) {
    const url = `${API_BASE}?collection=All&categories=All&tags=All&subType=All&type=All&mobile=All&rewarded=all&amount=500&page=${page}&format=json`;

    console.log(`  Fetching page ${page}...`);
    const res = await fetch(url);
    const batch = await res.json();

    if (!batch || !Array.isArray(batch) || batch.length === 0) break;

    allGames.push(...batch);
    console.log(`  Page ${page}: ${batch.length} games (total: ${allGames.length})`);
    page++;

    // 안전장치: 100페이지 이상이면 중단
    if (page > 100) break;
  }

  return allGames;
}

async function main() {
  console.log("Fetching games from GameDistribution v2.0 API...\n");

  const rawGames = await fetchAllGames();
  console.log(`\nFetched ${rawGames.length} games total from API`);

  // Kid-safe 필터
  const candidates = rawGames.filter(isKidSafe);
  console.log(`${candidates.length} kid-safe games after filtering`);

  // Md5 중복 제거
  const seenMd5 = new Set();
  const unique = candidates.filter(g => {
    if (!g.Md5 || seenMd5.has(g.Md5)) return false;
    seenMd5.add(g.Md5);
    return true;
  });
  console.log(`${unique.length} unique games after dedup`);

  // 카테고리 매핑
  const mapped = unique.map(g => {
    const tags = Array.isArray(g.Tag) ? g.Tag : [];
    const gdCats = Array.isArray(g.Category) ? g.Category : [];
    const category = assignCategory(tags, gdCats);
    if (!category) return null;

    const gameId = g.Md5;
    const slug = makeSlug(g.Title);
    if (!slug) return null;

    const thumbnail = (Array.isArray(g.Asset) && g.Asset.find(a => a.includes("512x384")))
      || `https://img.gamedistribution.com/${gameId}-512x384.jpg`;

    return {
      id: slug,
      title: g.Title,
      description: g.Description ? g.Description.replace(/<[^>]*>/g, "").trim().slice(0, 200) : "",
      category,
      gradeLevel: 0,
      embedUrl: g.Url || `https://html5.gamedistribution.com/${gameId}/`,
      thumbnail,
      tags: tags.filter(t => !["Kids Friendly", "No Blood", "1player", "singleplayer", "Multiplayer"].includes(t)).slice(0, 5),
      difficulty: estimateDifficulty(tags),
      playTime: "5-15 min",
      featured: false,
    };
  }).filter(Boolean);

  console.log(`${mapped.length} games mapped to 7 categories`);

  // 카테고리별 분배 (TARGET_PER_CAT = 150, overflow 재배정 없음)
  const TARGET_PER_CAT = 150;
  const perCategory = {};
  for (const cat of ourCategories) perCategory[cat] = [];

  const usedSlugs = new Set();
  for (const game of mapped) {
    // slug 충돌 방지
    let slug = game.id;
    if (usedSlugs.has(slug)) {
      let suffix = 2;
      while (usedSlugs.has(`${slug}-${suffix}`)) suffix++;
      slug = `${slug}-${suffix}`;
      game.id = slug;
    }

    if (perCategory[game.category].length < TARGET_PER_CAT) {
      usedSlugs.add(slug);
      perCategory[game.category].push(game);
    }
  }

  // 카테고리별 상태 출력
  console.log("\nCategory distribution:");
  let total = 0;
  for (const [cat, catGames] of Object.entries(perCategory)) {
    console.log(`  ${cat}: ${catGames.length} games`);
    total += catGames.length;
  }

  // 학년 배정 + featured 설정
  const finalGames = [];
  for (const [cat, catGames] of Object.entries(perCategory)) {
    catGames.forEach((g, i) => {
      g.gradeLevel = (i % 4) + 1;
      g.featured = i < 3; // 카테고리당 상위 3개 featured
      finalGames.push(g);
    });
  }

  console.log(`\nTotal: ${finalGames.length} games`);

  const fs = await import("fs");
  const path = await import("path");
  const outPath = path.join(process.cwd(), "data", "games.json");
  fs.writeFileSync(outPath, JSON.stringify(finalGames, null, 2));
  console.log(`Saved to ${outPath}`);
}

main().catch(console.error);
