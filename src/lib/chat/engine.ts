import type { KnowledgeEntry } from "./types";
import { knowledgeBase, defaultSuggestions } from "./knowledge";

const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "if", "then", "else", "for", "on", "in", "of",
  "to", "with", "as", "at", "by", "from", "is", "are", "was", "were", "be", "been",
  "being", "this", "that", "these", "those", "it", "its", "i", "you", "we", "they",
  "he", "she", "them", "us", "me", "my", "your", "our", "their", "do", "does", "did",
  "can", "could", "would", "should", "will", "shall", "may", "might", "have", "has",
  "had", "so", "not", "no", "yes", "any", "all", "some", "what", "which", "who",
  "whom", "when", "where", "why", "how", "tell", "me", "about", "more", "info",
  "information", "details", "please", "thanks", "thank", "hi", "hello", "hey", "ok",
  "okay", "yeah", "yep", "sure", "much", "many", "lot", "really", "just", "only",
  "also", "too", "very", "kind", "type",
]);

const INTENT_RULES: Array<{ pattern: RegExp; entryId: string; weight: number }> = [
  { pattern: /\b(hi|hello|hey|salam|salamo|bonjour|bonsoir)\b/i, entryId: "about-agency", weight: 5 },
  { pattern: /\b(price|pricing|cost|fees?|budget|how much|quote|retainer|package)\b/i, entryId: "pricing", weight: 10 },
  { pattern: /\b(start|begin|getting started|first step|onboard|sign up|work with you|hire you|engaged|engage)\b/i, entryId: "getting-started", weight: 10 },
  { pattern: /\b(contact|email|phone|whatsapp|reach|call you|where.*based|located|address|languages?|english|french|arabic|darija)\b/i, entryId: "contact", weight: 8 },
  { pattern: /\b(time|timeline|how long|when|results|roi|fast|quick|expect)\b/i, entryId: "timeline", weight: 8 },
  { pattern: /\b(career|job|hiring|work with you|join|apply|internship|recruit)\b/i, entryId: "careers", weight: 8 },
  { pattern: /\b(privacy|data|gdpr|cookies?|personal information|policy)\b/i, entryId: "privacy", weight: 10 },
  { pattern: /\b(manifesto|beliefs?|values?|mission|why you|philosophy|about your)\b/i, entryId: "manifesto", weight: 8 },
  { pattern: /\b(different|why you|why maroc|why choose|unique|better|vs|versus|competitor)\b/i, entryId: "differentiation", weight: 8 },
  { pattern: /\b(industry|industries|sector|ecommerce|e-commerce|hospitality|travel|hotel|real estate|professional services|b2b|b2c)\b/i, entryId: "industries", weight: 8 },
  { pattern: /\b(process|how do you work|approach|method|methodology|steps?|workflow)\b/i, entryId: "process", weight: 8 },
  { pattern: /\b(strategy|planning|audit|roadmap|consulting)\b/i, entryId: "service-strategy", weight: 8 },
  { pattern: /\b(paid media|ads|advertising|ppc|meta ads|google ads|tiktok ads|linkedin ads|campaign)\b/i, entryId: "service-paid-media", weight: 10 },
  { pattern: /\b(seo|search engine|organic|keywords?|ranking|blog posts?|content writing)\b/i, entryId: "service-seo-content", weight: 10 },
  { pattern: /\b(social media|instagram|facebook page|tiktok|community management|reels)\b/i, entryId: "service-social", weight: 10 },
  { pattern: /\b(dashboard|marketing platform|tracking|attribution|analytics|reporting|bi)\b/i, entryId: "service-platform", weight: 10 },
  { pattern: /\b(creative|design|video production|branding|logo|visuals|photo)\b/i, entryId: "service-creative", weight: 10 },
];

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[\u2018\u2019\u201c\u201d]/g, "")
    .split(/[^a-z0-9\u0600-\u06FF]+/)
    .filter((t) => t.length >= 2 && !STOPWORDS.has(t));
}

function scoreEntry(entry: KnowledgeEntry, tokens: string[], query: string): number {
  if (tokens.length === 0) return 0;

  const keywordSet = new Set(entry.keywords.map((k) => k.toLowerCase()));
  const tagSet = new Set(entry.tags.map((t) => t.toLowerCase()));

  let score = 0;
  for (const token of tokens) {
    if (keywordSet.has(token)) score += 4;
    if (tagSet.has(token)) score += 2;
    if (entry.title.toLowerCase().includes(token)) score += 2;
    if (entry.answer.toLowerCase().includes(token)) score += 1;
  }

  for (const rule of INTENT_RULES) {
    if (rule.entryId === entry.id && rule.pattern.test(query)) {
      score += rule.weight;
    }
  }

  return score;
}

export type RetrievalResult = {
  reply: string;
  sources: string[];
  matched: boolean;
  suggestions: string[];
};

const FALLBACK_REPLY =
  "Great question, but I don't have a specific answer for that one. The fastest way to get what you need is to message our team directly — we usually reply within 24 hours.";

export function retrieve(query: string): RetrievalResult {
  const cleaned = query.trim();
  if (!cleaned) {
    return {
      reply: FALLBACK_REPLY,
      sources: [],
      matched: false,
      suggestions: defaultSuggestions,
    };
  }

  const tokens = tokenize(cleaned);
  const scored = knowledgeBase
    .map((entry) => ({ entry, score: scoreEntry(entry, tokens, cleaned) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const best = scored[0];
  const SECONDARY_THRESHOLD = 6;

  if (!best || best.score < 4) {
    return {
      reply: FALLBACK_REPLY,
      sources: [],
      matched: false,
      suggestions: defaultSuggestions,
    };
  }

  const sources: string[] = [best.entry.title];
  if (scored[1] && scored[1].score >= SECONDARY_THRESHOLD && scored[1].entry.id !== best.entry.id) {
    sources.push(scored[1].entry.title);
  }

  const followUps = (best.entry.followUps ?? []).filter(Boolean);
  const suggestions = followUps.length > 0 ? followUps : defaultSuggestions;

  return {
    reply: best.entry.answer,
    sources,
    matched: true,
    suggestions,
  };
}

export function getGreeting(): string {
  return "Hi! I'm the Maroc 360 assistant. Ask me anything about our services, process, pricing, or how to get started.";
}

export function getFallbackSuggestions(): string[] {
  return defaultSuggestions;
}
