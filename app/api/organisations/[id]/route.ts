import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { requireAdmin } from "@/lib/access";
import { db } from "@/lib/db";
import { updateOrganisationSchema } from "@/lib/validators";
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

    const organisation = await db.organisation.findUnique({
      where: { id: params.id },
      include: {
        clientUsers: true,
        missions: {
          include: {
            formationCatalog: {
              select: { title: true },
            },
          },
        },
        personnel: {
          take: 10,
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!organisation) {
      return NextResponse.json(
        { error: "Organisation non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json({ organisation });
  } catch (error) {
    console.error("Error fetching organisation:", error);
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
    const data = updateOrganisationSchema.parse(body);

    const organisation = await db.organisation.update({
      where: { id: params.id },
      data,
    });

    // Audit log
    await db.auditLog.create({
      data: {
        organisationId: params.id,
        actorEmail: session.email,
        actorRole: session.role,
        action: "UPDATE_ORGANISATION",
        entityType: "Organisation",
        entityId: params.id,
      },
    });

    return NextResponse.json({ organisation });
  } catch (error) {
    console.error("Error updating organisation:", error);
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

    await db.organisation.delete({
      where: { id: params.id },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        actorEmail: session.email,
        actorRole: session.role,
        action: "DELETE_ORGANISATION",
        entityType: "Organisation",
        entityId: params.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting organisation:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
