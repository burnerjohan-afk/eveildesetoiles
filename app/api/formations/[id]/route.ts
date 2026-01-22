import { NextRequest, NextResponse } from "next/server";
import { getFormationById } from "@/lib/storage";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formation = await getFormationById(params.id);
    
    if (!formation) {
      return NextResponse.json(
        { error: "Formation introuvable" },
        { status: 404 }
      );
    }

    return NextResponse.json({ formation });
  } catch (error) {
    console.error("Error fetching formation:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
