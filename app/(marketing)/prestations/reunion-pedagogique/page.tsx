import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { AccompagnementDetailTemplate } from "@/components/marketing/AccompagnementDetailTemplate";

export const metadata: Metadata = generatePageMetadata(
  "Réunion pédagogique",
  "Animation de réunions pédagogiques pour votre équipe."
);

export default function ReunionPedagogiquePage() {
  return (
    <AccompagnementDetailTemplate
      title="Réunion pédagogique"
      subtitle="Animation de réunions pédagogiques pour votre équipe"
      description="Nous animons vos réunions pédagogiques pour favoriser les échanges, la réflexion collective et l'amélioration continue des pratiques."
      objectives={[
        "Animer des réunions pédagogiques efficaces",
        "Favoriser les échanges et la réflexion collective",
        "Développer la cohésion d'équipe",
        "Améliorer les pratiques professionnelles",
      ]}
      contentDetails={[
        {
          section: "Préparation de la réunion",
          items: [
            "Définition de l'ordre du jour avec la direction",
            "Préparation des supports et outils d'animation",
            "Organisation logistique de la réunion",
          ],
        },
        {
          section: "Animation de la réunion",
          items: [
            "Techniques participatives et d'animation",
            "Facilitation des échanges et de la réflexion",
            "Gestion du temps et de la dynamique de groupe",
          ],
        },
        {
          section: "Facilitation des échanges",
          items: [
            "Création d'un espace d'expression sécurisé",
            "Encouragement de la participation de tous",
            "Gestion des conflits et des désaccords",
          ],
        },
        {
          section: "Synthèse et plan d'action",
          items: [
            "Synthèse des échanges et des décisions",
            "Définition d'un plan d'action concret",
            "Répartition des responsabilités",
          ],
        },
        {
          section: "Compte-rendu de la réunion",
          items: [
            "Rédaction du compte-rendu",
            "Diffusion à l'équipe",
            "Suivi des actions décidées",
          ],
        },
      ]}
      approach={[
        "Préparation de l'ordre du jour avec la direction",
        "Animation de la réunion avec techniques participatives",
        "Facilitation des échanges et de la réflexion",
        "Synthèse et plan d'action",
        "Compte-rendu de la réunion",
      ]}
      duration="2 à 3 heures"
      targetAudience="Prestation destinée aux structures d'accueil de la petite enfance : crèches, micro-crèches, halte-garderies, jardins d'enfants, ainsi qu'aux équipes professionnelles et aux directions."
      modalities={[
        "Réunion sur site",
        "Durée : 2 à 3 heures",
        "Animation professionnelle",
        "Support et outils d'animation",
      ]}
      pricing="Sur devis"
      backUrl="/prestations"
      backLabel="Retour aux prestations"
    />
  );
}
