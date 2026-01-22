/**
 * Stockage S3 compatible (production)
 * Utilise AWS SDK v3
 */

import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { config } from "../config";
import { generateFileKey } from "./index";
import type { UploadResult } from "./index";

const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT || undefined,
  region: process.env.S3_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
  },
  forcePathStyle: process.env.S3_ENDPOINT ? true : false, // Pour S3 compatible (MinIO, etc.)
});

const BUCKET = process.env.S3_BUCKET || "";

export async function uploadFile(
  file: Buffer,
  fileName: string,
  mimeType: string,
  folder?: string
): Promise<UploadResult> {
  if (!BUCKET) {
    throw new Error("S3_BUCKET non configuré");
  }

  const key = generateFileKey(fileName, folder);

  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: file,
      ContentType: mimeType,
    })
  );

  return {
    key,
    fileName,
    mimeType,
    sizeBytes: file.length,
  };
}

export async function downloadFile(key: string): Promise<Buffer> {
  if (!BUCKET) {
    throw new Error("S3_BUCKET non configuré");
  }

  const response = await s3Client.send(
    new GetObjectCommand({
      Bucket: BUCKET,
      Key: key,
    })
  );

  if (!response.Body) {
    throw new Error("Fichier non trouvé");
  }

  // Convertir le stream en Buffer
  const chunks: Uint8Array[] = [];
  for await (const chunk of response.Body as any) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

export async function deleteFile(key: string): Promise<void> {
  if (!BUCKET) {
    throw new Error("S3_BUCKET non configuré");
  }

  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key,
    })
  );
}
