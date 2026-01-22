"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { IconStar } from "@/components/ui/Icons";
import { useEffect, useState } from "react";
import { FloatingStars, Star } from "@/components/ui/Stars";

interface CTASectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  services?: Array<{ id: string; title: string; slug: string }>;
  formations?: Array<{ id: string; title: string; slug: string }>;
  accompagnements?: Array<{ title: string; slug: string }>;
}

export function CTASection({ title, subtitle, buttonText, services = [], formations = [], accompagnements = [] }: CTASectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-eau-600 via-eau-700 to-eau-800 text-white relative overflow-hidden">
      {/* Étoiles flottantes avec couleurs de la charte graphique */}
      <FloatingStars count={12} size="lg" color="mixed" className="z-0 opacity-50" />
      
      {/* Étoiles fixes décoratives */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-8 left-8">
          <Star size="md" color="etoile" animated={false} className="opacity-70" />
        </div>
        <div className="absolute top-12 right-12">
          <Star size="lg" color="eau" animated={false} className="opacity-60" />
        </div>
        <div className="absolute bottom-10 left-16">
          <Star size="md" color="orange" animated={false} className="opacity-70" />
        </div>
        <div className="absolute bottom-12 right-20">
          <Star size="sm" color="etoile" animated={false} className="opacity-80" />
        </div>
        <div className="absolute top-1/2 left-1/4">
          <Star size="md" color="orange" animated={false} className="opacity-60" />
        </div>
        <div className="absolute top-1/3 right-1/4">
          <Star size="sm" color="eau" animated={false} className="opacity-70" />
        </div>
      </div>
      
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-5 left-5 text-white animate-float">
          <IconStar className="w-12 h-12" />
        </div>
        <div className="absolute bottom-5 right-5 text-white animate-float delay-300">
          <IconStar className="w-10 h-10" />
        </div>
      </div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-etoile-300 rounded-full blur-3xl"></div>
      </div>
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <Star size="lg" color="etoile" animated={true} className="opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold drop-shadow-lg">{title}</h2>
          <Star size="lg" color="eau" animated={true} className="opacity-90" />
        </div>
        <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-95 drop-shadow-md">
          {subtitle}
        </p>
        <Link href="/nous-contacter">
          <Button 
            size="lg" 
            variant="secondary"
            className="transform hover:scale-110 transition-transform shadow-xl hover:shadow-2xl"
          >
            {buttonText}
          </Button>
        </Link>
      </div>

    </section>
  );
}
