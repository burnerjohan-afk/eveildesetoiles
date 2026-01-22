import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { Star } from "@/components/ui/Stars";

export const metadata: Metadata = generatePageMetadata(
  "Formations à venir",
  "Découvrez nos prochaines formations programmées et inscrivez-vous."
);

export default function FormationsAVenirPage() {
  return (
    <div className="py-16 bg-gradient-to-b from-white via-etoile-50/20 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star size="md" color="etoile" animated={true} />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Formations à venir
            </h1>
            <Star size="md" color="eau" animated={true} />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez nos prochaines formations programmées
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

        <Card>
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-etoile-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-etoile-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Calendrier en cours d'élaboration
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Nous sommes en train de préparer notre calendrier de formations pour les prochains mois. 
              Les dates et les contenus seront bientôt disponibles. Restez informé(e) en nous contactant !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/devis?type=formation&title=${encodeURIComponent("Formations à venir")}`}>
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
