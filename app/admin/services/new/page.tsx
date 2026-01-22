"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export default function NewServicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    problem: "",
    bullets: "",
    benefits: "",
    modalities: "",
    pricingNote: "",
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          bullets: formData.bullets.split("\n").filter((b) => b.trim()),
          benefits: formData.benefits.split("\n").filter((b) => b.trim()),
          modalities: formData.modalities.split("\n").filter((b) => b.trim()),
        }),
      });

      if (res.ok) {
        router.push("/admin/services");
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
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Nouvelle prestation</h1>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Slug (URL-friendly, ex: accompagnement-individuel)"
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

          <Textarea
            label="Problématique"
            value={formData.problem}
            onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
            rows={3}
            required
          />

          <Textarea
            label="Points clés (un par ligne)"
            value={formData.bullets}
            onChange={(e) => setFormData({ ...formData, bullets: e.target.value })}
            rows={4}
            required
          />

          <Textarea
            label="Bénéfices (un par ligne)"
            value={formData.benefits}
            onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
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
            label="Note tarifaire (optionnel)"
            value={formData.pricingNote}
            onChange={(e) => setFormData({ ...formData, pricingNote: e.target.value })}
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
