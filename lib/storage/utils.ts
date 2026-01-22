/**
 * Utilitaires pour le stockage de fichiers
 */

/**
 * Génère une clé unique pour un fichier
 */
export function generateFileKey(fileName: string, folder?: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
  const key = folder
    ? `${folder}/${timestamp}-${random}-${sanitizedFileName}`
    : `${timestamp}-${random}-${sanitizedFileName}`;
  return key;
}
