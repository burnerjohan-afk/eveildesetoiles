import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { Star } from "@/components/ui/Stars";

export const metadata: Metadata = generatePageMetadata(
  "Accompagnement Direction",
  "Accompagnement personnalisé pour les directrices et référents techniques de structures d'accueil."
);

export default function AccompagnementDirectionPage() {
  return (
    <div className="py-16 bg-gradient-to-b from-white via-eau-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star size="md" color="etoile" animated={true} />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Accompagnement Direction
            </h1>
            <Star size="md" color="eau" animated={true} />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Accompagnement personnalisé pour les directrices et référents techniques
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Directrice / Référent technique */}
          <Card>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Directrice / Référent technique</h2>
            <p className="text-gray-600 mb-6">
              Accompagnement spécifique pour les directrices et référents techniques de structures d'accueil.
            </p>
            <div className="space-y-4 mb-6">
              <Link href="/accompagnement-direction/directrice-referent-complet" className="block p-4 bg-gradient-to-br from-eau-100 to-etoile-100 rounded-lg hover:from-eau-200 hover:to-etoile-200 transition-colors border-2 border-eau-300">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Star size="sm" color="etoile" animated={false} />
                  Accompagnement complet
                </h3>
                <p className="text-sm text-gray-600">Accompagnement sur tous les aspects de la direction</p>
              </Link>
              <Link href="/accompagnement-direction/suivi-technique" className="block p-4 bg-eau-50 rounded-lg hover:bg-eau-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">Suivi technique</h3>
                <p className="text-sm text-gray-600">Accompagnement dans le suivi technique de votre structure</p>
              </Link>
              <Link href="/accompagnement-direction/projet-etablissement" className="block p-4 bg-eau-50 rounded-lg hover:bg-eau-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">Projet d'établissement</h3>
                <p className="text-sm text-gray-600">Élaboration et mise en œuvre du projet d'établissement</p>
              </Link>
              <Link href="/accompagnement-direction/gestion-equipe" className="block p-4 bg-eau-50 rounded-lg hover:bg-eau-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">Gestion d'équipe</h3>
                <p className="text-sm text-gray-600">Optimisation de la gestion et de l'animation d'équipe</p>
              </Link>
            </div>
            <div className="bg-etoile-50 border border-etoile-200 rounded-lg p-3">
              <p className="text-sm text-gray-700"><strong>Tarif :</strong> Sur devis</p>
            </div>
          </Card>

          {/* Relais de direction */}
          <Card>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Relais de direction</h2>
            <p className="text-gray-600 mb-6">
              Support et accompagnement pour les relais de direction dans leurs missions.
            </p>
            <div className="space-y-4 mb-6">
              <Link href="/accompagnement-direction/relais-direction-complet" className="block p-4 bg-gradient-to-br from-etoile-100 to-eau-100 rounded-lg hover:from-etoile-200 hover:to-eau-200 transition-colors border-2 border-etoile-300">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Star size="sm" color="etoile" animated={false} />
                  Accompagnement complet
                </h3>
                <p className="text-sm text-gray-600">Accompagnement sur toutes les missions du relais de direction</p>
              </Link>
              <Link href="/accompagnement-direction/relais-direction" className="block p-4 bg-etoile-50 rounded-lg hover:bg-etoile-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">Rôle / missions</h3>
                <p className="text-sm text-gray-600">Définition et clarification du rôle et des missions</p>
              </Link>
              <Link href="/accompagnement-direction/ressources-documents" className="block p-4 bg-etoile-50 rounded-lg hover:bg-etoile-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">Ressources / structuration de documents</h3>
                <p className="text-sm text-gray-600">Organisation et structuration des ressources documentaires</p>
              </Link>
            </div>
            <div className="bg-etoile-50 border border-etoile-200 rounded-lg p-3">
              <p className="text-sm text-gray-700"><strong>Tarif :</strong> Sur devis</p>
            </div>
          </Card>

          {/* Projet d'établissement */}
          <Card>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Projet d'établissement</h2>
            <p className="text-gray-600 mb-6">
              Accompagnement complet pour l'élaboration et la mise en œuvre de votre projet d'établissement.
            </p>
            <div className="space-y-4 mb-6">
              <Link href="/accompagnement-direction/accompagnement-complet" className="block p-4 bg-gradient-to-br from-eau-100 to-etoile-100 rounded-lg hover:from-eau-200 hover:to-etoile-200 transition-colors border-2 border-eau-300">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Star size="sm" color="etoile" animated={false} />
                  Accompagnement complet
                </h3>
                <p className="text-sm text-gray-600">Accompagnement sur toutes les phases du projet d'établissement</p>
              </Link>
              <Link href="/accompagnement-direction/projet-etablissement/ecriture-projet" className="block p-4 bg-gradient-to-br from-eau-50 to-etoile-50 rounded-lg hover:from-eau-100 hover:to-etoile-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">Écriture du projet</h3>
                <p className="text-sm text-gray-600">Formalisation et rédaction de votre projet d'établissement</p>
              </Link>
              <Link href="/accompagnement-direction/projet-etablissement/ateliers-equipe-direction" className="block p-4 bg-gradient-to-br from-eau-50 to-etoile-50 rounded-lg hover:from-eau-100 hover:to-etoile-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">Ateliers équipe-direction</h3>
                <p className="text-sm text-gray-600">Co-construction du projet avec votre équipe</p>
              </Link>
              <Link href="/accompagnement-direction/projet-etablissement/reajustement-pedagogique" className="block p-4 bg-gradient-to-br from-eau-50 to-etoile-50 rounded-lg hover:from-eau-100 hover:to-etoile-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">Réajustement pédagogique</h3>
                <p className="text-sm text-gray-600">Adaptation et évolution de votre projet pédagogique</p>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
