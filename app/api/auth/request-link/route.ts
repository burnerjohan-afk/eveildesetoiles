import { NextRequest, NextResponse } from "next/server";
import { createMagicLinkToken, findUserByEmail } from "@/lib/auth";
import { config } from "@/lib/config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Vérifier si l'email existe dans AdminUser ou ClientUser
    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
      // Ne pas révéler que l'email n'existe pas (sécurité)
      return NextResponse.json(
        { message: "Si cet email est autorisé, vous recevrez un lien de connexion." },
        { status: 200 }
      );
    }

    // Créer le token
    const token = await createMagicLinkToken(normalizedEmail);
    const verifyUrl = `${config.magicLinkBaseUrl}/api/auth/verify?token=${token}&email=${encodeURIComponent(normalizedEmail)}`;

    // DEV: log en console
    if (config.isDev) {
      console.log("\n=== MAGIC LINK (DEV) ===");
      console.log(`Email: ${normalizedEmail}`);
      console.log(`Role: ${user.role}`);
      if (user.organisationId) {
        console.log(`Organisation ID: ${user.organisationId}`);
      }
      console.log(`Lien: ${verifyUrl}`);
      console.log("=======================\n");
    }

    // PROD: envoyer email via Resend si configuré
    if (config.isProd && config.resendApiKey) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(config.resendApiKey);

        const roleText = user.role === "ADMIN" ? "l'administration" : "votre espace client";

        await resend.emails.send({
          from: config.resendFromEmail,
          to: normalizedEmail,
          subject: "Lien de connexion - Éveil des Étoiles",
          html: `
            <h1>Connexion à ${roleText}</h1>
            <p>Cliquez sur le lien ci-dessous pour vous connecter :</p>
            <p><a href="${verifyUrl}">${verifyUrl}</a></p>
            <p>Ce lien expire dans ${config.magicLinkExpirationMinutes} minutes.</p>
          `,
        });
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // En cas d'erreur email, on log quand même en prod pour debug
        if (config.isDev) {
          console.log("Lien (fallback):", verifyUrl);
        }
      }
    }

    return NextResponse.json({
      message: "Si cet email est autorisé, vous recevrez un lien de connexion.",
    });
  } catch (error) {
    console.error("Error in request-link:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
