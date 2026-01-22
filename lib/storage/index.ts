/**
 * Storage abstraction layer
 * Supporte stockage local (dev) et S3 (prod)
 */

import { config } from "../config";
import * as localStorage from "./local";
import * as s3Storage from "./s3";

export interface StorageFile {
  key: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
}

export interface UploadResult {
  key: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
}

/**
 * Upload un fichier
 */
export async function uploadFile(
  file: Buffer,
  fileName: string,
  mimeType: string,
  folder?: string
): Promise<UploadResult> {
  // Valider le type MIME
  if (!config.allowedMimeTypes.includes(mimeType)) {
    throw new Error(`Type de fichier non autorisé: ${mimeType}`);
  }

  // Valider la taille
  if (file.length > config.uploadMaxSize) {
    throw new Error(
      `Fichier trop volumineux. Maximum: ${config.uploadMaxSize / 1024 / 1024}MB`
    );
  }

  if (config.storageType === "s3") {
    return s3Storage.uploadFile(file, fileName, mimeType, folder);
  } else {
    return localStorage.uploadFile(file, fileName, mimeType, folder);
  }
}

/**
 * Télécharge un fichier
 */
export async function downloadFile(key: string): Promise<Buffer> {
  if (config.storageType === "s3") {
    return s3Storage.downloadFile(key);
  } else {
    return localStorage.downloadFile(key);
  }
}

/**
 * Supprime un fichier
 */
export async function deleteFile(key: string): Promise<void> {
  if (config.storageType === "s3") {
    return s3Storage.deleteFile(key);
  } else {
    return localStorage.deleteFile(key);
  }
}

// Réexporter generateFileKey depuis utils
export { generateFileKey } from "./utils";
