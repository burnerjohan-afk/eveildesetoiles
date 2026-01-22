import { getSession } from "@/lib/auth";
import { requireAdmin } from "@/lib/access";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export default async function DocumentsPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  // Récupérer tous les documents groupés par mission
  const missions = await db.mission.findMany({
    include: {
      organisation: { select: { name: true } },
      formationCatalog: { select: { title: true } },
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
          Tous les documents classés par formation
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

            return (
              <Card key={mission.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {mission.formationCatalog.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {mission.organisation.name}
                    </p>
                    <Link
                      href={`/admin/missions/${mission.id}`}
                      className="text-sm text-eau-600 hover:text-eau-700"
                    >
                      Voir la formation →
                    </Link>
                  </div>
                </div>

                <div className="space-y-2">
                  {mission.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-gray-900">
                          {doc.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {doc.fileName} •{" "}
                          {(doc.sizeBytes / 1024).toFixed(1)} KB •{" "}
                          {doc.category} •{" "}
                          {new Date(doc.createdAt).toLocaleDateString("fr-FR")}
                        </div>
                      </div>
                      <a
                        href={`/api/documents/${doc.id}/download`}
                        className="text-sm text-eau-600 hover:text-eau-700"
                      >
                        Télécharger
                      </a>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
