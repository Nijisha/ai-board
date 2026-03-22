import { NextRequest, NextResponse } from "next/server";
import { readIdeas, writeIdeas } from "@/lib/excel";
import { IdeaFormData } from "@/types";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ideas = readIdeas();
    const idea = ideas.find((i) => i.slNo === Number(id));
    if (!idea) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(idea);
  } catch {
    return NextResponse.json({ error: "Failed to read idea" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: IdeaFormData = await req.json();
    const ideas = readIdeas();
    const idx = ideas.findIndex((i) => i.slNo === Number(id));
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    ideas[idx] = { slNo: Number(id), ...body };
    writeIdeas(ideas);
    return NextResponse.json(ideas[idx]);
  } catch {
    return NextResponse.json({ error: "Failed to update idea" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ideas = readIdeas();
    const filtered = ideas.filter((i) => i.slNo !== Number(id));
    if (filtered.length === ideas.length)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    writeIdeas(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete idea" }, { status: 500 });
  }
}
