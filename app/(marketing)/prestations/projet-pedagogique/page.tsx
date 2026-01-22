import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { AccompagnementDetailTemplate } from "@/components/marketing/AccompagnementDetailTemplate";

export const metadata: Metadata = generatePageMetadata(
  "Projet pédagogique",
  "Accompagnement pour élaborer et mettre en œuvre un projet pédagogique adapté à votre structure."
);

export default function ProjetPedagogiquePage() {
  return (
    <AccompagnementDetailTemplate
      title="Projet pédagogique"
      subtitle="Accompagnement pour élaborer et mettre en œuvre un projet pédagogique adapté à votre structure"
      description="Nous vous accompagnons dans l'élaboration complète de votre projet pédagogique, depuis la réflexion initiale jusqu'à sa mise en œuvre et son évaluation."
      objectives={[
        "Élaborer un projet pédagogique cohérent et adapté",
        "Impliquer l'équipe dans la construction du projet",
        "Formaliser les valeurs et les pratiques de la structure",
        "Mettre en œuvre et évaluer le projet",
      ]}
      contentDetails={[
        {
          section: "Analyse de votre contexte et de vos valeurs",
          items: [
            "Identification des valeurs de la structure",
            "Analyse du contexte et des spécificités",
            "Définition de l'identité pédagogique",
          ],
        },
        {
          section: "Co-construction avec l'équipe",
          items: [
            "Ateliers participatifs avec l'équipe",
            "Définition collective des objectifs pédagogiques",
            "Élaboration des pratiques et des méthodes",
          ],
        },
        {
          section: "Rédaction et formalisation",
          items: [
            "Structuration du document",
            "Rédaction des différents chapitres",
            "Mise en forme et présentation",
          ],
        },
        {
          section: "Mise en œuvre et accompagnement",
          items: [
            "Planification de la mise en œuvre",
            "Accompagnement dans l'application",
            "Suivi et ajustements",
          ],
        },
        {
          section: "Évaluation et réajustement",
          items: [
            "Évaluation de l'efficacité du projet",
            "Identification des axes d'amélioration",
            "Réajustement et évolution continue",
          ],
        },
      ]}
      approach={[
        "Analyse de votre contexte et de vos valeurs",
        "Co-construction avec l'équipe",
        "Rédaction et formalisation du projet",
        "Mise en œuvre et accompagnement",
        "Évaluation et réajustement",
      ]}
      duration="Accompagnement sur plusieurs séances"
      targetAudience="Prestation destinée aux structures d'accueil de la petite enfance : crèches, micro-crèches, halte-garderies, jardins d'enfants, ainsi qu'aux directrices, directeurs et équipes pédagogiques."
      modalities={[
        "Accompagnement sur plusieurs séances",
        "Travail en groupe et individuel",
        "Supports et outils fournis",
        "Suivi post-mise en œuvre",
      ]}
      pricing="Sur devis"
      backUrl="/prestations"
      backLabel="Retour aux prestations"
    />
  );
}
