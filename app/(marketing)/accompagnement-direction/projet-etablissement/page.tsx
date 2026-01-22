import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { Star } from "@/components/ui/Stars";

export const metadata: Metadata = generatePageMetadata(
  "Projet d'établissement",
  "Accompagnement complet pour l'élaboration et la mise en œuvre de votre projet d'établissement."
);

export default function ProjetEtablissementPage() {
  const sousSections = [
    {
      slug: "ecriture-projet",
      title: "Écriture du projet",
      description: "Formalisation et rédaction de votre projet d'établissement de manière structurée et professionnelle.",
      link: "/accompagnement-direction/projet-etablissement/ecriture-projet"
    },
    {
      slug: "ateliers-equipe-direction",
      title: "Ateliers équipe-direction",
      description: "Travaillez en collaboration avec votre équipe pour co-construire un projet d'établissement partagé.",
      link: "/accompagnement-direction/projet-etablissement/ateliers-equipe-direction"
    },
    {
      slug: "reajustement-pedagogique",
      title: "Réajustement pédagogique",
      description: "Adaptez et faites évoluer votre projet d'établissement en fonction des retours et des besoins.",
      link: "/accompagnement-direction/projet-etablissement/reajustement-pedagogique"
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-white via-eau-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star size="md" color="etoile" animated={true} />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Projet d'établissement
            </h1>
            <Star size="md" color="eau" animated={true} />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
            Un accompagnement complet pour élaborer, formaliser et mettre en œuvre un projet d'établissement adapté à votre structure
          </p>
        </div>

        <div className="mb-8">
          <Link href="/accompagnement-direction" className="text-eau-600 hover:text-eau-800 inline-flex items-center gap-2 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour à Accompagnement Direction
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {sousSections.map((section, index) => (
            <Card key={section.slug} animated={true} index={index}>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {section.title}
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {section.description}
              </p>
              <Link href={section.link}>
                <Button className="w-full transform hover:scale-105 transition-transform">
                  Découvrir
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        <Card animated={false} className="bg-gradient-to-br from-eau-50 to-etoile-50 border-2 border-eau-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Accompagnement complet
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Cet accompagnement peut être suivi dans son intégralité ou par modules selon vos besoins et vos contraintes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/devis?type=accompagnement&title=${encodeURIComponent("Projet d'établissement")}`}>
                <Button size="lg">
                  Me contacter / Demander un devis
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
