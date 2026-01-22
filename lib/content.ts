import { marketingContent } from "@/content/marketing";
import { defaultServices } from "@/content/services";
import { defaultFormations } from "@/content/formations";
import { defaultFAQ } from "@/content/faq";
import {
  getServices as getServicesFromStorage,
  getServiceBySlug as getServiceBySlugFromStorage,
  getFormations as getFormationsFromStorage,
  getFormationBySlug as getFormationBySlugFromStorage,
  type Service,
  type Formation,
} from "./storage";

/**
 * Récupère un contenu marketing (toujours depuis fichiers statiques, non modifiable)
 */
export async function getMarketingContent<T extends keyof typeof marketingContent>(
  key: T
): Promise<typeof marketingContent[T]> {
  return marketingContent[key];
}

/**
 * Récupère tous les services actifs depuis fichiers JSON ou retourne les fallbacks
 */
export async function getServices(): Promise<Service[]> {
  try {
    const services = await getServicesFromStorage();
    const activeServices = services.filter((s) => s.isActive);
    if (activeServices.length > 0) {
      return activeServices.sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    }
  } catch (error) {
    console.error("Error fetching services:", error);
  }

  return [];
}

/**
 * Récupère un service par slug depuis fichiers JSON ou retourne le fallback
 */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const service = await getServiceBySlugFromStorage(slug);
    if (service) {
      return service;
    }
  } catch (error) {
    console.error(`Error fetching service with slug ${slug}:`, error);
  }

  // Fallback: chercher dans les services par défaut
  const fallbackService = defaultServices.find((s) => s.slug === slug);
  if (fallbackService) {
    return {
      id: `fallback-${slug}`,
      slug: fallbackService.slug,
      title: fallbackService.title,
      problem: fallbackService.problem,
      bullets: fallbackService.bullets,
      benefits: fallbackService.benefits,
      modalities: fallbackService.modalities,
      pricingNote: fallbackService.pricingNote || null,
      isActive: fallbackService.isActive,
      updatedAt: new Date().toISOString(),
    } as Service;
  }

  return null;
}

/**
 * Récupère toutes les formations actives depuis fichiers JSON ou retourne les fallbacks
 */
export async function getFormations(): Promise<Formation[]> {
  try {
    const formations = await getFormationsFromStorage();
    const activeFormations = formations.filter((f) => f.isActive);
    if (activeFormations.length > 0) {
      return activeFormations.sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    }
  } catch (error) {
    console.error("Error fetching formations:", error);
  }

  return [];
}

/**
 * Récupère une formation par slug depuis fichiers JSON ou retourne le fallback
 */
export async function getFormationBySlug(slug: string): Promise<Formation | null> {
  try {
    const formation = await getFormationBySlugFromStorage(slug);
    if (formation) {
      return formation;
    }
  } catch (error) {
    console.error(`Error fetching formation with slug ${slug}:`, error);
  }

  // Fallback: chercher dans les formations par défaut
  const fallbackFormation = defaultFormations.find((f) => f.slug === slug);
  if (fallbackFormation) {
    return {
      id: `fallback-${slug}`,
      slug: fallbackFormation.slug,
      title: fallbackFormation.title,
      subtitle: fallbackFormation.subtitle || null,
      category: null,
      objectives: fallbackFormation.objectives,
      content: fallbackFormation.content,
      contentDetails: null,
      modalities: fallbackFormation.modalities,
      duration: null,
      targetAudience: null,
      pricing: fallbackFormation.pricing || null,
      pricingEmployer: null,
      pricingPersonal: null,
      locations: fallbackFormation.locations,
      sessions: [],
      inscriptionFormUrl: null,
      testimonials: null,
      satisfactionRate: null,
      participantCount: null,
      recommendationRate: null,
      isActive: fallbackFormation.isActive,
      updatedAt: new Date().toISOString(),
    } as Formation;
  }

  return null;
}

/**
 * Récupère la FAQ (toujours depuis fichiers statiques, non modifiable)
 */
export async function getFAQ() {
  return defaultFAQ;
}

/**
 * Récupère le contenu "À propos" (toujours depuis fichiers statiques, non modifiable)
 */
export async function getAboutContent() {
  return {
    story:
      "Éveil des Étoiles est né de la passion de Laetitia CHIN pour l'accompagnement des professionnels de la petite enfance. Forte de nombreuses années d'expérience sur le terrain, elle accompagne les structures dans leur développement et l'amélioration de leurs pratiques.",
    values: [
      "Respect de l'enfant et de son développement",
      "Accompagnement bienveillant des équipes",
      "Approche personnalisée et adaptée",
      "Éthique professionnelle et déontologie",
    ],
    author: "Laetitia CHIN",
  };
}

/**
 * Récupère un contenu site par clé (pour les clés non-marketing, toujours depuis fichiers statiques)
 */
export async function getSiteContent(key: string, defaultValue: string = ""): Promise<string> {
  // Pour l'instant, on retourne toujours la valeur par défaut
  // Les contenus marketing ne sont pas modifiables depuis l'admin
  return defaultValue;
}

/**
 * Récupère les services par défaut (pour fallback UI)
 */
export function getDefaultServices() {
  return defaultServices;
}

/**
 * Récupère les formations par défaut (pour fallback UI)
 */
export function getDefaultFormations() {
  return defaultFormations;
}
