"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import type { Organisation, ClientUser, Mission, Personnel } from "@prisma/client";
import type { FormationCatalog } from "@prisma/client";

interface OrganisationDetailProps {
  organisation: Organisation & {
    clientUsers: ClientUser[];
    missions: (Mission & {
      formationCatalog: FormationCatalog;
    })[];
    personnel: Personnel[];
  };
}

export function OrganisationDetail({ organisation }: OrganisationDetailProps) {
  return (
    <div className="space-y-6">
      {/* Informations générales */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Informations</h2>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700">Nom</label>
            <p className="text-gray-900">{organisation.name}</p>
          </div>
          {organisation.address && (
            <div>
              <label className="text-sm font-medium text-gray-700">Adresse</label>
              <p className="text-gray-900">{organisation.address}</p>
            </div>
          )}
          {organisation.opcoInfo && (
            <div>
              <label className="text-sm font-medium text-gray-700">OPCO</label>
              <p className="text-gray-900">{organisation.opcoInfo}</p>
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-gray-700">Créée le</label>
            <p className="text-gray-900">
              {new Date(organisation.createdAt).toLocaleDateString("fr-FR")}
            </p>
          </div>
        </div>
      </Card>

      {/* Utilisateurs */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Utilisateurs ({organisation.clientUsers.length})
          </h2>
          <Link href={`/admin/organisations/${organisation.id}/users/new`}>
            <button className="text-sm text-eau-600 hover:text-eau-700">
              + Ajouter un utilisateur
            </button>
          </Link>
        </div>
        {organisation.clientUsers.length === 0 ? (
          <p className="text-gray-500">Aucun utilisateur.</p>
        ) : (
          <div className="space-y-2">
            {organisation.clientUsers.map((user) => (
              <div
                key={user.id}
                className="p-3 border border-gray-200 rounded-lg flex justify-between items-center"
              >
                <div>
                  <div className="font-medium">{user.email}</div>
                  {user.name && (
                    <div className="text-sm text-gray-500">{user.name}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Formations */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          Formations ({organisation.missions.length})
        </h2>
        {organisation.missions.length === 0 ? (
          <p className="text-gray-500">Aucune formation.</p>
        ) : (
          <div className="space-y-2">
            {organisation.missions.map((mission) => (
              <Link
                key={mission.id}
                href={`/admin/missions/${mission.id}`}
                className="block p-3 border border-gray-200 rounded-lg hover:border-eau-300 hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">
                      {mission.formationCatalog.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(mission.createdAt).toLocaleDateString("fr-FR")}
                    </div>
                  </div>
                  <Badge
                    className={
                      mission.status === "IN_PROGRESS"
                        ? "bg-etoile-100 text-etoile-800"
                        : mission.status === "COMPLETED"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {mission.status === "PREPARATION" && "Préparation"}
                    {mission.status === "IN_PROGRESS" && "En cours"}
                    {mission.status === "COMPLETED" && "Terminée"}
                    {mission.status === "ARCHIVED" && "Archivée"}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card>

      {/* Personnel */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          Personnel ({organisation.personnel.length})
        </h2>
        {organisation.personnel.length === 0 ? (
          <p className="text-gray-500">Aucun personnel enregistré.</p>
        ) : (
          <div className="space-y-2">
            {organisation.personnel.map((person) => (
              <div
                key={person.id}
                className="p-3 border border-gray-200 rounded-lg"
              >
                <div className="font-medium">
                  {person.firstName} {person.lastName}
                </div>
                {person.position && (
                  <div className="text-sm text-gray-500">{person.position}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
