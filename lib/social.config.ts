/**
 * Configuration publique des réseaux sociaux (accessible côté client)
 */
export const socialConfig = {
  instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "https://www.instagram.com/eveildesetoiles",
  linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "https://www.linkedin.com/company/eveildesetoiles",
  facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || "https://www.facebook.com/eveildesetoiles",
} as const;
