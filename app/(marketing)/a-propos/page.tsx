import { getAboutContent } from "@/lib/content";
import { Card } from "@/components/ui/Card";
import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata(
  "À propos",
  "Découvrez l'histoire et les valeurs d'Éveil des Étoiles."
);

export default async function AboutPage() {
  const about = await getAboutContent();

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            À propos
          </h1>
        </div>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Notre histoire
          </h2>
          <p className="text-gray-700 mb-8 whitespace-pre-line">{about.story}</p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Nos valeurs</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {about.values.map((value, i) => (
              <li key={i}>{value}</li>
            ))}
          </ul>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600">
              <strong>{about.author}</strong>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
