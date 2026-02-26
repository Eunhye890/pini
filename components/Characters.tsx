/** Cute monster characters based on the brand mascots */

export function CharYellow({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 120" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="50" cy="70" rx="32" ry="38" fill="#FFD54F" stroke="#2d2d2d" strokeWidth="3"/>
      {/* Horns */}
      <polygon points="35,38 30,18 42,35" fill="#FFD54F" stroke="#2d2d2d" strokeWidth="2.5"/>
      <polygon points="65,38 70,18 58,35" fill="#FFD54F" stroke="#2d2d2d" strokeWidth="2.5"/>
      {/* Eyes */}
      <circle cx="40" cy="62" r="5" fill="#2d2d2d"/>
      <circle cx="60" cy="62" r="5" fill="#2d2d2d"/>
      <circle cx="42" cy="60" r="2" fill="white"/>
      <circle cx="62" cy="60" r="2" fill="white"/>
      {/* Mouth - big smile */}
      <path d="M 36 74 Q 50 90 64 74" fill="none" stroke="#2d2d2d" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Arms */}
      <path d="M 20 65 L 8 50" stroke="#2d2d2d" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M 80 65 L 92 50" stroke="#2d2d2d" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <circle cx="8" cy="48" r="4" fill="#FFD54F" stroke="#2d2d2d" strokeWidth="2"/>
      <circle cx="92" cy="48" r="4" fill="#FFD54F" stroke="#2d2d2d" strokeWidth="2"/>
      {/* Feet */}
      <ellipse cx="38" cy="106" rx="10" ry="6" fill="#FFD54F" stroke="#2d2d2d" strokeWidth="2.5"/>
      <ellipse cx="62" cy="106" rx="10" ry="6" fill="#FFD54F" stroke="#2d2d2d" strokeWidth="2.5"/>
    </svg>
  );
}

export function CharBlue({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 120" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="50" cy="68" rx="35" ry="40" fill="#5CA4E7" stroke="#2d2d2d" strokeWidth="3"/>
      {/* Horns */}
      <polygon points="32,35 25,12 40,30" fill="#5CA4E7" stroke="#2d2d2d" strokeWidth="2.5"/>
      <polygon points="68,35 75,12 60,30" fill="#5CA4E7" stroke="#2d2d2d" strokeWidth="2.5"/>
      {/* Eyes */}
      <circle cx="38" cy="58" r="6" fill="white" stroke="#2d2d2d" strokeWidth="2"/>
      <circle cx="62" cy="58" r="6" fill="white" stroke="#2d2d2d" strokeWidth="2"/>
      <circle cx="40" cy="58" r="3" fill="#2d2d2d"/>
      <circle cx="64" cy="58" r="3" fill="#2d2d2d"/>
      {/* Mouth - wide open smile */}
      <ellipse cx="50" cy="78" rx="12" ry="8" fill="#2d2d2d"/>
      <ellipse cx="50" cy="76" rx="8" ry="4" fill="#F26B4E"/>
      {/* Arms - waving */}
      <path d="M 18 62 L 4 42" stroke="#2d2d2d" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M 82 62 L 96 42" stroke="#2d2d2d" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <circle cx="4" cy="40" r="4" fill="#5CA4E7" stroke="#2d2d2d" strokeWidth="2"/>
      <circle cx="96" cy="40" r="4" fill="#5CA4E7" stroke="#2d2d2d" strokeWidth="2"/>
      {/* Feet */}
      <ellipse cx="38" cy="106" rx="10" ry="6" fill="#5CA4E7" stroke="#2d2d2d" strokeWidth="2.5"/>
      <ellipse cx="62" cy="106" rx="10" ry="6" fill="#5CA4E7" stroke="#2d2d2d" strokeWidth="2.5"/>
    </svg>
  );
}

export function CharRed({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 120" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="50" cy="68" rx="33" ry="40" fill="#F26B4E" stroke="#2d2d2d" strokeWidth="3"/>
      {/* Horns */}
      <polygon points="33,35 28,14 41,32" fill="#F26B4E" stroke="#2d2d2d" strokeWidth="2.5"/>
      <polygon points="67,35 72,14 59,32" fill="#F26B4E" stroke="#2d2d2d" strokeWidth="2.5"/>
      {/* Eyes */}
      <circle cx="39" cy="58" r="5.5" fill="white" stroke="#2d2d2d" strokeWidth="2"/>
      <circle cx="61" cy="58" r="5.5" fill="white" stroke="#2d2d2d" strokeWidth="2"/>
      <circle cx="40" cy="59" r="3" fill="#2d2d2d"/>
      <circle cx="62" cy="59" r="3" fill="#2d2d2d"/>
      {/* Mouth - happy */}
      <path d="M 38 76 Q 50 88 62 76" fill="none" stroke="#2d2d2d" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Arms - one up */}
      <path d="M 19 60 L 6 40" stroke="#2d2d2d" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M 81 68 L 94 78" stroke="#2d2d2d" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <circle cx="6" cy="38" r="4" fill="#F26B4E" stroke="#2d2d2d" strokeWidth="2"/>
      <circle cx="94" cy="80" r="4" fill="#F26B4E" stroke="#2d2d2d" strokeWidth="2"/>
      {/* Feet */}
      <ellipse cx="38" cy="106" rx="10" ry="6" fill="#F26B4E" stroke="#2d2d2d" strokeWidth="2.5"/>
      <ellipse cx="62" cy="106" rx="10" ry="6" fill="#F26B4E" stroke="#2d2d2d" strokeWidth="2.5"/>
    </svg>
  );
}

/** Small inline character for decorations */
export function CharMini({ color = "yellow", className = "w-8 h-8" }: { color?: "yellow" | "blue" | "red"; className?: string }) {
  const fills: Record<string, string> = { yellow: "#FFD54F", blue: "#5CA4E7", red: "#F26B4E" };
  const fill = fills[color];
  return (
    <svg viewBox="0 0 40 48" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20" cy="28" rx="14" ry="16" fill={fill} stroke="#2d2d2d" strokeWidth="2"/>
      <polygon points="13,16 10,6 17,14" fill={fill} stroke="#2d2d2d" strokeWidth="1.5"/>
      <polygon points="27,16 30,6 23,14" fill={fill} stroke="#2d2d2d" strokeWidth="1.5"/>
      <circle cx="16" cy="25" r="2.5" fill="#2d2d2d"/>
      <circle cx="24" cy="25" r="2.5" fill="#2d2d2d"/>
      <path d="M 15 32 Q 20 37 25 32" fill="none" stroke="#2d2d2d" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
