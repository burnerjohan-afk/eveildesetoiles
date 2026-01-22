import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { requireAdmin } from "@/lib/access";
import { db } from "@/lib/db";
import { updateFormationCatalogSchema } from "@/lib/validators";
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

    const formation = await db.formationCatalog.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            Missions: true,
          },
        },
      },
    });

    if (!formation) {
      return NextResponse.json(
        { error: "Formation non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json({ formation });
  } catch (error) {
    console.error("Error fetching formation catalog:", error);
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
    const data = updateFormationCatalogSchema.parse(body);

    const formation = await db.formationCatalog.update({
      where: { id: params.id },
      data,
    });

    // Audit log
    await db.auditLog.create({
      data: {
        actorEmail: session.email,
        actorRole: session.role,
        action: "UPDATE_FORMATION_CATALOG",
        entityType: "FormationCatalog",
        entityId: params.id,
      },
    });

    return NextResponse.json({ formation });
  } catch (error) {
    console.error("Error updating formation catalog:", error);
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    await db.formationCatalog.delete({
      where: { id: params.id },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        actorEmail: session.email,
        actorRole: session.role,
        action: "DELETE_FORMATION_CATALOG",
        entityType: "FormationCatalog",
        entityId: params.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting formation catalog:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
