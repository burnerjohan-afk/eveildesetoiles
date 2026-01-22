import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { config } from "@/lib/config";
import { Star } from "@/components/ui/Stars";

export const metadata: Metadata = generatePageMetadata(
  "Formation Projet Pédagogique",
  "Formation complète pour élaborer et mettre en œuvre un projet pédagogique dans votre structure d'accueil."
);

export default function FormationProjetPedagogiquePage() {
  const sousFormations = [
    {
      slug: "ecriture-projet",
      title: "Écriture du projet",
      description: "Apprenez à formaliser et rédiger votre projet pédagogique de manière structurée et professionnelle.",
      link: "/formations/projet-pedagogique/ecriture-projet"
    },
    {
      slug: "ateliers-equipe-direction",
      title: "Ateliers équipe-direction",
      description: "Travaillez en collaboration avec votre équipe pour co-construire un projet pédagogique partagé.",
      link: "/formations/projet-pedagogique/ateliers-equipe-direction"
    },
    {
      slug: "reajustement-pedagogique",
      title: "Réajustement pédagogique",
      description: "Adaptez et faites évoluer votre projet pédagogique en fonction des retours et des besoins.",
      link: "/formations/projet-pedagogique/reajustement-pedagogique"
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-white via-etoile-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star size="md" color="etoile" animated={true} />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Formation Projet Pédagogique
            </h1>
            <Star size="md" color="eau" animated={true} />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
            Une formation complète pour élaborer, formaliser et mettre en œuvre un projet pédagogique adapté à votre structure
          </p>
        </div>

        <div className="mb-8">
          <Link href="/formations" className="text-eau-600 hover:text-eau-800 inline-flex items-center gap-2 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux formations
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {sousFormations.map((formation, index) => (
            <Card key={formation.slug} animated={true} index={index}>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {formation.title}
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {formation.description}
              </p>
              <Link href={formation.link}>
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
              Formation complète
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Cette formation peut être suivie dans son intégralité ou par modules selon vos besoins et vos contraintes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/devis?type=formation&title=${encodeURIComponent("Formation Projet Pédagogique")}`}>
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
