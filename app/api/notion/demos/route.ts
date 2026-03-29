import { NextResponse } from "next/server";
import { getDemos } from "@/lib/notion";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured") === "true";
    const limit = parseInt(searchParams.get("limit") || "50");

    const demos = await getDemos(featured, limit);

    return NextResponse.json({
      success: true,
      data: demos,
    });
  } catch (error) {
    console.error("Demos API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch demos",
      },
      { status: 500 }
    );
  }
}
