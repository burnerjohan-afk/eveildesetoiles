import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { FormationCard } from "@/components/portal/FormationCard";

export default async function FormationsPage() {
  const session = await getSession();

  if (!session || session.role !== "CLIENT" || !session.organisationId) {
    return <div>Erreur: session invalide</div>;
  }

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
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mes formations</h1>
        <p className="text-gray-600 mt-2">
          Gérez vos formations et suivez leur progression
        </p>
      </div>

      {missions.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-gray-500">Aucune formation pour le moment.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((mission) => (
            <FormationCard key={mission.id} mission={mission} />
          ))}
        </div>
      )}
    </div>
  );
}
