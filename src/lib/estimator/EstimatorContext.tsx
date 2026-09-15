"use client";

import { createContext, useContext, useState } from "react";
import { Answers } from "./types";

interface EstimatorContextValue {
  prefill: Answers | null;
  setPrefill: (answers: Answers) => void;
}

const EstimatorContext = createContext<EstimatorContextValue | null>(null);

export function EstimatorContextProvider({ children }: { children: React.ReactNode }) {
  const [prefill, setPrefill] = useState<Answers | null>(null);
  return (
    <EstimatorContext.Provider value={{ prefill, setPrefill }}>
      {children}
    </EstimatorContext.Provider>
  );
}

export function useEstimatorContext() {
  const ctx = useContext(EstimatorContext);
  if (!ctx) {
    throw new Error("useEstimatorContext must be used within EstimatorContextProvider");
  }
  return ctx;
}
