"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { cn } from "@/lib/utils";
import type { MultiStepFormDict } from "@/lib/i18n/dict.types";
import { useMultiStepForm } from "./provider";
import {
  buildMultiStepWhatsAppMessage,
  initialMultiStepFormState,
  openMultiStepWhatsApp,
  type MultiStepFormState,
} from "./whatsapp";
import { ArrowRight, Check, Loader2, X } from "@/components/icons";

const TOTAL_STEPS = 5;

type Errors = Partial<Record<keyof MultiStepFormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()0-9\s.-]{6,}$/;

function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const common = {
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: cn("h-6 w-6", className),
  };
  switch (name) {
    case "compass":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M16.5 7.5L13 14L7 16.5L10.5 10L16.5 7.5Z" />
        </svg>
      );
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="M16 16L20 20" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="3.5" />
          <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          <circle cx="17" cy="10" r="2.5" />
          <path d="M15 14.5c2.8 0 5 1.8 5 4.5" />
        </svg>
      );
    case "sparkles":
      return (
        <svg {...common}>
          <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z" />
          <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z" />
          <path d="M5 15l.6 1.6L7 17l-1.4.4L5 19l-.6-1.6L3 17l1.4-.4L5 15z" />
        </svg>
      );
    case "grid":
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
          <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
        </svg>
      );
    default:
      return null;
  }
}

function StepHeader({
  step,
  total,
  dict,
  onClose,
}: {
  step: number;
  total: number;
  dict: MultiStepFormDict;
  onClose: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 pb-4">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          {dict.stepIndicatorTemplate
            .replace("{current}", String(step))
            .replace("{total}", String(total))}
        </span>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i < step ? "w-8 bg-text-primary" : "w-3 bg-text-primary/15",
              )}
            />
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label={dict.closeAria}
        className="press inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface-tertiary text-text-primary hover:bg-text-primary/10 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function StepShell({
  step,
  total,
  dict,
  children,
  onClose,
}: {
  step: number;
  total: number;
  dict: MultiStepFormDict;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="flex min-h-full flex-col gap-6">
      <StepHeader step={step} total={total} dict={dict} onClose={onClose} />
      <div className="flex-1 animate-[msf-slide-in_420ms_cubic-bezier(0.22,1,0.36,1)_both]">
        {children}
      </div>
    </div>
  );
}

