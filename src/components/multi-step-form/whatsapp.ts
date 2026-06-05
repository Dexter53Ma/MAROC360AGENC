import type { MultiStepFormDict } from "@/lib/i18n/dict.types";
import { buildWhatsAppUrl } from "@/lib/site-config";

export type MultiStepFormState = {
  serviceId: string;
  budgetId: string;
  goalIds: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

export const initialMultiStepFormState: MultiStepFormState = {
  serviceId: "",
  budgetId: "",
  goalIds: [],
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

function labelFor<T extends { id: string }>(
  options: ReadonlyArray<T>,
  id: string,
  fallback: string,
  key: keyof T,
): string {
  const found = options.find((o) => o.id === id);
  if (!found) return fallback;
  const value = found[key];
  return typeof value === "string" ? value : fallback;
}

export function buildMultiStepWhatsAppMessage(
  state: MultiStepFormState,
  dict: MultiStepFormDict,
): string {
  const service = labelFor(
    dict.services,
    state.serviceId,
    dict.summaryNotSelected,
    "title",
  );
  const budget = labelFor(
    dict.budgets,
    state.budgetId,
    dict.summaryNotSelected,
    "label",
  );
  const goals = state.goalIds
    .map((id) => labelFor(dict.goals, id, "", "label"))
    .filter(Boolean)
    .join(dict.summaryGoalsSeparator);

  const lines: string[] = [
    `${dict.whatsappPrefix}`,
    ``,
    `*${dict.summaryServiceLabel}:* ${service}`,
    `*${dict.summaryBudgetLabel}:* ${budget}`,
    `*${dict.summaryGoalsLabel}:* ${goals || dict.summaryNotSelected}`,
    ``,
    `*${dict.summaryContactLabel}:*`,
    `- ${dict.fields.firstName}: ${state.firstName} ${state.lastName}`.trim(),
    `- ${dict.fields.email}: ${state.email}`,
    `- ${dict.fields.phone}: ${state.phone}`,
    state.company ? `- ${dict.fields.company}: ${state.company}` : "",
  ].filter(Boolean);

  if (state.message.trim()) {
    lines.push("", `*${dict.summaryMessageLabel}:*`, state.message.trim());
  }

  return lines.join("\n");
}

export function openMultiStepWhatsApp(
  state: MultiStepFormState,
  dict: MultiStepFormDict,
): void {
  const text = buildMultiStepWhatsAppMessage(state, dict);
  const url = buildWhatsAppUrl(text);
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
