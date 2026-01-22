import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { AccompagnementDetailTemplate } from "@/components/marketing/AccompagnementDetailTemplate";

export const metadata: Metadata = generatePageMetadata(
  "Réorganisation de structure",
  "Accompagnement pour réorganiser et optimiser votre structure d'accueil."
);

export default function ReorganisationStructurePage() {
  return (
    <AccompagnementDetailTemplate
      title="Réorganisation de structure"
      subtitle="Accompagnement personnalisé pour optimiser et réorganiser votre structure d'accueil"
      description="Nous vous accompagnons dans la réorganisation complète de votre structure pour améliorer son fonctionnement, optimiser les flux et créer un environnement de travail plus efficace."
      objectives={[
        "Optimiser l'organisation de votre structure",
        "Améliorer les flux de travail et la communication",
        "Créer un environnement de travail plus efficace",
        "Renforcer la cohésion d'équipe",
      ]}
      contentDetails={[
        {
          section: "Analyse approfondie de votre organisation",
          items: [
            "Évaluation de l'organisation actuelle",
            "Identification des points de blocage",
            "Analyse des flux de travail",
          ],
        },
        {
          section: "Identification des axes d'amélioration",
          items: [
            "Définition des priorités d'action",
            "Proposition de solutions adaptées",
            "Planification des changements",
          ],
        },
        {
          section: "Proposition d'une nouvelle organisation",
          items: [
            "Élaboration d'un plan de réorganisation",
            "Adaptation aux spécificités de votre structure",
            "Prise en compte des contraintes et des ressources",
          ],
        },
        {
          section: "Accompagnement dans la mise en œuvre",
          items: [
            "Suivi de la mise en place",
            "Ajustements et adaptations",
            "Formation et accompagnement de l'équipe",
          ],
        },
      ]}
      approach={[
        "Analyse approfondie de votre organisation actuelle",
        "Identification des axes d'amélioration",
        "Proposition d'une nouvelle organisation adaptée",
        "Accompagnement dans la mise en œuvre",
        "Suivi et ajustements",
      ]}
      duration="Durée adaptée à votre projet"
      targetAudience="Prestation destinée aux structures d'accueil de la petite enfance : crèches, micro-crèches, halte-garderies, jardins d'enfants, ainsi qu'aux directrices, directeurs et équipes de direction."
      modalities={[
        "Intervention sur site",
        "Durée adaptée à votre projet",
        "Travail collaboratif avec l'équipe et la direction",
        "Rapport et recommandations fournis",
      ]}
      pricing="Sur devis"
      backUrl="/prestations"
      backLabel="Retour aux prestations"
    />
  );
}
