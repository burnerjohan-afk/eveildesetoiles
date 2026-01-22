import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  getServices,
  saveServices,
  generateId,
  type Service,
} from "@/lib/storage";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const services = await getServices();
    return NextResponse.json({ services });
  } catch (error) {
    console.error("Error fetching services:", error);
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
    const { slug, title, problem, bullets, benefits, modalities, pricingNote, isActive } = body;

    if (!slug || !title || !problem) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const services = await getServices();

    // Vérifier si le slug existe déjà
    if (services.some((s) => s.slug === slug)) {
      return NextResponse.json({ error: "Ce slug existe déjà" }, { status: 400 });
    }

    const newService: Service = {
      id: generateId(),
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

    services.push(newService);
    await saveServices(services);

    return NextResponse.json({ service: newService });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
