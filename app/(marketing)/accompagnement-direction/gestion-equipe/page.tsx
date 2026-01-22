import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { AccompagnementDetailTemplate } from "@/components/marketing/AccompagnementDetailTemplate";

export const metadata: Metadata = generatePageMetadata(
  "Gestion d'équipe",
  "Accompagnement pour optimiser la gestion et l'animation de votre équipe."
);

export default function GestionEquipePage() {
  return (
    <AccompagnementDetailTemplate
      title="Gestion d'équipe"
      subtitle="Accompagnement pour optimiser la gestion et l'animation de votre équipe"
      description="Nous vous accompagnons dans la gestion et l'animation de votre équipe pour favoriser la cohésion, la motivation et l'efficacité collective."
      objectives={[
        "Développer les compétences managériales",
        "Renforcer la cohésion d'équipe",
        "Améliorer la communication interne",
        "Optimiser l'efficacité collective",
      ]}
      contentDetails={[
        {
          section: "Management et leadership",
          items: [
            "Développement du leadership",
            "Posture managériale adaptée",
            "Gestion des situations complexes",
          ],
        },
        {
          section: "Communication d'équipe",
          items: [
            "Amélioration de la communication interne",
            "Techniques de communication efficace",
            "Gestion des réunions d'équipe",
          ],
        },
        {
          section: "Gestion des conflits",
          items: [
            "Identification et prévention des conflits",
            "Médiation et résolution",
            "Restauration du dialogue",
          ],
        },
        {
          section: "Animation de réunions",
          items: [
            "Préparation et animation de réunions",
            "Techniques d'animation participative",
            "Suivi des décisions et actions",
          ],
        },
        {
          section: "Développement des compétences",
          items: [
            "Identification des besoins de formation",
            "Accompagnement dans le développement",
            "Suivi et évaluation",
          ],
        },
      ]}
      approach={[
        "Management et leadership",
        "Communication d'équipe",
        "Gestion des conflits",
        "Animation de réunions",
        "Développement des compétences",
      ]}
      duration="Plusieurs séances selon le besoin"
      targetAudience="Accompagnement destiné aux directrices, directeurs et responsables d'équipe de structures d'accueil de la petite enfance : crèches, micro-crèches, halte-garderies, jardins d'enfants."
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
