import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { AccompagnementDetailTemplate } from "@/components/marketing/AccompagnementDetailTemplate";

export const metadata: Metadata = generatePageMetadata(
  "Écriture du projet d'établissement",
  "Accompagnement pour formaliser et rédiger votre projet d'établissement."
);

export default function EcritureProjetEtablissementPage() {
  return (
    <AccompagnementDetailTemplate
      title="Écriture du projet d'établissement"
      subtitle="Accompagnement pour formaliser et rédiger votre projet d'établissement"
      description="Nous vous accompagnons dans la rédaction et la formalisation de votre projet d'établissement, document essentiel qui définit votre vision, vos valeurs et vos orientations pédagogiques."
      objectives={[
        "Formaliser le projet d'établissement de manière professionnelle",
        "Structurer le document de manière cohérente",
        "Exprimer clairement les valeurs et orientations",
        "Créer un document de référence pour la structure",
      ]}
      contentDetails={[
        {
          section: "Structuration et organisation du document",
          items: [
            "Définition de la structure du document",
            "Organisation des différentes sections",
            "Création d'une trame de rédaction",
          ],
        },
        {
          section: "Rédaction des différentes sections",
          items: [
            "Rédaction de la présentation de la structure",
            "Formalisation des valeurs et du projet éducatif",
            "Description des pratiques pédagogiques",
            "Définition des objectifs et orientations",
          ],
        },
        {
          section: "Formalisation des valeurs et orientations",
          items: [
            "Identification et expression des valeurs",
            "Définition des orientations pédagogiques",
            "Articulation avec le projet éducatif",
          ],
        },
        {
          section: "Mise en forme professionnelle",
          items: [
            "Mise en page et présentation",
            "Relecture et correction",
            "Finalisation du document",
          ],
        },
        {
          section: "Relecture et amélioration",
          items: [
            "Relecture approfondie",
            "Proposition d'améliorations",
            "Validation finale",
          ],
        },
      ]}
      approach={[
        "Structuration et organisation du document",
        "Rédaction des différentes sections",
        "Formalisation des valeurs et orientations",
        "Mise en forme professionnelle",
        "Relecture et amélioration",
      ]}
      duration="Plusieurs séances selon le besoin"
      targetAudience="Accompagnement destiné aux directrices, directeurs et référents techniques de structures d'accueil de la petite enfance : crèches, micro-crèches, halte-garderies, jardins d'enfants."
      modalities={[
        "Accompagnement personnalisé sur site",
        "Travail collaboratif avec la direction",
        "Plusieurs séances selon le besoin",
        "Supports et outils fournis",
      ]}
      pricing="Sur devis"
      backUrl="/accompagnement-direction/projet-etablissement"
      backLabel="Retour à Projet d'établissement"
    />
  );
}
