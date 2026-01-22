import { getServices, getDefaultServices } from "@/lib/content";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { Star } from "@/components/ui/Stars";

export const metadata: Metadata = generatePageMetadata(
  "Prestations",
  "Découvrez nos prestations d'accompagnement pour les structures de petite enfance."
);

export default async function PrestationsPage() {
  const services = await getServices();
  const defaultServices = getDefaultServices();
  const displayServices = services.length > 0 ? services : defaultServices;

  // Prestations fixes selon le document
  const prestationsFixes = [
    {
      slug: "reorganisation-structure",
      title: "Réorganisation de structure",
      description: "Accompagnement personnalisé pour optimiser et réorganiser votre structure d'accueil",
      link: "/prestations/reorganisation-structure"
    },
    {
      slug: "pratiques-professionnelles",
      title: "Pratiques professionnelles",
      description: "Amélioration et harmonisation des pratiques professionnelles de votre équipe",
      link: "/prestations/pratiques-professionnelles"
    },
    {
      slug: "projet-pedagogique",
      title: "Projet pédagogique",
      description: "Accompagnement pour élaborer et mettre en œuvre un projet pédagogique adapté à votre structure",
      link: "/prestations/projet-pedagogique"
    },
    {
      slug: "reunion-pedagogique",
      title: "Réunion pédagogique",
      description: "Animation de réunions pédagogiques pour votre équipe",
      link: "/prestations/reunion-pedagogique"
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-white via-eau-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star size="md" color="etoile" animated={true} />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Nos prestations
            </h1>
            <Star size="md" color="eau" animated={true} />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des solutions adaptées à vos besoins pour améliorer la qualité d'accueil
          </p>
        </div>

        {/* Prestations fixes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 items-stretch">
          {prestationsFixes.map((prestation, index) => (
            <Card key={prestation.slug} animated={true} index={index} className="flex flex-col h-full">
              <div className="flex-1 flex flex-col min-h-0">
                <h2 className="text-xl font-semibold text-gray-900 mb-3 flex-shrink-0">
                  {prestation.title}
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm flex-1 min-h-[3rem]">
                  {prestation.description}
                </p>
              </div>
              <div className="mt-auto pt-4 flex-shrink-0">
                <Link href={prestation.link}>
                  <Button className="w-full transform hover:scale-105 transition-transform">
                    En savoir plus
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Autres prestations dynamiques */}
        {displayServices.length > 0 && (
          <div className="space-y-8 mt-12">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Autres prestations</h2>
            {displayServices.map((service, index) => (
              <Card key={service.slug} animated={true} index={index}>
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{service.problem}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Points clés</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {service.bullets.map((bullet, i) => (
                            <li key={i}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Bénéfices</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {service.benefits.map((benefit, i) => (
                            <li key={i}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Modalités</h3>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {service.modalities.map((modality, i) => (
                          <li key={i}>{modality}</li>
                        ))}
                      </ul>
                    </div>
                    {service.pricingNote && (
                      <p className="text-sm text-gray-500 italic">{service.pricingNote}</p>
                    )}
                  </div>
                  <Link href={`/prestations/${service.slug}`}>
                    <Button className="transform hover:scale-105 transition-transform">
                      En savoir plus
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
