"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface ContactButtonProps {
  preSelectedType?: "formation" | "prestation" | "accompagnement";
  preSelectedId?: string;
  preSelectedTitle?: string;
}

export function ContactButton({ preSelectedType, preSelectedId, preSelectedTitle }: ContactButtonProps) {
  // Construire l'URL avec les paramètres de pré-sélection
  const buildUrl = () => {
    const baseUrl = "/nous-contacter";
    if (preSelectedType && preSelectedId && preSelectedTitle) {
      const params = new URLSearchParams({
        type: preSelectedType,
        id: preSelectedId,
        title: preSelectedTitle,
      });
      return `${baseUrl}?${params.toString()}`;
    } else if (preSelectedType === "accompagnement" && preSelectedTitle) {
      const params = new URLSearchParams({
        type: "accompagnement",
        title: preSelectedTitle,
      });
      return `${baseUrl}?${params.toString()}`;
    }
    return baseUrl;
  };

  return (
    <Link href={buildUrl()}>
      <Button 
        size="lg" 
        className="w-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
      >
        Nous contacter
      </Button>
    </Link>
  );
}
