import { ContactForm } from "@/components/forms/ContactForm";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { config } from "@/lib/config";
import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata(
  "Contact",
  "Contactez-nous pour discuter de vos besoins en accompagnement et formation."
);

export default async function ContactPage() {

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contactez-nous
          </h1>
          <p className="text-xl text-gray-600">
            Nous sommes là pour répondre à vos questions et discuter de vos besoins
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Informations de contact</h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900">Email</p>
                <a
                  href={`mailto:${config.contactEmail}`}
                  className="text-eau-600 hover:text-eau-800"
                >
                  {config.contactEmail}
                </a>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Téléphone</p>
                <p className="text-gray-700">{config.contactPhonePlaceholder}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <a href={config.calendlyUrl} target="_blank" rel="noopener noreferrer">
                <Button className="w-full">Réserver</Button>
              </a>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Envoyer un message</h2>
            <ContactForm />
          </Card>
        </div>
      </div>
    </div>
  );
}
