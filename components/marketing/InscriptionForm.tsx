"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { config } from "@/lib/config";

interface InscriptionFormProps {
  formationId: string;
  formationTitle: string;
  sessionId?: string;
  sessionDate?: string;
  sessionLocation?: string;
  onSuccess?: () => void;
}

export function InscriptionForm({
  formationId,
  formationTitle,
  sessionId,
  sessionDate,
  sessionLocation,
  onSuccess,
}: InscriptionFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Si on a une session, utiliser l'API d'inscription
      if (sessionId) {
        const response = await fetch("/api/formations/inscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formationId,
            sessionId,
            ...formData,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Une erreur est survenue");
        }
      } else {
        // Sinon, envoyer un email de demande d'inscription
        const emailSubject = encodeURIComponent(`Demande d'inscription - ${formationTitle}`);
        const emailBody = encodeURIComponent(
          `Bonjour,\n\nJe souhaite m'inscrire à la formation "${formationTitle}".\n\n` +
          `Informations :\n` +
          `- Prénom : ${formData.firstName}\n` +
          `- Nom : ${formData.lastName}\n` +
          `- Email : ${formData.email}\n` +
          (formData.phone ? `- Téléphone : ${formData.phone}\n` : "") +
          (formData.company ? `- Structure : ${formData.company}\n` : "") +
          (formData.role ? `- Fonction : ${formData.role}\n` : "") +
          (formData.notes ? `\nMessage :\n${formData.notes}` : "")
        );
        
        window.location.href = `mailto:${config.contactEmail}?subject=${emailSubject}&body=${emailBody}`;
        setSuccess(true);
        setTimeout(() => {
          if (onSuccess) onSuccess();
        }, 2000);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        if (onSuccess) onSuccess();
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          role: "",
          notes: "",
        });
        setSuccess(false);
      }, 2000);
    } catch (error: any) {
      setError(error.message || "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="bg-green-50 border-green-200">
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {sessionId ? "Inscription envoyée !" : "Demande envoyée !"}
          </h3>
          <p className="text-gray-600">
            {sessionId
              ? "Votre demande d'inscription a été transmise. Nous vous contacterons rapidement pour confirmer."
              : "Votre demande d'inscription a été préparée. Vérifiez votre client email pour l'envoyer."}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-eau-200">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Bulletin d'inscription</h3>
        <p className="text-sm text-gray-600">
          Remplissez ce formulaire pour vous inscrire à la formation
        </p>
      </div>

      {sessionDate && sessionLocation && (
        <div className="mb-4 p-4 bg-eau-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Formation :</strong> {formationTitle}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Date :</strong> {new Date(sessionDate).toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Lieu :</strong> {sessionLocation}
          </p>
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              Prénom *
            </label>
            <input
              type="text"
              id="firstName"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eau-500 focus:border-eau-500"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Nom *
            </label>
            <input
              type="text"
              id="lastName"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eau-500 focus:border-eau-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eau-500 focus:border-eau-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eau-500 focus:border-eau-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Structure / Entreprise
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eau-500 focus:border-eau-500"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Fonction
            </label>
            <input
              type="text"
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eau-500 focus:border-eau-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Message / Notes
          </label>
          <textarea
            id="notes"
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eau-500 focus:border-eau-500"
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? "Envoi en cours..." : sessionId ? "Envoyer l'inscription" : "Ouvrir le client email"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