export function MultiStepFormModal({ fallbackDict }: { fallbackDict: MultiStepFormDict }) {
  const { isOpen, close, currentDict } = useMultiStepForm();
  const dict = currentDict ?? fallbackDict;
  const [step, setStep] = useState(1);
  const [state, setState] = useState<MultiStepFormState>(initialMultiStepFormState);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  const reset = useCallback(() => {
    setStep(1);
    setState(initialMultiStepFormState);
    setErrors({});
    setSending(false);
  }, []);

  const handleClose = useCallback(() => {
    close();
    setTimeout(reset, 350);
  }, [close, reset]);


  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (isOpen) {
      panelRef.current?.focus();
    }
  }, [isOpen, step]);

  const validateStep = useCallback(
    (s: number, st: MultiStepFormState): Errors => {
      const e: Errors = {};
      if (s === 1 && !st.serviceId) {
        return { serviceId: dict.validationRequired };
      }
      if (s === 2 && !st.budgetId) {
        return { budgetId: dict.validationRequired };
      }
      if (s === 3 && st.goalIds.length === 0) {
        return { goalIds: dict.validationRequired };
      }
      if (s === 4) {
        if (!st.firstName.trim()) e.firstName = dict.validationRequired;
        if (!st.lastName.trim()) e.lastName = dict.validationRequired;
        if (!st.email.trim()) e.email = dict.validationRequired;
        else if (!EMAIL_RE.test(st.email)) e.email = dict.validationEmail;
        if (!st.phone.trim()) e.phone = dict.validationRequired;
        else if (!PHONE_RE.test(st.phone)) e.phone = dict.validationPhone;
      }
      return e;
    },
    [dict],
  );

  const goNext = useCallback(() => {
    const e = validateStep(step, state);
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setStep((s) => Math.min(TOTAL_STEPS, s + 1));
    }
  }, [step, state, validateStep]);

  const goBack = useCallback(() => {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  }, []);

  const handleSend = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const e4 = validateStep(4, state);
      if (Object.keys(e4).length > 0) {
        setErrors(e4);
        setStep(4);
        return;
      }
      setSending(true);
      setTimeout(() => {
        openMultiStepWhatsApp(state, dict);
        setSending(false);
        setStep(5);
      }, 400);
    },
    [state, dict, validateStep],
  );

  const update = useCallback(
    <K extends keyof MultiStepFormState>(key: K, value: MultiStepFormState[K]) => {
      setState((s) => ({ ...s, [key]: value }));
      setErrors((e) => {
        if (!(key in e)) return e;
        const next = { ...e };
        delete next[key];
        return next;
      });
    },
    [],
  );

  const toggleGoal = useCallback(
    (id: string) => {
      setState((s) => {
        const has = s.goalIds.includes(id);
        const next = has ? s.goalIds.filter((g) => g !== id) : [...s.goalIds, id];
        return { ...s, goalIds: next };
      });
      setErrors((e) => {
        if (!e.goalIds) return e;
        const next = { ...e };
        delete next.goalIds;
        return next;
      });
    },
    [],
  );

  const summaryMessage = useMemo(
    () => buildMultiStepWhatsAppMessage(state, dict),
    [state, dict],
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        aria-label={dict.closeAria}
        onClick={handleClose}
        className="absolute inset-0 bg-text-primary/40 backdrop-blur-sm animate-[msf-fade-in_280ms_ease-out_both]"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative z-10 m-0 sm:m-4 w-full sm:max-w-2xl max-h-[100dvh] sm:max-h-[90vh] overflow-hidden rounded-t-3xl sm:rounded-3xl bg-surface-primary shadow-2xl animate-[msf-panel-in_420ms_cubic-bezier(0.22,1,0.36,1)_both] outline-none"
      >
        <div
          className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-brand-yellow/50 blur-2xl pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-brand-green/40 blur-2xl pointer-events-none"
          aria-hidden
        />

        <div className="relative flex max-h-[100dvh] sm:max-h-[90vh] flex-col">
          <div className="px-6 pt-6 sm:px-8 sm:pt-8">
            <div className="flex flex-col gap-1 pb-5 border-b border-text-primary/10">
              <h2
                id={titleId}
                className="heading-display text-xl sm:text-2xl md:text-3xl text-text-primary text-balance"
              >
                {dict.title}
              </h2>
              <p className="text-sm sm:text-base text-text-secondary text-balance">
                {dict.subtitle}
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5 sm:px-8 sm:py-6">
            {step === 1 && (
              <StepShell step={1} total={TOTAL_STEPS} dict={dict} onClose={handleClose}>
                <h3 className="text-lg sm:text-xl font-semibold text-text-primary">
                  {dict.servicesTitle}
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  {dict.servicesSubtitle}
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {dict.services.map((svc) => {
                    const active = state.serviceId === svc.id;
                    return (
                      <button
                        key={svc.id}
                        type="button"
                        onClick={() => update("serviceId", svc.id)}
                        className={cn(
                          "press group text-left rounded-2xl border-2 p-4 sm:p-5 transition-all",
                          active
                            ? "border-text-primary bg-text-primary text-surface-primary shadow-lg"
                            : "border-text-primary/10 bg-surface-primary hover:border-text-primary/30",
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={cn(
                              "inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                              active
                                ? "bg-surface-primary/15 text-surface-primary"
                                : "bg-surface-tertiary text-text-primary",
                            )}
                          >
                            <ServiceIcon name={svc.icon} className="h-5 w-5" />
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className={cn(
                                  "font-semibold text-sm sm:text-base",
                                  active
                                    ? "text-surface-primary"
                                    : "text-text-primary",
                                )}
                              >
                                {svc.title}
                              </span>
                              {active && <Check className="h-4 w-4 text-surface-primary" />}
                            </div>
                            <p
                              className={cn(
                                "text-xs sm:text-sm mt-1 leading-relaxed",
                                active
                                  ? "text-surface-primary/80"
                                  : "text-text-secondary",
                              )}
                            >
                              {svc.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {errors.serviceId && (
                  <p className="text-sm text-red-600 mt-3">{errors.serviceId}</p>
                )}
              </StepShell>
            )}

            {step === 2 && (
              <StepShell step={2} total={TOTAL_STEPS} dict={dict} onClose={handleClose}>
                <h3 className="text-lg sm:text-xl font-semibold text-text-primary">
                  {dict.budgetTitle}
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  {dict.budgetSubtitle}
                </p>
                <div className="flex flex-col gap-3">
                  {dict.budgets.map((b) => {
                    const active = state.budgetId === b.id;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => update("budgetId", b.id)}
                        className={cn(
                          "press text-left rounded-2xl border-2 px-4 py-3 sm:px-5 sm:py-4 transition-all",
                          active
                            ? "border-text-primary bg-text-primary text-surface-primary"
                            : "border-text-primary/10 bg-surface-primary hover:border-text-primary/30",
                        )}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div
                              className={cn(
                                "font-semibold text-sm sm:text-base",
                                active
                                  ? "text-surface-primary"
                                  : "text-text-primary",
                              )}
                            >
                              {b.label}
                            </div>
                            <div
                              className={cn(
                                "text-xs sm:text-sm mt-0.5",
                                active
                                  ? "text-surface-primary/80"
                                  : "text-text-secondary",
                              )}
                            >
                              {b.description}
                            </div>
                          </div>
                          <span
                            className={cn(
                              "inline-flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all",
                              active
                                ? "border-surface-primary bg-surface-primary text-text-primary"
                                : "border-text-primary/20",
                            )}
                          >
                            {active && <Check className="h-3 w-3" />}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {errors.budgetId && (
                  <p className="text-sm text-red-600 mt-3">{errors.budgetId}</p>
                )}
              </StepShell>
            )}

            {step === 3 && (
              <StepShell step={3} total={TOTAL_STEPS} dict={dict} onClose={handleClose}>
                <h3 className="text-lg sm:text-xl font-semibold text-text-primary">
                  {dict.goalsTitle}
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  {dict.goalsSubtitle}
                </p>
                <div className="flex flex-wrap gap-2">
                  {dict.goals.map((g) => {
                    const active = state.goalIds.includes(g.id);
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => toggleGoal(g.id)}
                        className={cn(
                          "press rounded-full border-2 px-4 h-10 text-sm font-semibold transition-colors",
                          active
                            ? "bg-text-primary text-surface-primary border-text-primary"
                            : "bg-transparent text-text-primary border-text-primary/15 hover:border-text-primary/40",
                        )}
                      >
                        {active ? "✓ " : ""}
                        {g.label}
                      </button>
                    );
                  })}
                </div>
                {errors.goalIds && (
                  <p className="text-sm text-red-600 mt-3">{errors.goalIds}</p>
                )}
              </StepShell>
            )}

            {step === 4 && (
              <StepShell step={4} total={TOTAL_STEPS} dict={dict} onClose={handleClose}>
                <h3 className="text-lg sm:text-xl font-semibold text-text-primary">
                  {dict.contactTitle}
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  {dict.contactSubtitle}
                </p>
                <div className="grid sm:grid-cols-2 gap-x-4 gap-y-4">
                  <TextField
                    label={dict.fields.firstName}
                    name="msf-firstName"
                    value={state.firstName}
                    onChange={(v) => update("firstName", v)}
                    placeholder={dict.fields.firstNamePlaceholder}
                    error={errors.firstName}
                    required
                  />
                  <TextField
                    label={dict.fields.lastName}
                    name="msf-lastName"
                    value={state.lastName}
                    onChange={(v) => update("lastName", v)}
                    placeholder={dict.fields.lastNamePlaceholder}
                    error={errors.lastName}
                    required
                  />
                  <TextField
                    label={dict.fields.email}
                    name="msf-email"
                    type="email"
                    value={state.email}
                    onChange={(v) => update("email", v)}
                    placeholder={dict.fields.emailPlaceholder}
                    error={errors.email}
                    required
                  />
                  <TextField
                    label={dict.fields.phone}
                    name="msf-phone"
                    type="tel"
                    value={state.phone}
                    onChange={(v) => update("phone", v)}
                    placeholder={dict.fields.phonePlaceholder}
                    error={errors.phone}
                    required
                  />
                  <div className="sm:col-span-2">
                    <TextField
                      label={dict.fields.company}
                      name="msf-company"
                      value={state.company}
                      onChange={(v) => update("company", v)}
                      placeholder={dict.fields.companyPlaceholder}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="msf-message"
                      className="text-base text-text-primary"
                    >
                      {dict.fields.message}
                    </label>
                    <textarea
                      id="msf-message"
                      name="message"
                      value={state.message}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        update("message", e.target.value)
                      }
                      placeholder={dict.fields.messagePlaceholder}
                      rows={4}
                      className="input-focus mt-2 w-full px-4 py-3 bg-surface-primary text-text-primary text-base rounded-lg border border-text-primary/10 placeholder:text-text-tertiary resize-none"
                    />
                  </div>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed mt-2">
                  {dict.consent}
                </p>
              </StepShell>
            )}

            {step === 5 && (
              <StepShell step={5} total={TOTAL_STEPS} dict={dict} onClose={handleClose}>
                <div className="flex flex-col gap-5">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-text-primary">
                      {dict.summaryTitle}
                    </h3>
                    <p className="text-sm text-text-secondary mt-1">
                      {dict.summaryIntro}
                    </p>
                  </div>

                  <SummarySection label={dict.summaryServiceLabel} value={
                    dict.services.find((s) => s.id === state.serviceId)?.title ??
                    dict.summaryNotSelected
                  } />
                  <SummarySection label={dict.summaryBudgetLabel} value={
                    dict.budgets.find((b) => b.id === state.budgetId)?.label ??
                    dict.summaryNotSelected
                  } />
                  <SummarySection
                    label={dict.summaryGoalsLabel}
                    value={
                      state.goalIds.length
                        ? state.goalIds
                            .map(
                              (id) =>
                                dict.goals.find((g) => g.id === id)?.label ?? "",
                            )
                            .filter(Boolean)
                            .join(dict.summaryGoalsSeparator)
                        : dict.summaryNotSelected
                    }
                  />
                  <SummarySection
                    label={dict.summaryContactLabel}
                    value={[
                      `${state.firstName} ${state.lastName}`.trim(),
                      state.email,
                      state.phone,
                      state.company,
                    ]
                      .filter(Boolean)
                      .join(" \u00b7 ")}
                  />
                  {state.message.trim() && (
                    <SummarySection
                      label={dict.summaryMessageLabel}
                      value={state.message.trim()}
                    />
                  )}

                  <details className="rounded-2xl border border-text-primary/10 bg-surface-tertiary/40 p-4 text-sm">
                    <summary className="cursor-pointer font-semibold text-text-primary">
                      Preview message
                    </summary>
                    <pre className="mt-3 whitespace-pre-wrap break-words text-xs sm:text-sm text-text-secondary font-sans">
{summaryMessage}
                    </pre>
                  </details>

                  <div className="rounded-2xl bg-brand-yellow/15 border border-brand-yellow/40 p-4 text-sm text-text-primary">
                    {dict.successBody}
                  </div>
                </div>
              </StepShell>
            )}
          </div>

          <div className="border-t border-text-primary/10 bg-surface-primary px-6 py-4 sm:px-8 sm:py-5 flex items-center gap-3 sticky bottom-0">
            {step > 1 && step < 5 && (
              <button
                type="button"
                onClick={goBack}
                className="press inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold bg-surface-tertiary text-text-primary hover:bg-text-primary/10 transition-colors"
              >
                {dict.back}
              </button>
            )}
            {step < 4 && (
              <button
                type="button"
                onClick={goNext}
                className="press ml-auto inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold bg-text-primary text-surface-primary hover:bg-text-secondary transition-colors"
              >
                {dict.next}
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
            {step === 4 && (
              <button
                type="button"
                onClick={handleSend}
                disabled={sending}
                className="press ml-auto inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold bg-text-primary text-surface-primary hover:bg-text-secondary transition-colors disabled:opacity-80"
              >
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {dict.successTitle}
                  </>
                ) : (
                  <>
                    <WhatsAppIcon className="h-4 w-4" />
                    {dict.send}
                  </>
                )}
              </button>
            )}
            {step === 5 && (
              <button
                type="button"
                onClick={handleClose}
                className="press ml-auto inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold bg-text-primary text-surface-primary hover:bg-text-secondary transition-colors"
              >
                {dict.closeAria}
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes msf-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes msf-panel-in {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes msf-slide-in {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

function TextField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  error,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-semibold text-text-primary">
        {label}
        {required && <span className="text-text-secondary">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "input-focus h-11 px-3.5 bg-surface-primary text-text-primary text-sm rounded-lg border placeholder:text-text-tertiary",
          error ? "border-red-500" : "border-text-primary/10",
        )}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}

function SummarySection({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl bg-surface-tertiary/60 p-4">
      <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
        {label}
      </span>
      <span className="text-sm sm:text-base text-text-primary whitespace-pre-wrap break-words">
        {value}
      </span>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M19.11 4.92A9.94 9.94 0 0 0 12.06 2C6.55 2 2.1 6.45 2.1 11.96c0 2.1.55 4.16 1.6 5.97L2 22l4.2-1.1a9.95 9.95 0 0 0 5.84 1.86h.01c5.5 0 9.96-4.45 9.96-9.96 0-2.66-1.04-5.16-2.9-7.04Zm-7.05 15.31a8.27 8.27 0 0 1-4.21-1.15l-.3-.18-2.49.65.67-2.43-.2-.31a8.25 8.25 0 0 1-1.26-4.4c0-4.56 3.71-8.27 8.27-8.27 2.21 0 4.29.86 5.85 2.42a8.2 8.2 0 0 1 2.42 5.85c0 4.56-3.71 8.27-8.27 8.27Zm4.54-6.19c-.25-.13-1.47-.73-1.7-.81-.23-.08-.39-.13-.56.13-.16.25-.64.81-.79.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23a7.45 7.45 0 0 1-1.38-1.71c-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.43.13-.15.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.83-.2-.48-.4-.41-.56-.42h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.02 2.57.13.16 1.76 2.69 4.27 3.77.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.18-.48-.31Z" />
    </svg>
  );
}
