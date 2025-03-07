"use client";

import React from "react";
import { clsx } from "clsx";

interface SpotlightProps {
  children: React.ReactNode;
  intensity?: number;
  color?: string;
  className?: string;
}

/**
 * Spotlight component for enhanced visual effects.
 * This component wraps its children with a spotlight effect.
 *
 * @param {React.ReactNode} children - The content to be wrapped by the spotlight.
 * @param {number} [intensity=0.5] - The intensity of the spotlight effect (0 to 1).
 * @param {string} [color="#ffffff"] - The color of the spotlight effect.
 * @param {string} [className] - Additional class names for styling.
 */
export default function Spotlight({
  children,
  intensity = 0.5,
  color = "#ffffff",
  className,
}: SpotlightProps) {
  return (
    <div
      className={clsx(
        "relative group overflow-hidden",
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
          background: `radial-gradient(circle, ${color} ${intensity * 100}%, transparent 100%)`,
          mixBlendMode: "soft-light",
          opacity: intensity,
          transition: "opacity 0.3s ease",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
