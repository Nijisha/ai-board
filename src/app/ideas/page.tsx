import { readIdeas } from "@/lib/excel";
import { Header } from "@/components/layout/Header";
import { IdeaTable } from "@/components/ideas/IdeaTable";

export const dynamic = "force-dynamic";

export default function IdeasPage() {
  const ideas = readIdeas();

  return (
    <>
      <Header
        title="All Ideas"
        subtitle={`${ideas.length} AI initiatives tracked`}
        action={{ label: "Add Idea", href: "/ideas/new" }}
      />
      <div
        style={{
          backgroundColor: "#111827",
          border: "1px solid #1f2937",
          borderRadius: "12px",
          padding: "24px",
        }}
      >
        <IdeaTable initialIdeas={ideas} />
      </div>
    </>
  );
}
