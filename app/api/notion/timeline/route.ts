import { NextResponse } from "next/server";
import { getTimelineEntries } from "@/lib/notion";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");

    const entries = await getTimelineEntries(limit);

    return NextResponse.json({
      success: true,
      data: entries,
    });
  } catch (error) {
    console.error("Timeline API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch timeline entries",
      },
      { status: 500 }
    );
  }
}
