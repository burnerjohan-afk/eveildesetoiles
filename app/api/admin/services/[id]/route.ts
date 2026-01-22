import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  getServices,
  saveServices,
  getServiceById,
  type Service,
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
    const service = await getServiceById(params.id);

    if (!service) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ service });
  } catch (error) {
    console.error("Error fetching service:", error);
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
    const { slug, title, problem, bullets, benefits, modalities, pricingNote, isActive } = body;

    const services = await getServices();
    const index = services.findIndex((s) => s.id === params.id);

    if (index === -1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Vérifier si le slug existe déjà (sauf pour le service actuel)
    if (services.some((s) => s.slug === slug && s.id !== params.id)) {
      return NextResponse.json({ error: "Ce slug existe déjà" }, { status: 400 });
    }

    services[index] = {
      ...services[index],
      slug,
      title,
      problem,
      bullets: bullets || [],
      benefits: benefits || [],
      modalities: modalities || [],
      pricingNote: pricingNote || null,
      isActive: isActive !== undefined ? isActive : true,
      updatedAt: new Date().toISOString(),
    };

    await saveServices(services);

    return NextResponse.json({ service: services[index] });
  } catch (error) {
    console.error("Error updating service:", error);
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
    const services = await getServices();
    const filtered = services.filter((s) => s.id !== params.id);
    await saveServices(filtered);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
