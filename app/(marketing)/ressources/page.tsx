import { Card } from "@/components/ui/Card";
import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata(
  "Ressources",
  "Ressources et outils pour les professionnels de la petite enfance."
);

export default function RessourcesPage() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ressources
          </h1>
        </div>

        <Card>
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">
              Cette section sera bientôt disponible
            </p>
            <p className="text-gray-500">
              Nous travaillons actuellement sur la mise en place de ressources
              et d'outils pour les professionnels de la petite enfance.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
