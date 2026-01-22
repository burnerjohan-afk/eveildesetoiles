/**
 * Services par défaut (fallback si DB vide)
 */

export const defaultServices = [
  {
    slug: "accompagnement-individuel",
    title: "Accompagnement individuel",
    problem:
      "Vous rencontrez des difficultés avec un enfant en particulier ? Besoin d'un regard extérieur pour analyser une situation complexe ?",
    bullets: [
      "Observation et analyse de la situation",
      "Élaboration d'un plan d'action personnalisé",
      "Accompagnement dans la mise en œuvre",
      "Suivi et ajustements",
    ],
    benefits: [
      "Compréhension approfondie des besoins de l'enfant",
      "Solutions concrètes et adaptées",
      "Soutien de l'équipe dans la gestion de la situation",
      "Amélioration du bien-être de l'enfant et du groupe",
    ],
    modalities: [
      "Séances d'observation sur site",
      "Entretiens avec l'équipe et les familles",
      "Réunions de synthèse et de suivi",
    ],
    pricingNote: "Sur devis selon la durée et la complexité de l'accompagnement",
    isActive: true,
  },
  {
    slug: "formation-equipe",
    title: "Formation d'équipe",
    problem:
      "Votre équipe a besoin de nouvelles compétences ? Vous souhaitez renforcer la cohésion et les pratiques professionnelles ?",
    bullets: [
      "Formations sur mesure adaptées à vos besoins",
      "Thématiques variées (gestion des émotions, communication, inclusion, etc.)",
      "Approche pratique et interactive",
      "Mise en situation et cas concrets",
    ],
    benefits: [
      "Montée en compétences de l'équipe",
      "Harmonisation des pratiques",
      "Renforcement de la cohésion d'équipe",
      "Amélioration de la qualité d'accueil",
    ],
    modalities: [
      "Formations en intra (sur site)",
      "Durée adaptable selon vos besoins",
      "Supports pédagogiques fournis",
    ],
    pricingNote: "Sur devis selon le nombre de participants et la durée",
    isActive: true,
  },
  {
    slug: "audit-qualite",
    title: "Audit qualité",
    problem:
      "Vous souhaitez évaluer la qualité de votre accueil ? Préparer une certification ou répondre à des exigences réglementaires ?",
    bullets: [
      "Évaluation complète de votre structure",
      "Analyse des pratiques professionnelles",
      "Conformité réglementaire",
      "Recommandations d'amélioration",
    ],
    benefits: [
      "Vision claire de vos points forts et axes d'amélioration",
      "Plan d'action priorisé",
      "Conformité réglementaire assurée",
      "Amélioration continue de la qualité",
    ],
    modalities: [
      "Visite sur site",
      "Entretiens avec l'équipe",
      "Analyse documentaire",
      "Rapport détaillé avec recommandations",
    ],
    pricingNote: "Sur devis selon la taille de la structure",
    isActive: true,
  },
] as const;
