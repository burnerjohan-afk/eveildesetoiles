/**
 * FAQ par défaut (fallback si DB vide)
 */

export const defaultFAQ = [
  {
    question: "Qui peut bénéficier de vos services ?",
    answer:
      "Nos services s'adressent à toutes les structures de petite enfance : crèches, multi-accueils, micro-crèches, RAM, MAM, ainsi qu'aux professionnels individuels.",
  },
  {
    question: "Comment se déroule un accompagnement ?",
    answer:
      "Chaque accompagnement commence par un diagnostic approfondi de votre situation. Nous élaborons ensuite un plan d'action personnalisé, que nous mettons en œuvre ensemble avec un suivi régulier.",
  },
  {
    question: "Les formations peuvent-elles être adaptées à nos besoins ?",
    answer:
      "Absolument ! Toutes nos formations sont conçues sur mesure en fonction de vos besoins spécifiques, de votre contexte et de vos objectifs.",
  },
  {
    question: "Intervenez-vous partout en France ?",
    answer:
      "Oui, nous intervenons sur site partout en France. Certaines prestations peuvent également être réalisées à distance selon les modalités.",
  },
] as const;
