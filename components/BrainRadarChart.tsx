"use client";

import { categories } from "@/lib/games";

interface RadarChartProps {
  scores: Record<string, number>;
  size?: number;
  compact?: boolean;
}

export default function BrainRadarChart({
  scores,
  size = 360,
  compact = false,
}: RadarChartProps) {
  const center = size / 2;
  const maxRadius = size * 0.30;
  const labelRadius = size * 0.44;
  const numAxes = categories.length;
  const maxScore = Math.max(...Object.values(scores), 1);

  const angleFor = (i: number) => (i * 2 * Math.PI) / numAxes - Math.PI / 2;

  const pointAt = (i: number, radius: number) => ({
    x: center + radius * Math.cos(angleFor(i)),
    y: center + radius * Math.sin(angleFor(i)),
  });

  // Grid rings
  const rings = [0.25, 0.5, 0.75, 1.0];

  // Score polygon points
  const scorePoints = categories
    .map((cat, i) => {
      const score = scores[cat.id] || 0;
      const ratio = maxScore > 0 ? score / maxScore : 0;
      const p = pointAt(i, ratio * maxRadius);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  // Axis lines
  const axes = categories.map((_, i) => {
    const p = pointAt(i, maxRadius);
    return { x1: center, y1: center, x2: p.x, y2: p.y };
  });

  // Label positions
  const labels = categories.map((cat, i) => {
    const p = pointAt(i, labelRadius);
    return { ...p, emoji: cat.emoji, name: cat.name, score: scores[cat.id] || 0 };
  });

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={compact ? "w-full max-w-[200px]" : "w-full max-w-[360px]"}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Grid rings */}
      {rings.map((ratio) => {
        const ringPoints = categories
          .map((_, i) => {
            const p = pointAt(i, ratio * maxRadius);
            return `${p.x},${p.y}`;
          })
          .join(" ");
        return (
          <polygon
            key={ratio}
            points={ringPoints}
            fill="none"
            stroke="#2d2d2d"
            strokeWidth={ratio === 1 ? 2 : 1}
            opacity={ratio === 1 ? 0.3 : 0.1}
          />
        );
      })}

      {/* Axis lines */}
      {axes.map((axis, i) => (
        <line
          key={i}
          x1={axis.x1}
          y1={axis.y1}
          x2={axis.x2}
          y2={axis.y2}
          stroke="#2d2d2d"
          strokeWidth={1}
          opacity={0.15}
        />
      ))}

      {/* Score fill */}
      <polygon
        points={scorePoints}
        fill="rgba(92, 164, 231, 0.25)"
        stroke="#5CA4E7"
        strokeWidth={2.5}
      />

      {/* Score dots */}
      {categories.map((cat, i) => {
        const score = scores[cat.id] || 0;
        const ratio = maxScore > 0 ? score / maxScore : 0;
        const p = pointAt(i, ratio * maxRadius);
        return (
          <circle
            key={cat.id}
            cx={p.x}
            cy={p.y}
            r={3}
            fill="#5CA4E7"
            stroke="#2d2d2d"
            strokeWidth={1.5}
          />
        );
      })}

      {/* Labels */}
      {labels.map((label, i) => (
        <g key={i}>
          <text
            x={label.x}
            y={label.y - (compact ? 4 : 10)}
            textAnchor="middle"
            fontSize={compact ? 16 : 24}
          >
            {label.emoji}
          </text>
          {!compact && (
            <>
              <text
                x={label.x}
                y={label.y + 12}
                textAnchor="middle"
                fontSize={10}
                fontWeight="bold"
                fill="#2d2d2d"
                opacity={0.7}
              >
                {label.name}
              </text>
              <text
                x={label.x}
                y={label.y + 24}
                textAnchor="middle"
                fontSize={10}
                fontWeight="bold"
                fill="#5CA4E7"
              >
                {label.score}
              </text>
            </>
          )}
        </g>
      ))}
    </svg>
  );
}
