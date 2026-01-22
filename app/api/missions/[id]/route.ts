import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { requireAdmin } from "@/lib/access";
import { db } from "@/lib/db";
import { updateMissionSchema } from "@/lib/validators";
import { z } from "zod";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const access = await requireAdmin();
    if (!access.allowed) {
      return NextResponse.json({ error: access.reason }, { status: 403 });
    }

    const mission = await db.mission.findUnique({
      where: { id: params.id },
      include: {
        organisation: true,
        formationCatalog: true,
        participants: {
          include: {
            personnel: true,
          },
        },
        documents: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!mission) {
      return NextResponse.json(
        { error: "Mission non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json({ mission });
  } catch (error) {
    console.error("Error fetching mission:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const data = updateMissionSchema.parse(body);

    const updateData: any = {};
    if (data.status !== undefined) updateData.status = data.status;
    if (data.startDate !== undefined)
      updateData.startDate = data.startDate ? new Date(data.startDate) : null;
    if (data.endDate !== undefined)
      updateData.endDate = data.endDate ? new Date(data.endDate) : null;
    if (data.notesAdmin !== undefined) updateData.notesAdmin = data.notesAdmin;
    if (data.lockedAt !== undefined)
      updateData.lockedAt = data.lockedAt ? new Date(data.lockedAt) : null;

    const mission = await db.mission.update({
      where: { id: params.id },
      data: updateData,
    });

    // Récupérer l'organisation pour l'audit log
    const missionWithOrg = await db.mission.findUnique({
      where: { id: params.id },
      select: { organisationId: true },
    });

    // Audit log
    if (missionWithOrg) {
      await db.auditLog.create({
        data: {
          organisationId: missionWithOrg.organisationId,
          actorEmail: session.email,
          actorRole: session.role,
          action: "UPDATE_MISSION",
          entityType: "Mission",
          entityId: params.id,
        },
      });
    }

    return NextResponse.json({ mission });
  } catch (error) {
    console.error("Error updating mission:", error);
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
