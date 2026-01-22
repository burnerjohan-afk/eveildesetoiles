/**
 * Formations par défaut (fallback si DB vide)
 */

export const defaultFormations = [
  {
    slug: "projet-peda",
    title: "Accompagnement à l'élaboration de projet pédagogique",
    subtitle:
      "Construire un projet pédagogique cohérent, partagé et vivant pour votre structure",
    objectives: [
      "Comprendre les enjeux d'un projet pédagogique",
      "Élaborer un projet adapté à votre structure",
      "Impliquer l'équipe dans la démarche",
      "Mettre en œuvre et faire vivre le projet",
    ],
    content: [
      "Les fondamentaux du projet pédagogique",
      "Analyse de votre contexte et de vos valeurs",
      "Construction collective du projet",
      "Formalisation et communication",
      "Mise en œuvre et évaluation",
    ],
    modalities: [
      "Accompagnement sur plusieurs séances",
      "Travail en groupe et individuel",
      "Supports et outils fournis",
    ],
    pricing: "Sur devis",
    locations: ["Sur site", "À distance (visio)"],
    isActive: true,
  },
] as const;

export function getDefaultFormations() {
  return defaultFormations.map((f) => ({
    ...f,
    slug: f.slug,
    title: f.title,
    subtitle: f.subtitle,
    objectives: f.objectives,
    content: f.content,
    modalities: f.modalities,
    pricing: f.pricing,
    locations: f.locations,
    isActive: f.isActive,
  }));
}
