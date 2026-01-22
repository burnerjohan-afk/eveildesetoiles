import { Hero } from "@/components/marketing/Hero";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { MethodSteps } from "@/components/marketing/MethodSteps";
import { Testimonials } from "@/components/marketing/Testimonials";
import { FAQ } from "@/components/marketing/FAQ";
import { ServicesPreview } from "@/components/marketing/ServicesPreview";
import { AccompagnementSection } from "@/components/marketing/AccompagnementSection";
import { CTASection } from "@/components/marketing/CTASection";
import {
  getMarketingContent,
  getServices,
  getDefaultServices,
  getFormations,
  getFAQ,
} from "@/lib/content";
import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata(
  "Accueil",
  "Accompagnement professionnel pour les structures de petite enfance. Formations, conseil et accompagnement personnalisé."
);

export default async function HomePage() {
  const heroTitle = await getMarketingContent("heroTitle");
  const heroSubtitle = await getMarketingContent("heroSubtitle");
  const heroCta = await getMarketingContent("heroCta");
  const heroCtaSecondary = await getMarketingContent("heroCtaSecondary");
  const problemTitle = await getMarketingContent("problemTitle");
  const problemSubtitle = await getMarketingContent("problemSubtitle");
  const problems = await getMarketingContent("problems");
  const methodTitle = await getMarketingContent("methodTitle");
  const methodSubtitle = await getMarketingContent("methodSubtitle");
  const methodSteps = await getMarketingContent("methodSteps");
  const testimonialsTitle = await getMarketingContent("testimonialsTitle");
  const testimonials = await getMarketingContent("testimonials");
  const ctaTitle = await getMarketingContent("ctaTitle");
  const ctaSubtitle = await getMarketingContent("ctaSubtitle");
  const ctaButton = await getMarketingContent("ctaButton");
  const faq = await getFAQ();

  const services = await getServices();
  const defaultServices = getDefaultServices();
  const displayServices = services.length > 0 ? services : defaultServices;
  
  const formations = await getFormations();
  
  // Liste des accompagnements disponibles (basée sur la structure du site)
  const accompagnements = [
    { title: "Directrice / Référent technique", slug: "directrice-referent-technique" },
    { title: "Relais de direction", slug: "relais-direction" },
    { title: "Projet d'établissement", slug: "projet-etablissement" },
    { title: "Accompagnement complet - Directrice / Référent", slug: "directrice-referent-complet" },
    { title: "Accompagnement complet - Relais de direction", slug: "relais-direction-complet" },
    { title: "Accompagnement complet - Projet d'établissement", slug: "accompagnement-complet" },
  ];

  return (
    <>
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        cta={heroCta}
        ctaSecondary={heroCtaSecondary}
        services={displayServices.map(s => ({ id: s.id, title: s.title, slug: s.slug }))}
        formations={formations.map(f => ({ id: f.id, title: f.title, slug: f.slug }))}
        accompagnements={accompagnements}
      />

      <FeatureGrid
        title={problemTitle}
        subtitle={problemSubtitle}
        items={problems}
      />

      <MethodSteps
        title={methodTitle}
        subtitle={methodSubtitle}
        steps={methodSteps}
      />

      <AccompagnementSection />

      <ServicesPreview services={displayServices} />

      <Testimonials title={testimonialsTitle} testimonials={testimonials} />

      <CTASection 
        title={ctaTitle} 
        subtitle={ctaSubtitle} 
        buttonText={ctaButton}
        services={displayServices.map(s => ({ id: s.id, title: s.title, slug: s.slug }))}
        formations={formations.map(f => ({ id: f.id, title: f.title, slug: f.slug }))}
        accompagnements={accompagnements}
      />

      <FAQ items={faq} />
    </>
  );
}
