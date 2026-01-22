import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600 mt-2">Gestion des paramètres de la plateforme</p>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Compte administrateur</h2>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <p className="text-gray-900">{session.email}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Informations système</h2>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Environnement
            </label>
            <p className="text-gray-900">
              {process.env.NODE_ENV || "development"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
