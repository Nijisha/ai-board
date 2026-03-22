import { notFound } from "next/navigation";
import { readIdeas } from "@/lib/excel";
import { Header } from "@/components/layout/Header";
import { IdeaForm } from "@/components/ideas/IdeaForm";

export const dynamic = "force-dynamic";

export default async function EditIdeaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ideas = readIdeas();
  const idea = ideas.find((i) => i.slNo === Number(id));
  if (!idea) notFound();

  return (
    <>
      <Header
        title="Edit Idea"
        subtitle={`Editing: ${idea.idea}`}
      />
      <div
        style={{
          backgroundColor: "#111827",
          border: "1px solid #1f2937",
          borderRadius: "12px",
          padding: "32px",
        }}
      >
        <IdeaForm mode="edit" ideaId={idea.slNo} defaultValues={idea} />
      </div>
    </>
  );
}
