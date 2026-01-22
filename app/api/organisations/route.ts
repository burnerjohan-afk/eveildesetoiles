import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { requireAdmin } from "@/lib/access";
import { db } from "@/lib/db";
import { createOrganisationSchema } from "@/lib/validators";
import { z } from "zod";

export async function GET(request: NextRequest) {
  try {
    const access = await requireAdmin();
    if (!access.allowed) {
      return NextResponse.json({ error: access.reason }, { status: 403 });
    }

    const organisations = await db.organisation.findMany({
      include: {
        _count: {
          select: {
            clientUsers: true,
            missions: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ organisations });
  } catch (error) {
    console.error("Error fetching organisations:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const data = createOrganisationSchema.parse(body);

    const organisation = await db.organisation.create({
      data,
    });

    // Audit log
    await db.auditLog.create({
      data: {
        actorEmail: session.email,
        actorRole: session.role,
        action: "CREATE_ORGANISATION",
        entityType: "Organisation",
        entityId: organisation.id,
      },
    });

    return NextResponse.json({ organisation }, { status: 201 });
  } catch (error) {
    console.error("Error creating organisation:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
