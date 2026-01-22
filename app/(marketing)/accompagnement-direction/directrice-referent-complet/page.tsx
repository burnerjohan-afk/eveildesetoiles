import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { AccompagnementDetailTemplate } from "@/components/marketing/AccompagnementDetailTemplate";

export const metadata: Metadata = generatePageMetadata(
  "Accompagnement complet - Directrice / Référent technique",
  "Accompagnement complet pour les directrices et référents techniques de structures d'accueil."
);

export default function DirectriceReferentCompletPage() {
  return (
    <AccompagnementDetailTemplate
      title="Accompagnement complet"
      subtitle="Accompagnement complet pour les directrices et référents techniques"
      description="Cet accompagnement complet vous permet de bénéficier de l'ensemble des services destinés aux directrices et référents techniques : du suivi technique à la gestion d'équipe, en passant par l'élaboration du projet d'établissement."
      objectives={[
        "Assurer le respect des obligations réglementaires et techniques",
        "Optimiser le fonctionnement global de votre structure",
        "Développer vos compétences managériales et techniques",
        "Renforcer la cohésion et l'efficacité de votre équipe",
        "Élaborer et mettre en œuvre un projet d'établissement cohérent",
      ]}
      contentDetails={[
        {
          section: "Suivi technique",
          items: [
            "Veille réglementaire et actualisation des connaissances",
            "Vérification de la conformité aux exigences",
            "Analyse et optimisation des processus techniques",
            "Préparation aux contrôles",
            "Conseil et accompagnement personnalisé",
          ],
        },
        {
          section: "Gestion d'équipe",
          items: [
            "Développement du leadership et de la posture managériale",
            "Amélioration de la communication interne",
            "Gestion des conflits et médiation",
            "Animation de réunions efficaces",
            "Développement des compétences de l'équipe",
          ],
        },
        {
          section: "Projet d'établissement",
          items: [
            "Élaboration et formalisation du projet",
            "Co-construction avec l'équipe",
            "Mise en œuvre et suivi",
            "Réajustement et évolution continue",
          ],
        },
      ]}
      approach={[
        "Accompagnement personnalisé adapté à vos besoins spécifiques",
        "Intervention sur site et à distance selon vos contraintes",
        "Méthodes participatives et collaboratives",
        "Suivi régulier et ajustements",
        "Support continu et conseil personnalisé",
      ]}
      duration="Accompagnement sur plusieurs mois selon vos besoins"
      targetAudience="Accompagnement destiné aux directrices, directeurs, référents techniques et gestionnaires de structures d'accueil de la petite enfance : crèches, micro-crèches, halte-garderies, jardins d'enfants, qui souhaitent bénéficier d'un accompagnement complet pour optimiser leur structure."
      modalities={[
        "Accompagnement personnalisé sur site",
        "Plusieurs séances réparties sur plusieurs mois",
        "Travail collaboratif avec la direction et l'équipe",
        "Supports et outils fournis",
        "Suivi régulier et disponibilité pour conseil",
      ]}
      pricing="Sur devis (forfait ou à la séance selon vos besoins)"
      backUrl="/accompagnement-direction"
      backLabel="Retour à Accompagnement Direction"
    />
  );
}
