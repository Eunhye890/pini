"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import {
  loadBrainScore,
  incrementScore as incrementScoreFn,
  type BrainScoreData,
} from "@/lib/brain-score";

interface BrainScoreContextValue {
  data: BrainScoreData;
  incrementScore: (categoryId: string) => void;
}

const BrainScoreContext = createContext<BrainScoreContextValue | null>(null);

export function BrainScoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<BrainScoreData>(() => loadBrainScore());

  useEffect(() => {
    setData(loadBrainScore());
  }, []);

  const increment = useCallback((categoryId: string) => {
    const updated = incrementScoreFn(categoryId);
    setData({ ...updated });
  }, []);

  return (
    <BrainScoreContext.Provider value={{ data, incrementScore: increment }}>
      {children}
    </BrainScoreContext.Provider>
  );
}

export function useBrainScore() {
  const ctx = useContext(BrainScoreContext);
  if (!ctx) {
    // Return a no-op fallback when used outside provider (SSR)
    return {
      data: {
        version: 1,
        scores: {},
        totalPlays: 0,
        lastUpdated: "",
        badges: [],
      } as BrainScoreData,
      incrementScore: () => {},
    };
  }
  return ctx;
}
