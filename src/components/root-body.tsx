import { ViewTransition } from "react";
import { BackToTop } from "@/components/back-to-top";
import { ChatWidget } from "@/components/chat/chat-widget";
import {
  MultiStepFormModal,
  MultiStepFormProvider,
} from "@/components/multi-step-form";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { JsonLd } from "@/components/json-ld";
import { getDict } from "@/lib/i18n/dict";
import { globalSchema } from "@/lib/schema";

export function RootBody({
  locale,
  children,
}: {
  locale: "en" | "fr";
  children: React.ReactNode;
}) {
  const dict = getDict(locale);
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[1100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-text-primary focus:text-surface-primary focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      <MultiStepFormProvider>
        <ViewTransition>{children}</ViewTransition>
        <BackToTop dict={dict.backToTop} />
        <ChatWidget />
        <MultiStepFormModal fallbackDict={dict.multiStepForm} />
      </MultiStepFormProvider>
      <GoogleAnalytics />
      <JsonLd data={globalSchema} />
    </>
  );
}
