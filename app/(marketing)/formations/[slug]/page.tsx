import { getFormationBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { FormationDetailTemplate } from "@/components/marketing/FormationDetailTemplate";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const formation = await getFormationBySlug(params.slug);
  if (!formation) {
    return generatePageMetadata("Formation", "");
  }
  return generatePageMetadata(formation.title, formation.subtitle || "");
}

export default async function FormationDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const formation = await getFormationBySlug(params.slug);

  if (!formation) {
    notFound();
  }

  return (
    <FormationDetailTemplate
      formation={formation}
      backUrl="/formations"
      backLabel="Retour aux formations"
    />
  );
}
