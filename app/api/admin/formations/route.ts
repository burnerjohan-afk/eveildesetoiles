import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  getFormations,
  saveFormations,
  generateId,
  type Formation,
} from "@/lib/storage";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formations = await getFormations();
    return NextResponse.json({ formations });
  } catch (error) {
    console.error("Error fetching formations:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { slug, title, subtitle, objectives, content, modalities, pricing, locations, isActive } = body;

    if (!slug || !title) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const formations = await getFormations();

    // Vérifier si le slug existe déjà
    if (formations.some((f) => f.slug === slug)) {
      return NextResponse.json({ error: "Ce slug existe déjà" }, { status: 400 });
    }

    const newFormation: Formation = {
      id: generateId(),
      slug,
      title,
      subtitle: subtitle || null,
      objectives: objectives || [],
      content: content || [],
      modalities: modalities || [],
      pricing: pricing || null,
      locations: locations || [],
      isActive: isActive !== undefined ? isActive : true,
      updatedAt: new Date().toISOString(),
    };

    formations.push(newFormation);
    await saveFormations(formations);

    return NextResponse.json({ formation: newFormation });
  } catch (error) {
    console.error("Error creating formation:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
