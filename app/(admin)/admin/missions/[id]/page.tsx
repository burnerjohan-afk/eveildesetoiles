import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { DocumentUploader } from "@/components/portal/DocumentUploader";

export default async function MissionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const mission = await db.mission.findUnique({
    where: { id: params.id },
    include: {
      organisation: true,
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

  const docsProvided = mission.documents.filter(
    (d) => d.category === "PROVIDED"
  );
  const docsAttestation = mission.documents.filter(
    (d) => d.category === "ATTESTATION"
  );
  const docsOpco = mission.documents.filter((d) => d.category === "OPCO");

  const handleLock = async () => {
    "use server";
    await db.mission.update({
      where: { id: params.id },
      data: {
        status: "COMPLETED",
        lockedAt: new Date(),
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {mission.formationCatalog.title}
          </h1>
          <p className="text-gray-600 mt-2">{mission.organisation.name}</p>
        </div>
        {!mission.lockedAt && (
          <form action={handleLock}>
            <Button type="submit" variant="secondary">
              Clôturer la formation
            </Button>
          </form>
        )}
      </div>

      <Tabs
        tabs={[
          {
            id: "info",
            label: "Informations",
            content: (
              <Card className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Statut
                    </label>
                    <div className="mt-1">
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
                    </div>
                  </div>
                  {mission.startDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Date de début
                      </label>
                      <p className="mt-1 text-gray-900">
                        {new Date(mission.startDate).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  )}
                  {mission.endDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Date de fin
                      </label>
                      <p className="mt-1 text-gray-900">
                        {new Date(mission.endDate).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  )}
                  {mission.notesAdmin && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Notes admin
                      </label>
                      <p className="mt-1 text-gray-900">{mission.notesAdmin}</p>
                    </div>
                  )}
                </div>
              </Card>
            ),
          },
          {
            id: "participants",
            label: "Participants",
            content: (
              <Card className="p-6">
                <h3 className="font-semibold mb-4">
                  {mission.participants.length} participant
                  {mission.participants.length > 1 ? "s" : ""}
                </h3>
                {mission.participants.length === 0 ? (
                  <p className="text-gray-500">Aucun participant affecté.</p>
                ) : (
                  <div className="space-y-2">
                    {mission.participants.map((p) => (
                      <div
                        key={p.id}
                        className="p-3 border border-gray-200 rounded-lg"
                      >
                        <div className="font-medium">
                          {p.personnel.firstName} {p.personnel.lastName}
                        </div>
                        {p.personnel.position && (
                          <div className="text-sm text-gray-500">
                            {p.personnel.position}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ),
          },
          {
            id: "docs-client",
            label: "Documents client",
            content: (
              <DocumentUploader
                missionId={mission.id}
                documents={docsProvided}
                category="PROVIDED"
                isLocked={false}
                readOnly={true}
              />
            ),
          },
          {
            id: "docs-admin",
            label: "Documents admin",
            content: (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-4">Attestations</h3>
                  <DocumentUploader
                    missionId={mission.id}
                    documents={docsAttestation}
                    category="ATTESTATION"
                    isLocked={false}
                    readOnly={false}
                  />
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Documents OPCO</h3>
                  <DocumentUploader
                    missionId={mission.id}
                    documents={docsOpco}
                    category="OPCO"
                    isLocked={false}
                    readOnly={false}
                  />
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
