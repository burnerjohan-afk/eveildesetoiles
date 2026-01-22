"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { IconFormation } from "@/components/ui/Icons";
import { FloatingStars } from "@/components/ui/Stars";

interface HeroProps {
  title: string;
  subtitle: string;
  cta: string;
  ctaSecondary?: string;
  services?: Array<{ id: string; title: string; slug: string }>;
  formations?: Array<{ id: string; title: string; slug: string }>;
  accompagnements?: Array<{ title: string; slug: string }>;
}

export function Hero({ title, subtitle, cta, ctaSecondary, services = [], formations = [], accompagnements = [] }: HeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/image/crèche.jpg"
          alt="Crèche"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay pour assurer la lisibilité du texte */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
      </div>

      {/* Étoiles flottantes avec couleurs de la charte graphique (visible sur fond sombre) */}
      <FloatingStars count={8} size="lg" color="mixed" className="z-10 opacity-50" />

      {/* Éléments décoratifs animés */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {/* Formes flottantes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-eau-200/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-etoile-200/20 rounded-full blur-xl animate-float delay-200"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-orange-200/20 rounded-full blur-xl animate-float delay-400"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className={`text-center ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-eau-700 text-sm font-medium animate-fade-in delay-200 shadow-md">
            <IconFormation className="w-5 h-5" />
            <span>Formations certifiées pour les professionnels de crèche</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/prestations" className="animate-fade-in delay-300">
              <Button size="lg">{cta}</Button>
            </Link>
            {ctaSecondary && (
              <div className="animate-fade-in delay-400">
                <Link href="/nous-contacter">
                  <Button 
                    size="lg" 
                    variant="secondary"
                  >
                    {ctaSecondary}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

    </section>
  );
}
