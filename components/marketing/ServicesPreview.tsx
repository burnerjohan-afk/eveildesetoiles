"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { IconTeam, IconTarget, IconBriefcase } from "@/components/ui/Icons";
import { FloatingStars, Star } from "@/components/ui/Stars";

interface Service {
  slug: string;
  title: string;
  problem: string;
}

interface ServicesPreviewProps {
  services: Service[];
}

const serviceIcons = [IconTeam, IconTarget, IconBriefcase];
const serviceColors = [
  "from-eau-500 to-cyan-400",
  "from-etoile-500 to-orange-500",
  "from-green-500 to-etoile-500",
];

export function ServicesPreview({ services }: ServicesPreviewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Étoiles flottantes */}
      <FloatingStars count={5} size="md" color="mixed" className="z-0 opacity-25" />
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-eau-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-etoile-200 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star size="sm" color="etoile" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Nos prestations
            </h2>
            <Star size="sm" color="eau" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des solutions adaptées aux besoins de votre structure d'accueil
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 3).map((service, index) => {
            const IconComponent = serviceIcons[index % serviceIcons.length];
            const gradientClass = serviceColors[index % serviceColors.length];
            
            return (
              <div
                key={service.slug}
                className={`
                  group relative bg-white border-2 border-eau-100 rounded-xl p-6 
                  shadow-sm hover:shadow-2xl hover:shadow-eau-200/50 hover:border-eau-300
                  transition-all duration-500 ease-out
                  transform hover:-translate-y-3 hover:scale-[1.03]
                  card-shine overflow-hidden
                  ${mounted ? 'animate-fade-in-up' : 'opacity-0'}
                `}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Étoile décorative dans le coin */}
                <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity">
                  <Star size="sm" color={index % 2 === 0 ? "etoile" : "eau"} animated={false} />
                </div>
                
                {/* Gradient background au hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`
                      w-12 h-12 bg-gradient-to-br ${gradientClass} rounded-xl 
                      flex items-center justify-center text-white
                      transform group-hover:scale-110 group-hover:rotate-6
                      transition-all duration-300 shadow-lg group-hover:shadow-xl
                    `}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-eau-700 transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {service.problem}
                  </p>
                  <Link href={`/prestations/${service.slug}`}>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="w-full group-hover:bg-gradient-to-r group-hover:from-eau-600 group-hover:to-eau-700 group-hover:text-white transition-all duration-300 transform group-hover:scale-105"
                    >
                      En savoir plus →
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8 animate-fade-in delay-400">
          <Link href="/prestations">
            <Button className="transform hover:scale-105 transition-transform">
              Voir toutes les prestations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
