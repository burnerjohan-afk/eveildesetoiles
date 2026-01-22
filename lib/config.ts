/**
 * Configuration centralisée de l'application
 */

export const config = {
  // URLs et chemins
  magicLinkBaseUrl: process.env.MAGIC_LINK_BASE_URL || "http://localhost:3000",
  
  // Auth
  jwtSecret: process.env.JWT_SECRET || "change-me-in-production-min-32-chars",
  sessionSecret: process.env.JWT_SECRET || "change-me-in-production-min-32-chars", // Alias pour compatibilité
  magicLinkExpirationMinutes: 15,
  sessionCookieName: "eveil_session",
  sessionMaxAge: 60 * 60 * 24 * 7, // 7 jours en secondes
  adminEmailAllowlist: process.env.ADMIN_EMAILS?.split(",").map(e => e.trim()) || [],
  
  // Email
  resendApiKey: process.env.RESEND_API_KEY || "",
  fromEmail: process.env.FROM_EMAIL || "noreply@example.com",
  resendFromEmail: process.env.FROM_EMAIL || "noreply@example.com", // Alias pour compatibilité
  isDev: process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",
  
  // Storage
  storageType: process.env.S3_ENDPOINT ? "s3" : "local",
  uploadMaxSize: 15 * 1024 * 1024, // 15MB
  allowedMimeTypes: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/png",
    "image/jpeg",
    "image/jpg",
  ],
  
  // Admin
  adminEmails: process.env.ADMIN_EMAILS?.split(",").map(e => e.trim()) || [],
  
  // Contact (existant - conservé pour compatibilité)
  contactEmail: process.env.CONTACT_EMAIL || "contact@example.com",
  contactPhonePlaceholder: process.env.CONTACT_PHONE || "06 12 34 56 78",
  calendlyUrl: process.env.CALENDLY_URL || "https://calendly.com/example",
} as const;

// Validation des variables critiques
if (process.env.NODE_ENV === "production") {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters in production");
  }
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required in production");
  }
}
