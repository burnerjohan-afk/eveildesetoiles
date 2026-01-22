import { getMarketingContent } from "@/lib/content";
import { Card } from "@/components/ui/Card";
import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata(
  "Accompagnement",
  "Découvrez notre méthode d'accompagnement personnalisé pour les structures de petite enfance."
);

export default async function AccompagnementPage() {
  const methodTitle = await getMarketingContent("methodTitle");
  const methodSubtitle = await getMarketingContent("methodSubtitle");
  const methodSteps = await getMarketingContent("methodSteps");

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Notre accompagnement
          </h1>
          <p className="text-xl text-gray-600">
            Une méthode structurée et personnalisée pour répondre à vos besoins
          </p>
        </div>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{methodTitle}</h2>
          <p className="text-gray-600 mb-8">{methodSubtitle}</p>

          <div className="space-y-6">
            {methodSteps.map((step, index) => (
              <div key={index} className="border-l-4 border-eau-600 pl-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-eau-600 text-white font-bold">
                    {step.step}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-700 ml-13">{step.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
