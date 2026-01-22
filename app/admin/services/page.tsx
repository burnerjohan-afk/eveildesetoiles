import { getServices } from "@/lib/storage";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export default async function AdminServicesPage() {
  const services = await getServices();
  services.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Prestations</h1>
        <Link href="/admin/services/new">
          <Button>+ Nouvelle prestation</Button>
        </Link>
      </div>

      {services.length === 0 ? (
        <Card>
          <p className="text-gray-500">Aucune prestation pour le moment.</p>
          <Link href="/admin/services/new">
            <Button className="mt-4">Créer la première prestation</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {services.map((service) => (
            <Card key={service.id}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    {service.isActive ? (
                      <Badge variant="success">Active</Badge>
                    ) : (
                      <Badge variant="warning">Inactive</Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{service.problem}</p>
                  <p className="text-sm text-gray-500">Slug: {service.slug}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Link href={`/admin/services/${service.id}/edit`}>
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
