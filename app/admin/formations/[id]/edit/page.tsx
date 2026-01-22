"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export default function EditFormationPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    subtitle: "",
    objectives: "",
    content: "",
    modalities: "",
    pricing: "",
    locations: "",
    duration: "",
    targetAudience: "",
    pricingEmployer: "",
    pricingPersonal: "",
    inscriptionFormUrl: "",
    isActive: true,
  });

  useEffect(() => {
    loadFormation();
  }, [id]);

  const loadFormation = async () => {
    try {
      const res = await fetch(`/api/admin/formations/${id}`);
      if (res.ok) {
        const { formation } = await res.json();
        setFormData({
          slug: formation.slug,
          title: formation.title,
          subtitle: formation.subtitle || "",
          objectives: formation.objectives.join("\n"),
          content: formation.content.join("\n"),
          modalities: formation.modalities.join("\n"),
          pricing: formation.pricing || "",
          locations: formation.locations.join("\n"),
          duration: formation.duration || "",
          targetAudience: formation.targetAudience || "",
          pricingEmployer: formation.pricingEmployer || "",
          pricingPersonal: formation.pricingPersonal || "",
          inscriptionFormUrl: formation.inscriptionFormUrl || "",
          isActive: formation.isActive,
        });
      }
    } catch (error) {
      console.error("Error loading formation:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/formations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          objectives: formData.objectives.split("\n").filter((o) => o.trim()),
          content: formData.content.split("\n").filter((c) => c.trim()),
          modalities: formData.modalities.split("\n").filter((m) => m.trim()),
          locations: formData.locations.split("\n").filter((l) => l.trim()),
          duration: formData.duration || null,
          targetAudience: formData.targetAudience || null,
          pricingEmployer: formData.pricingEmployer || null,
          pricingPersonal: formData.pricingPersonal || null,
          inscriptionFormUrl: formData.inscriptionFormUrl || null,
        }),
      });

      if (res.ok) {
        router.push("/admin/formations");
      } else {
        const error = await res.json();
        alert(error.error || "Erreur lors de la sauvegarde");
      }
    } catch (error) {
      alert("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette formation ?")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/formations/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.push("/admin/formations");
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (error) {
      alert("Erreur lors de la suppression");
    }
  };

  if (loading) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6">
        <button
          onClick={() => router.push("/admin/formations")}
          className="text-eau-600 hover:text-eau-800 mb-4 inline-flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour aux formations
        </button>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Modifier la formation</h1>
          <Link href={`/admin/formations/${id}/sessions`}>
            <Button variant="secondary">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Gérer les sessions
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Slug (URL-friendly)"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
          />

          <Input
            label="Titre"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <Input
            label="Sous-titre (optionnel)"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          />

          <Textarea
            label="Objectifs (un par ligne)"
            value={formData.objectives}
            onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
            rows={4}
            required
          />

          <Textarea
            label="Contenu (un par ligne)"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={4}
            required
          />

          <Textarea
            label="Modalités (un par ligne)"
            value={formData.modalities}
            onChange={(e) => setFormData({ ...formData, modalities: e.target.value })}
            rows={3}
            required
          />

          <Input
            label="Durée (ex: 1 jour, 2 jours)"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          />

          <Textarea
            label="À qui s'adresse cette formation ? (public cible)"
            value={formData.targetAudience}
            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
            rows={2}
            placeholder="Ex: Formation pour les responsables Petite Enfance, porteurs de projets sans prérequis : directrice, directeur, référent technique..."
          />

          <Textarea
            label="Lieux (un par ligne)"
            value={formData.locations}
            onChange={(e) => setFormData({ ...formData, locations: e.target.value })}
            rows={2}
          />

          <Input
            label="Tarif général (optionnel)"
            value={formData.pricing}
            onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
            placeholder="Ex: Sur devis"
          />

          <Input
            label="Tarif Employeur / Pôle Emploi (optionnel)"
            value={formData.pricingEmployer}
            onChange={(e) => setFormData({ ...formData, pricingEmployer: e.target.value })}
            placeholder="Ex: 415,00 € HT"
          />

          <Input
            label="Tarif Personnel (optionnel)"
            value={formData.pricingPersonal}
            onChange={(e) => setFormData({ ...formData, pricingPersonal: e.target.value })}
            placeholder="Ex: 275,00 € HT"
          />

          <Input
            label="URL du bulletin d'inscription (optionnel)"
            value={formData.inscriptionFormUrl}
            onChange={(e) => setFormData({ ...formData, inscriptionFormUrl: e.target.value })}
            placeholder="https://..."
            type="url"
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="isActive" className="text-sm text-gray-700">
              Active
            </label>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={saving}>
              {saving ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
            >
              Annuler
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={handleDelete}
            >
              Supprimer
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
