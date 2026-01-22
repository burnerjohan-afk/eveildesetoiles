/**
 * Stockage local (développement)
 * Fichiers stockés dans ./uploads/
 */

import { promises as fs } from "fs";
import { join } from "path";
import type { UploadResult } from "./index";
import { generateFileKey } from "./utils";

const UPLOADS_DIR = join(process.cwd(), "uploads");

async function ensureUploadsDir() {
  try {
    await fs.access(UPLOADS_DIR);
  } catch {
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
  }
}

export async function uploadFile(
  file: Buffer,
  fileName: string,
  mimeType: string,
  folder?: string
): Promise<UploadResult> {
  await ensureUploadsDir();

  const key = generateFileKey(fileName, folder);
  const filePath = join(UPLOADS_DIR, key);

  // Créer le dossier si nécessaire
  const dir = join(UPLOADS_DIR, folder || "");
  if (folder) {
    await fs.mkdir(dir, { recursive: true });
  }

  await fs.writeFile(filePath, file);

  return {
    key,
    fileName,
    mimeType,
    sizeBytes: file.length,
  };
}

export async function downloadFile(key: string): Promise<Buffer> {
  const filePath = join(UPLOADS_DIR, key);
  return fs.readFile(filePath);
}

export async function deleteFile(key: string): Promise<void> {
  const filePath = join(UPLOADS_DIR, key);
  try {
    await fs.unlink(filePath);
  } catch (error) {
    // Ignorer si le fichier n'existe pas
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }
}
