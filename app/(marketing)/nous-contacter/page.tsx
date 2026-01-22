"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { config } from "@/lib/config";
import { Star } from "@/components/ui/Stars";
import Link from "next/link";

function NousContacterForm() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [services, setServices] = useState<Array<{ id: string; title: string; slug: string }>>([]);
  const [formations, setFormations] = useState<Array<{ id: string; title: string; slug: string }>>([]);
  const [accompagnements, setAccompagnements] = useState<Array<{ title: string; slug: string }>>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  useEffect(() => {
    setMounted(true);
    
    // Charger les données
    const loadData = async () => {
      try {
        const [servicesRes, formationsRes] = await Promise.all([
          fetch("/api/services"),
          fetch("/api/formations"),
        ]);

        if (servicesRes.ok) {
          const servicesData = await servicesRes.json();
          setServices(servicesData.services?.map((s: any) => ({ id: s.id, title: s.title, slug: s.slug })) || []);
        }

        if (formationsRes.ok) {
          const formationsData = await formationsRes.json();
          const formationsList = formationsData.formations || [];
          console.log("Formations chargées:", formationsList.length, formationsList);
          // S'assurer que chaque formation a un id (générer un id basé sur le slug si manquant)
          const mappedFormations = formationsList.map((f: any) => ({ 
            id: f.id || `formation-${f.slug || Date.now()}`, 
            title: f.title, 
            slug: f.slug 
          }));
          console.log("Formations mappées:", mappedFormations);
          setFormations(mappedFormations);
        } else {
          console.error("Erreur lors du chargement des formations:", formationsRes.status);
        }

        // Liste des accompagnements fixes
        setAccompagnements([
          { title: "Directrice / Référent technique", slug: "directrice-referent-technique" },
          { title: "Relais de direction", slug: "relais-direction" },
          { title: "Projet d'établissement", slug: "projet-etablissement" },
          { title: "Accompagnement complet - Directrice / Référent", slug: "directrice-referent-complet" },
          { title: "Accompagnement complet - Relais de direction", slug: "relais-direction-complet" },
          { title: "Accompagnement complet - Projet d'établissement", slug: "accompagnement-complet" },
        ]);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    // Pré-sélectionner l'élément si fourni via les paramètres URL
    const preSelectedType = searchParams.get("type");
    const preSelectedId = searchParams.get("id");
    const preSelectedTitle = searchParams.get("title");

    if (preSelectedType && preSelectedId && preSelectedTitle) {
      const value = `${preSelectedType}-${preSelectedId}`;
      setSelectedItems([value]);
    } else if (preSelectedType === "accompagnement" && preSelectedTitle) {
      // Pour les accompagnements, on cherche par titre
      const matchingAccompagnement = accompagnements.find(a => a.title === preSelectedTitle);
      if (matchingAccompagnement) {
        setSelectedItems([`accompagnement-${matchingAccompagnement.slug}`]);
      }
    }
  }, [searchParams, accompagnements]);

  const handleCheckboxChange = (value: string) => {
    setSelectedItems(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
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
          subject: `Demande de devis - ${selectedItems.length} service(s) sélectionné(s)`,
          type: "devis",
          selectedServices: selectedItems,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setSelectedItems([]);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            company: "",
            message: "",
          });
        }, 3000);
      } else {
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = () => {
    window.open(config.calendlyUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-eau-50/30 to-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star size="md" color="etoile" animated={true} />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Prendre contact</h1>
            <Star size="md" color="eau" animated={true} />
          </div>
          <p className="text-xl text-gray-600">Demandez un devis ou réservez un rendez-vous</p>
        </div>

        {submitted ? (
          <Card className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Demande envoyée !</h2>
            <p className="text-gray-600 mb-6">Nous vous contacterons rapidement.</p>
            <Link href="/">
              <Button>Retour à l'accueil</Button>
            </Link>
          </Card>
        ) : (
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sélection des services */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-4">
                  Sélectionnez les prestations, formations ou accompagnements qui vous intéressent *
                </label>
                
                {/* Organisation par catégories */}
                <div className="space-y-4">
                  {/* Prestations */}
                  {services.length > 0 && (
                    <div className="border border-eau-200 rounded-xl p-4 bg-gradient-to-br from-eau-50/50 to-white">
                      <h3 className="text-sm font-semibold text-eau-700 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-eau-500"></span>
                        Prestations ({services.length})
                      </h3>
                      <div className="space-y-2 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-eau-300 scrollbar-track-gray-100">
                        {services.map((service) => {
                          const value = `prestation-${service.id}`;
                          return (
                            <label
                              key={value}
                              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                                selectedItems.includes(value)
                                  ? "bg-eau-100 border-2 border-eau-400"
                                  : "bg-white border border-gray-200 hover:border-eau-300 hover:bg-eau-50/50"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(value)}
                                onChange={() => handleCheckboxChange(value)}
                                className="w-5 h-5 text-eau-600 border-gray-300 rounded focus:ring-2 focus:ring-eau-500 focus:ring-offset-2 cursor-pointer"
                              />
                              <span className="text-sm font-medium text-gray-900 flex-1">{service.title}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Formations */}
                  {formations.length > 0 && (
                    <div className="border border-etoile-200 rounded-xl p-4 bg-gradient-to-br from-etoile-50/50 to-white">
                      <h3 className="text-sm font-semibold text-etoile-700 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-etoile-500"></span>
                        Formations ({formations.length})
                      </h3>
                      <div className="space-y-2 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-etoile-300 scrollbar-track-gray-100">
                        {formations.map((formation) => {
                          const value = `formation-${formation.id}`;
                          return (
                            <label
                              key={value}
                              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                                selectedItems.includes(value)
                                  ? "bg-etoile-100 border-2 border-etoile-400"
                                  : "bg-white border border-gray-200 hover:border-etoile-300 hover:bg-etoile-50/50"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(value)}
                                onChange={() => handleCheckboxChange(value)}
                                className="w-5 h-5 text-etoile-600 border-gray-300 rounded focus:ring-2 focus:ring-etoile-500 focus:ring-offset-2 cursor-pointer"
                              />
                              <span className="text-sm font-medium text-gray-900 flex-1">{formation.title}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Accompagnements */}
                  {accompagnements.length > 0 && (
                    <div className="border border-orange-200 rounded-xl p-4 bg-gradient-to-br from-orange-50/50 to-white">
                      <h3 className="text-sm font-semibold text-orange-700 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                        Accompagnements ({accompagnements.length})
                      </h3>
                      <div className="space-y-2 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-gray-100">
                        {accompagnements.map((accompagnement) => {
                          const value = `accompagnement-${accompagnement.slug}`;
                          return (
                            <label
                              key={value}
                              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                                selectedItems.includes(value)
                                  ? "bg-orange-100 border-2 border-orange-400"
                                  : "bg-white border border-gray-200 hover:border-orange-300 hover:bg-orange-50/50"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(value)}
                                onChange={() => handleCheckboxChange(value)}
                                className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 cursor-pointer"
                              />
                              <span className="text-sm font-medium text-gray-900 flex-1">{accompagnement.title}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Message de validation */}
                {selectedItems.length === 0 && (
                  <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2">
                    <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-sm text-amber-800 font-medium">Veuillez sélectionner au moins un élément</p>
                  </div>
                )}
                {selectedItems.length > 0 && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-green-800 font-medium">
                      {selectedItems.length} élément{selectedItems.length > 1 ? "s" : ""} sélectionné{selectedItems.length > 1 ? "s" : ""}
                    </p>
                  </div>
                )}
              </div>

              {/* Informations de contact */}
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

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1"
                  disabled={loading || selectedItems.length === 0}
                >
                  {loading ? "Envoi en cours..." : "Demander un devis"}
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="secondary"
                  onClick={handleReserve}
                  className="flex-1"
                >
                  Réserver
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function NousContacterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-white via-eau-50/30 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Chargement...</p>
          </div>
        </div>
      </div>
    }>
      <NousContacterForm />
    </Suspense>
  );
}
