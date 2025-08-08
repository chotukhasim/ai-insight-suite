export const lexicon: Record<string, number> = {
  good: 2,
  great: 3,
  awesome: 3,
  amazing: 3,
  love: 3,
  like: 1,
  happy: 2,
  win: 2,
  bullish: 2,
  up: 1,
  pump: 1,
  profit: 2,
  cool: 1,
  wow: 1,
  excited: 2,
  neutral: 0,
  bad: -2,
  poor: -2,
  terrible: -3,
  awful: -3,
  hate: -3,
  sad: -2,
  lose: -2,
  bearish: -2,
  down: -1,
  dump: -2,
  loss: -2,
  disappointed: -2,
};

export function score(text: string) {
  const cleaned = text
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[@#]\w+/g, " ")
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  let s = 0;
  for (const w of cleaned) s += lexicon[w] ?? 0;
  return s;
}

export function labelFromScore(s: number): "positive" | "neutral" | "negative" {
  if (s > 1) return "positive";
  if (s < -1) return "negative";
  return "neutral";
}
