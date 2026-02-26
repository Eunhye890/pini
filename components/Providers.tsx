"use client";

import { type ReactNode } from "react";
import { BrainScoreProvider } from "./BrainScoreProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return <BrainScoreProvider>{children}</BrainScoreProvider>;
}
