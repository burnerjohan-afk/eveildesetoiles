"use client";

import { useState } from "react";
import { FormationSession } from "@/lib/storage";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Star } from "@/components/ui/Stars";

interface FormationCalendarProps {
  sessions: FormationSession[];
  formationId: string;
  formationTitle: string;
}

export function FormationCalendar({ sessions, formationId, formationTitle }: FormationCalendarProps) {
  const [selectedSession, setSelectedSession] = useState<FormationSession | null>(null);
  const [showInscriptionForm, setShowInscriptionForm] = useState(false);

  // Filtrer les sessions actives et futures
  const activeSessions = sessions
    .filter((s) => s.isActive && new Date(s.date) >= new Date(new Date().setHours(0, 0, 0, 0)))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (activeSessions.length === 0) {
    return (
      <Card className="bg-etoile-50 border-etoile-200">
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-etoile-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-etoile-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune session programmée</h3>
          <p className="text-gray-600 mb-4">
            De nouvelles dates seront ajoutées prochainement. Contactez-nous pour être informé(e) !
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Star size="sm" color="etoile" animated={false} />
          Dates des sessions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeSessions.map((session) => (
            <Card
              key={session.id}
              className={`cursor-pointer transition-all ${
                selectedSession?.id === session.id
                  ? "border-2 border-eau-500 bg-eau-50"
                  : "hover:border-eau-300"
              }`}
              onClick={() => {
                setSelectedSession(session);
                setShowInscriptionForm(true);
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-eau-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-semibold text-gray-900">{formatDateShort(session.date)}</span>
                  </div>
                  {session.time && (
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Horaires :</span> {session.time}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{session.location}</span>
                  </div>
                  {session.maxParticipants && (
                    <p className="text-xs text-gray-500 mt-2">
                      {session.currentParticipants} / {session.maxParticipants} participants
                    </p>
                  )}
                </div>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSession(session);
                    setShowInscriptionForm(true);
                  }}
                >
                  S'inscrire
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {showInscriptionForm && selectedSession && (
        <InscriptionForm
          session={selectedSession}
          formationId={formationId}
          formationTitle={formationTitle}
          onClose={() => {
            setShowInscriptionForm(false);
            setSelectedSession(null);
          }}
        />
      )}
    </div>
  );
}

interface InscriptionFormProps {
  session: FormationSession;
  formationId: string;
  formationTitle: string;
  onClose: () => void;
}

function InscriptionForm({ session, formationId, formationTitle, onClose }: InscriptionFormProps) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/formations/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formationId,
          sessionId: session.id,
          ...formData,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      alert("Une erreur est survenue. Veuillez réessayer.");
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
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Inscription envoyée !</h3>
          <p className="text-gray-600">
            Votre demande d'inscription a été transmise. Nous vous contacterons rapidement pour confirmer.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-eau-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Formulaire d'inscription</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="mb-4 p-4 bg-eau-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Formation :</strong> {formationTitle}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Date :</strong> {new Date(session.date).toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Lieu :</strong> {session.location}
        </p>
      </div>

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
            {loading ? "Envoi en cours..." : "Envoyer l'inscription"}
          </Button>
          <Button type="button" variant="ghost" onClick={onClose}>
            Annuler
          </Button>
        </div>
      </form>
    </Card>
  );
}
