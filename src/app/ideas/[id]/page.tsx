import { notFound } from "next/navigation";
import { readIdeas } from "@/lib/excel";
import { IdeaDetailPanel } from "@/components/ideas/IdeaDetailPanel";

export const dynamic = "force-dynamic";

export default async function IdeaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ideas = readIdeas();
  const idea = ideas.find((i) => i.slNo === Number(id));
  if (!idea) notFound();

  return <IdeaDetailPanel idea={idea} />;
}
