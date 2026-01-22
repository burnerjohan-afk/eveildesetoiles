"use client";

import { useEffect, useState } from "react";
import { IconChecklist, IconTarget, IconStar } from "@/components/ui/Icons";
import { FloatingStars, Star } from "@/components/ui/Stars";

interface Step {
  step: string;
  title: string;
  description: string;
}

interface MethodStepsProps {
  title: string;
  subtitle: string;
  steps: Step[];
}

// Icônes pour les étapes
const stepIcons = [IconChecklist, IconTarget, IconStar];
const stepGradients = [
  "from-eau-500 to-cyan-400",
  "from-etoile-500 to-orange-500",
  "from-green-500 to-etoile-500",
];

export function MethodSteps({ title, subtitle, steps }: MethodStepsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Étoiles flottantes */}
      <FloatingStars count={5} size="sm" color="mixed" className="z-0 opacity-25" />
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-eau-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-etoile-200 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-12 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star size="md" color="etoile" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {title}
            </h2>
            <Star size="md" color="orange" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const IconComponent = stepIcons[index % stepIcons.length];
            const gradientClass = stepGradients[index % stepGradients.length];
            
            return (
              <div 
                key={index} 
                className={`
                  text-center group
                  ${mounted ? 'animate-fade-in-up' : 'opacity-0'}
                `}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`
                  relative inline-flex items-center justify-center w-24 h-24 
                  rounded-full bg-gradient-to-br ${gradientClass} text-white 
                  mb-6 shadow-xl transform group-hover:scale-110 group-hover:rotate-6
                  transition-all duration-500 group-hover:shadow-2xl
                  before:absolute before:inset-0 before:rounded-full before:bg-white before:opacity-20 before:blur-xl
                `}>
                  <IconComponent className="w-12 h-12 relative z-10" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-900 shadow-lg">
                    {step.step}
                  </div>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-xl hover:border-eau-300 transition-all duration-500 transform group-hover:-translate-y-2 card-shine">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-eau-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
