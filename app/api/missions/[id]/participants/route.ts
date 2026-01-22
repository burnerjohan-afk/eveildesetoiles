import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { requireMissionAccess } from "@/lib/access";
import { db } from "@/lib/db";
import { z } from "zod";

const updateParticipantsSchema = z.object({
  personnelIds: z.array(z.string()),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // Vérifier l'accès
    const access = await requireMissionAccess(params.id);
    if (!access.allowed) {
      return NextResponse.json({ error: access.reason }, { status: 403 });
    }

    // Vérifier que la mission n'est pas clôturée (pour les clients)
    if (session.role === "CLIENT") {
      const mission = await db.mission.findUnique({
        where: { id: params.id },
        select: { lockedAt: true },
      });

      if (mission?.lockedAt) {
        return NextResponse.json(
          { error: "Cette formation est clôturée" },
          { status: 403 }
        );
      }
    }

    const body = await request.json();
    const { personnelIds } = updateParticipantsSchema.parse(body);

    // Supprimer les participants existants
    await db.missionParticipant.deleteMany({
      where: { missionId: params.id },
    });

    // Créer les nouveaux participants
    if (personnelIds.length > 0) {
      await db.missionParticipant.createMany({
        data: personnelIds.map((personnelId) => ({
          missionId: params.id,
          personnelId,
        })),
      });
    }

    // Audit log
    const mission = await db.mission.findUnique({
      where: { id: params.id },
      select: { organisationId: true },
    });

    if (mission) {
      await db.auditLog.create({
        data: {
          organisationId: mission.organisationId,
          actorEmail: session.email,
          actorRole: session.role,
          action: "UPDATE_MISSION_PARTICIPANTS",
          entityType: "Mission",
          entityId: params.id,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating participants:", error);
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
