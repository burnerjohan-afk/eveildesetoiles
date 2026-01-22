import { NextRequest, NextResponse } from "next/server";
import { addInscription, generateId, getFormationById, getInscriptionsBySession } from "@/lib/storage";
import { config } from "@/lib/config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formationId, sessionId, firstName, lastName, email, phone, company, role, notes } = body;

    // Validation
    if (!formationId || !sessionId || !firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "Les champs obligatoires sont manquants" },
        { status: 400 }
      );
    }

    // Vérifier que la formation existe
    const formation = await getFormationById(formationId);
    if (!formation) {
      return NextResponse.json(
        { error: "Formation introuvable" },
        { status: 404 }
      );
    }

    // Vérifier que la session existe et est disponible
    const session = formation.sessions.find((s) => s.id === sessionId);
    if (!session || !session.isActive) {
      return NextResponse.json(
        { error: "Session introuvable ou non disponible" },
        { status: 404 }
      );
    }

    // Vérifier les places disponibles
    if (session.maxParticipants) {
      const inscriptions = await getInscriptionsBySession(sessionId);
      const confirmedInscriptions = inscriptions.filter((i) => i.status === "confirmed");
      if (confirmedInscriptions.length >= session.maxParticipants) {
        return NextResponse.json(
          { error: "Cette session est complète" },
          { status: 400 }
        );
      }
    }

    // Créer l'inscription
    const inscription = {
      id: generateId(),
      formationId,
      sessionId,
      firstName,
      lastName,
      email,
      phone: phone || null,
      company: company || null,
      role: role || null,
      notes: notes || null,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    };

    await addInscription(inscription);

    // TODO: Envoyer un email de confirmation (avec Resend)
    // TODO: Envoyer une notification à l'admin

    return NextResponse.json({
      success: true,
      message: "Votre demande d'inscription a été enregistrée. Nous vous contacterons rapidement pour confirmer.",
    });
  } catch (error) {
    console.error("Error creating inscription:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'inscription" },
      { status: 500 }
    );
  }
}
