import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getUserOrganisationId } from "@/lib/access";
import { db } from "@/lib/db";
import { createPersonnelSchema } from "@/lib/validators";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "CLIENT") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const organisationId = await getUserOrganisationId();
    if (!organisationId) {
      return NextResponse.json(
        { error: "Organisation non trouvée" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const data = createPersonnelSchema.parse(body);

    const personnel = await db.personnel.create({
      data: {
        ...data,
        organisationId,
      },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        organisationId,
        actorEmail: session.email,
        actorRole: session.role,
        action: "CREATE_PERSONNEL",
        entityType: "Personnel",
        entityId: personnel.id,
      },
    });

    return NextResponse.json({ personnel }, { status: 201 });
  } catch (error) {
    console.error("Error creating personnel:", error);
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
