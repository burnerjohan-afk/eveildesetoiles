import { getSession } from "@/lib/auth";
import { requireAdmin } from "@/lib/access";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { OrganisationDetail } from "@/components/admin/OrganisationDetail";

export default async function OrganisationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const organisation = await db.organisation.findUnique({
    where: { id: params.id },
    include: {
      clientUsers: true,
      missions: {
        include: {
          formationCatalog: {
            select: { title: true },
          },
        },
        orderBy: { createdAt: "desc" },
      },
      personnel: {
        orderBy: { lastName: "asc" },
      },
    },
  });

  if (!organisation) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {organisation.name}
          </h1>
          <p className="text-gray-600 mt-2">Détails de l'organisation</p>
        </div>
        <Link href="/admin/organisations">
          <Button variant="secondary">Retour</Button>
        </Link>
      </div>

      <OrganisationDetail organisation={organisation} />
    </div>
  );
}
