import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { AccompagnementDetailTemplate } from "@/components/marketing/AccompagnementDetailTemplate";

export const metadata: Metadata = generatePageMetadata(
  "Pratiques professionnelles",
  "Accompagnement pour améliorer et harmoniser les pratiques professionnelles de votre équipe."
);

export default function PratiquesProfessionnellesPage() {
  return (
    <AccompagnementDetailTemplate
      title="Pratiques professionnelles"
      subtitle="Amélioration et harmonisation des pratiques professionnelles de votre équipe"
      description="Nous accompagnons votre équipe dans l'amélioration et l'harmonisation de ses pratiques professionnelles pour garantir une qualité d'accueil cohérente et bienveillante."
      objectives={[
        "Harmoniser les pratiques professionnelles de l'équipe",
        "Améliorer la qualité d'accueil",
        "Renforcer la cohérence des interventions",
        "Développer les compétences de l'équipe",
      ]}
      contentDetails={[
        {
          section: "Observation et analyse des pratiques",
          items: [
            "Observation des pratiques actuelles",
            "Identification des points forts et des axes d'amélioration",
            "Analyse de la cohérence des interventions",
          ],
        },
        {
          section: "Élaboration d'un référentiel de pratiques",
          items: [
            "Définition collective des pratiques de référence",
            "Création d'un référentiel partagé",
            "Formalisation des bonnes pratiques",
          ],
        },
        {
          section: "Formation et accompagnement de l'équipe",
          items: [
            "Formation aux nouvelles pratiques",
            "Accompagnement dans la mise en œuvre",
            "Soutien et conseil personnalisé",
          ],
        },
        {
          section: "Suivi et ajustement",
          items: [
            "Suivi de l'évolution des pratiques",
            "Ajustements et améliorations continues",
            "Évaluation de l'impact des changements",
          ],
        },
      ]}
      approach={[
        "Observation et analyse des pratiques actuelles",
        "Identification des points forts et axes d'amélioration",
        "Élaboration d'un référentiel de pratiques partagé",
        "Formation et accompagnement de l'équipe",
        "Suivi et ajustement des pratiques",
      ]}
      duration="Plusieurs séances selon le besoin"
      targetAudience="Prestation destinée aux structures d'accueil de la petite enfance : crèches, micro-crèches, halte-garderies, jardins d'enfants, ainsi qu'aux équipes professionnelles et aux directions."
      modalities={[
        "Intervention sur site",
        "Travail avec l'équipe complète",
        "Plusieurs séances d'accompagnement",
        "Outils et supports pédagogiques fournis",
      ]}
      pricing="Sur devis"
      backUrl="/prestations"
      backLabel="Retour aux prestations"
    />
  );
}
