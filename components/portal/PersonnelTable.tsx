"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Personnel } from "@prisma/client";

interface PersonnelTableProps {
  personnel: Personnel[];
}

export function PersonnelTable({ personnel }: PersonnelTableProps) {
  if (personnel.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Aucun personnel enregistré.</p>
        <Link href="/portal/personnel/new">
          <Button>Ajouter la première personne</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nom
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fonction
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {personnel.map((person) => (
            <tr key={person.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {person.firstName} {person.lastName}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{person.position || "-"}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {person.email && <div>{person.email}</div>}
                  {person.phone && <div>{person.phone}</div>}
                  {!person.email && !person.phone && "-"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link href={`/portal/personnel/${person.id}/edit`}>
                  <Button variant="secondary" size="sm">
                    Modifier
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
