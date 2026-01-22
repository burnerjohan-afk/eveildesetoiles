/**
 * RBAC (Role-Based Access Control) + Tenant checks
 * Vérifie les permissions et l'accès aux ressources par organisation
 */

import { getSession } from "./auth";
import { db } from "./db";
import type { UserRole } from "./auth";

export type AccessResult =
  | { allowed: true }
  | { allowed: false; reason: string };

/**
 * Vérifie si l'utilisateur a le rôle requis
 */
export async function requireRole(
  requiredRole: UserRole | UserRole[]
): Promise<AccessResult> {
  const session = await getSession();

  if (!session) {
    return { allowed: false, reason: "Non authentifié" };
  }

  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

  if (!roles.includes(session.role)) {
    return { allowed: false, reason: "Rôle insuffisant" };
  }

  return { allowed: true };
}

/**
 * Vérifie si l'utilisateur est admin
 */
export async function requireAdmin(): Promise<AccessResult> {
  return requireRole("ADMIN");
}

/**
 * Vérifie si l'utilisateur est client
 */
export async function requireClient(): Promise<AccessResult> {
  return requireRole("CLIENT");
}

/**
 * Vérifie si l'utilisateur a accès à une organisation (tenant check)
 * - ADMIN : accès à toutes les organisations
 * - CLIENT : accès uniquement à sa propre organisation
 */
export async function requireOrganisationAccess(
  organisationId: string
): Promise<AccessResult> {
  const session = await getSession();

  if (!session) {
    return { allowed: false, reason: "Non authentifié" };
  }

  // Admin a accès à tout
  if (session.role === "ADMIN") {
    return { allowed: true };
  }

  // Client : vérifier que c'est son organisation
  if (session.role === "CLIENT") {
    if (session.organisationId !== organisationId) {
      return { allowed: false, reason: "Accès non autorisé à cette organisation" };
    }
    return { allowed: true };
  }

  return { allowed: false, reason: "Rôle invalide" };
}

/**
 * Vérifie si l'utilisateur a accès à une mission
 * - ADMIN : accès à toutes les missions
 * - CLIENT : accès uniquement aux missions de son organisation
 */
export async function requireMissionAccess(
  missionId: string
): Promise<AccessResult> {
  const session = await getSession();

  if (!session) {
    return { allowed: false, reason: "Non authentifié" };
  }

  // Admin a accès à tout
  if (session.role === "ADMIN") {
    return { allowed: true };
  }

  // Client : vérifier que la mission appartient à son organisation
  if (session.role === "CLIENT") {
    if (!session.organisationId) {
      return { allowed: false, reason: "Organisation non trouvée" };
    }

    const mission = await db.mission.findUnique({
      where: { id: missionId },
      select: { organisationId: true },
    });

    if (!mission) {
      return { allowed: false, reason: "Mission non trouvée" };
    }

    if (mission.organisationId !== session.organisationId) {
      return { allowed: false, reason: "Accès non autorisé à cette mission" };
    }

    return { allowed: true };
  }

  return { allowed: false, reason: "Rôle invalide" };
}

/**
 * Vérifie si l'utilisateur a accès à un document
 * - ADMIN : accès à tous les documents
 * - CLIENT : accès uniquement aux documents de son organisation
 */
export async function requireDocumentAccess(
  documentId: string
): Promise<AccessResult> {
  const session = await getSession();

  if (!session) {
    return { allowed: false, reason: "Non authentifié" };
  }

  // Admin a accès à tout
  if (session.role === "ADMIN") {
    return { allowed: true };
  }

  // Client : vérifier que le document appartient à son organisation
  if (session.role === "CLIENT") {
    if (!session.organisationId) {
      return { allowed: false, reason: "Organisation non trouvée" };
    }

    const document = await db.document.findUnique({
      where: { id: documentId },
      select: { organisationId: true },
    });

    if (!document) {
      return { allowed: false, reason: "Document non trouvé" };
    }

    if (document.organisationId !== session.organisationId) {
      return { allowed: false, reason: "Accès non autorisé à ce document" };
    }

    return { allowed: true };
  }

  return { allowed: false, reason: "Rôle invalide" };
}

/**
 * Récupère l'organisation de l'utilisateur connecté (pour les clients)
 */
export async function getUserOrganisationId(): Promise<string | null> {
  const session = await getSession();

  if (!session || session.role !== "CLIENT") {
    return null;
  }

  return session.organisationId || null;
}
