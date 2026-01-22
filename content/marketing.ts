/**
 * Contenu marketing par défaut (fallback si DB vide)
 */

export const marketingContent = {
  heroTitle: "Éveil des Étoiles",
  heroSubtitle:
    "Accompagnement professionnel pour les structures de petite enfance. Formations, conseil et accompagnement personnalisé.",
  heroCta: "Découvrir nos prestations",
  heroCtaSecondary: "Nous contacter",

  problemTitle: "Les problématiques du terrain",
  problemSubtitle:
    "Vous faites face à des défis quotidiens dans votre structure de petite enfance ?",
  problems: [
    "Gestion des émotions et des comportements difficiles",
    "Accueil des enfants à besoins particuliers",
    "Communication avec les familles",
    "Équipe en recherche de sens et de cohésion",
    "Conformité réglementaire et qualité d'accueil",
  ],

  methodTitle: "Notre méthode en 3 étapes",
  methodSubtitle: "Un accompagnement structuré et personnalisé",
  methodSteps: [
    {
      step: "1",
      title: "Diagnostic",
      description:
        "Analyse approfondie de votre structure, de vos besoins et de vos enjeux spécifiques.",
    },
    {
      step: "2",
      title: "Accompagnement",
      description:
        "Mise en place d'actions concrètes et personnalisées adaptées à votre contexte.",
    },
    {
      step: "3",
      title: "Suivi",
      description:
        "Évaluation régulière et ajustements pour garantir la pérennité des changements.",
    },
  ],

  testimonialsTitle: "Ils nous font confiance",
  testimonials: [
    {
      name: "Directrice de crèche",
      role: "Crèche municipale",
      content:
        "L'accompagnement d'Éveil des Étoiles nous a permis de mieux comprendre et gérer les comportements difficiles. Une vraie transformation !",
    },
    {
      name: "Équipe éducative",
      role: "Multi-accueil",
      content:
        "Les formations sont concrètes, pratiques et directement applicables. Notre équipe est plus sereine et mieux outillée.",
    },
  ],

  ctaTitle: "Prêt à transformer votre pratique ?",
  ctaSubtitle: "Contactez-nous pour discuter de vos besoins",
  ctaButton: "Prendre contact",
} as const;
