export {};

type GtagCommand = "config" | "event" | "set" | "js" | "consent";

type GtagConfigParams = {
  page_path?: string;
  page_title?: string;
  page_location?: string;
  send_page_view?: boolean;
  [key: string]: unknown;
};

type GtagEventParams = {
  [key: string]: unknown;
};

type GtagFn = (
  command: GtagCommand,
  targetId: string | Date,
  params?: GtagConfigParams | GtagEventParams,
) => void;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: GtagFn;
  }
}
