import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  // Statistiques
  const stats = {
    totalOrganisations: await db.organisation.count(),
    totalMissions: await db.mission.count(),
    missionsEnPreparation: await db.mission.count({
      where: { status: "PREPARATION" },
    }),
    documentsRecents: await db.document.count({
      where: {
        createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      },
    }),
  };

  // Missions récentes
  const recentMissions = await db.mission.findMany({
    include: {
      organisation: { select: { name: true } },
      formationCatalog: { select: { title: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600 mt-2">Vue d'ensemble de la plateforme</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="text-sm text-gray-600">Organisations</div>
          <div className="text-3xl font-bold text-eau-600 mt-2">
            {stats.totalOrganisations}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-gray-600">Formations totales</div>
          <div className="text-3xl font-bold text-etoile-600 mt-2">
            {stats.totalMissions}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-gray-600">En préparation</div>
          <div className="text-3xl font-bold text-orange-600 mt-2">
            {stats.missionsEnPreparation}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-gray-600">Documents (7j)</div>
          <div className="text-3xl font-bold text-green-600 mt-2">
            {stats.documentsRecents}
          </div>
        </Card>
      </div>

      {/* Missions récentes */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Formations récentes</h2>
        {recentMissions.length === 0 ? (
          <p className="text-gray-500">Aucune formation pour le moment.</p>
        ) : (
          <div className="space-y-3">
            {recentMissions.map((mission) => (
              <div
                key={mission.id}
                className="flex justify-between items-center p-3 border border-gray-200 rounded-lg"
              >
                <div>
                  <div className="font-medium text-gray-900">
                    {mission.formationCatalog.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {mission.organisation.name}
                  </div>
                </div>
                <a
                  href={`/admin/missions/${mission.id}`}
                  className="text-sm text-eau-600 hover:text-eau-700"
                >
                  Voir →
                </a>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
