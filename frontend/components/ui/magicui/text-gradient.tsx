"use client";

import React from "react";
import { clsx } from "clsx";

interface TextGradientProps {
  children: React.ReactNode;
  gradientColors?: string[];
  className?: string;
}

/**
 * TextGradient component for enhanced text styling.
 * This component applies a gradient effect to the text content.
 *
 * @param {React.ReactNode} children - The text content to be styled with a gradient.
 * @param {string[]} [gradientColors=["#ff7eb3", "#ff758c", "#ff6a65"]] - The colors to use in the gradient.
 * @param {string} [className] - Additional class names for styling.
 */
export default function TextGradient({
  children,
  gradientColors = ["#ff7eb3", "#ff758c", "#ff6a65"],
  className,
}: TextGradientProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${gradientColors.join(", ")})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <span
      className={clsx("font-bold", className)}
      style={gradientStyle}
    >
      {children}
    </span>
  );
}
