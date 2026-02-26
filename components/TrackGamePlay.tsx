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
    }
  }, [category, incrementScore]);

  return null;
}
