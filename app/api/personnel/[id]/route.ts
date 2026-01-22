import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getUserOrganisationId } from "@/lib/access";
import { db } from "@/lib/db";
import { updatePersonnelSchema } from "@/lib/validators";
import { z } from "zod";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const personnel = await db.personnel.findUnique({
      where: { id: params.id },
    });

    if (!personnel || personnel.organisationId !== organisationId) {
      return NextResponse.json(
        { error: "Personnel non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({ personnel });
  } catch (error) {
    console.error("Error fetching personnel:", error);
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

    // Vérifier que le personnel appartient à l'organisation
    const existing = await db.personnel.findUnique({
      where: { id: params.id },
      select: { organisationId: true },
    });

    if (!existing || existing.organisationId !== organisationId) {
      return NextResponse.json(
        { error: "Personnel non trouvé" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const data = updatePersonnelSchema.parse(body);

    const personnel = await db.personnel.update({
      where: { id: params.id },
      data,
    });

    // Audit log
    await db.auditLog.create({
      data: {
        organisationId,
        actorEmail: session.email,
        actorRole: session.role,
        action: "UPDATE_PERSONNEL",
        entityType: "Personnel",
        entityId: params.id,
      },
    });

    return NextResponse.json({ personnel });
  } catch (error) {
    console.error("Error updating personnel:", error);
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

    // Vérifier que le personnel appartient à l'organisation
    const existing = await db.personnel.findUnique({
      where: { id: params.id },
      select: { organisationId: true },
    });

    if (!existing || existing.organisationId !== organisationId) {
      return NextResponse.json(
        { error: "Personnel non trouvé" },
        { status: 404 }
      );
    }

    await db.personnel.delete({
      where: { id: params.id },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        organisationId,
        actorEmail: session.email,
        actorRole: session.role,
        action: "DELETE_PERSONNEL",
        entityType: "Personnel",
        entityId: params.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting personnel:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
