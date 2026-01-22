"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Star } from "@/components/ui/Stars";
import { Formation } from "@/lib/storage";

export default function DevisPage() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [formation, setFormation] = useState<Formation | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const type = searchParams.get("type") || ""; // "formation", "prestation", "accompagnement"
  const id = searchParams.get("id") || "";
  const title = searchParams.get("title") || "";
  const pricing = searchParams.get("pricing") || "";
  const pricingEmployer = searchParams.get("pricingEmployer") || "";
  const pricingPersonal = searchParams.get("pricingPersonal") || "";
  const hasPricing = pricing || pricingEmployer || pricingPersonal;

  const [availablePeriods, setAvailablePeriods] = useState<Array<{ value: string; label: string }>>([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    serviceType: type === "formation" ? "Formation" : type === "prestation" ? "Prestation" : "Accompagnement",
    serviceTitle: decodeURIComponent(title),
    desiredPeriod: "",
    message: "",
  });

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
        
        // Extraire les périodes disponibles depuis les sessions
        if (data.formation.sessions && data.formation.sessions.length > 0) {
          const periods = data.formation.sessions
            .filter((s: any) => s.isActive && new Date(s.date) >= new Date(new Date().setHours(0, 0, 0, 0)))
            .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map((s: any) => {
              const date = new Date(s.date);
              const dateStr = date.toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              return {
                value: s.date,
                label: `${dateStr}${s.time ? ` - ${s.time}` : ""} - ${s.location}`,
              };
            });
          setAvailablePeriods(periods);
        }
      }
    } catch (error) {
      console.error("Error loading formation:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          subject: `Demande de devis - ${formData.serviceTitle}`,
          type: "devis",
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-16 bg-gradient-to-b from-white via-etoile-50/20 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Demande envoyée !</h2>
            <p className="text-gray-600 mb-6">
              Votre demande de devis a été transmise. Nous vous contacterons rapidement.
            </p>
            <a href="/">
              <Button>Retour à l'accueil</Button>
            </a>
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Demande de devis</h1>
            <Star size="md" color="eau" animated={true} />
          </div>
          <p className="text-xl text-gray-600">
            Remplissez ce formulaire pour recevoir un devis personnalisé
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <Card className={`transform transition-all duration-500 hover:shadow-xl ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eau-500 focus:border-eau-500 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eau-500 focus:border-eau-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eau-500 focus:border-eau-500 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eau-500 focus:border-eau-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Structure / Entreprise
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eau-500 focus:border-eau-500 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="serviceTitle" className="block text-sm font-medium text-gray-700 mb-2">
                    {formData.serviceType}
                  </label>
                  <input
                    type="text"
                    id="serviceTitle"
                    value={formData.serviceTitle}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                  />
                </div>

                <div>
                  <label htmlFor="desiredPeriod" className="block text-sm font-medium text-gray-700 mb-2">
                    Période souhaitée *
                  </label>
                  {type === "formation" && availablePeriods.length > 0 ? (
                    <select
                      id="desiredPeriod"
                      required
                      value={formData.desiredPeriod}
                      onChange={(e) => setFormData({ ...formData, desiredPeriod: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eau-500 focus:border-eau-500 transition-all bg-white"
                    >
                      <option value="">Sélectionnez une période</option>
                      {availablePeriods.map((period, index) => (
                        <option key={index} value={period.value}>
                          {period.label}
                        </option>
                      ))}
                      <option value="autre">Autre période (préciser dans le message)</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      id="desiredPeriod"
                      required
                      value={formData.desiredPeriod}
                      onChange={(e) => setFormData({ ...formData, desiredPeriod: e.target.value })}
                      placeholder={type === "formation" ? "Aucune session disponible pour le moment" : "Ex: Janvier 2024, ou période flexible"}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eau-500 focus:border-eau-500 transition-all"
                    />
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message / Informations complémentaires
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eau-500 focus:border-eau-500 transition-all"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? "Envoi en cours..." : "Envoyer la demande de devis"}
                </Button>
              </form>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Paiement direct (si prix disponible) */}
            {hasPricing && formation && formation.sessions && formation.sessions.length > 0 && (
              <Card className={`transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-etoile-100 rounded-full mb-4">
                    <svg className="w-6 h-6 text-etoile-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Payer directement</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Choisissez une session et payez en ligne
                  </p>
                  <a href={`/devis/paiement?type=${type}&id=${id}&title=${encodeURIComponent(title)}`}>
                    <Button className="w-full bg-etoile-600 hover:bg-etoile-700 transform transition-all duration-300 hover:scale-105">
                      Voir les sessions disponibles
                    </Button>
                  </a>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
