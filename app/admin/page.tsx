import { Card } from "@/components/ui/Card";
import { getServices, getFormations } from "@/lib/storage";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const services = await getServices();
  const formations = await getFormations();
  const servicesCount = services.length;
  const formationsCount = formations.length;
  const activeServicesCount = services.filter((s) => s.isActive).length;
  const activeFormationsCount = formations.filter((f) => f.isActive).length;

  return (
    <div className="px-4 py-6 sm:px-0">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="text-sm font-medium text-gray-500">Prestations totales</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{servicesCount}</div>
          <div className="mt-2 text-sm text-gray-600">
            {activeServicesCount} actives
          </div>
        </Card>

        <Card>
          <div className="text-sm font-medium text-gray-500">Formations totales</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{formationsCount}</div>
          <div className="mt-2 text-sm text-gray-600">
            {activeFormationsCount} actives
          </div>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Actions rapides">
          <div className="space-y-3">
            <Link
              href="/admin/services/new"
              className="block w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
            >
              + Créer une prestation
            </Link>
            <Link
              href="/admin/formations/new"
              className="block w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
            >
              + Créer une formation
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
