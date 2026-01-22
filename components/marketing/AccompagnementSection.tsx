"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { IconFormation, IconBook } from "@/components/ui/Icons";
import { useEffect, useState } from "react";
import { FloatingStars, Star } from "@/components/ui/Stars";

export function AccompagnementSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-etoile-50 via-etoile-100/50 to-etoile-50 relative overflow-hidden">
      {/* Étoiles flottantes */}
      <FloatingStars count={7} size="md" color="etoile" className="z-0 opacity-30" />
      
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 right-10 text-etoile-400 animate-float">
          <IconFormation className="w-16 h-16" />
        </div>
        <div className="absolute bottom-10 left-10 text-etoile-400 animate-float delay-200">
          <IconBook className="w-12 h-12" />
        </div>
      </div>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-etoile-300 rounded-full blur-3xl"></div>
      </div>
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <Star size="md" color="etoile" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Un accompagnement sur mesure
          </h2>
          <Star size="md" color="eau" />
        </div>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
          Chaque structure est unique. Nous adaptons nos interventions à vos besoins spécifiques pour vous offrir un accompagnement personnalisé et efficace.
        </p>
        <Link href="/accompagnement">
          <Button 
            variant="secondary" 
            size="lg"
            className="transform hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
          >
            Découvrir notre méthode
          </Button>
        </Link>
      </div>
    </section>
  );
}
