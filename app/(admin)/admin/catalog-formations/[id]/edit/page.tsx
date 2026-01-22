"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";

export default function EditFormationCatalogPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    description: "",
    isActive: true,
  });

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await fetch(`/api/formation-catalog/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            slug: data.formation.slug || "",
            title: data.formation.title || "",
            description: data.formation.description || "",
            isActive: data.formation.isActive ?? true,
          });
        }
      } catch (error) {
        console.error("Error fetching formation:", error);
      } finally {
        setFetching(false);
      }
    };

    if (params.id) {
      fetchFormation();
    }
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/formation-catalog/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/catalog-formations");
      } else {
        const data = await response.json();
        alert(data.error || "Erreur lors de la modification");
      }
    } catch (error) {
      alert("Erreur lors de la modification");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Modifier la formation</h1>
        <p className="text-gray-600 mt-2">Modifiez les informations de cette formation</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug *
            </label>
            <Input
              required
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titre *
            </label>
            <Input
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eau-500 focus:border-eau-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              className="w-4 h-4 text-eau-600 border-gray-300 rounded focus:ring-eau-500"
            />
            <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
              Formation active
            </label>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Enregistrement..." : "Enregistrer"}
            </Button>
            <Link href="/admin/catalog-formations">
              <Button type="button" variant="secondary">
                Annuler
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
