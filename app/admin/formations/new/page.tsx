"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export default function NewFormationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    subtitle: "",
    objectives: "",
    content: "",
    modalities: "",
    pricing: "",
    locations: "",
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/formations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          objectives: formData.objectives.split("\n").filter((o) => o.trim()),
          content: formData.content.split("\n").filter((c) => c.trim()),
          modalities: formData.modalities.split("\n").filter((m) => m.trim()),
          locations: formData.locations.split("\n").filter((l) => l.trim()),
        }),
      });

      if (res.ok) {
        router.push("/admin/formations");
      } else {
        const error = await res.json();
        alert(error.error || "Erreur lors de la création");
      }
    } catch (error) {
      alert("Erreur lors de la création");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-6 sm:px-0">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Nouvelle formation</h1>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Slug (URL-friendly, ex: projet-peda)"
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
            label="Tarif (optionnel)"
            value={formData.pricing}
            onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
          />

          <Textarea
            label="Lieux (un par ligne)"
            value={formData.locations}
            onChange={(e) => setFormData({ ...formData, locations: e.target.value })}
            rows={2}
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
            <Button type="submit" disabled={loading}>
              {loading ? "Création..." : "Créer"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
            >
              Annuler
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
