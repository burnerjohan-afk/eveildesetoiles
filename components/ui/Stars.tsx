"use client";

import { IconStar } from "./Icons";

interface StarsProps {
  count?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "eau" | "etoile" | "orange" | "white" | "mixed";
}

export function FloatingStars({ 
  count = 5, 
  className = "", 
  size = "md",
  color = "mixed" 
}: StarsProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const colorClasses = {
    eau: "text-eau-500",
    etoile: "text-etoile-500",
    orange: "text-orange-500",
    white: "text-white",
    mixed: "text-etoile-300",
  };

  const stars = Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    duration: `${3 + Math.random() * 2}s`,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {stars.map((star) => {
        let starColor: string;
        if (color === "mixed") {
          // Alternance des couleurs de la charte : eau, etoile, orange
          const colors = ["text-eau-500", "text-etoile-500", "text-orange-500"];
          starColor = colors[star.id % 3];
        } else {
          starColor = colorClasses[color];
        }
        
        return (
          <div
            key={star.id}
            className={`absolute ${sizeClasses[size]} ${starColor} animate-float opacity-60`}
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          >
            <IconStar className="w-full h-full" />
          </div>
        );
      })}
    </div>
  );
}

// Composant pour une étoile unique avec animation
export function Star({ 
  className = "", 
  size = "md",
  color = "etoile",
  animated = true 
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "eau" | "etoile" | "orange" | "white";
  animated?: boolean;
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const colorClasses = {
    eau: "text-eau-500",
    etoile: "text-etoile-500",
    orange: "text-orange-500",
    white: "text-white",
  };

  return (
    <div 
      className={`
        ${sizeClasses[size]} ${colorClasses[color]} 
        ${animated ? "animate-float" : ""} 
        ${className}
      `}
    >
      <IconStar className="w-full h-full" />
    </div>
  );
}

// Composant pour un chemin d'étoiles
export function StarPath({ 
  count = 3,
  direction = "horizontal",
  className = "",
  spacing = 8 
}: {
  count?: number;
  direction?: "horizontal" | "vertical";
  className?: string;
  spacing?: number;
}) {
  const gapClass = spacing === 2 ? "gap-2" : spacing === 4 ? "gap-4" : spacing === 6 ? "gap-6" : "gap-8";
  
  return (
    <div 
      className={`
        flex ${direction === "horizontal" ? "flex-row" : "flex-col"} 
        items-center ${gapClass} ${className}
      `}
    >
      {Array.from({ length: count }).map((_, i) => {
        const colors: Array<"etoile" | "eau" | "orange"> = ["etoile", "eau", "orange"];
        return (
          <Star
            key={i}
            size="sm"
            color={colors[i % 3]}
            animated={true}
            className="opacity-70"
          />
        );
      })}
    </div>
  );
}
