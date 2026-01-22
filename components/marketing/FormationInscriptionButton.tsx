"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { InscriptionForm } from "./InscriptionForm";
import { IconDocument } from "@/components/ui/Icons";
import { Star } from "@/components/ui/Stars";

interface FormationInscriptionButtonProps {
  formationId: string;
  formationTitle: string;
  inscriptionFormUrl?: string | null;
}

export function FormationInscriptionButton({
  formationId,
  formationTitle,
  inscriptionFormUrl,
}: FormationInscriptionButtonProps) {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return (
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Star size="sm" color="etoile" animated={false} />
            Bulletin d'inscription
          </h3>
          <button
            onClick={() => setShowForm(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <InscriptionForm
          formationId={formationId}
          formationTitle={formationTitle}
          onSuccess={() => setShowForm(false)}
        />
      </div>
    );
  }

  if (inscriptionFormUrl) {
    return (
      <a href={inscriptionFormUrl} target="_blank" rel="noopener noreferrer">
        <Button size="lg" className="w-full bg-eau-600 hover:bg-eau-700">
          <IconDocument className="w-5 h-5 mr-2" />
          ACCÉDER AU BULLETIN D'INSCRIPTION
        </Button>
      </a>
    );
  }

  return (
    <Button 
      size="lg" 
      className="w-full bg-eau-600 hover:bg-eau-700"
      onClick={() => setShowForm(true)}
    >
      <IconDocument className="w-5 h-5 mr-2" />
      BULLETIN D'INSCRIPTION
    </Button>
  );
}
