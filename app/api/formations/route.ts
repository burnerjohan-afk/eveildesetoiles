import { NextResponse } from "next/server";
import { getFormations } from "@/lib/content";
import { getDefaultFormations } from "@/content/formations";

export async function GET() {
  try {
    let formations = await getFormations();
    
    // Si aucune formation dans le stockage, utiliser les formations par défaut
    if (formations.length === 0) {
      const defaultFormations = getDefaultFormations();
      formations = defaultFormations.map((f, index) => ({
        id: `default-${f.slug || `formation-${index}`}`,
        slug: f.slug,
        title: f.title,
        subtitle: f.subtitle || null,
        category: null,
        objectives: f.objectives || [],
        content: f.content || [],
        contentDetails: null,
        modalities: f.modalities || [],
        duration: null,
        targetAudience: null,
        pricing: f.pricing || null,
        pricingEmployer: null,
        pricingPersonal: null,
        locations: f.locations || [],
        sessions: [],
        inscriptionFormUrl: null,
        testimonials: null,
        satisfactionRate: null,
        participantCount: null,
        recommendationRate: null,
        isActive: f.isActive !== false,
        updatedAt: new Date().toISOString(),
      }));
    }
    
    // S'assurer que toutes les formations ont un id
    const formationsWithId = formations.map((f) => ({
      ...f,
      id: f.id || `formation-${f.slug || Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }));
    
    return NextResponse.json({ formations: formationsWithId });
  } catch (error) {
    console.error("Error fetching formations:", error);
    return NextResponse.json({ formations: [] }, { status: 500 });
  }
}
