import { NextRequest, NextResponse } from "next/server";
import { readIdeas, writeIdeas, nextSlNo } from "@/lib/excel";
import { IdeaFormData } from "@/types";

export async function GET(req: NextRequest) {
  try {
    let ideas = readIdeas();
    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status");
    const portfolio = searchParams.get("portfolio");
    const search = searchParams.get("search");

    if (status) ideas = ideas.filter((i) => i.status === status);
    if (portfolio) ideas = ideas.filter((i) => i.portfolio === portfolio);
    if (search) {
      const q = search.toLowerCase();
      ideas = ideas.filter(
        (i) =>
          i.idea.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.owner.toLowerCase().includes(q) ||
          i.lead.toLowerCase().includes(q)
      );
    }

    return NextResponse.json(ideas);
  } catch (err) {
    return NextResponse.json({ error: "Failed to read ideas" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: IdeaFormData = await req.json();
    const ideas = readIdeas();
    const newIdea = {
      slNo: nextSlNo(ideas),
      ...body,
    };
    ideas.push(newIdea);
    writeIdeas(ideas);
    return NextResponse.json(newIdea, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create idea" }, { status: 500 });
  }
}
