import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata(
  "Mentions légales",
  "Mentions légales du site Éveil des Étoiles."
);

export default function MentionsLegalesPage() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Mentions légales</h1>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700">
            Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la
            confiance en l'économie numérique, il est précisé aux utilisateurs du site Éveil
            des Étoiles l'identité des différents intervenants dans le cadre de sa réalisation
            et de son suivi.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Édition du site
          </h2>
          <p className="text-gray-700">
            Le site Éveil des Étoiles est édité par Laetitia CHIN, consultante et formatrice
            en petite enfance.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Hébergement
          </h2>
          <p className="text-gray-700">
            Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
          </p>
        </div>
      </div>
    </div>
  );
}
