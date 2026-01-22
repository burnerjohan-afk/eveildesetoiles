"use client";

import { useEffect, useState, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Star } from "@/components/ui/Stars";
import { FormationSession } from "@/lib/storage";
import Link from "next/link";

export default function PaiementPage() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [formation, setFormation] = useState<any>(null);
  const [selectedSession, setSelectedSession] = useState<FormationSession | null>(null);
  const [loading, setLoading] = useState(false);

  const type = searchParams.get("type") || "";
  const id = searchParams.get("id") || "";
  const title = searchParams.get("title") || "";

  useEffect(() => {
    setMounted(true);
    if (type === "formation" && id) {
      loadFormation();
    }
  }, [type, id]);

  const loadFormation = async () => {
    try {
      const response = await fetch(`/api/formations/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormation(data.formation);
      }
    } catch (error) {
      console.error("Error loading formation:", error);
    }
  };

  const handleStripeCheckout = async (session: FormationSession) => {
    setLoading(true);
    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formationId: id,
          formationTitle: title,
          sessionId: session.id,
          sessionDate: session.date,
          sessionLocation: session.location,
        }),
      });

      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url;
      } else {
        alert("Une erreur est survenue lors de la création de la session de paiement.");
      }
    } catch (error) {
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (!formation || !formation.sessions || formation.sessions.length === 0) {
    return (
      <div className="py-16 bg-gradient-to-b from-white via-etoile-50/20 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-12">
            <p className="text-gray-600 mb-4">Aucune session disponible pour cette formation.</p>
            <Link href={`/formations/${formation?.slug || ""}`}>
              <Button>Retour à la formation</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-b from-white via-etoile-50/20 to-white relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 right-10 w-32 h-32 bg-eau-200 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-etoile-200 rounded-full blur-3xl animate-float delay-200"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-12 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star size="md" color="etoile" animated={true} />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Paiement en ligne</h1>
            <Star size="md" color="eau" animated={true} />
          </div>
          <p className="text-xl text-gray-600">
            Choisissez une session et procédez au paiement
          </p>
        </div>

        <Card className={`transform transition-all duration-500 hover:shadow-xl ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 mb-6">Sélectionnez la session qui vous convient :</p>
          
          <div className="space-y-4">
            {formation.sessions
              .filter((s: FormationSession) => s.isActive && new Date(s.date) >= new Date(new Date().setHours(0, 0, 0, 0)))
              .sort((a: FormationSession, b: FormationSession) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((session: FormationSession) => (
                <div
                  key={session.id}
                  className={`p-4 border-2 rounded-lg transition-all duration-300 ${
                    selectedSession?.id === session.id
                      ? "border-etoile-500 bg-etoile-50 shadow-lg"
                      : "border-gray-200 hover:border-etoile-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        {new Date(session.date).toLocaleDateString("fr-FR", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      {session.time && (
                        <p className="text-sm text-gray-600">Horaires : {session.time}</p>
                      )}
                      <p className="text-sm text-gray-600">Lieu : {session.location}</p>
                      {session.maxParticipants && (
                        <p className="text-xs text-gray-500 mt-1">
                          {session.currentParticipants} / {session.maxParticipants} participants
                        </p>
                      )}
                    </div>
                    <Button
                      onClick={() => handleStripeCheckout(session)}
                      disabled={loading || (session.maxParticipants ? session.currentParticipants >= session.maxParticipants : false)}
                      className="ml-4"
                    >
                      {loading ? "Chargement..." : "Payer maintenant"}
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
