"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Star } from "@/components/ui/Stars";
import { config } from "@/lib/config";
import Link from "next/link";

export default function ContactRdvPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calendlyUrl = config.calendlyUrl;

  return (
    <div className="py-16 bg-gradient-to-b from-white via-etoile-50/20 to-white relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 right-10 w-32 h-32 bg-eau-200 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-etoile-200 rounded-full blur-3xl animate-float delay-200"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-12 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star size="md" color="etoile" animated={true} />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Prendre rendez-vous</h1>
            <Star size="md" color="eau" animated={true} />
          </div>
          <p className="text-xl text-gray-600">
            Réservez directement un créneau pour discuter de votre projet
          </p>
        </div>

        <Card className={`transform transition-all duration-500 hover:shadow-xl ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-eau-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-eau-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Réservez votre créneau</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Sélectionnez un créneau qui vous convient pour échanger sur vos besoins et vos projets.
            </p>
            <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="transform transition-all duration-300 hover:scale-105">
                Réserver
              </Button>
            </a>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">
                Vous préférez nous contacter par email ?
              </p>
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Nous envoyer un message
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
