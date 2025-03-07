"use client";

import React from "react";
import { clsx } from "clsx";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  tiltIntensity?: number;
  shadowColor?: string;
}

/**
 * 3D Card component for enhanced UI elements.
 * This component provides a 3D tilt effect and shadow for its children.
 *
 * @param {React.ReactNode} children - The content to be wrapped by the 3D card.
 * @param {string} [className] - Additional class names for styling.
 * @param {number} [tiltIntensity=15] - The intensity of the tilt effect.
 * @param {string} [shadowColor="rgba(0, 0, 0, 0.2)"] - The color of the shadow.
 */
export default function Card3D({
  children,
  className,
  tiltIntensity = 15,
  shadowColor = "rgba(0, 0, 0, 0.2)",
}: Card3DProps) {
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    card.style.setProperty("--rotateX", `${(-y / rect.height) * tiltIntensity}deg`);
    card.style.setProperty("--rotateY", `${(x / rect.width) * tiltIntensity}deg`);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    card.style.setProperty("--rotateX", "0deg");
    card.style.setProperty("--rotateY", "0deg");
  };

  return (
    <div
      className={clsx(
        "relative group perspective-1000",
        className
      )}
    >
      <div
        className="relative w-full h-full transform transition-transform duration-300 ease-out"
        style={{
          transformStyle: "preserve-3d",
          boxShadow: `0 10px 20px ${shadowColor}`,
          transform: "rotateX(var(--rotateX, 0)) rotateY(var(--rotateY, 0))",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}
