import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { FormationDetailTemplate } from "@/components/marketing/FormationDetailTemplate";
import { getFormationBySlug } from "@/lib/content";
import { FormationCalendar } from "@/components/marketing/FormationCalendar";

export const metadata: Metadata = generatePageMetadata(
  "Réajustement pédagogique",
  "Formation pour adapter et faire évoluer votre projet pédagogique en fonction des retours et des besoins."
);

export default async function ReajustementPedagogiquePage() {
  const formation = await getFormationBySlug("reajustement-pedagogique");
  
  const defaultData = {
    objectives: [
      "Analyser l'efficacité du projet pédagogique existant",
      "Identifier les axes d'amélioration nécessaires",
      "Adapter le projet aux évolutions de la structure et de l'équipe",
      "Mettre à jour le document tout en gardant la cohérence",
    ],
    contentDetails: [
      {
        section: "Évaluation du projet pédagogique en place",
        items: [
          "Analyse approfondie du projet existant",
          "Identification des points forts et des faiblesses",
          "Évaluation de l'adéquation avec les pratiques actuelles",
        ],
      },
      {
        section: "Identification des axes d'amélioration",
        items: [
          "Recueil des retours de l'équipe et de la direction",
          "Analyse des besoins d'évolution",
          "Priorisation des ajustements nécessaires",
        ],
      },
      {
        section: "Méthodologie de réajustement",
        items: [
          "Stratégie d'évolution du projet",
          "Mise à jour des contenus et des pratiques",
          "Conservation de la cohérence globale",
        ],
      },
      {
        section: "Actualisation et communication",
        items: [
          "Actualisation des contenus et des pratiques",
          "Communication des modifications à l'équipe",
          "Accompagnement dans la mise en œuvre",
        ],
      },
    ],
    duration: "Accompagnement personnalisé",
    targetAudience: "Formation pour les responsables Petite Enfance, porteurs de projets sans prérequis : directrice, directeur, référent technique, gestionnaire, coordinatrice, … de crèche, micro-crèche, halte-garderie, jardins d'enfants ou d'éveil, pouponnière.",
    pricingEmployer: "Sur devis",
    pricingPersonal: "Sur devis",
    locations: ["Sur site"],
    sessions: formation?.sessions || [],
    inscriptionFormUrl: null,
  };

  const formationData = formation ? {
    ...formation,
    objectives: formation.objectives.length > 0 ? formation.objectives : defaultData.objectives,
    contentDetails: formation.contentDetails || defaultData.contentDetails,
    duration: formation.duration || defaultData.duration,
    targetAudience: formation.targetAudience || defaultData.targetAudience,
    pricingEmployer: formation.pricingEmployer || formation.pricing || defaultData.pricingEmployer,
    pricingPersonal: formation.pricingPersonal || defaultData.pricingPersonal,
    locations: formation.locations.length > 0 ? formation.locations : defaultData.locations,
    sessions: formation.sessions || defaultData.sessions,
  } : {
    id: "default-reajustement-pedagogique",
    slug: "reajustement-pedagogique",
    title: "Réajustement pédagogique",
    subtitle: "Formation pour adapter et faire évoluer votre projet pédagogique en fonction des retours et des besoins",
    category: "Formation Projet Pédagogique",
    objectives: defaultData.objectives,
    content: [],
    contentDetails: defaultData.contentDetails,
    modalities: ["Accompagnement personnalisé sur site", "Audit et analyse du projet existant", "Travail collaboratif avec la direction et l'équipe", "Proposition d'ajustements et de nouvelles orientations"],
    duration: defaultData.duration,
    targetAudience: defaultData.targetAudience,
    pricing: defaultData.pricingEmployer,
    pricingEmployer: defaultData.pricingEmployer,
    pricingPersonal: defaultData.pricingPersonal,
    locations: defaultData.locations,
    sessions: defaultData.sessions,
    isActive: true,
    updatedAt: new Date().toISOString(),
  };

  return (
    <>
      <FormationDetailTemplate
        formation={formationData}
        backUrl="/formations/projet-pedagogique"
        backLabel="Retour à Formation Projet Pédagogique"
      />
      {formationData.sessions && formationData.sessions.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <FormationCalendar
            sessions={formationData.sessions}
            formationId={formationData.id}
            formationTitle={formationData.title}
          />
        </div>
      )}
    </>
  );
}
