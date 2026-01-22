import { getServiceBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { ServiceDetailTemplate } from "@/components/marketing/ServiceDetailTemplate";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) {
    return generatePageMetadata("Prestation", "");
  }
  return generatePageMetadata(service.title, service.problem);
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <ServiceDetailTemplate
      service={service}
      backUrl="/prestations"
      backLabel="Retour aux prestations"
    />
  );
}
