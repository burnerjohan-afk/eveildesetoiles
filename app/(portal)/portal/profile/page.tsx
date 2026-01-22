import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { notFound } from "next/navigation";

export default async function ProfilePage() {
  const session = await getSession();

  if (!session || session.role !== "CLIENT" || !session.organisationId) {
    return <div>Erreur: session invalide</div>;
  }

  const organisation = await db.organisation.findUnique({
    where: { id: session.organisationId },
  });

  const clientUser = await db.clientUser.findUnique({
    where: { email: session.email },
  });

  if (!organisation || !clientUser) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mon profil</h1>
        <p className="text-gray-600 mt-2">Informations de votre compte</p>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Organisation</h2>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700">Nom</label>
            <p className="text-gray-900">{organisation.name}</p>
          </div>
          {organisation.address && (
            <div>
              <label className="text-sm font-medium text-gray-700">
                Adresse
              </label>
              <p className="text-gray-900">{organisation.address}</p>
            </div>
          )}
          {organisation.opcoInfo && (
            <div>
              <label className="text-sm font-medium text-gray-700">
                Informations OPCO
              </label>
              <p className="text-gray-900">{organisation.opcoInfo}</p>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Compte utilisateur</h2>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <p className="text-gray-900">{clientUser.email}</p>
          </div>
          {clientUser.name && (
            <div>
              <label className="text-sm font-medium text-gray-700">Nom</label>
              <p className="text-gray-900">{clientUser.name}</p>
            </div>
          )}
          {clientUser.lastLoginAt && (
            <div>
              <label className="text-sm font-medium text-gray-700">
                Dernière connexion
              </label>
              <p className="text-gray-900">
                {new Date(clientUser.lastLoginAt).toLocaleString("fr-FR")}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
