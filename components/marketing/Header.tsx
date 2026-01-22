"use client";

import Link from "next/link";
import { useState } from "react";
import { IconStar, IconFormation, IconBook, IconTeam, IconLightbulb, IconBriefcase } from "@/components/ui/Icons";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Star } from "@/components/ui/Stars";

export function Header() {
  const [formationsOpen, setFormationsOpen] = useState(false);
  const [prestationsOpen, setPrestationsOpen] = useState(false);
  const [accompagnementDirectionOpen, setAccompagnementDirectionOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md border-b border-eau-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95 relative overflow-hidden">
      {/* Étoiles décoratives dans l'en-tête */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-2 left-20">
          <Star size="sm" color="etoile" animated={false} />
        </div>
        <div className="absolute top-3 right-32">
          <Star size="sm" color="eau" animated={false} />
        </div>
        <div className="absolute bottom-2 left-1/3">
          <Star size="sm" color="etoile" animated={false} />
        </div>
      </div>
      
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-bold text-eau-600 group-hover:text-eau-700 transition-colors flex items-center gap-2">
              <IconStar className="w-6 h-6 text-etoile-500" />
              <span>Éveil des Étoiles</span>
            </span>
          </Link>
          
          {/* Menu desktop */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            <Link
              href="/"
              className="text-gray-600 hover:text-eau-600 inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-eau-50"
            >
              Accueil
            </Link>
            
            {/* Prestations avec sous-menu */}
            <div 
              className="relative"
              onMouseEnter={() => setPrestationsOpen(true)}
              onMouseLeave={() => setPrestationsOpen(false)}
            >
              <Link 
                href="/prestations"
                className="text-gray-600 hover:text-eau-600 inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-eau-50"
                onClick={() => setPrestationsOpen(false)}
              >
                Prestations
                <svg className={`ml-1 h-4 w-4 transition-transform ${prestationsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              {prestationsOpen && (
                <div 
                  className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-eau-100 py-2 animate-fade-in z-50"
                  onMouseEnter={() => setPrestationsOpen(true)}
                  onMouseLeave={() => setPrestationsOpen(false)}
                >
                  <Link 
                    href="/prestations" 
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-eau-50 hover:text-eau-600 transition-colors"
                    onClick={() => setPrestationsOpen(false)}
                  >
                    <IconBook className="w-4 h-4" />
                    <span>Toutes les prestations</span>
                  </Link>
                  <Link 
                    href="/prestations/reorganisation-structure" 
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-eau-50 hover:text-eau-600 transition-colors"
                    onClick={() => setPrestationsOpen(false)}
                  >
                    <IconTeam className="w-4 h-4" />
                    <span>Réorganisation de structure</span>
                  </Link>
                  <Link 
                    href="/prestations/pratiques-professionnelles" 
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-eau-50 hover:text-eau-600 transition-colors"
                    onClick={() => setPrestationsOpen(false)}
                  >
                    <IconLightbulb className="w-4 h-4" />
                    <span>Pratiques professionnelles</span>
                  </Link>
                  <Link 
                    href="/prestations/projet-pedagogique" 
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-eau-50 hover:text-eau-600 transition-colors"
                    onClick={() => setPrestationsOpen(false)}
                  >
                    <IconBook className="w-4 h-4" />
                    <span>Projet pédagogique</span>
                  </Link>
                  <Link 
                    href="/prestations/reunion-pedagogique" 
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-eau-50 hover:text-eau-600 transition-colors"
                    onClick={() => setPrestationsOpen(false)}
                  >
                    <IconFormation className="w-4 h-4" />
                    <span>Réunion pédagogique</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Accompagnement Direction avec sous-menu */}
            <div 
              className="relative"
              onMouseEnter={() => setAccompagnementDirectionOpen(true)}
              onMouseLeave={() => setAccompagnementDirectionOpen(false)}
            >
              <Link 
                href="/accompagnement-direction"
                className="text-gray-600 hover:text-eau-600 inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-eau-50"
                onClick={() => setAccompagnementDirectionOpen(false)}
              >
                Accompagnement Direction
                <svg className={`ml-1 h-4 w-4 transition-transform ${accompagnementDirectionOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              {accompagnementDirectionOpen && (
                <div 
                  className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-eau-100 py-2 animate-fade-in z-50"
                  onMouseEnter={() => setAccompagnementDirectionOpen(true)}
                  onMouseLeave={() => setAccompagnementDirectionOpen(false)}
                >
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase border-b border-gray-100">
                    Directrice / Référent technique
                  </div>
                  <Link 
                    href="/accompagnement-direction/suivi-technique" 
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-eau-50 hover:text-eau-600 transition-colors"
                    onClick={() => setAccompagnementDirectionOpen(false)}
                  >
                    <IconBriefcase className="w-4 h-4" />
                    <span>Suivi technique</span>
                  </Link>
                  <Link 
                    href="/accompagnement-direction/projet-etablissement" 
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-eau-50 hover:text-eau-600 transition-colors"
                    onClick={() => setAccompagnementDirectionOpen(false)}
                  >
                    <IconBook className="w-4 h-4" />
                    <span>Projet d'établissement</span>
                  </Link>
                  <Link 
                    href="/accompagnement-direction/accompagnement-complet" 
                    className="flex items-center gap-2 px-4 py-2 pl-8 text-gray-700 hover:bg-eau-50 hover:text-eau-600 transition-colors text-sm font-semibold"
                    onClick={() => setAccompagnementDirectionOpen(false)}
                  >
                    <span>• Accompagnement complet</span>
                  </Link>
                  <Link 
                    href="/accompagnement-direction/projet-etablissement/ecriture-projet" 
                    className="flex items-center gap-2 px-4 py-2 pl-8 text-gray-700 hover:bg-eau-50 hover:text-eau-600 transition-colors text-sm"
                    onClick={() => setAccompagnementDirectionOpen(false)}
                  >
                    <span>• Écriture du projet</span>
                  </Link>
                  <Link 
                    href="/accompagnement-direction/projet-etablissement/ateliers-equipe-direction" 
                    className="flex items-center gap-2 px-4 py-2 pl-8 text-gray-700 hover:bg-eau-50 hover:text-eau-600 transition-colors text-sm"
                    onClick={() => setAccompagnementDirectionOpen(false)}
                  >
                    <span>• Ateliers équipe-direction</span>
                  </Link>
                  <Link 
                    href="/accompagnement-direction/projet-etablissement/reajustement-pedagogique" 
                    className="flex items-center gap-2 px-4 py-2 pl-8 text-gray-700 hover:bg-eau-50 hover:text-eau-600 transition-colors text-sm"
                    onClick={() => setAccompagnementDirectionOpen(false)}
                  >
                    <span>• Réajustement pédagogique</span>
                  </Link>
                  <Link 
                    href="/accompagnement-direction/gestion-equipe" 
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-eau-50 hover:text-eau-600 transition-colors"
                    onClick={() => setAccompagnementDirectionOpen(false)}
                  >
                    <IconTeam className="w-4 h-4" />
                    <span>Gestion d'équipe</span>
                  </Link>
                  <div className="px-4 py-2 text-xs text-gray-500 text-sm">
                    <span>Tarif : sur devis</span>
                  </div>
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase border-t border-gray-100 mt-2 pt-2">
                    Relais de direction
                  </div>
                  <Link 
                    href="/accompagnement-direction/relais-direction" 
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-eau-50 hover:text-eau-600 transition-colors"
                    onClick={() => setAccompagnementDirectionOpen(false)}
                  >
                    <IconTeam className="w-4 h-4" />
                    <span>Rôle / missions</span>
                  </Link>
                  <Link 
                    href="/accompagnement-direction/ressources-documents" 
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-eau-50 hover:text-eau-600 transition-colors"
                    onClick={() => setAccompagnementDirectionOpen(false)}
                  >
                    <IconBook className="w-4 h-4" />
                    <span>Ressources / structuration de documents</span>
                  </Link>
                  <div className="px-4 py-2 text-xs text-gray-500 text-sm">
                    <span>Tarif : sur devis</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Formations avec sous-menu */}
            <div 
              className="relative"
              onMouseEnter={() => setFormationsOpen(true)}
              onMouseLeave={() => setFormationsOpen(false)}
            >
              <Link 
                href="/formations"
                className="text-gray-600 hover:text-eau-600 inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-eau-50"
                onClick={() => setFormationsOpen(false)}
              >
                Formations
                <svg className={`ml-1 h-4 w-4 transition-transform ${formationsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              {formationsOpen && (
                <div 
                  className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-eau-100 py-2 animate-fade-in z-50"
                  onMouseEnter={() => setFormationsOpen(true)}
                  onMouseLeave={() => setFormationsOpen(false)}
                >
                  <Link 
                    href="/formations" 
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-eau-50 hover:text-eau-600 transition-colors"
                    onClick={() => setFormationsOpen(false)}
                  >
                    <IconFormation className="w-4 h-4" />
                    <span>Toutes les formations</span>
                  </Link>
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase border-t border-gray-100 mt-2 pt-2">
                    Formation Projet Pédagogique
                  </div>
                  <Link 
                    href="/formations/projet-pedagogique" 
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-eau-50 hover:text-eau-600 transition-colors"
                    onClick={() => setFormationsOpen(false)}
                  >
                    <IconBook className="w-4 h-4" />
                    <span>Projet d'établissement</span>
                  </Link>
                  <Link 
                    href="/formations/projet-pedagogique/ecriture-projet" 
                    className="flex items-center gap-2 px-4 py-2 pl-8 text-gray-700 hover:bg-eau-50 hover:text-eau-600 transition-colors text-sm"
                    onClick={() => setFormationsOpen(false)}
                  >
                    <span>• Écriture du projet</span>
                  </Link>
                  <Link 
                    href="/formations/projet-pedagogique/ateliers-equipe-direction" 
                    className="flex items-center gap-2 px-4 py-2 pl-8 text-gray-700 hover:bg-eau-50 hover:text-eau-600 transition-colors text-sm"
                    onClick={() => setFormationsOpen(false)}
                  >
                    <span>• Ateliers équipe-direction</span>
                  </Link>
                  <Link 
                    href="/formations/projet-pedagogique/reajustement-pedagogique" 
                    className="flex items-center gap-2 px-4 py-2 pl-8 text-gray-700 hover:bg-eau-50 hover:text-eau-600 transition-colors text-sm"
                    onClick={() => setFormationsOpen(false)}
                  >
                    <span>• Réajustement pédagogique</span>
                  </Link>
                  <Link 
                    href="/formations/formations-a-venir" 
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-eau-50 hover:text-eau-600 transition-colors border-t border-gray-100 mt-2 pt-2"
                    onClick={() => setFormationsOpen(false)}
                  >
                    <IconFormation className="w-4 h-4" />
                    <span>Formations à venir</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/a-propos"
              className="text-gray-600 hover:text-eau-600 inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-eau-50"
            >
              À propos
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-eau-600 inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-eau-50"
            >
              Contact
            </Link>
            
            <Link
              href="/login"
              className="bg-eau-600 hover:bg-eau-700 text-white inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md"
            >
              Espace client
            </Link>

            {/* Réseaux sociaux */}
            <div className="ml-4 pl-4 border-l border-gray-200">
              <SocialLinks variant="compact" iconSize="w-5 h-5" />
            </div>
          </div>

          {/* Menu mobile - bouton hamburger */}
          <div className="lg:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-eau-600 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Menu mobile déroulant */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg border-t border-gray-200 pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              href="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </Link>
            
            {/* Prestations mobile */}
            <div className="relative">
              <button 
                onClick={() => setPrestationsOpen(!prestationsOpen)} 
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 flex justify-between items-center"
              >
                Prestations
                <svg className={`ml-1 h-4 w-4 transform ${prestationsOpen ? 'rotate-180' : 'rotate-0'} transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {prestationsOpen && (
                <div className="pl-6 pr-3 py-1 space-y-1">
                  <Link 
                    href="/prestations" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Toutes les prestations
                  </Link>
                  <Link 
                    href="/prestations/reorganisation-structure" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Réorganisation de structure
                  </Link>
                  <Link 
                    href="/prestations/pratiques-professionnelles" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pratiques professionnelles
                  </Link>
                  <Link 
                    href="/prestations/projet-pedagogique" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Projet pédagogique
                  </Link>
                  <Link 
                    href="/prestations/reunion-pedagogique" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Réunion pédagogique
                  </Link>
                </div>
              )}
            </div>

            {/* Accompagnement Direction mobile */}
            <div className="relative">
              <button 
                onClick={() => setAccompagnementDirectionOpen(!accompagnementDirectionOpen)} 
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 flex justify-between items-center"
              >
                Accompagnement Direction
                <svg className={`ml-1 h-4 w-4 transform ${accompagnementDirectionOpen ? 'rotate-180' : 'rotate-0'} transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {accompagnementDirectionOpen && (
                <div className="pl-6 pr-3 py-1 space-y-1">
                  <Link 
                    href="/accompagnement-direction" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Vue d'ensemble
                  </Link>
                  <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">Directrice / Référent technique</div>
                  <Link 
                    href="/accompagnement-direction/suivi-technique" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Suivi technique
                  </Link>
                  <Link 
                    href="/accompagnement-direction/projet-etablissement" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Projet d'établissement
                  </Link>
                  <Link 
                    href="/accompagnement-direction/projet-etablissement/ecriture-projet" 
                    className="block px-3 py-2 pl-6 rounded-md text-sm text-gray-600 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Écriture du projet
                  </Link>
                  <Link 
                    href="/accompagnement-direction/projet-etablissement/ateliers-equipe-direction" 
                    className="block px-3 py-2 pl-6 rounded-md text-sm text-gray-600 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Ateliers équipe-direction
                  </Link>
                  <Link 
                    href="/accompagnement-direction/projet-etablissement/reajustement-pedagogique" 
                    className="block px-3 py-2 pl-6 rounded-md text-sm text-gray-600 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Réajustement pédagogique
                  </Link>
                  <Link 
                    href="/accompagnement-direction/gestion-equipe" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Gestion d'équipe
                  </Link>
                  <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase mt-2">Relais de direction</div>
                  <Link 
                    href="/accompagnement-direction/relais-direction" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Rôle / missions
                  </Link>
                  <Link 
                    href="/accompagnement-direction/ressources-documents" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Ressources / documents
                  </Link>
                </div>
              )}
            </div>
            
            {/* Formations mobile */}
            <div className="relative">
              <button 
                onClick={() => setFormationsOpen(!formationsOpen)} 
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 flex justify-between items-center"
              >
                Formations
                <svg className={`ml-1 h-4 w-4 transform ${formationsOpen ? 'rotate-180' : 'rotate-0'} transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {formationsOpen && (
                <div className="pl-6 pr-3 py-1 space-y-1">
                  <Link 
                    href="/formations" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Toutes les formations
                  </Link>
                  <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">Formation Projet Pédagogique</div>
                  <Link 
                    href="/formations/projet-pedagogique" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Projet d'établissement
                  </Link>
                  <Link 
                    href="/formations/projet-pedagogique/ecriture-projet" 
                    className="block px-3 py-2 pl-6 rounded-md text-sm text-gray-600 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Écriture du projet
                  </Link>
                  <Link 
                    href="/formations/projet-pedagogique/ateliers-equipe-direction" 
                    className="block px-3 py-2 pl-6 rounded-md text-sm text-gray-600 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Ateliers équipe-direction
                  </Link>
                  <Link 
                    href="/formations/projet-pedagogique/reajustement-pedagogique" 
                    className="block px-3 py-2 pl-6 rounded-md text-sm text-gray-600 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Réajustement pédagogique
                  </Link>
                  <Link 
                    href="/formations/formations-a-venir" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Formations à venir
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="/a-propos" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              À propos
            </Link>
            <Link 
              href="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/login" 
              className="block px-3 py-2 rounded-md text-base font-medium bg-eau-600 text-white hover:bg-eau-700 mx-3 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Espace client
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
