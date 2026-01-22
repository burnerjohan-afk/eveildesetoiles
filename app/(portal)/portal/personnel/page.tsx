import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { PersonnelTable } from "@/components/portal/PersonnelTable";

export default async function PersonnelPage() {
  const session = await getSession();

  if (!session || session.role !== "CLIENT" || !session.organisationId) {
    return <div>Erreur: session invalide</div>;
  }

  const personnel = await db.personnel.findMany({
    where: { organisationId: session.organisationId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Personnel</h1>
          <p className="text-gray-600 mt-2">
            Gérez le répertoire du personnel de votre organisation
          </p>
        </div>
        <Link href="/portal/personnel/new">
          <Button>Ajouter une personne</Button>
        </Link>
      </div>

      <Card className="p-6">
        <PersonnelTable personnel={personnel} />
      </Card>
    </div>
  );
}
