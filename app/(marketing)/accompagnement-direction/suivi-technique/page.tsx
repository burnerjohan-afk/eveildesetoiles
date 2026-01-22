import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { AccompagnementDetailTemplate } from "@/components/marketing/AccompagnementDetailTemplate";

export const metadata: Metadata = generatePageMetadata(
  "Suivi technique",
  "Accompagnement dans le suivi technique de votre structure d'accueil."
);

export default function SuiviTechniquePage() {
  return (
    <AccompagnementDetailTemplate
      title="Suivi technique"
      subtitle="Accompagnement dans le suivi technique de votre structure d'accueil"
      description="Accompagnement personnalisé pour assurer un suivi technique efficace de votre structure, en vous aidant à répondre aux exigences réglementaires et à optimiser le fonctionnement technique."
      objectives={[
        "Assurer le respect des obligations réglementaires",
        "Optimiser le fonctionnement technique de la structure",
        "Préparer et réussir les contrôles",
        "Développer les compétences techniques de l'équipe",
      ]}
      contentDetails={[
        {
          section: "Suivi des obligations réglementaires",
          items: [
            "Veille réglementaire et actualisation des connaissances",
            "Vérification de la conformité aux exigences",
            "Identification des points d'attention",
          ],
        },
        {
          section: "Analyse et optimisation des processus",
          items: [
            "Analyse des processus techniques en place",
            "Identification des axes d'optimisation",
            "Proposition d'améliorations concrètes",
          ],
        },
        {
          section: "Préparation aux contrôles",
          items: [
            "Préparation des documents nécessaires",
            "Vérification de la conformité",
            "Accompagnement lors des contrôles",
          ],
        },
        {
          section: "Conseil et accompagnement personnalisé",
          items: [
            "Conseil adapté à votre situation",
            "Accompagnement dans la mise en œuvre",
            "Suivi et ajustements",
          ],
        },
      ]}
      approach={[
        "Suivi des obligations réglementaires",
        "Analyse et optimisation des processus",
        "Préparation aux contrôles",
        "Conseil et accompagnement personnalisé",
      ]}
      duration="Accompagnement personnalisé selon les besoins"
      targetAudience="Accompagnement destiné aux directrices, directeurs, référents techniques et gestionnaires de structures d'accueil de la petite enfance : crèches, micro-crèches, halte-garderies, jardins d'enfants."
      modalities={[
        "Accompagnement personnalisé",
        "Intervention sur site",
        "Suivi régulier",
        "Disponibilité pour conseil",
      ]}
      pricing="Sur devis"
      backUrl="/accompagnement-direction"
      backLabel="Retour à Accompagnement Direction"
    />
  );
}
