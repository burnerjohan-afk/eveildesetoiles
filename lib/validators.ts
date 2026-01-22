/**
 * Validateurs Zod pour toutes les entrées API
 */

import { z } from "zod";

// Auth
export const requestLinkSchema = z.object({
  email: z.string().email("Email invalide"),
});

// Organisations
export const createOrganisationSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  address: z.string().optional(),
  opcoInfo: z.string().optional(),
});

export const updateOrganisationSchema = createOrganisationSchema.partial();

export const createClientUserSchema = z.object({
  email: z.string().email("Email invalide"),
  name: z.string().optional(),
  organisationId: z.string().min(1, "Organisation ID requis"),
});

// Formation Catalog
export const createFormationCatalogSchema = z.object({
  slug: z.string().min(1, "Slug requis"),
  title: z.string().min(1, "Titre requis"),
  description: z.string().optional(),
  isActive: z.boolean().optional().default(true),
});

export const updateFormationCatalogSchema = createFormationCatalogSchema.partial();

// Missions
export const createMissionSchema = z.object({
  organisationId: z.string().min(1, "Organisation ID requis"),
  formationCatalogId: z.string().min(1, "Formation Catalog ID requis"),
  status: z.enum(["PREPARATION", "IN_PROGRESS", "COMPLETED", "ARCHIVED"]).optional().default("PREPARATION").or(z.string()),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  notesAdmin: z.string().optional(),
});

export const updateMissionSchema = z.object({
  status: z.enum(["PREPARATION", "IN_PROGRESS", "COMPLETED", "ARCHIVED"]).optional().or(z.string().optional()),
  startDate: z.string().datetime().optional().nullable(),
  endDate: z.string().datetime().optional().nullable(),
  notesAdmin: z.string().optional().nullable(),
  lockedAt: z.string().datetime().optional().nullable(),
});

// Personnel
export const createPersonnelSchema = z.object({
  firstName: z.string().min(1, "Prénom requis"),
  lastName: z.string().min(1, "Nom requis"),
  position: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  notes: z.string().optional(),
});

export const updatePersonnelSchema = createPersonnelSchema.partial();

// Mission Participants
export const createMissionParticipantSchema = z.object({
  missionId: z.string().min(1, "Mission ID requis"),
  personnelId: z.string().min(1, "Personnel ID requis"),
  attendanceStatus: z.string().optional(),
});

// Documents
export const createDocumentSchema = z.object({
  missionId: z.string().min(1, "Mission ID requis"),
  category: z.enum(["REQUESTED", "PROVIDED", "ATTESTATION", "OPCO", "OTHER"]).or(z.string()),
  title: z.string().min(1, "Titre requis"),
  fileName: z.string().min(1, "Nom de fichier requis"),
  mimeType: z.string().min(1, "Type MIME requis"),
  sizeBytes: z.number().int().positive("Taille invalide"),
});
