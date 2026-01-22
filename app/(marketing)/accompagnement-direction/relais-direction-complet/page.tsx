import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { AccompagnementDetailTemplate } from "@/components/marketing/AccompagnementDetailTemplate";

export const metadata: Metadata = generatePageMetadata(
  "Accompagnement complet - Relais de direction",
  "Accompagnement complet pour les relais de direction dans leurs missions."
);

export default function RelaisDirectionCompletPage() {
  return (
    <AccompagnementDetailTemplate
      title="Accompagnement complet"
      subtitle="Accompagnement complet pour les relais de direction"
      description="Cet accompagnement complet vous permet de bénéficier de l'ensemble des services destinés aux relais de direction : de la définition du rôle et des missions à l'organisation des ressources documentaires, pour un positionnement optimal dans votre structure."
      objectives={[
        "Définir clairement le rôle et les missions du relais de direction",
        "Clarifier les responsabilités et le positionnement",
        "Développer les compétences nécessaires à la fonction",
        "Organiser efficacement les ressources documentaires",
        "Optimiser le fonctionnement administratif de la structure",
      ]}
      contentDetails={[
        {
          section: "Définition du rôle et des missions",
          items: [
            "Analyse du contexte et des besoins",
            "Définition du périmètre d'action",
            "Clarification des missions principales",
            "Identification des responsabilités",
            "Articulation avec la direction",
          ],
        },
        {
          section: "Positionnement dans l'équipe",
          items: [
            "Rôle d'interface avec la direction",
            "Positionnement vis-à-vis de l'équipe",
            "Gestion des relations professionnelles",
            "Communication et coordination",
          ],
        },
        {
          section: "Organisation des ressources documentaires",
          items: [
            "Audit de l'existant",
            "Structuration des documents",
            "Création d'un système de classement",
            "Mise en place de procédures",
            "Formation de l'équipe",
          ],
        },
        {
          section: "Développement des compétences",
          items: [
            "Identification des compétences nécessaires",
            "Formation et développement",
            "Accompagnement dans la prise de fonction",
            "Suivi et évaluation",
          ],
        },
      ]}
      approach={[
        "Accompagnement personnalisé adapté à votre situation",
        "Intervention sur site et à distance",
        "Méthodes participatives et collaboratives",
        "Suivi régulier et ajustements",
        "Support continu et conseil personnalisé",
      ]}
      duration="Accompagnement sur plusieurs mois selon vos besoins"
      targetAudience="Accompagnement destiné aux relais de direction, adjoints de direction et professionnels en charge de missions de relais dans les structures d'accueil de la petite enfance : crèches, micro-crèches, halte-garderies, jardins d'enfants, qui souhaitent bénéficier d'un accompagnement complet pour optimiser leur fonction."
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
