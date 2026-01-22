import { promises as fs } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");

// Types
export interface Service {
  id: string;
  slug: string;
  title: string;
  problem: string;
  bullets: string[];
  benefits: string[];
  modalities: string[];
  pricingNote?: string | null;
  isActive: boolean;
  updatedAt: string;
}

export interface FormationSession {
  id: string;
  date: string; // Format ISO: YYYY-MM-DD
  time?: string; // Format: HH:MM
  location: string; // "À distance", "Lyon", "Aix en Pce", etc.
  maxParticipants?: number;
  currentParticipants: number;
  isActive: boolean;
}

export interface Formation {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  category?: string; // "Formations de responsables de crèche", "Journées pédagogiques", etc.
  objectives: string[];
  content: string[];
  contentDetails?: { // Contenu structuré avec sections
    section: string;
    items: string[];
  }[];
  modalities: string[];
  duration?: string; // "1 jour", "2 jours", etc.
  targetAudience?: string; // "Formation pour les responsables Petite Enfance, porteurs de projets sans prérequis : directrice, directeur, référent technique, gestionnaire, coordinatrice, … de crèche, micro-crèche, halte-garderie, jardins d'enfants ou d'éveil, pouponnière."
  pricing?: string | null;
  pricingEmployer?: string | null; // Tarif employeur
  pricingPersonal?: string | null; // Tarif personnel
  locations: string[];
  sessions: FormationSession[]; // Dates de formations disponibles
  inscriptionFormUrl?: string | null; // URL du bulletin d'inscription
  testimonials?: { // Témoignages
    name: string;
    role: string;
    content: string;
    date?: string;
  }[];
  satisfactionRate?: number; // Note sur 5
  participantCount?: number; // Nombre de participants
  recommendationRate?: number; // Pourcentage de recommandation
  isActive: boolean;
  updatedAt: string;
}

export interface FormationInscription {
  id: string;
  formationId: string;
  sessionId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  role?: string;
  notes?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface MagicLinkToken {
  id: string;
  email: string;
  tokenHash: string;
  expiresAt: string;
  usedAt?: string | null;
  createdAt: string;
}

// Initialiser le dossier data s'il n'existe pas
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Services
const SERVICES_FILE = join(DATA_DIR, "services.json");

export async function getServices(): Promise<Service[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(SERVICES_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function saveServices(services: Service[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(SERVICES_FILE, JSON.stringify(services, null, 2), "utf-8");
}

export async function getServiceById(id: string): Promise<Service | null> {
  const services = await getServices();
  return services.find((s) => s.id === id) || null;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const services = await getServices();
  return services.find((s) => s.slug === slug) || null;
}

// Formations
const FORMATIONS_FILE = join(DATA_DIR, "formations.json");

export async function getFormations(): Promise<Formation[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(FORMATIONS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function saveFormations(formations: Formation[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(FORMATIONS_FILE, JSON.stringify(formations, null, 2), "utf-8");
}

export async function getFormationById(id: string): Promise<Formation | null> {
  const formations = await getFormations();
  return formations.find((f) => f.id === id) || null;
}

export async function getFormationBySlug(slug: string): Promise<Formation | null> {
  const formations = await getFormations();
  return formations.find((f) => f.slug === slug) || null;
}

// Inscriptions aux formations
const INSCRIPTIONS_FILE = join(DATA_DIR, "inscriptions.json");

export async function getInscriptions(): Promise<FormationInscription[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(INSCRIPTIONS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function saveInscriptions(inscriptions: FormationInscription[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(INSCRIPTIONS_FILE, JSON.stringify(inscriptions, null, 2), "utf-8");
}

export async function addInscription(inscription: FormationInscription): Promise<void> {
  const inscriptions = await getInscriptions();
  inscriptions.push(inscription);
  await saveInscriptions(inscriptions);
}

export async function getInscriptionsByFormation(formationId: string): Promise<FormationInscription[]> {
  const inscriptions = await getInscriptions();
  return inscriptions.filter((i) => i.formationId === formationId);
}

export async function getInscriptionsBySession(sessionId: string): Promise<FormationInscription[]> {
  const inscriptions = await getInscriptions();
  return inscriptions.filter((i) => i.sessionId === sessionId);
}

// Magic Link Tokens
const TOKENS_FILE = join(DATA_DIR, "tokens.json");

export async function getTokens(): Promise<MagicLinkToken[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(TOKENS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function saveTokens(tokens: MagicLinkToken[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(TOKENS_FILE, JSON.stringify(tokens, null, 2), "utf-8");
}

export async function addToken(token: MagicLinkToken): Promise<void> {
  const tokens = await getTokens();
  tokens.push(token);
  await saveTokens(tokens);
}

export async function updateToken(
  tokenHash: string,
  updates: Partial<MagicLinkToken>
): Promise<void> {
  const tokens = await getTokens();
  const index = tokens.findIndex((t) => t.tokenHash === tokenHash);
  if (index !== -1) {
    tokens[index] = { ...tokens[index], ...updates };
    await saveTokens(tokens);
  }
}

// Helper pour générer un ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
