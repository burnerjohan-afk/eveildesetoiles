"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Star } from "@/components/ui/Stars";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/auth/request-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Un lien de connexion a été envoyé à votre adresse email. Vérifiez votre boîte de réception.",
        });
        setEmail("");
      } else {
        setMessage({
          type: "error",
          text: data.error || "Une erreur est survenue. Veuillez réessayer.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Une erreur est survenue. Veuillez réessayer.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-eau-50/30 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* En-tête */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star size="md" color="etoile" animated={true} />
            <h1 className="text-3xl font-bold text-gray-900">Espace client</h1>
            <Star size="md" color="eau" animated={true} />
          </div>
          <p className="text-gray-600">
            Connectez-vous à votre espace pour accéder à vos formations et documents
          </p>
        </div>

        {/* Formulaire */}
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                disabled={loading}
              />
            </div>

            {message && (
              <div
                className={`p-4 rounded-lg ${
                  message.type === "success"
                    ? "bg-green-50 border border-green-200 text-green-800"
                    : "bg-red-50 border border-red-200 text-red-800"
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Envoi en cours..." : "Recevoir un lien de connexion"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Vous recevrez un lien de connexion par email. Ce lien est valide pendant 15 minutes.
            </p>
          </div>
        </Card>

        {/* Lien retour */}
        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-eau-600 hover:text-eau-700 transition-colors"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
