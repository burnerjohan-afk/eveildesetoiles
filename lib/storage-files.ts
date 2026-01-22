/**
 * Réexport des fonctions de stockage de fichiers
 * Ce fichier séparé évite les conflits avec lib/storage.ts qui contient les types de données
 */
export { uploadFile, downloadFile, deleteFile, generateFileKey } from "./storage/index";
export type { StorageFile, UploadResult } from "./storage/index";
