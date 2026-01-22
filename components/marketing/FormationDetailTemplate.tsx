"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FormationCalendar } from "./FormationCalendar";
import { InscriptionForm } from "./InscriptionForm";
import { FormationInscriptionButton } from "./FormationInscriptionButton";
import { ContactButton } from "./ContactButton";
import { Formation } from "@/lib/storage";
import { config } from "@/lib/config";
import { Star } from "@/components/ui/Stars";
import { IconComment } from "@/components/ui/Icons";

interface FormationDetailTemplateProps {
  formation: Formation | null;
  backUrl: string;
  backLabel: string;
}

export function FormationDetailTemplate({ formation, backUrl, backLabel }: FormationDetailTemplateProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!formation) {
    return (
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <p className="text-gray-600">Formation introuvable</p>
            <Link href={backUrl}>
              <Button className="mt-4">Retour</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-b from-white via-etoile-50/20 to-white relative overflow-hidden">
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
                  {formation.category && (
                    <span className="px-3 py-1 bg-eau-100 text-eau-700 rounded-full text-sm font-medium transform transition-all duration-300 hover:scale-110 hover:bg-eau-200">
                      {formation.category}
                    </span>
                  )}
                  {formation.duration && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm transform transition-all duration-300 hover:scale-110 hover:bg-gray-200">
                      Durée : {formation.duration}
                    </span>
                  )}
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">{formation.title}</h1>
                {formation.subtitle && (
                  <p className="text-xl text-gray-600 leading-relaxed">{formation.subtitle}</p>
                )}
              </div>

              {/* Objectifs */}
              {formation.objectives && formation.objectives.length > 0 && (
                <div className={`mb-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2 group">
                    <Star size="sm" color="eau" animated={true} />
                    <span className="group-hover:text-eau-700 transition-colors duration-300">Objectifs</span>
                  </h2>
                  <ul className="list-disc list-inside text-gray-700 space-y-3">
                    {formation.objectives.map((objective, i) => (
                      <li key={i} className="transform transition-all duration-300 hover:translate-x-2 hover:text-gray-900" style={{ animationDelay: `${0.2 + i * 0.05}s` }}>
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contenu structuré */}
              {formation.contentDetails && formation.contentDetails.length > 0 ? (
                <div className={`mb-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2 group">
                    <Star size="sm" color="etoile" animated={true} />
                    <span className="group-hover:text-etoile-700 transition-colors duration-300">Contenu</span>
                  </h2>
                  <div className="space-y-6">
                    {formation.contentDetails.map((section, sectionIndex) => (
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
              ) : formation.content && formation.content.length > 0 && (
                <div className={`mb-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2 group">
                    <Star size="sm" color="etoile" animated={true} />
                    <span className="group-hover:text-etoile-700 transition-colors duration-300">Contenu</span>
                  </h2>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {formation.content.map((item, i) => (
                      <li key={i} className="transform transition-all duration-300 hover:translate-x-2 hover:text-gray-900">{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Public cible */}
              {formation.targetAudience && (
                <div className={`mb-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2 group">
                    <Star size="sm" color="orange" animated={true} />
                    <span className="group-hover:text-orange-700 transition-colors duration-300">À qui s'adresse cette formation ?</span>
                  </h2>
                  <p className="text-gray-700 leading-relaxed bg-orange-50/50 p-4 rounded-lg border-l-4 border-orange-300 transform transition-all duration-300 hover:bg-orange-50 hover:shadow-md">
                    {formation.targetAudience}
                  </p>
                </div>
              )}

              {/* Modalités */}
              {formation.modalities && formation.modalities.length > 0 && (
                <div className={`mb-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Modalités</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formation.duration && (
                      <div className="bg-eau-50/50 p-4 rounded-lg transform transition-all duration-300 hover:bg-eau-50 hover:scale-105 hover:shadow-md">
                        <h3 className="font-semibold text-gray-900 mb-2">Durée</h3>
                        <p className="text-gray-700">{formation.duration}</p>
                      </div>
                    )}
                    {formation.locations && formation.locations.length > 0 && (
                      <div className="bg-etoile-50/50 p-4 rounded-lg transform transition-all duration-300 hover:bg-etoile-50 hover:scale-105 hover:shadow-md">
                        <h3 className="font-semibold text-gray-900 mb-2">Lieux</h3>
                        <ul className="text-gray-700 space-y-1">
                          {formation.locations.map((location, i) => (
                            <li key={i}>• {location}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>

            {/* Témoignages */}
            {formation.testimonials && formation.testimonials.length > 0 && (
              <Card className={`transform transition-all duration-500 hover:shadow-xl hover:shadow-etoile-200/50 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2 group">
                  <IconComment className="w-6 h-6 text-eau-600 transform transition-all duration-300 group-hover:scale-110" />
                  <span className="group-hover:text-eau-700 transition-colors duration-300">Ce qu'ils en ont pensé</span>
                </h2>
                <div className="space-y-6">
                  {formation.testimonials.map((testimonial, i) => (
                    <div 
                      key={i} 
                      className="border-l-4 border-etoile-300 pl-4 transform transition-all duration-300 hover:border-etoile-400 hover:pl-6 hover:shadow-md rounded-r-lg py-2"
                      style={{ animationDelay: `${0.6 + i * 0.1}s` }}
                    >
                      <p className="text-gray-700 italic mb-3">"{testimonial.content}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-etoile-200 rounded-full flex items-center justify-center text-lg font-bold text-etoile-800 transform transition-all duration-300 hover:scale-110 hover:rotate-6">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{testimonial.name}</p>
                          {testimonial.role && (
                            <p className="text-sm text-gray-600">{testimonial.role}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Statistiques */}
            {(formation.satisfactionRate || formation.participantCount || formation.recommendationRate) && (
              <Card className={`bg-gradient-to-br from-eau-50 to-etoile-50 transform transition-all duration-500 hover:shadow-xl hover:shadow-eau-200/50 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  {formation.satisfactionRate && (
                    <div className="transform transition-all duration-300 hover:scale-110">
                      <p className="text-3xl font-bold text-eau-700 mb-2">
                        {formation.satisfactionRate}/5
                      </p>
                      <p className="text-sm text-gray-600">Niveau de satisfaction</p>
                    </div>
                  )}
                  {formation.participantCount && (
                    <div className="transform transition-all duration-300 hover:scale-110">
                      <p className="text-3xl font-bold text-eau-700 mb-2">
                        {formation.participantCount}
                      </p>
                      <p className="text-sm text-gray-600">Professionnels formés</p>
                    </div>
                  )}
                  {formation.recommendationRate && (
                    <div className="transform transition-all duration-300 hover:scale-110">
                      <p className="text-3xl font-bold text-eau-700 mb-2">
                        {formation.recommendationRate}%
                      </p>
                      <p className="text-sm text-gray-600">La recommandent</p>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informations pratiques */}
            <Card className={`transform transition-all duration-500 hover:shadow-xl hover:shadow-eau-200/50 hover:-translate-y-1 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Informations pratiques</h3>
              <div className="space-y-4">
                {formation.duration && (
                  <div className="transform transition-all duration-300 hover:translate-x-1">
                    <p className="text-sm font-medium text-gray-700 mb-1">Durée</p>
                    <p className="text-gray-900 font-semibold">{formation.duration}</p>
                  </div>
                )}
                <div className="transform transition-all duration-300 hover:translate-x-1">
                  <p className="text-sm font-medium text-gray-700 mb-1">Modalité</p>
                  <p className="text-gray-900">Inter / Intra</p>
                </div>
                {formation.locations && formation.locations.length > 0 && (
                  <div className="transform transition-all duration-300 hover:translate-x-1">
                    <p className="text-sm font-medium text-gray-700 mb-1">Lieux</p>
                    <ul className="text-gray-900 space-y-1">
                      {formation.locations.map((location, i) => (
                        <li key={i}>• {location}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>

            {/* Tarifs */}
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
                  <h3 className="text-xl font-bold text-gray-900">Tarifs</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-etoile-300 to-transparent"></div>
                </div>
                <div className="space-y-4">
                  {formation.pricingEmployer && (
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-etoile-200/50 transform transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-lg group">
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Employeur / Pôle Emploi</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-etoile-700 to-orange-600 bg-clip-text text-transparent group-hover:from-etoile-800 group-hover:to-orange-700 transition-all">
                        {formation.pricingEmployer}
                      </p>
                    </div>
                  )}
                  {formation.pricingPersonal && (
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-etoile-200/50 transform transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-lg group">
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Personnel</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-etoile-700 to-orange-600 bg-clip-text text-transparent group-hover:from-etoile-800 group-hover:to-orange-700 transition-all">
                        {formation.pricingPersonal}
                      </p>
                    </div>
                  )}
                  {!formation.pricingEmployer && !formation.pricingPersonal && formation.pricing && (
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-etoile-200/50 transform transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-lg group">
                      <p className="text-2xl font-bold bg-gradient-to-r from-etoile-700 to-orange-600 bg-clip-text text-transparent group-hover:from-etoile-800 group-hover:to-orange-700 transition-all text-center">
                        {formation.pricing}
                      </p>
                    </div>
                  )}
                </div>
                <div className="mt-6 pt-4 border-t border-etoile-300/50">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-etoile-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      <span className="font-semibold">Financements possibles :</span> OPCO, CPF, Pôle Emploi
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <Card className={`transform transition-all duration-500 hover:shadow-xl hover:shadow-eau-200/50 hover:-translate-y-1 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <div className="space-y-6">
                <FormationInscriptionButton
                  formationId={formation.id}
                  formationTitle={formation.title}
                  inscriptionFormUrl={formation.inscriptionFormUrl}
                />
                <ContactButton
                  preSelectedType="formation"
                  preSelectedId={formation.id}
                  preSelectedTitle={formation.title}
                />
              </div>
            </Card>
          </div>
        </div>

        {/* Calendrier des sessions ou Formulaire d'inscription */}
        <div className="mt-12">
          {formation.sessions && formation.sessions.length > 0 ? (
            <FormationCalendar
              sessions={formation.sessions}
              formationId={formation.id}
              formationTitle={formation.title}
            />
          ) : (
            <div className={`${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.7s' }}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Star size="sm" color="etoile" animated={true} />
                Bulletin d'inscription
              </h2>
              <InscriptionForm
                formationId={formation.id}
                formationTitle={formation.title}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
