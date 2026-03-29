import { NextResponse } from "next/server";
import { getFragments } from "@/lib/notion";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const limit = parseInt(searchParams.get("limit") || "50");

    const fragments = await getFragments(category, limit);

    return NextResponse.json({
      success: true,
      data: fragments,
    });
  } catch (error) {
    console.error("Fragments API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch fragments",
      },
      { status: 500 }
    );
  }
}
