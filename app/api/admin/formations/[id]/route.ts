import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  getFormations,
  saveFormations,
  getFormationById,
} from "@/lib/storage";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formation = await getFormationById(params.id);

    if (!formation) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ formation });
  } catch (error) {
    console.error("Error fetching formation:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { 
      slug, 
      title, 
      subtitle, 
      objectives, 
      content, 
      modalities, 
      pricing, 
      locations, 
      isActive,
      sessions,
      duration,
      targetAudience,
      pricingEmployer,
      pricingPersonal,
      category,
      inscriptionFormUrl,
    } = body;

    const formations = await getFormations();
    const index = formations.findIndex((f) => f.id === params.id);

    if (index === -1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Vérifier si le slug existe déjà (sauf pour la formation actuelle)
    if (formations.some((f) => f.slug === slug && f.id !== params.id)) {
      return NextResponse.json({ error: "Ce slug existe déjà" }, { status: 400 });
    }

    formations[index] = {
      ...formations[index],
      slug,
      title,
      subtitle: subtitle || null,
      category: category || null,
      objectives: objectives || [],
      content: content || [],
      modalities: modalities || [],
      duration: duration || null,
      targetAudience: targetAudience || null,
      pricing: pricing || null,
      pricingEmployer: pricingEmployer || null,
      pricingPersonal: pricingPersonal || null,
      locations: locations || [],
      sessions: sessions || formations[index].sessions || [],
      inscriptionFormUrl: inscriptionFormUrl || null,
      isActive: isActive !== undefined ? isActive : true,
      updatedAt: new Date().toISOString(),
    };

    await saveFormations(formations);

    return NextResponse.json({ formation: formations[index] });
  } catch (error) {
    console.error("Error updating formation:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formations = await getFormations();
    const filtered = formations.filter((f) => f.id !== params.id);
    await saveFormations(filtered);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting formation:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
