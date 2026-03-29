import { NextResponse } from "next/server";
import { getTechNotes } from "@/lib/notion";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get("tag") || undefined;
    const difficulty = searchParams.get("difficulty") || undefined;
    const limit = parseInt(searchParams.get("limit") || "50");

    const notes = await getTechNotes(tag, difficulty, limit);

    return NextResponse.json({
      success: true,
      data: notes,
    });
  } catch (error) {
    console.error("Notes API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch tech notes",
      },
      { status: 500 }
    );
  }
}
