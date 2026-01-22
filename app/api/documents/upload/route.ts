import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { requireMissionAccess } from "@/lib/access";
import { uploadFile, generateFileKey } from "@/lib/storage";
import { db } from "@/lib/db";
import { createDocumentSchema } from "@/lib/validators";
import { config } from "@/lib/config";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const missionId = formData.get("missionId") as string;
    const category = formData.get("category") as string;
    const title = formData.get("title") as string;

    if (!file || !missionId || !category || !title) {
      return NextResponse.json(
        { error: "Données manquantes" },
        { status: 400 }
      );
    }

    // Vérifier l'accès à la mission
    const access = await requireMissionAccess(missionId);
    if (!access.allowed) {
      return NextResponse.json({ error: access.reason }, { status: 403 });
    }

    // Valider le type MIME
    if (!config.allowedMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `Type de fichier non autorisé: ${file.type}` },
        { status: 400 }
      );
    }

    // Valider la taille
    if (file.size > config.uploadMaxSize) {
      return NextResponse.json(
        { error: `Fichier trop volumineux. Maximum: ${config.uploadMaxSize / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    // Récupérer l'organisation depuis la mission
    const mission = await db.mission.findUnique({
      where: { id: missionId },
      select: { organisationId: true },
    });

    if (!mission) {
      return NextResponse.json({ error: "Mission non trouvée" }, { status: 404 });
    }

    // Upload le fichier
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const folder = `missions/${missionId}`;
    const uploadResult = await uploadFile(
      fileBuffer,
      file.name,
      file.type,
      folder
    );

    // Créer l'enregistrement Document
    const document = await db.document.create({
      data: {
        organisationId: mission.organisationId,
        missionId,
        uploadedBy: session.role === "ADMIN" ? "ADMIN" : "CLIENT",
        category: category,
        title,
        fileKey: uploadResult.key,
        fileName: uploadResult.fileName,
        mimeType: uploadResult.mimeType,
        sizeBytes: uploadResult.sizeBytes,
      },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        organisationId: mission.organisationId,
        actorEmail: session.email,
        actorRole: session.role,
        action: "UPLOAD_DOCUMENT",
        entityType: "Document",
        entityId: document.id,
      },
    });

    return NextResponse.json({ document }, { status: 201 });
  } catch (error) {
    console.error("Error uploading document:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'upload" },
      { status: 500 }
    );
  }
}
