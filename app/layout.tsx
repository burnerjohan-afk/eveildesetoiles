import type { Metadata } from "next";
import "./globals.css";
import { defaultMetadata } from "@/lib/seo";
import { config } from "@/lib/config";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Éveil des Étoiles",
    description: "Consultante et formatrice en petite enfance",
    url: config.magicLinkBaseUrl,
    email: config.contactEmail,
    telephone: config.contactPhonePlaceholder,
    areaServed: "FR",
    serviceType: "Formation et accompagnement petite enfance",
  };

  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
