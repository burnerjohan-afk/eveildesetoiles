import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { requireDocumentAccess } from "@/lib/access";
import { downloadFile } from "@/lib/storage-files";
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const documentId = params.id;

    // Vérifier l'accès au document
    const access = await requireDocumentAccess(documentId);
    if (!access.allowed) {
      return NextResponse.json({ error: access.reason }, { status: 403 });
    }

    // Récupérer le document
    const document = await db.document.findUnique({
      where: { id: documentId },
    });

    if (!document) {
      return NextResponse.json({ error: "Document non trouvé" }, { status: 404 });
    }

    // Télécharger le fichier
    const fileBuffer = await downloadFile(document.fileKey);

    // Retourner le fichier
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": document.mimeType,
        "Content-Disposition": `attachment; filename="${document.fileName}"`,
        "Content-Length": document.sizeBytes.toString(),
      },
    });
  } catch (error) {
    console.error("Error downloading document:", error);
    return NextResponse.json(
      { error: "Erreur lors du téléchargement" },
      { status: 500 }
    );
  }
}
