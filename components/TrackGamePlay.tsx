"use client";

import { useEffect, useRef } from "react";
import { useBrainScore } from "./BrainScoreProvider";

interface TrackGamePlayProps {
  category: string;
}

export default function TrackGamePlay({ category }: TrackGamePlayProps) {
  const { incrementScore } = useBrainScore();
  const tracked = useRef(false);

  useEffect(() => {
    if (!tracked.current && category) {
      tracked.current = true;
      incrementScore(category);
      // Increment session game counter for ad gating
      const count = parseInt(sessionStorage.getItem("pini_games_played") || "0", 10);
      sessionStorage.setItem("pini_games_played", String(count + 1));
    }
  }, [category, incrementScore]);

  return null;
}
