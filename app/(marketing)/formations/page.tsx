import { getFormations, getDefaultFormations } from "@/lib/content";
import type { Formation } from "@/lib/storage";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { Star } from "@/components/ui/Stars";

export const metadata: Metadata = generatePageMetadata(
  "Formations",
  "Découvrez nos formations pour les professionnels de la petite enfance."
);

export default async function FormationsPage() {
  const formations = await getFormations();
  const defaultFormations = getDefaultFormations();
  const displayFormations: Formation[] = formations.length > 0 ? formations : defaultFormations;

  return (
    <div className="py-16 bg-gradient-to-b from-white via-etoile-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star size="md" color="etoile" animated={true} />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Nos formations
            </h1>
            <Star size="md" color="eau" animated={true} />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des formations adaptées aux besoins de votre équipe
          </p>
        </div>

        {/* Formation Projet Pédagogique - Section principale */}
        <div className="mb-12">
          <Card animated={false} className="bg-gradient-to-br from-eau-50 to-etoile-50 border-2 border-eau-200">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Formation Projet Pédagogique
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
                Une formation complète modulaire pour élaborer, formaliser et mettre en œuvre un projet pédagogique adapté à votre structure
              </p>
              <Link href="/formations/projet-pedagogique">
                <Button size="lg" className="transform hover:scale-105 transition-transform">
                  Découvrir la formation complète
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Link href="/formations/projet-pedagogique/ecriture-projet" className="block">
                <Card animated={false} className="hover:shadow-lg transition-all transform hover:-translate-y-1 h-full">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Écriture du projet</h3>
                  <p className="text-sm text-gray-600">Apprenez à formaliser et rédiger votre projet pédagogique</p>
                </Card>
              </Link>
              <Link href="/formations/projet-pedagogique/ateliers-equipe-direction" className="block">
                <Card animated={false} className="hover:shadow-lg transition-all transform hover:-translate-y-1 h-full">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ateliers équipe-direction</h3>
                  <p className="text-sm text-gray-600">Co-construisez un projet pédagogique avec votre équipe</p>
                </Card>
              </Link>
              <Link href="/formations/projet-pedagogique/reajustement-pedagogique" className="block">
                <Card animated={false} className="hover:shadow-lg transition-all transform hover:-translate-y-1 h-full">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Réajustement pédagogique</h3>
                  <p className="text-sm text-gray-600">Adaptez et faites évoluer votre projet pédagogique</p>
                </Card>
              </Link>
            </div>
          </Card>
        </div>

        {/* Formations à venir */}
        <div className="mb-8">
          <Card animated={false} className="border-2 border-etoile-200 bg-etoile-50/50">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Formations à venir
              </h2>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Découvrez notre calendrier de formations programmées
              </p>
              <Link href="/formations/formations-a-venir">
                <Button variant="secondary" size="lg" className="transform hover:scale-105 transition-transform">
                  Voir le calendrier
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Autres formations dynamiques */}
        {displayFormations.length > 0 && (
          <div className="space-y-8 mt-12">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Autres formations</h2>
            {displayFormations.map((formation, index) => (
              <Card key={formation.slug} animated={true} index={index}>
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      {formation.title}
                    </h2>
                    {formation.subtitle && (
                      <p className="text-gray-600 mb-4">{formation.subtitle}</p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Objectifs</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {formation.objectives.map((objective, i) => (
                            <li key={i}>{objective}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Contenu</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {formation.content.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Modalités</h3>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {formation.modalities.map((modality, i) => (
                          <li key={i}>{modality}</li>
                        ))}
                      </ul>
                    </div>
                    {formation.pricing && (
                      <div className="bg-gradient-to-br from-etoile-100 to-orange-200 border-2 border-etoile-300/50 rounded-xl p-4 mb-2 shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-etoile-900 font-semibold text-sm mb-1">Tarif</p>
                        <p className="text-etoile-800 text-sm">{formation.pricing}</p>
                      </div>
                    )}
                    {formation.locations.length > 0 && (
                      <p className="text-sm text-gray-500 mt-2">
                        Lieux : {formation.locations.join(", ")}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href={`/formations/${formation.slug}`}>
                      <Button className="transform hover:scale-105 transition-transform">
                        En savoir plus
                      </Button>
                    </Link>
                    <Link
                      href={`/devis?type=formation&id=${formation.slug}&title=${encodeURIComponent(formation.title)}&pricing=${encodeURIComponent(formation.pricing || "")}&pricingEmployer=${encodeURIComponent(formation.pricingEmployer || "")}&pricingPersonal=${encodeURIComponent(formation.pricingPersonal || "")}`}
                    >
                      <Button variant="secondary" className="transform hover:scale-105 transition-transform">
                        Me contacter / Demander un devis
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
