import { NextRequest, NextResponse } from "next/server";
import { config } from "@/lib/config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, subject, message, type, serviceType, serviceTitle, desiredPeriod, company, selectedServices } = body;

    // Validation basique
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    // Log en console (DEV et PROD pour le moment)
    console.log("\n=== NOUVEAU MESSAGE CONTACT ===");
    if (type === "devis") {
      console.log("Type: Demande de devis");
      if (selectedServices && selectedServices.length > 0) {
        console.log(`Services sélectionnés: ${selectedServices.join(", ")}`);
      } else {
        console.log(`Service: ${serviceType} - ${serviceTitle}`);
      }
      console.log(`Période souhaitée: ${desiredPeriod || "Non renseignée"}`);
      if (company) console.log(`Structure: ${company}`);
    }
    console.log(`Nom: ${firstName} ${lastName}`);
    console.log(`Email: ${email}`);
    console.log(`Téléphone: ${phone || "Non renseigné"}`);
    console.log(`Objet: ${subject}`);
    console.log(`Message: ${message}`);
    console.log("===============================\n");

    // TODO: En production, envoyer un email via Resend si configuré
    // if (config.isProd && config.resendApiKey) {
    //   // Envoyer email à config.contactEmail
    // }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
