import { getSession } from "@/lib/auth";
import { requireAdmin } from "@/lib/access";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { AdminTable } from "@/components/admin/AdminTable";

export default async function CatalogFormationsPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const formations = await db.formationCatalog.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Catalogue formations
          </h1>
          <p className="text-gray-600 mt-2">
            Gérez le catalogue des formations disponibles
          </p>
        </div>
        <Link href="/admin/catalog-formations/new">
          <Button>Créer une formation</Button>
        </Link>
      </div>

      <Card className="p-6">
        <AdminTable
          data={formations.map((f) => ({
            id: f.id,
            slug: f.slug,
            title: f.title,
            isActive: f.isActive ? "Oui" : "Non",
            createdAt: new Date(f.createdAt).toLocaleDateString("fr-FR"),
          }))}
          columns={[
            { key: "slug", label: "Slug" },
            { key: "title", label: "Titre" },
            { key: "isActive", label: "Active" },
            { key: "createdAt", label: "Créée le" },
          ]}
          actions={(id) => (
            <Link href={`/admin/catalog-formations/${id}/edit`}>
              <Button variant="secondary" size="sm">
                Modifier
              </Button>
            </Link>
          )}
        />
      </Card>
    </div>
  );
}
