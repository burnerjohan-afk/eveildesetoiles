import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { FormationDetailTemplate } from "@/components/marketing/FormationDetailTemplate";
import { getFormationBySlug } from "@/lib/content";
import { FormationCalendar } from "@/components/marketing/FormationCalendar";

export const metadata: Metadata = generatePageMetadata(
  "Ateliers équipe-direction",
  "Formation collaborative pour co-construire un projet pédagogique avec votre équipe et votre direction."
);

export default async function AteliersEquipeDirectionPage() {
  const formation = await getFormationBySlug("ateliers-equipe-direction");
  
  const defaultData = {
    objectives: [
      "Impliquer l'ensemble de l'équipe dans l'élaboration du projet pédagogique",
      "Créer une dynamique collaborative entre direction et équipe",
      "Favoriser l'appropriation du projet par tous les acteurs",
      "Développer une vision commune et partagée",
    ],
    contentDetails: [
      {
        section: "Animation d'ateliers collaboratifs",
        items: [
          "Techniques de facilitation et de co-construction",
          "Méthodes participatives pour impliquer tous les acteurs",
          "Création d'un espace d'échange et de réflexion",
        ],
      },
      {
        section: "Travail sur les valeurs et l'identité",
        items: [
          "Définition collective des valeurs de la structure",
          "Identification de l'identité pédagogique",
          "Alignement des pratiques avec les valeurs",
        ],
      },
      {
        section: "Définition collective des objectifs",
        items: [
          "Co-construction des objectifs pédagogiques",
          "Priorisation des actions à mettre en œuvre",
          "Planification et répartition des rôles",
        ],
      },
      {
        section: "Synthèse et formalisation",
        items: [
          "Rédaction collective du projet",
          "Validation par l'équipe et la direction",
          "Communication du projet finalisé",
        ],
      },
    ],
    duration: "Plusieurs séances selon le besoin",
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
    id: "default-ateliers-equipe-direction",
    slug: "ateliers-equipe-direction",
    title: "Ateliers équipe-direction",
    subtitle: "Formation collaborative pour co-construire un projet pédagogique avec votre équipe et votre direction",
    category: "Formation Projet Pédagogique",
    objectives: defaultData.objectives,
    content: [],
    contentDetails: defaultData.contentDetails,
    modalities: ["Ateliers sur site avec l'équipe complète", "Durée : plusieurs séances selon le besoin", "Animation et facilitation par notre formatrice", "Outils et méthodes participatives"],
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
