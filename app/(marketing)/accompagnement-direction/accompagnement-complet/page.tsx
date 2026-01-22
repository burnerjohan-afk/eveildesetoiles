import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { AccompagnementDetailTemplate } from "@/components/marketing/AccompagnementDetailTemplate";

export const metadata: Metadata = generatePageMetadata(
  "Accompagnement complet - Projet d'établissement",
  "Accompagnement complet pour l'élaboration et la mise en œuvre de votre projet d'établissement."
);

export default function AccompagnementCompletPage() {
  return (
    <AccompagnementDetailTemplate
      title="Accompagnement complet"
      subtitle="Accompagnement complet pour l'élaboration et la mise en œuvre de votre projet d'établissement"
      description="Cet accompagnement complet vous permet de bénéficier de l'ensemble des services liés au projet d'établissement : de l'écriture initiale à la mise en œuvre, en passant par la co-construction avec votre équipe et les ajustements nécessaires."
      objectives={[
        "Élaborer un projet d'établissement complet et cohérent",
        "Impliquer l'ensemble de l'équipe dans la construction du projet",
        "Formaliser les valeurs et les orientations pédagogiques",
        "Mettre en œuvre le projet de manière efficace",
        "Assurer le suivi et l'évolution continue du projet",
      ]}
      contentDetails={[
        {
          section: "Phase 1 : Écriture du projet",
          items: [
            "Structuration et organisation du document",
            "Rédaction des différentes sections",
            "Formalisation des valeurs et orientations",
            "Mise en forme professionnelle",
            "Relecture et amélioration",
          ],
        },
        {
          section: "Phase 2 : Co-construction avec l'équipe",
          items: [
            "Animation d'ateliers participatifs",
            "Travail collaboratif entre équipe et direction",
            "Identification collective des valeurs",
            "Définition collective des orientations",
            "Synthèse et formalisation",
          ],
        },
        {
          section: "Phase 3 : Mise en œuvre",
          items: [
            "Planification de la mise en œuvre",
            "Accompagnement dans l'application",
            "Formation de l'équipe si nécessaire",
            "Suivi des premiers mois",
          ],
        },
        {
          section: "Phase 4 : Réajustement et évolution",
          items: [
            "Évaluation du projet en place",
            "Identification des axes d'amélioration",
            "Adaptation aux évolutions",
            "Mise à jour du document",
            "Communication des modifications",
          ],
        },
      ]}
      approach={[
        "Accompagnement personnalisé sur toute la durée du projet",
        "Travail collaboratif avec la direction et l'équipe",
        "Méthodes participatives et adaptatives",
        "Suivi régulier et ajustements",
        "Support continu et conseil personnalisé",
      ]}
      duration="Accompagnement sur plusieurs mois selon vos besoins"
      targetAudience="Accompagnement destiné aux directrices, directeurs et référents techniques de structures d'accueil de la petite enfance : crèches, micro-crèches, halte-garderies, jardins d'enfants, qui souhaitent bénéficier d'un accompagnement complet pour leur projet d'établissement."
      modalities={[
        "Accompagnement personnalisé sur site",
        "Plusieurs séances réparties sur plusieurs mois",
        "Travail collaboratif avec la direction et l'équipe",
        "Supports et outils fournis",
        "Suivi post-mise en œuvre",
      ]}
      pricing="Sur devis (forfait ou à la séance selon vos besoins)"
      backUrl="/accompagnement-direction/projet-etablissement"
      backLabel="Retour à Projet d'établissement"
    />
  );
}
