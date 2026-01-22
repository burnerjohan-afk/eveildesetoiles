import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export default async function DocumentsPage() {
  const session = await getSession();

  if (!session || session.role !== "CLIENT" || !session.organisationId) {
    return <div>Erreur: session invalide</div>;
  }

  // Récupérer tous les documents groupés par mission
  const missions = await db.mission.findMany({
    where: { organisationId: session.organisationId },
    include: {
      formationCatalog: {
        select: { title: true },
      },
      documents: {
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
        <p className="text-gray-600 mt-2">
          Tous vos documents classés par formation
        </p>
      </div>

      {missions.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-gray-500">Aucune formation avec des documents.</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {missions.map((mission) => {
            if (mission.documents.length === 0) return null;

            const docsProvided = mission.documents.filter(
              (d) => d.category === "PROVIDED"
            );
            const docsReceived = mission.documents.filter(
              (d) => d.category === "ATTESTATION" || d.category === "OPCO"
            );

            return (
              <Card key={mission.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {mission.formationCatalog.title}
                    </h2>
                    <Link
                      href={`/portal/formations/${mission.id}`}
                      className="text-sm text-eau-600 hover:text-eau-700"
                    >
                      Voir la formation →
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Documents fournis */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Documents fournis ({docsProvided.length})
                    </h3>
                    {docsProvided.length === 0 ? (
                      <p className="text-sm text-gray-500">Aucun document</p>
                    ) : (
                      <div className="space-y-2">
                        {docsProvided.map((doc) => (
                          <div
                            key={doc.id}
                            className="flex justify-between items-center p-2 bg-gray-50 rounded"
                          >
                            <span className="text-sm text-gray-700">
                              {doc.title}
                            </span>
                            <a
                              href={`/api/documents/${doc.id}/download`}
                              className="text-xs text-eau-600 hover:text-eau-700"
                            >
                              Télécharger
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Documents reçus */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Documents reçus ({docsReceived.length})
                    </h3>
                    {docsReceived.length === 0 ? (
                      <p className="text-sm text-gray-500">Aucun document</p>
                    ) : (
                      <div className="space-y-2">
                        {docsReceived.map((doc) => (
                          <div
                            key={doc.id}
                            className="flex justify-between items-center p-2 bg-gray-50 rounded"
                          >
                            <span className="text-sm text-gray-700">
                              {doc.title}
                            </span>
                            <a
                              href={`/api/documents/${doc.id}/download`}
                              className="text-xs text-eau-600 hover:text-eau-700"
                            >
                              Télécharger
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
