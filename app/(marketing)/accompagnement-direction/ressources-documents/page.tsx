import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { AccompagnementDetailTemplate } from "@/components/marketing/AccompagnementDetailTemplate";

export const metadata: Metadata = generatePageMetadata(
  "Ressources et structuration de documents",
  "Accompagnement pour organiser et structurer vos ressources documentaires."
);

export default function RessourcesDocumentsPage() {
  return (
    <AccompagnementDetailTemplate
      title="Ressources / structuration de documents"
      subtitle="Accompagnement pour organiser et structurer vos ressources documentaires"
      description="Nous vous accompagnons dans l'organisation et la structuration de vos ressources documentaires pour faciliter leur accès et leur utilisation par l'équipe."
      objectives={[
        "Organiser efficacement les ressources documentaires",
        "Faciliter l'accès aux documents",
        "Structurer les procédures et les outils",
        "Améliorer la traçabilité et la gestion",
      ]}
      contentDetails={[
        {
          section: "Audit de l'existant",
          items: [
            "Inventaire des documents et ressources",
            "Analyse de l'organisation actuelle",
            "Identification des besoins",
          ],
        },
        {
          section: "Structuration des documents",
          items: [
            "Création d'une arborescence logique",
            "Classification et catégorisation",
            "Mise en forme et standardisation",
          ],
        },
        {
          section: "Création d'un système de classement",
          items: [
            "Mise en place d'un système de classement",
            "Création d'outils de recherche",
            "Organisation physique et numérique",
          ],
        },
        {
          section: "Mise en place de procédures",
          items: [
            "Définition des procédures de gestion",
            "Création de guides d'utilisation",
            "Mise en place de la traçabilité",
          ],
        },
        {
          section: "Formation de l'équipe",
          items: [
            "Formation à l'utilisation du système",
            "Sensibilisation aux bonnes pratiques",
            "Accompagnement dans la mise en œuvre",
          ],
        },
      ]}
      approach={[
        "Audit de l'existant",
        "Structuration des documents",
        "Création d'un système de classement",
        "Mise en place de procédures",
        "Formation de l'équipe",
      ]}
      duration="Plusieurs séances selon le besoin"
      targetAudience="Accompagnement destiné aux directrices, directeurs, référents techniques et équipes administratives de structures d'accueil de la petite enfance."
      modalities={[
        "Accompagnement personnalisé",
        "Intervention sur site",
        "Plusieurs séances d'accompagnement",
        "Outils et supports fournis",
      ]}
      pricing="Sur devis"
      backUrl="/accompagnement-direction"
      backLabel="Retour à Accompagnement Direction"
    />
  );
}
