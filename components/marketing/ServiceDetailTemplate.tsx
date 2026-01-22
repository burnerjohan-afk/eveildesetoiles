"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Service } from "@/lib/storage";
import { config } from "@/lib/config";
import { Star } from "@/components/ui/Stars";
import { ContactButton } from "./ContactButton";

interface ServiceDetailTemplateProps {
  service: Service | null;
  duration?: string;
  targetAudience?: string;
  backUrl: string;
  backLabel: string;
}

export function ServiceDetailTemplate({ service, duration, targetAudience, backUrl, backLabel }: ServiceDetailTemplateProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!service) {
    return (
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <p className="text-gray-600">Prestation introuvable</p>
            <Link href={backUrl}>
              <Button className="mt-4">Retour</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-b from-white via-eau-50/20 to-white relative overflow-hidden">
      {/* Éléments décoratifs animés */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 right-10 w-32 h-32 bg-eau-200 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-etoile-200 rounded-full blur-3xl animate-float delay-200"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-orange-200 rounded-full blur-2xl animate-float delay-400"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`mb-8 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
          <Link href={backUrl} className="text-eau-600 hover:text-eau-800 inline-flex items-center gap-2 transition-all duration-300 hover:gap-3 group">
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {backLabel}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-8">
            <Card className={`transform transition-all duration-500 hover:shadow-xl hover:shadow-eau-200/50 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  {duration && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm transform transition-all duration-300 hover:scale-110 hover:bg-gray-200">
                      Durée : {duration}
                    </span>
                  )}
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">{service.title}</h1>
                <p className="text-xl text-gray-600 mb-4 leading-relaxed">{service.problem}</p>
              </div>

              {/* Points clés */}
              {service.bullets && service.bullets.length > 0 && (
                <div className={`mb-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2 group">
                    <Star size="sm" color="eau" animated={true} />
                    <span className="group-hover:text-eau-700 transition-colors duration-300">Points clés</span>
                  </h2>
                  <ul className="list-disc list-inside text-gray-700 space-y-3">
                    {service.bullets.map((bullet, i) => (
                      <li key={i} className="transform transition-all duration-300 hover:translate-x-2 hover:text-gray-900" style={{ animationDelay: `${0.2 + i * 0.05}s` }}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bénéfices */}
              {service.benefits && service.benefits.length > 0 && (
                <div className={`mb-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2 group">
                    <Star size="sm" color="etoile" animated={true} />
                    <span className="group-hover:text-etoile-700 transition-colors duration-300">Bénéfices</span>
                  </h2>
                  <ul className="list-disc list-inside text-gray-700 space-y-3">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="transform transition-all duration-300 hover:translate-x-2 hover:text-gray-900" style={{ animationDelay: `${0.3 + i * 0.05}s` }}>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Public cible */}
              {targetAudience && (
                <div className={`mb-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2 group">
                    <Star size="sm" color="orange" animated={true} />
                    <span className="group-hover:text-orange-700 transition-colors duration-300">À qui s'adresse cette prestation ?</span>
                  </h2>
                  <p className="text-gray-700 leading-relaxed bg-orange-50/50 p-4 rounded-lg border-l-4 border-orange-300 transform transition-all duration-300 hover:bg-orange-50 hover:shadow-md">
                    {targetAudience}
                  </p>
                </div>
              )}

              {/* Modalités */}
              {service.modalities && service.modalities.length > 0 && (
                <div className={`mb-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Modalités</h2>
                  <ul className="list-disc list-inside text-gray-700 space-y-3">
                    {service.modalities.map((modality, i) => (
                      <li key={i} className="transform transition-all duration-300 hover:translate-x-2 hover:text-gray-900">
                        {modality}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informations pratiques */}
            <Card className={`transform transition-all duration-500 hover:shadow-xl hover:shadow-eau-200/50 hover:-translate-y-1 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Informations pratiques</h3>
              <div className="space-y-4">
                {duration && (
                  <div className="transform transition-all duration-300 hover:translate-x-1">
                    <p className="text-sm font-medium text-gray-700 mb-1">Durée</p>
                    <p className="text-gray-900 font-semibold">{duration}</p>
                  </div>
                )}
                <div className="transform transition-all duration-300 hover:translate-x-1">
                  <p className="text-sm font-medium text-gray-700 mb-1">Modalité</p>
                  <p className="text-gray-900">Sur site / À distance</p>
                </div>
              </div>
            </Card>

            {/* Tarifs */}
            {service.pricingNote && (
              <Card className={`relative overflow-hidden bg-gradient-to-br from-etoile-100 via-etoile-50 to-orange-200 border-2 border-etoile-300/70 transform transition-all duration-500 hover:shadow-2xl hover:shadow-etoile-300/50 hover:-translate-y-2 hover:scale-[1.02] ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
                {/* Éléments décoratifs */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-etoile-200/30 rounded-full blur-2xl -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-200/30 rounded-full blur-xl -ml-12 -mb-12"></div>
                <div className="absolute top-4 right-4">
                  <Star size="sm" color="etoile" animated={true} className="opacity-60" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <Star size="sm" color="orange" animated={true} className="opacity-60" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Tarif</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-etoile-300 to-transparent"></div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-etoile-200/50 transform transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-lg group">
                    <p className="text-2xl font-bold bg-gradient-to-r from-etoile-700 to-orange-600 bg-clip-text text-transparent group-hover:from-etoile-800 group-hover:to-orange-700 transition-all text-center">
                      {service.pricingNote}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Actions */}
            <Card className={`transform transition-all duration-500 hover:shadow-xl hover:shadow-eau-200/50 hover:-translate-y-1 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <div>
                <ContactButton
                  preSelectedType="prestation"
                  preSelectedId={service.id}
                  preSelectedTitle={service.title}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
