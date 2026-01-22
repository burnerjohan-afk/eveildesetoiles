"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";

export default function NewMissionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [organisations, setOrganisations] = useState<any[]>([]);
  const [formations, setFormations] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    organisationId: "",
    formationCatalogId: "",
    status: "PREPARATION",
    startDate: "",
    endDate: "",
    notesAdmin: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orgsRes, formationsRes] = await Promise.all([
          fetch("/api/organisations"),
          fetch("/api/formation-catalog"),
        ]);

        if (orgsRes.ok) {
          const orgsData = await orgsRes.json();
          setOrganisations(orgsData.organisations || []);
        }

        if (formationsRes.ok) {
          const formationsData = await formationsRes.json();
          setFormations(formationsData.formations || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/missions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          startDate: formData.startDate || null,
          endDate: formData.endDate || null,
          notesAdmin: formData.notesAdmin || null,
        }),
      });

      if (response.ok) {
        router.push("/admin/missions");
      } else {
        const data = await response.json();
        alert(data.error || "Erreur lors de la création");
      }
    } catch (error) {
      alert("Erreur lors de la création");
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
        <h1 className="text-3xl font-bold text-gray-900">Créer une formation</h1>
        <p className="text-gray-600 mt-2">Créez une nouvelle formation pour une organisation</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organisation *
            </label>
            <select
              required
              value={formData.organisationId}
              onChange={(e) =>
                setFormData({ ...formData, organisationId: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eau-500 focus:border-eau-500"
            >
              <option value="">Sélectionnez une organisation</option>
              {organisations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Formation *
            </label>
            <select
              required
              value={formData.formationCatalogId}
              onChange={(e) =>
                setFormData({ ...formData, formationCatalogId: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eau-500 focus:border-eau-500"
            >
              <option value="">Sélectionnez une formation</option>
              {formations.map((formation) => (
                <option key={formation.id} value={formation.id}>
                  {formation.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Statut
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eau-500 focus:border-eau-500"
            >
              <option value="PREPARATION">Préparation</option>
              <option value="IN_PROGRESS">En cours</option>
              <option value="COMPLETED">Terminée</option>
              <option value="ARCHIVED">Archivée</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de début
              </label>
              <Input
                type="datetime-local"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de fin
              </label>
              <Input
                type="datetime-local"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes admin
            </label>
            <textarea
              value={formData.notesAdmin}
              onChange={(e) =>
                setFormData({ ...formData, notesAdmin: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eau-500 focus:border-eau-500"
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Création..." : "Créer"}
            </Button>
            <Link href="/admin/missions">
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
