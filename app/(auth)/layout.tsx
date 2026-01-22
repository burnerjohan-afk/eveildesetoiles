import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion - Éveil des Étoiles",
  description: "Connectez-vous à votre espace client",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
