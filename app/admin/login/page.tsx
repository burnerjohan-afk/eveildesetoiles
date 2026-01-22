"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const error = searchParams.get("error");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/auth/request-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Si cet email est autorisé, vous recevrez un lien de connexion.");
      } else {
        setMessage(data.error || "Une erreur est survenue");
      }
    } catch (error) {
      setMessage("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Connexion Admin</h1>

        {error === "invalid" && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            Lien invalide ou expiré
          </div>
        )}

        {error === "unauthorized" && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            Accès non autorisé
          </div>
        )}

        {message && (
          <div className={`mb-4 p-3 rounded ${
            message.includes("erreur") ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="votre@email.com"
            className="mb-4"
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Envoi en cours..." : "Recevoir le lien de connexion"}
          </Button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Vous recevrez un lien de connexion par email (ou en console en mode développement)
        </p>
      </div>
    </div>
  );
}
