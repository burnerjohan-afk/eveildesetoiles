"use client";

import { useEffect, useState } from "react";
import { IconChild, IconPalette, IconBook, IconHandshake, IconLightbulb, IconStar } from "@/components/ui/Icons";
import { FloatingStars, Star } from "@/components/ui/Stars";

interface FeatureGridProps {
  title: string;
  subtitle: string;
  items: string[];
}

// Icônes adaptées au secteur crèche - composants SVG
const iconComponents = [IconChild, IconPalette, IconBook, IconHandshake, IconLightbulb, IconStar];
const iconColors = [
  "bg-gradient-to-br from-eau-500 to-cyan-400 text-white",
  "bg-gradient-to-br from-etoile-500 to-orange-500 text-white",
  "bg-gradient-to-br from-orange-500 to-etoile-500 text-white",
  "bg-gradient-to-br from-eau-500 to-cyan-400 text-white",
  "bg-gradient-to-br from-etoile-500 to-orange-500 text-white",
  "bg-gradient-to-br from-orange-500 to-etoile-500 text-white",
];

export function FeatureGrid({ title, subtitle, items }: FeatureGridProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-white via-eau-50/30 to-white relative overflow-hidden">
      {/* Étoiles flottantes */}
      <FloatingStars count={6} size="sm" color="mixed" className="z-0 opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-12 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star size="md" color="eau" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {title}
            </h2>
            <Star size="md" color="etoile" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const IconComponent = iconComponents[index % iconComponents.length];
            const iconColorClass = iconColors[index % iconColors.length];
            
            return (
              <div
                key={index}
                className={`
                  group relative bg-white border-2 border-eau-100 rounded-xl p-6 
                  shadow-sm hover:shadow-xl hover:shadow-eau-200/50 hover:border-eau-300
                  transition-all duration-500 ease-out
                  transform hover:-translate-y-2 hover:scale-[1.02]
                  card-shine
                  ${mounted ? 'animate-fade-in-up' : 'opacity-0'}
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`
                    flex-shrink-0 w-14 h-14 ${iconColorClass} rounded-xl 
                    flex items-center justify-center
                    transform group-hover:scale-110 group-hover:rotate-6
                    transition-all duration-300 shadow-md group-hover:shadow-lg
                  `}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <p className="text-gray-700 leading-relaxed flex-1 group-hover:text-gray-900 transition-colors">
                    {item}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
