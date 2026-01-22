import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata(
  "Politique de confidentialité",
  "Politique de confidentialité du site Éveil des Étoiles."
);

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Politique de confidentialité
        </h1>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700">
            La présente politique de confidentialité décrit la manière dont Éveil des Étoiles
            collecte, utilise et protège les informations que vous nous fournissez lorsque vous
            utilisez notre site web.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Collecte des données
          </h2>
          <p className="text-gray-700">
            Nous collectons les informations que vous nous fournissez directement, notamment
            lorsque vous remplissez le formulaire de contact. Ces informations incluent votre
            nom, prénom, email, téléphone et message.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Utilisation des données
          </h2>
          <p className="text-gray-700">
            Les données collectées sont utilisées uniquement pour répondre à vos demandes et
            vous contacter concernant nos services. Nous ne partageons pas vos données avec
            des tiers.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Vos droits
          </h2>
          <p className="text-gray-700">
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de
            suppression et d'opposition concernant vos données personnelles. Pour exercer
            ces droits, contactez-nous à l'adresse email indiquée sur le site.
          </p>
        </div>
      </div>
    </div>
  );
}
