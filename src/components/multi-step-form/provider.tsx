"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { MultiStepFormDict } from "@/lib/i18n/dict.types";

type MultiStepFormContextValue = {
  isOpen: boolean;
  currentDict: MultiStepFormDict | null;
  open: (dict: MultiStepFormDict) => void;
  close: () => void;
};

const MultiStepFormContext = createContext<MultiStepFormContextValue | null>(null);

export function MultiStepFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDict, setCurrentDict] = useState<MultiStepFormDict | null>(null);

  const open = useCallback((dict: MultiStepFormDict) => {
    setCurrentDict(dict);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setCurrentDict(null), 350);
  }, []);

  const value = useMemo<MultiStepFormContextValue>(
    () => ({ isOpen, currentDict, open, close }),
    [isOpen, currentDict, open, close],
  );

  return (
    <MultiStepFormContext.Provider value={value}>
      {children}
    </MultiStepFormContext.Provider>
  );
}

export function useMultiStepForm() {
  const ctx = useContext(MultiStepFormContext);
  if (!ctx) {
    throw new Error("useMultiStepForm must be used inside <MultiStepFormProvider>");
  }
  return ctx;
}
