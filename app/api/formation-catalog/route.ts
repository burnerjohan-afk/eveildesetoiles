import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { requireAdmin } from "@/lib/access";
import { db } from "@/lib/db";
import { createFormationCatalogSchema } from "@/lib/validators";
import { z } from "zod";

export async function GET(request: NextRequest) {
  try {
    const access = await requireAdmin();
    if (!access.allowed) {
      return NextResponse.json({ error: access.reason }, { status: 403 });
    }

    const formations = await db.formationCatalog.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ formations });
  } catch (error) {
    console.error("Error fetching formation catalog:", error);
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
    const data = createFormationCatalogSchema.parse(body);

    const formation = await db.formationCatalog.create({
      data,
    });

    // Audit log
    await db.auditLog.create({
      data: {
        actorEmail: session.email,
        actorRole: session.role,
        action: "CREATE_FORMATION_CATALOG",
        entityType: "FormationCatalog",
        entityId: formation.id,
      },
    });

    return NextResponse.json({ formation }, { status: 201 });
  } catch (error) {
    console.error("Error creating formation catalog:", error);
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
