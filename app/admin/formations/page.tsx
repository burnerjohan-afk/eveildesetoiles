import { getFormations } from "@/lib/storage";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export default async function AdminFormationsPage() {
  const formations = await getFormations();
  formations.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Formations</h1>
        <Link href="/admin/formations/new">
          <Button>+ Nouvelle formation</Button>
        </Link>
      </div>

      {formations.length === 0 ? (
        <Card>
          <p className="text-gray-500">Aucune formation pour le moment.</p>
          <Link href="/admin/formations/new">
            <Button className="mt-4">Créer la première formation</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {formations.map((formation) => (
            <Card key={formation.id}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{formation.title}</h3>
                    {formation.isActive ? (
                      <Badge variant="success">Active</Badge>
                    ) : (
                      <Badge variant="warning">Inactive</Badge>
                    )}
                  </div>
                  {formation.subtitle && (
                    <p className="text-gray-600 mb-2">{formation.subtitle}</p>
                  )}
                  <p className="text-sm text-gray-500">Slug: {formation.slug}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Link href={`/admin/formations/${formation.id}/sessions`}>
                    <Button variant="ghost" size="sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Sessions
                    </Button>
                  </Link>
                  <Link href={`/admin/formations/${formation.id}/edit`}>
                    <Button variant="secondary" size="sm">
                      Modifier
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
