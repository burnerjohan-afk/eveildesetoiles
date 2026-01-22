import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function PortalDashboardPage() {
  const session = await getSession();

  if (!session || session.role !== "CLIENT" || !session.organisationId) {
    return <div>Erreur: session invalide</div>;
  }

  // Récupérer l'organisation
  const organisation = await db.organisation.findUnique({
    where: { id: session.organisationId },
  });

  // Récupérer les missions
  const missions = await db.mission.findMany({
    where: { organisationId: session.organisationId },
    include: {
      formationCatalog: {
        select: { title: true },
      },
      participants: {
        select: { id: true },
      },
      documents: {
        select: { id: true, category: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  // Statistiques
  const stats = {
    totalMissions: await db.mission.count({
      where: { organisationId: session.organisationId },
    }),
    missionsEnCours: await db.mission.count({
      where: {
        organisationId: session.organisationId,
        status: { in: ["PREPARATION", "IN_PROGRESS"] },
      },
    }),
    totalPersonnel: await db.personnel.count({
      where: { organisationId: session.organisationId },
    }),
    documentsRecents: await db.document.count({
      where: {
        organisationId: session.organisationId,
        createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // 7 derniers jours
      },
    }),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600 mt-2">
          Bienvenue, {organisation?.name || "Organisation"}
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="text-sm text-gray-600">Formations totales</div>
          <div className="text-3xl font-bold text-eau-600 mt-2">{stats.totalMissions}</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-gray-600">En cours</div>
          <div className="text-3xl font-bold text-etoile-600 mt-2">
            {stats.missionsEnCours}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-gray-600">Personnel</div>
          <div className="text-3xl font-bold text-orange-600 mt-2">
            {stats.totalPersonnel}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-gray-600">Documents (7j)</div>
          <div className="text-3xl font-bold text-green-600 mt-2">
            {stats.documentsRecents}
          </div>
        </Card>
      </div>

      {/* Actions rapides */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/portal/personnel">
            <Button variant="secondary">Ajouter du personnel</Button>
          </Link>
          <Link href="/portal/formations">
            <Button variant="secondary">Voir mes formations</Button>
          </Link>
          <Link href="/portal/documents">
            <Button variant="secondary">Gérer les documents</Button>
          </Link>
        </div>
      </Card>

      {/* Formations récentes */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Mes formations</h2>
          <Link href="/portal/formations">
            <Button variant="secondary" size="sm">
              Voir tout
            </Button>
          </Link>
        </div>

        {missions.length === 0 ? (
          <p className="text-gray-500">Aucune formation pour le moment.</p>
        ) : (
          <div className="space-y-4">
            {missions.map((mission) => {
              const statusColors = {
                PREPARATION: "bg-gray-100 text-gray-800",
                IN_PROGRESS: "bg-etoile-100 text-etoile-800",
                COMPLETED: "bg-green-100 text-green-800",
                ARCHIVED: "bg-gray-100 text-gray-600",
              };

              const docsProvided = mission.documents.filter(
                (d) => d.category === "PROVIDED"
              ).length;
              const docsReceived = mission.documents.filter(
                (d) => d.category === "ATTESTATION" || d.category === "OPCO"
              ).length;

              return (
                <Link
                  key={mission.id}
                  href={`/portal/formations/${mission.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-eau-300 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {mission.formationCatalog.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                        <span>
                          {mission.participants.length} participant
                          {mission.participants.length > 1 ? "s" : ""}
                        </span>
                        <span>•</span>
                        <span>{docsProvided} doc(s) fourni(s)</span>
                        <span>•</span>
                        <span>{docsReceived} doc(s) reçu(s)</span>
                      </div>
                    </div>
                    <Badge className={statusColors[mission.status]}>
                      {mission.status === "PREPARATION" && "Préparation"}
                      {mission.status === "IN_PROGRESS" && "En cours"}
                      {mission.status === "COMPLETED" && "Terminée"}
                      {mission.status === "ARCHIVED" && "Archivée"}
                    </Badge>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
