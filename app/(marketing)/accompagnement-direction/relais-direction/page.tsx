import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { AccompagnementDetailTemplate } from "@/components/marketing/AccompagnementDetailTemplate";

export const metadata: Metadata = generatePageMetadata(
  "Relais de direction - Rôle et missions",
  "Accompagnement pour définir et clarifier le rôle et les missions du relais de direction."
);

export default function RelaisDirectionPage() {
  return (
    <AccompagnementDetailTemplate
      title="Rôle / missions"
      subtitle="Accompagnement pour définir et clarifier le rôle et les missions du relais de direction"
      description="Nous accompagnons les relais de direction dans la définition et la clarification de leur rôle et de leurs missions au sein de la structure."
      objectives={[
        "Définir clairement le rôle du relais de direction",
        "Clarifier les missions et responsabilités",
        "Positionner le relais dans l'équipe",
        "Développer les compétences nécessaires",
      ]}
      contentDetails={[
        {
          section: "Définition du rôle et des missions",
          items: [
            "Analyse du contexte et des besoins",
            "Définition du périmètre d'action",
            "Clarification des missions principales",
          ],
        },
        {
          section: "Clarification des responsabilités",
          items: [
            "Identification des responsabilités",
            "Délimitation des compétences",
            "Articulation avec la direction",
          ],
        },
        {
          section: "Positionnement dans l'équipe",
          items: [
            "Rôle d'interface avec la direction",
            "Positionnement vis-à-vis de l'équipe",
            "Gestion des relations professionnelles",
          ],
        },
        {
          section: "Développement des compétences",
          items: [
            "Identification des compétences nécessaires",
            "Formation et développement",
            "Accompagnement dans la prise de fonction",
          ],
        },
      ]}
      approach={[
        "Définition du rôle et des missions",
        "Clarification des responsabilités",
        "Positionnement dans l'équipe",
        "Développement des compétences nécessaires",
      ]}
      duration="Plusieurs séances selon le besoin"
      targetAudience="Accompagnement destiné aux relais de direction, adjoints de direction et professionnels en charge de missions de relais dans les structures d'accueil de la petite enfance."
      modalities={[
        "Accompagnement personnalisé",
        "Intervention sur site",
        "Plusieurs séances d'accompagnement",
        "Outils et supports fournis",
      ]}
      pricing="Sur devis"
      backUrl="/accompagnement-direction"
      backLabel="Retour à Accompagnement Direction"
    />
  );
}
