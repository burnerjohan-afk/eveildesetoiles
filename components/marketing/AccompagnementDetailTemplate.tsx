"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { config } from "@/lib/config";
import { Star } from "@/components/ui/Stars";
import { ContactButton } from "./ContactButton";

interface AccompagnementDetailTemplateProps {
  title: string;
  subtitle?: string;
  description?: string;
  objectives?: string[];
  content?: string[];
  contentDetails?: {
    section: string;
    items: string[];
  }[];
  approach?: string[];
  modalities?: string[];
  duration?: string;
  targetAudience?: string;
  pricing?: string;
  backUrl: string;
  backLabel: string;
}

export function AccompagnementDetailTemplate({
  title,
  subtitle,
  description,
  objectives,
  content,
  contentDetails,
  approach,
  modalities,
  duration,
  targetAudience,
  pricing,
  backUrl,
  backLabel,
}: AccompagnementDetailTemplateProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
                <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">{title}</h1>
                {subtitle && <p className="text-xl text-gray-600 mb-4 leading-relaxed">{subtitle}</p>}
                {description && <p className="text-lg text-gray-700 leading-relaxed">{description}</p>}
              </div>

              {/* Objectifs */}
              {objectives && objectives.length > 0 && (
                <div className={`mb-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2 group">
                    <Star size="sm" color="eau" animated={true} />
                    <span className="group-hover:text-eau-700 transition-colors duration-300">Objectifs</span>
                  </h2>
                  <ul className="list-disc list-inside text-gray-700 space-y-3">
                    {objectives.map((objective, i) => (
                      <li key={i} className="transform transition-all duration-300 hover:translate-x-2 hover:text-gray-900" style={{ animationDelay: `${0.2 + i * 0.05}s` }}>
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contenu structuré */}
              {contentDetails && contentDetails.length > 0 ? (
                <div className={`mb-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2 group">
                    <Star size="sm" color="etoile" animated={true} />
                    <span className="group-hover:text-etoile-700 transition-colors duration-300">Contenu</span>
                  </h2>
                  <div className="space-y-6">
                    {contentDetails.map((section, sectionIndex) => (
                      <div 
                        key={sectionIndex} 
                        className="border-l-4 border-eau-500 pl-4 transform transition-all duration-300 hover:border-eau-600 hover:pl-6 hover:shadow-lg hover:shadow-eau-100 rounded-r-lg py-2 group"
                        style={{ animationDelay: `${0.3 + sectionIndex * 0.1}s` }}
                      >
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-eau-700 transition-colors duration-300">
                          {section.section}
                        </h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                          {section.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="transform transition-all duration-300 hover:translate-x-1 hover:text-gray-900">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : content && content.length > 0 && (
                <div className={`mb-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2 group">
                    <Star size="sm" color="etoile" animated={true} />
                    <span className="group-hover:text-etoile-700 transition-colors duration-300">Contenu</span>
                  </h2>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {content.map((item, i) => (
                      <li key={i} className="transform transition-all duration-300 hover:translate-x-2 hover:text-gray-900">{item}</li>
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

              {/* Approche */}
              {approach && approach.length > 0 && (
                <div className={`mb-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Notre approche</h2>
                  <ul className="list-disc list-inside text-gray-700 space-y-3">
                    {approach.map((item, i) => (
                      <li key={i} className="transform transition-all duration-300 hover:translate-x-2 hover:text-gray-900">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Modalités */}
              {modalities && modalities.length > 0 && (
                <div className={`mb-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Modalités</h2>
                  <ul className="list-disc list-inside text-gray-700 space-y-3">
                    {modalities.map((modality, i) => (
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
            {pricing && (
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
                      {pricing}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Actions */}
            <Card className={`transform transition-all duration-500 hover:shadow-xl hover:shadow-eau-200/50 hover:-translate-y-1 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <div>
                <ContactButton
                  preSelectedType="accompagnement"
                  preSelectedTitle={title}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
