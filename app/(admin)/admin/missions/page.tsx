import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { AdminTable } from "@/components/admin/AdminTable";

export default async function MissionsPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const missions = await db.mission.findMany({
    include: {
      organisation: { select: { name: true } },
      formationCatalog: { select: { title: true } },
      _count: {
        select: {
          participants: true,
          documents: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Formations</h1>
          <p className="text-gray-600 mt-2">
            Gérez les formations vendues aux entreprises
          </p>
        </div>
        <Link href="/admin/missions/new">
          <Button>Créer une formation</Button>
        </Link>
      </div>

      <Card className="p-6">
        <AdminTable
          data={missions.map((m) => ({
            id: m.id,
            formation: m.formationCatalog.title,
            organisation: m.organisation.name,
            status: m.status,
            participants: m._count.participants,
            documents: m._count.documents,
            createdAt: new Date(m.createdAt).toLocaleDateString("fr-FR"),
          }))}
          columns={[
            { key: "formation", label: "Formation" },
            { key: "organisation", label: "Organisation" },
            { key: "status", label: "Statut" },
            { key: "participants", label: "Participants" },
            { key: "documents", label: "Documents" },
            { key: "createdAt", label: "Créée le" },
          ]}
          actions={(id) => (
            <Link href={`/admin/missions/${id}`}>
              <Button variant="secondary" size="sm">
                Voir
              </Button>
            </Link>
          )}
        />
      </Card>
    </div>
  );
}
