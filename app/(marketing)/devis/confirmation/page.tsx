"use client";

import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Star } from "@/components/ui/Stars";
import Link from "next/link";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const formationId = searchParams.get("formationId");
  const sessionId = searchParams.get("sessionId");

  return (
    <div className="py-16 bg-gradient-to-b from-white via-etoile-50/20 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Paiement confirmé !</h2>
          <p className="text-gray-600 mb-6">
            Votre inscription a été confirmée. Vous recevrez un email de confirmation sous peu.
          </p>
          <Link href="/">
            <Button>Retour à l'accueil</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
