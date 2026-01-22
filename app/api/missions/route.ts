import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { requireAdmin } from "@/lib/access";
import { db } from "@/lib/db";
import { createMissionSchema } from "@/lib/validators";
import { z } from "zod";

export async function GET(request: NextRequest) {
  try {
    const access = await requireAdmin();
    if (!access.allowed) {
      return NextResponse.json({ error: access.reason }, { status: 403 });
    }

    const missions = await db.mission.findMany({
      include: {
        organisation: { select: { name: true } },
        formationCatalog: { select: { title: true } },
        _count: {
          select: {
            participants: true,
            documents: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ missions });
  } catch (error) {
    console.error("Error fetching missions:", error);
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
    const data = createMissionSchema.parse(body);

    const mission = await db.mission.create({
      data: {
        organisationId: data.organisationId,
        formationCatalogId: data.formationCatalogId,
        status: data.status || "PREPARATION",
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        notesAdmin: data.notesAdmin || null,
      },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        organisationId: data.organisationId,
        actorEmail: session.email,
        actorRole: session.role,
        action: "CREATE_MISSION",
        entityType: "Mission",
        entityId: mission.id,
      },
    });

    return NextResponse.json({ mission }, { status: 201 });
  } catch (error) {
    console.error("Error creating mission:", error);
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
