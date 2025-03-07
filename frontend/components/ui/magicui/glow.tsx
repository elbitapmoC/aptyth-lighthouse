"use client";

import React from "react";
import { clsx } from "clsx";

interface GlowProps {
  children: React.ReactNode;
  intensity?: number;
  color?: string;
  className?: string;
}

/**
 * Glow component for enhanced visual effects.
 * This component wraps its children with a glowing effect.
 *
 * @param {React.ReactNode} children - The content to be wrapped by the glow effect.
 * @param {number} [intensity=0.5] - The intensity of the glow effect (0 to 1).
 * @param {string} [color="#ffffff"] - The color of the glow effect.
 * @param {string} [className] - Additional class names for styling.
 */
export default function Glow({
  children,
  intensity = 0.5,
  color = "#ffffff",
  className,
}: GlowProps) {
  return (
    <div
      className={clsx(
        "relative group",
        className
      )}
      style={{
        position: "relative",
        isolation: "isolate",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: `0 0 ${intensity * 20}px ${intensity * 10}px ${color}`,
          filter: "blur(4px)",
          opacity: intensity,
          transition: "opacity 0.3s ease",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
