import { NextResponse } from "next/server";
import { getServices, getDefaultServices } from "@/lib/content";

export async function GET() {
  try {
    const services = await getServices();
    const defaultServices = getDefaultServices();
    const displayServices = services.length > 0 ? services : defaultServices;
    
    return NextResponse.json({ services: displayServices });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ services: [] }, { status: 500 });
  }
}
