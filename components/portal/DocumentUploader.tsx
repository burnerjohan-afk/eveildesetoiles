"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Document } from "@prisma/client";

interface DocumentUploaderProps {
  missionId: string;
  documents: Document[];
  category: "PROVIDED" | "ATTESTATION" | "OPCO" | "REQUESTED" | "OTHER";
  isLocked: boolean;
  readOnly?: boolean;
}

export function DocumentUploader({
  missionId,
  documents,
  category,
  isLocked,
  readOnly = false,
}: DocumentUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || isLocked || readOnly) return;

    if (!title.trim()) {
      alert("Veuillez saisir un titre pour le document");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("missionId", missionId);
      formData.append("category", category);
      formData.append("title", title);

      const response = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        window.location.reload();
      } else {
        const data = await response.json();
        alert(data.error || "Erreur lors de l'upload");
      }
    } catch (error) {
      alert("Erreur lors de l'upload");
    } finally {
      setUploading(false);
      setTitle("");
      e.target.value = "";
    }
  };

  const handleDownload = async (documentId: string, fileName: string) => {
    try {
      const response = await fetch(`/api/documents/${documentId}/download`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert("Erreur lors du téléchargement");
      }
    } catch (error) {
      alert("Erreur lors du téléchargement");
    }
  };

  return (
    <div className="space-y-4">
      {!readOnly && !isLocked && (
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre du document
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eau-500 focus:border-eau-500"
                placeholder="Ex: Contrat de formation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fichier (PDF, DOCX, PNG, JPG - max 15MB)
              </label>
              <input
                type="file"
                onChange={handleFileSelect}
                disabled={uploading || !title.trim()}
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-eau-50 file:text-eau-700 hover:file:bg-eau-100"
              />
            </div>
            {uploading && (
              <p className="text-sm text-gray-600">Upload en cours...</p>
            )}
          </div>
        </Card>
      )}

      {readOnly && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            Cette section est en lecture seule. Les documents sont fournis par l'administrateur.
          </p>
        </div>
      )}

      {documents.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500">
            {readOnly
              ? "Aucun document reçu pour le moment."
              : "Aucun document déposé pour le moment."}
          </p>
        </Card>
      ) : (
        <div className="space-y-2">
          {documents.map((doc) => (
            <Card key={doc.id} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900">{doc.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {doc.fileName} •{" "}
                    {(doc.sizeBytes / 1024).toFixed(1)} KB •{" "}
                    {new Date(doc.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDownload(doc.id, doc.fileName)}
                >
                  Télécharger
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
