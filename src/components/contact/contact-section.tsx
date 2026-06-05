"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Check, Loader2 } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/site-config";
import type { ContactDict } from "@/lib/i18n/dict.types";

const DEFAULT_FEATURES = [
  "Free 30-min strategy call",
  "Tailored proposal within 48h",
  "No long-term contracts",
  "Dedicated account manager",
];

const DEFAULT_TOPICS = [
  "Strategy",
  "Paid Media",
  "SEO",
  "Content",
  "Social Media",
  "Other",
];

const DEFAULT_FIELDS = {
  formFirstNameLabel: "First name",
  formFirstNamePlaceholder: "John",
  formLastNameLabel: "Last name",
  formLastNamePlaceholder: "Doe",
  formEmailLabel: "Email",
  formEmailPlaceholder: "john@acme.com",
  formPhoneLabel: "Phone number",
  formPhonePlaceholder: "+212 6 21 34 65 78",
  formCompanyLabel: "Company name",
  formCompanyPlaceholder: "Acme",
  formTopicsLabel: "Which services are you interested in?",
  formSubmit: "Send message",
  formThanks: "Thanks!",
  formConsent:
    "By submitting this form you agree to our privacy policy. We'll only use your details to follow up about your enquiry.",
};

type ContactSectionProps = {
  dict?: Pick<
    ContactDict,
    | "heroTitle"
    | "heroDescription"
    | "trustpilotLabel"
    | "whyTitle"
    | "features"
    | "formFirstNameLabel"
    | "formFirstNamePlaceholder"
    | "formLastNameLabel"
    | "formLastNamePlaceholder"
    | "formEmailLabel"
    | "formEmailPlaceholder"
    | "formPhoneLabel"
    | "formPhonePlaceholder"
    | "formCompanyLabel"
    | "formCompanyPlaceholder"
    | "formTopicsLabel"
    | "formTopics"
    | "formSubmit"
    | "formSubmitLoading"
    | "formThanks"
    | "formConsent"
  >;
};

function ContactForm({ dict }: ContactSectionProps) {
  const d = { ...DEFAULT_FIELDS, ...dict };
  const topics = dict?.formTopics ?? DEFAULT_TOPICS;

  const [status, setStatus] = useState<"idle" | "loading" | "ok">("idle");
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (t: string) =>
    setSelected((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 400));
    const form = e.currentTarget;
    const data = new FormData(form);
    const firstname = String(data.get("firstname") ?? "").trim();
    const lastname = String(data.get("lastname") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const fullName = [firstname, lastname].filter(Boolean).join(" ");
    const topicsLine = selected.length
      ? selected.join(", ")
      : d.formTopicsLabel;
    const message = [
      "Hi Maroc 360, I'd like to get in touch:",
      "",
      `*Name:* ${fullName || "-"}`,
      `*Email:* ${email || "-"}`,
      `*Phone:* ${phone || "-"}`,
      `*Company:* ${company || "-"}`,
      `*Topics:* ${topicsLine}`,
    ].join("\n");
    const url = buildWhatsAppUrl(message);
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
    setStatus("ok");
    form.reset();
    setSelected([]);
    setTimeout(() => setStatus("idle"), 2400);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
      data-form-id="contact"
    >
      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
        <Field
          label={d.formLastNameLabel}
          name="firstname"
          placeholder={d.formLastNamePlaceholder}
          required
        />
        <Field
          label={d.formFirstNameLabel}
          name="lastname"
          placeholder={d.formFirstNamePlaceholder}
          required
        />
      </div>
      <Field
        label={d.formEmailLabel}
        name="email"
        type="email"
        placeholder={d.formEmailPlaceholder}
        required
      />
      <Field
        label={d.formPhoneLabel}
        name="phone"
        type="tel"
        placeholder={d.formPhonePlaceholder}
        required
      />
      <Field
        label={d.formCompanyLabel}
        name="company"
        placeholder={d.formCompanyPlaceholder}
        required
      />

      <div className="flex flex-col gap-3">
        <label className="text-base font-normal text-text-primary">
          {d.formTopicsLabel}
        </label>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => {
            const active = selected.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggle(t)}
                className={cn(
                  "press rounded-full border-2 px-4 h-10 text-sm font-normal transition-colors",
                  active
                    ? "bg-text-primary text-surface-primary border-text-primary"
                    : "bg-transparent text-text-primary border-text-primary/15 hover:border-text-primary/40"
                )}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "press relative mt-2 inline-flex items-center justify-center overflow-hidden rounded-full font-semibold h-12 px-6 text-base",
          "bg-text-primary text-surface-primary hover:bg-text-secondary",
          "disabled:opacity-90"
        )}
      >
        <span
          className={cn(
            "inline-flex items-center gap-2 transition-all duration-300",
            status === "ok" && "translate-y-2 opacity-0"
          )}
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <span>{d.formSubmit}</span>
          )}
        </span>
        <span
          className={cn(
            "absolute inset-0 inline-flex items-center justify-center gap-2 transition-all duration-300",
            status === "ok"
              ? "translate-y-0 opacity-100"
              : "-translate-y-2 opacity-0"
          )}
        >
          <Check className="h-4 w-4" />
          <span>{d.formThanks}</span>
        </span>
      </button>

      <p className="text-xs text-text-secondary leading-relaxed">
        {d.formConsent}
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-base text-text-primary">
        {label}
        {required && <span className="text-text-secondary">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="input-focus h-12 px-4 bg-surface-primary text-text-primary text-base rounded-lg border border-text-primary/10 placeholder:text-text-tertiary"
      />
    </div>
  );
}

export function ContactSection({ dict }: ContactSectionProps = {}) {
  const heroTitle = dict?.heroTitle ?? "Get in touch";
  const heroDescription =
    dict?.heroDescription ??
    "Tell us about your project. We typically reply within 24 hours.";
  const trustpilotLabel = dict?.trustpilotLabel ?? "on Trustpilot";
  const whyTitle = dict?.whyTitle ?? "Why teams reach out:";
  const features = dict?.features ?? DEFAULT_FEATURES;

  return (
    <section className="bg-surface-primary relative">
      <div className="container-page py-12 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <div className="flex flex-col gap-6 max-w-xl">
            <Reveal>
              <h1 className="heading-display text-[2.5rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] text-balance">
                {heroTitle}
              </h1>
            </Reveal>

            <Reveal delay={100}>
              <p className="body-lg sm:text-lg lg:text-[1.375rem]">
                {heroDescription}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <a
                href="https://fr.trustpilot.com/review/trustditto.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-lg"
              >
                <span className="font-semibold text-text-primary">4.6</span>
                <span className="text-text-secondary">/5</span>
                <span className="text-text-secondary">{trustpilotLabel}</span>
                <span className="relative w-7 h-7 inline-block">
                  <Image
                    src="/seo/trustpilot.svg"
                    alt="Trustpilot"
                    fill
                    sizes="28px"
                    className="object-contain"
                  />
                </span>
              </a>
            </Reveal>

            <Reveal delay={300}>
              <h2 className="heading-display text-2xl md:text-3xl mt-6">
                {whyTitle}
              </h2>
            </Reveal>

            <Reveal delay={400}>
              <ul className="flex flex-col gap-4">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 inline-flex items-center justify-center">
                      <Check className="w-6 h-6 text-text-primary" />
                    </span>
                    <span className="text-base sm:text-lg md:text-[1.375rem] leading-snug text-text-primary">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal variant="fade" delay={200}>
            <div className="bg-surface-tertiary rounded-3xl p-6 sm:p-8 md:p-10">
              <ContactForm dict={dict} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
