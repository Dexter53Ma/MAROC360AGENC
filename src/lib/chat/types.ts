export type ChatRole = "user" | "assistant" | "system";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  sources?: string[];
  createdAt: number;
};

export type ChatRequestMessage = {
  role: Exclude<ChatRole, "system">;
  content: string;
};

export type ChatRequest = {
  messages: ChatRequestMessage[];
};

export type ChatResponse = {
  reply: string;
  sources: string[];
  matched: boolean;
  suggestions: string[];
};

export type KnowledgeEntry = {
  id: string;
  title: string;
  category: "about" | "services" | "industries" | "process" | "commercial" | "company" | "support";
  tags: string[];
  keywords: string[];
  answer: string;
  followUps?: string[];
};
