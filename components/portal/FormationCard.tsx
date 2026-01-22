"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Mission, FormationCatalog, MissionParticipant, Document } from "@prisma/client";

interface FormationCardProps {
  mission: Mission & {
    formationCatalog: FormationCatalog;
    participants: MissionParticipant[];
    documents: Document[];
  };
}

export function FormationCard({ mission }: FormationCardProps) {
  const statusColors = {
    PREPARATION: "bg-gray-100 text-gray-800",
    IN_PROGRESS: "bg-etoile-100 text-etoile-800",
    COMPLETED: "bg-green-100 text-green-800",
    ARCHIVED: "bg-gray-100 text-gray-600",
  };

  const statusLabels = {
    PREPARATION: "Préparation",
    IN_PROGRESS: "En cours",
    COMPLETED: "Terminée",
    ARCHIVED: "Archivée",
  };

  const docsProvided = mission.documents.filter(
    (d) => d.category === "PROVIDED"
  ).length;
  const docsReceived = mission.documents.filter(
    (d) => d.category === "ATTESTATION" || d.category === "OPCO"
  ).length;

  const isLocked = mission.lockedAt !== null;

  return (
    <Link href={`/portal/formations/${mission.id}`}>
      <Card className="p-6 hover:shadow-lg transition-all h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex-1">
            {mission.formationCatalog.title}
          </h3>
          <Badge className={statusColors[mission.status]}>
            {statusLabels[mission.status]}
          </Badge>
        </div>

        {mission.startDate && (
          <p className="text-sm text-gray-600 mb-2">
            Début: {new Date(mission.startDate).toLocaleDateString("fr-FR")}
          </p>
        )}

        <div className="mt-auto space-y-2 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Participants:</span>
            <span className="font-medium">{mission.participants.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Docs fournis:</span>
            <span className="font-medium">{docsProvided}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Docs reçus:</span>
            <span className="font-medium">{docsReceived}</span>
          </div>
        </div>

        {isLocked && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 italic">
              Formation clôturée - Lecture seule
            </p>
          </div>
        )}
      </Card>
    </Link>
  );
}
