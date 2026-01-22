import { config } from "./config";
import { randomBytes, createHash } from "crypto";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db } from "./db";

const JWT_SECRET = new TextEncoder().encode(config.sessionSecret);

export type UserRole = "ADMIN" | "CLIENT";
export type SessionData = {
  email: string;
  role: UserRole;
  organisationId?: string; // Pour les clients
};

/**
 * Génère un token aléatoire pour magic link
 */
export function generateMagicLinkToken(): string {
  return randomBytes(32).toString("hex");
}

/**
 * Hash un token pour stockage sécurisé
 */
export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * Crée un magic link token (stocké dans DB Prisma)
 */
export async function createMagicLinkToken(email: string): Promise<string> {
  const token = generateMagicLinkToken();
  const tokenHash = hashToken(token);
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + config.magicLinkExpirationMinutes);

  await db.magicLinkToken.create({
    data: {
      email: email.toLowerCase().trim(),
      tokenHash,
      expiresAt,
    },
  });

  return token;
}

/**
 * Vérifie et utilise un magic link token
 */
export async function verifyMagicLinkToken(
  email: string,
  token: string
): Promise<boolean> {
  const tokenHash = hashToken(token);
  const now = new Date();

  const magicToken = await db.magicLinkToken.findFirst({
    where: {
      email: email.toLowerCase().trim(),
      tokenHash,
      expiresAt: { gt: now },
      usedAt: null,
    },
  });

  if (!magicToken) {
    return false;
  }

  // Marquer comme utilisé
  await db.magicLinkToken.update({
    where: { id: magicToken.id },
    data: { usedAt: now },
  });

  return true;
}

/**
 * Vérifie si un email existe dans AdminUser ou ClientUser
 */
export async function findUserByEmail(email: string): Promise<{
  role: UserRole;
  organisationId?: string;
} | null> {
  const normalizedEmail = email.toLowerCase().trim();

  // Vérifier AdminUser
  const adminUser = await db.adminUser.findUnique({
    where: { email: normalizedEmail },
  });

  if (adminUser) {
    return { role: "ADMIN" };
  }

  // Vérifier ClientUser
  const clientUser = await db.clientUser.findUnique({
    where: { email: normalizedEmail },
    select: { organisationId: true },
  });

  if (clientUser) {
    // Mettre à jour lastLoginAt
    await db.clientUser.update({
      where: { email: normalizedEmail },
      data: { lastLoginAt: new Date() },
    });

    return { role: "CLIENT", organisationId: clientUser.organisationId };
  }

  return null;
}

/**
 * Crée une session JWT avec role et organisationId
 */
export async function createSession(
  email: string,
  role: UserRole,
  organisationId?: string
): Promise<string> {
  const payload: SessionData = {
    email: email.toLowerCase().trim(),
    role,
  };

  if (role === "CLIENT" && organisationId) {
    payload.organisationId = organisationId;
  }

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + config.sessionMaxAge)
    .sign(JWT_SECRET);

  return jwt;
}

/**
 * Vérifie et décode une session JWT
 */
export async function verifySession(
  session: string
): Promise<SessionData | null> {
  try {
    const { payload } = await jwtVerify(session, JWT_SECRET);
    return payload as SessionData;
  } catch (error) {
    return null;
  }
}

/**
 * Récupère la session actuelle depuis les cookies
 */
export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(config.sessionCookieName);

  if (!sessionCookie?.value) {
    return null;
  }

  return verifySession(sessionCookie.value);
}

/**
 * Définit le cookie de session
 */
export async function setSessionCookie(session: string) {
  const cookieStore = await cookies();
  cookieStore.set(config.sessionCookieName, session, {
    httpOnly: true,
    secure: config.isProd,
    sameSite: "lax",
    maxAge: config.sessionMaxAge,
    path: "/",
  });
}

/**
 * Supprime le cookie de session (logout)
 */
export async function deleteSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(config.sessionCookieName);
}

/**
 * Vérifie si un email est autorisé (dans AdminUser ou ClientUser)
 * Utilisé pour l'ancien système avec allowlist (fallback)
 */
export function isEmailAllowed(email: string): boolean {
  // Fallback : vérifier allowlist si configurée
  if (config.adminEmailAllowlist.length > 0) {
    return config.adminEmailAllowlist.includes(email.toLowerCase());
  }
  // Sinon, on vérifiera dans la DB via findUserByEmail
  return true;
}
