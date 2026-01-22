import { NextRequest, NextResponse } from "next/server";
import {
  verifyMagicLinkToken,
  createSession,
  setSessionCookie,
  findUserByEmail,
} from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      return NextResponse.redirect(new URL("/login?error=invalid", request.url));
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Vérifier si l'email existe dans la DB
    const user = await findUserByEmail(normalizedEmail);
    if (!user) {
      return NextResponse.redirect(new URL("/login?error=unauthorized", request.url));
    }

    // Vérifier le token
    const isValid = await verifyMagicLinkToken(normalizedEmail, token);
    if (!isValid) {
      return NextResponse.redirect(new URL("/login?error=invalid", request.url));
    }

    // Créer la session avec role et organisationId
    const session = await createSession(
      normalizedEmail,
      user.role,
      user.organisationId
    );
    await setSessionCookie(session);

    // Rediriger selon le rôle
    if (user.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/portal/dashboard", request.url));
    }
  } catch (error) {
    console.error("Error in verify:", error);
    return NextResponse.redirect(new URL("/login?error=server", request.url));
  }
}
