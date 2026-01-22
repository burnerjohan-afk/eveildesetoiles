import { getSession } from "@/lib/auth";
import { requireMissionAccess } from "@/lib/access";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { AssignmentEditor } from "@/components/portal/AssignmentEditor";
import { DocumentUploader } from "@/components/portal/DocumentUploader";

export default async function MissionDetailPage({
  params,
}: {
  params: { missionId: string };
}) {
  const session = await getSession();

  if (!session || session.role !== "CLIENT") {
    return <div>Erreur: session invalide</div>;
  }

  // Vérifier l'accès
  const access = await requireMissionAccess(params.missionId);
  if (!access.allowed) {
    notFound();
  }

  const mission = await db.mission.findUnique({
    where: { id: params.missionId },
    include: {
      formationCatalog: true,
      participants: {
        include: {
          personnel: true,
        },
      },
      documents: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!mission) {
    notFound();
  }

  const isLocked = mission.lockedAt !== null;

  // Récupérer le personnel de l'organisation
  const personnel = await db.personnel.findMany({
    where: { organisationId: mission.organisationId },
    orderBy: { lastName: "asc" },
  });

  const docsProvided = mission.documents.filter(
    (d) => d.category === "PROVIDED"
  );
  const docsReceived = mission.documents.filter(
    (d) => d.category === "ATTESTATION" || d.category === "OPCO"
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {mission.formationCatalog.title}
        </h1>
        <div className="mt-2 flex items-center gap-4">
          <Badge
            className={
              mission.status === "IN_PROGRESS"
                ? "bg-etoile-100 text-etoile-800"
                : mission.status === "COMPLETED"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }
          >
            {mission.status === "PREPARATION" && "Préparation"}
            {mission.status === "IN_PROGRESS" && "En cours"}
            {mission.status === "COMPLETED" && "Terminée"}
            {mission.status === "ARCHIVED" && "Archivée"}
          </Badge>
          {isLocked && (
            <span className="text-sm text-gray-500 italic">
              Formation clôturée
            </span>
          )}
        </div>
      </div>

      <Tabs
        tabs={[
          {
            id: "participants",
            label: "Participants",
            content: (
              <AssignmentEditor
                mission={mission}
                personnel={personnel}
                isLocked={isLocked}
              />
            ),
          },
          {
            id: "docs-provided",
            label: "Documents à fournir",
            content: (
              <DocumentUploader
                missionId={mission.id}
                documents={docsProvided}
                category="PROVIDED"
                isLocked={isLocked}
              />
            ),
          },
          {
            id: "docs-received",
            label: "Documents reçus",
            content: (
              <DocumentUploader
                missionId={mission.id}
                documents={docsReceived}
                category="ATTESTATION"
                isLocked={true}
                readOnly={true}
              />
            ),
          },
        ]}
      />
    </div>
  );
}
