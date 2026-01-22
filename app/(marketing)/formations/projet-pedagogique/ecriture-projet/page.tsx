import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { FormationDetailTemplate } from "@/components/marketing/FormationDetailTemplate";
import { getFormationBySlug } from "@/lib/content";
import { FormationCalendar } from "@/components/marketing/FormationCalendar";

export const metadata: Metadata = generatePageMetadata(
  "Écriture du projet pédagogique",
  "Formation pour apprendre à rédiger et formaliser votre projet pédagogique de manière professionnelle."
);

export default async function EcritureProjetPage() {
  const formation = await getFormationBySlug("ecriture-projet");
  
  const defaultData = {
    objectives: [
      "Maîtriser la structure et les éléments essentiels d'un projet pédagogique",
      "Apprendre à formaliser vos valeurs et votre approche éducative",
      "Rédiger un document clair, cohérent et adapté à votre structure",
      "Respecter les exigences réglementaires et pédagogiques",
    ],
    contentDetails: [
      {
        section: "Identifier les compétences du rédacteur",
        items: [
          "Les domaines principaux de la rédaction pédagogique",
          "La structure type d'un projet pédagogique",
          "Les éléments obligatoires et recommandés",
        ],
      },
      {
        section: "Élaborer son projet pédagogique",
        items: [
          "Analyser votre contexte et vos valeurs",
          "Structurer votre document",
          "Rédiger chaque section de manière cohérente",
        ],
      },
      {
        section: "Développer des pratiques d'écriture",
        items: [
          "Utiliser un langage adapté et professionnel",
          "Mettre en forme le document",
          "Relecture et amélioration continue",
        ],
      },
      {
        section: "Formaliser avec professionnalisme",
        items: [
          "Les attributs d'un projet pédagogique réussi",
          "Présentation et communication du projet",
        ],
      },
    ],
    duration: "1 jour",
    targetAudience: "Formation pour les responsables Petite Enfance, porteurs de projets sans prérequis : directrice, directeur, référent technique, gestionnaire, coordinatrice, … de crèche, micro-crèche, halte-garderie, jardins d'enfants ou d'éveil, pouponnière.",
    pricingEmployer: "Sur devis",
    pricingPersonal: "Sur devis",
    locations: ["Sur site", "À distance (visio)"],
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
    inscriptionFormUrl: formation.inscriptionFormUrl || defaultData.inscriptionFormUrl,
  } : {
    id: "default-ecriture-projet",
    slug: "ecriture-projet",
    title: "Écriture du projet",
    subtitle: "Formation pour apprendre à rédiger et formaliser votre projet pédagogique de manière professionnelle",
    category: "Formation Projet Pédagogique",
    objectives: defaultData.objectives,
    content: [],
    contentDetails: defaultData.contentDetails,
    modalities: ["Formation en groupe ou individuelle", "Durée : adaptable selon vos besoins", "Supports pédagogiques et outils fournis", "Accompagnement personnalisé dans la rédaction"],
    duration: defaultData.duration,
    targetAudience: defaultData.targetAudience,
    pricing: defaultData.pricingEmployer,
    pricingEmployer: defaultData.pricingEmployer,
    pricingPersonal: defaultData.pricingPersonal,
    locations: defaultData.locations,
    sessions: defaultData.sessions,
    inscriptionFormUrl: defaultData.inscriptionFormUrl,
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
