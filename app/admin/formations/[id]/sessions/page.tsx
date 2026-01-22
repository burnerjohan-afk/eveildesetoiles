"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { FormationSession, Formation } from "@/lib/storage";

export default function FormationSessionsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formation, setFormation] = useState<Formation | null>(null);
  const [sessions, setSessions] = useState<FormationSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSession, setEditingSession] = useState<FormationSession | null>(null);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    location: "",
    maxParticipants: "",
    isActive: true,
  });

  useEffect(() => {
    loadFormation();
  }, [params.id]);

  const loadFormation = async () => {
    try {
      const res = await fetch(`/api/admin/formations/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setFormation(data);
        setSessions(data.sessions || []);
      }
    } catch (error) {
      console.error("Error loading formation:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const sessionData: Partial<FormationSession> = {
        date: formData.date,
        time: formData.time || undefined,
        location: formData.location,
        maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : undefined,
        isActive: formData.isActive,
        currentParticipants: editingSession?.currentParticipants || 0,
      };

      if (editingSession) {
        // Mettre à jour la session
        const updatedSessions = sessions.map((s) =>
          s.id === editingSession.id ? { ...editingSession, ...sessionData } : s
        );
        await updateSessions(updatedSessions);
      } else {
        // Créer une nouvelle session
        const newSession: FormationSession = {
          id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          ...sessionData,
          currentParticipants: 0,
        } as FormationSession;
        await updateSessions([...sessions, newSession]);
      }

      setShowForm(false);
      setEditingSession(null);
      setFormData({
        date: "",
        time: "",
        location: "",
        maxParticipants: "",
        isActive: true,
      });
      await loadFormation();
    } catch (error) {
      console.error("Error saving session:", error);
      alert("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const updateSessions = async (newSessions: FormationSession[]) => {
    if (!formation) return;

    const updatedFormation = {
      ...formation,
      sessions: newSessions,
    };

    const res = await fetch(`/api/admin/formations/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFormation),
    });

    if (!res.ok) {
      throw new Error("Failed to update sessions");
    }
  };

  const handleDelete = async (sessionId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette session ?")) return;

    const updatedSessions = sessions.filter((s) => s.id !== sessionId);
    await updateSessions(updatedSessions);
    await loadFormation();
  };

  const handleEdit = (session: FormationSession) => {
    setEditingSession(session);
    setFormData({
      date: session.date,
      time: session.time || "",
      location: session.location,
      maxParticipants: session.maxParticipants?.toString() || "",
      isActive: session.isActive,
    });
    setShowForm(true);
  };

  if (loading && !formation) {
    return <div className="p-8">Chargement...</div>;
  }

  if (!formation) {
    return <div className="p-8">Formation introuvable</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <button
          onClick={() => router.push(`/admin/formations/${params.id}/edit`)}
          className="text-eau-600 hover:text-eau-800 mb-4 inline-flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour à la formation
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Sessions - {formation.title}
        </h1>
        <p className="text-gray-600">Gérez les dates et lieux des sessions de formation</p>
      </div>

      <div className="mb-6">
        <Button onClick={() => {
          setShowForm(true);
          setEditingSession(null);
          setFormData({
            date: "",
            time: "",
            location: "",
            maxParticipants: "",
            isActive: true,
          });
        }}>
          + Ajouter une session
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {editingSession ? "Modifier la session" : "Nouvelle session"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <Input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heure
                </label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lieu *
                </label>
                <Input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Ex: À distance, Lyon, Aix en Pce..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre max de participants
                </label>
                <Input
                  type="number"
                  min="1"
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="rounded border-gray-300 text-eau-600 focus:ring-eau-500"
              />
              <label htmlFor="isActive" className="text-sm text-gray-700">
                Session active
              </label>
            </div>
            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {editingSession ? "Modifier" : "Créer"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setShowForm(false);
                  setEditingSession(null);
                }}
              >
                Annuler
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        {sessions.length === 0 ? (
          <Card>
            <p className="text-gray-600 text-center py-8">
              Aucune session programmée. Ajoutez-en une pour commencer.
            </p>
          </Card>
        ) : (
          sessions
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map((session) => (
              <Card key={session.id}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {new Date(session.date).toLocaleDateString("fr-FR", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </h3>
                      {!session.isActive && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          Inactive
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      {session.time && <p>Horaires : {session.time}</p>}
                      <p>Lieu : {session.location}</p>
                      {session.maxParticipants && (
                        <p>
                          Participants : {session.currentParticipants} / {session.maxParticipants}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEdit(session)}
                    >
                      Modifier
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(session.id)}
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
              </Card>
            ))
        )}
      </div>
    </div>
  );
}
