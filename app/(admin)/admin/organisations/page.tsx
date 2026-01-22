import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { AdminTable } from "@/components/admin/AdminTable";

export default async function OrganisationsPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const organisations = await db.organisation.findMany({
    include: {
      _count: {
        select: {
          clientUsers: true,
          missions: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Organisations</h1>
          <p className="text-gray-600 mt-2">
            Gérez les entreprises clientes et leurs utilisateurs
          </p>
        </div>
        <Link href="/admin/organisations/new">
          <Button>Créer une organisation</Button>
        </Link>
      </div>

      <Card className="p-6">
        <AdminTable
          data={organisations.map((org) => ({
            id: org.id,
            name: org.name,
            address: org.address || "-",
            users: org._count.clientUsers,
            missions: org._count.missions,
            createdAt: new Date(org.createdAt).toLocaleDateString("fr-FR"),
          }))}
          columns={[
            { key: "name", label: "Nom" },
            { key: "address", label: "Adresse" },
            { key: "users", label: "Utilisateurs" },
            { key: "missions", label: "Formations" },
            { key: "createdAt", label: "Créée le" },
          ]}
          actions={(id) => (
            <Link href={`/admin/organisations/${id}`}>
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
