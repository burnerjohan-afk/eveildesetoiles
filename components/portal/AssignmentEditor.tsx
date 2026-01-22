"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Mission, MissionParticipant, Personnel } from "@prisma/client";

interface AssignmentEditorProps {
  mission: Mission & {
    participants: (MissionParticipant & { personnel: Personnel })[];
  };
  personnel: Personnel[];
  isLocked: boolean;
}

export function AssignmentEditor({
  mission,
  personnel,
  isLocked,
}: AssignmentEditorProps) {
  const [selectedPersonnel, setSelectedPersonnel] = useState<string[]>(
    mission.participants.map((p) => p.personnelId)
  );
  const [loading, setLoading] = useState(false);

  const handleToggle = (personnelId: string) => {
    if (isLocked) return;
    setSelectedPersonnel((prev) =>
      prev.includes(personnelId)
        ? prev.filter((id) => id !== personnelId)
        : [...prev, personnelId]
    );
  };

  const handleSave = async () => {
    if (isLocked) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/missions/${mission.id}/participants`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personnelIds: selectedPersonnel }),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        alert("Erreur lors de la sauvegarde");
      }
    } catch (error) {
      alert("Erreur lors de la sauvegarde");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {isLocked && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            Cette formation est clôturée. Les affectations ne peuvent plus être modifiées.
          </p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Sélectionnez le personnel à affecter à cette formation
        </p>
        {!isLocked && (
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Enregistrement..." : "Enregistrer"}
          </Button>
        )}
      </div>

      {personnel.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500 mb-4">
            Aucun personnel enregistré. Ajoutez du personnel pour pouvoir l'affecter aux formations.
          </p>
          <a href="/portal/personnel/new">
            <Button>Ajouter du personnel</Button>
          </a>
        </Card>
      ) : (
        <div className="space-y-2">
          {personnel.map((person) => {
            const isSelected = selectedPersonnel.includes(person.id);
            return (
              <label
                key={person.id}
                className={`
                  flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all
                  ${
                    isSelected
                      ? "border-eau-500 bg-eau-50"
                      : "border-gray-200 hover:border-gray-300"
                  }
                  ${isLocked ? "opacity-60 cursor-not-allowed" : ""}
                `}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleToggle(person.id)}
                  disabled={isLocked}
                  className="w-5 h-5 text-eau-600 border-gray-300 rounded focus:ring-eau-500"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {person.firstName} {person.lastName}
                  </div>
                  {person.position && (
                    <div className="text-sm text-gray-500">{person.position}</div>
                  )}
                </div>
              </label>
            );
          })}
        </div>
      )}

      {selectedPersonnel.length > 0 && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            {selectedPersonnel.length} personne{selectedPersonnel.length > 1 ? "s" : ""} sélectionnée
            {selectedPersonnel.length > 1 ? "s" : ""}
          </p>
        </div>
      )}
    </div>
  );
}
