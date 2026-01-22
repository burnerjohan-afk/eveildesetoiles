import { Metadata } from "next";
import { config } from "./config";

export const defaultMetadata: Metadata = {
  title: "Éveil des Étoiles - Consultante et Formatrice Petite Enfance",
  description:
    "Accompagnement professionnel pour les structures de petite enfance. Formations, conseil et accompagnement personnalisé.",
  keywords: ["petite enfance", "formation", "consultante", "accompagnement", "crèche", "éveil"],
  authors: [{ name: "Laetitia CHIN" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: config.magicLinkBaseUrl,
    siteName: "Éveil des Étoiles",
    title: "Éveil des Étoiles - Consultante et Formatrice Petite Enfance",
    description:
      "Accompagnement professionnel pour les structures de petite enfance. Formations, conseil et accompagnement personnalisé.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Éveil des Étoiles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Éveil des Étoiles - Consultante et Formatrice Petite Enfance",
    description:
      "Accompagnement professionnel pour les structures de petite enfance. Formations, conseil et accompagnement personnalisé.",
  },
};

export function generatePageMetadata(
  title: string,
  description: string,
  path?: string
): Metadata {
  return {
    title: `${title} | Éveil des Étoiles`,
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: `${title} | Éveil des Étoiles`,
      description,
      url: path ? `${config.magicLinkBaseUrl}${path}` : config.magicLinkBaseUrl,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: `${title} | Éveil des Étoiles`,
      description,
    },
  };
}
