import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { AccompagnementDetailTemplate } from "@/components/marketing/AccompagnementDetailTemplate";

export const metadata: Metadata = generatePageMetadata(
  "Ateliers équipe-direction - Projet d'établissement",
  "Ateliers collaboratifs pour co-construire le projet d'établissement avec votre équipe."
);

export default function AteliersEquipeDirectionEtablissementPage() {
  return (
    <AccompagnementDetailTemplate
      title="Ateliers équipe-direction"
      subtitle="Ateliers collaboratifs pour co-construire le projet d'établissement avec votre équipe"
      description="Nous animons des ateliers collaboratifs pour impliquer l'ensemble de votre équipe dans l'élaboration du projet d'établissement, favorisant l'appropriation et l'engagement collectif."
      objectives={[
        "Impliquer l'ensemble de l'équipe dans l'élaboration",
        "Créer une dynamique collaborative",
        "Favoriser l'appropriation du projet",
        "Développer une vision commune",
      ]}
      contentDetails={[
        {
          section: "Animation d'ateliers participatifs",
          items: [
            "Techniques de facilitation et d'animation",
            "Méthodes participatives adaptées",
            "Création d'un espace d'échange sécurisé",
          ],
        },
        {
          section: "Co-construction avec l'équipe et la direction",
          items: [
            "Travail collaboratif entre équipe et direction",
            "Définition collective des orientations",
            "Articulation des différents points de vue",
          ],
        },
        {
          section: "Travail sur les valeurs et l'identité",
          items: [
            "Identification collective des valeurs",
            "Définition de l'identité de la structure",
            "Alignement des pratiques avec les valeurs",
          ],
        },
        {
          section: "Définition collective des orientations",
          items: [
            "Co-construction des objectifs",
            "Priorisation des actions",
            "Planification de la mise en œuvre",
          ],
        },
        {
          section: "Synthèse et formalisation",
          items: [
            "Synthèse des travaux d'ateliers",
            "Formalisation des décisions",
            "Validation collective",
          ],
        },
      ]}
      approach={[
        "Animation d'ateliers participatifs",
        "Co-construction avec l'équipe et la direction",
        "Travail sur les valeurs et l'identité",
        "Définition collective des orientations",
        "Synthèse et formalisation",
      ]}
      duration="Plusieurs séances selon le besoin"
      targetAudience="Accompagnement destiné aux structures d'accueil de la petite enfance : crèches, micro-crèches, halte-garderies, jardins d'enfants, ainsi qu'aux équipes professionnelles et aux directions."
      modalities={[
        "Ateliers sur site avec l'équipe complète",
        "Plusieurs séances selon le besoin",
        "Animation et facilitation professionnelle",
        "Outils et méthodes participatives",
      ]}
      pricing="Sur devis"
      backUrl="/accompagnement-direction/projet-etablissement"
      backLabel="Retour à Projet d'établissement"
    />
  );
}
