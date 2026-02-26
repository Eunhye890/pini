"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/parent-data";

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="pixel-border bg-white overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full text-left px-4 py-3 flex items-center justify-between gap-2 hover:bg-[#FFF8E7] transition-colors"
          >
            <span className="font-bold text-sm text-[#2d2d2d]">
              {item.question}
            </span>
            <span className="font-pixel text-[10px] text-[#5CA4E7] shrink-0">
              {openIndex === i ? "▲" : "▼"}
            </span>
          </button>
          {openIndex === i && (
            <div className="px-4 pb-3 text-sm text-gray-600 leading-relaxed border-t-2 border-[#2d2d2d]/10 pt-2">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
