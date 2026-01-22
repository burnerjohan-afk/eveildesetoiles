import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { AccompagnementDetailTemplate } from "@/components/marketing/AccompagnementDetailTemplate";

export const metadata: Metadata = generatePageMetadata(
  "Réajustement pédagogique - Projet d'établissement",
  "Accompagnement pour adapter et faire évoluer votre projet d'établissement."
);

export default function ReajustementPedagogiqueEtablissementPage() {
  return (
    <AccompagnementDetailTemplate
      title="Réajustement pédagogique"
      subtitle="Accompagnement pour adapter et faire évoluer votre projet d'établissement"
      description="Nous vous accompagnons dans l'évaluation et le réajustement de votre projet d'établissement pour l'adapter aux évolutions de votre structure, de votre équipe et des besoins."
      objectives={[
        "Évaluer l'efficacité du projet existant",
        "Identifier les axes d'amélioration",
        "Adapter le projet aux évolutions",
        "Maintenir la cohérence globale",
      ]}
      contentDetails={[
        {
          section: "Évaluation du projet existant",
          items: [
            "Analyse approfondie du projet en place",
            "Évaluation de l'adéquation avec les pratiques",
            "Identification des points forts et faiblesses",
          ],
        },
        {
          section: "Identification des axes d'amélioration",
          items: [
            "Recueil des retours de l'équipe",
            "Analyse des besoins d'évolution",
            "Priorisation des ajustements nécessaires",
          ],
        },
        {
          section: "Adaptation aux évolutions",
          items: [
            "Prise en compte des changements de contexte",
            "Adaptation aux évolutions de l'équipe",
            "Réponse aux nouveaux besoins",
          ],
        },
        {
          section: "Mise à jour du document",
          items: [
            "Actualisation des contenus",
            "Révision des orientations",
            "Conservation de la cohérence",
          ],
        },
        {
          section: "Communication des modifications",
          items: [
            "Présentation des changements à l'équipe",
            "Explication des évolutions",
            "Accompagnement dans la mise en œuvre",
          ],
        },
      ]}
      approach={[
        "Évaluation du projet existant",
        "Identification des axes d'amélioration",
        "Adaptation aux évolutions",
        "Mise à jour du document",
        "Communication des modifications",
      ]}
      duration="Accompagnement personnalisé selon le besoin"
      targetAudience="Accompagnement destiné aux directrices, directeurs et référents techniques de structures d'accueil de la petite enfance : crèches, micro-crèches, halte-garderies, jardins d'enfants."
      modalities={[
        "Accompagnement personnalisé sur site",
        "Audit et analyse du projet en place",
        "Travail collaboratif avec la direction",
        "Proposition d'ajustements",
      ]}
      pricing="Sur devis"
      backUrl="/accompagnement-direction/projet-etablissement"
      backLabel="Retour à Projet d'établissement"
    />
  );
}
