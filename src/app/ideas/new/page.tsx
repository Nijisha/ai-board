import { Header } from "@/components/layout/Header";
import { IdeaForm } from "@/components/ideas/IdeaForm";

export default function NewIdeaPage() {
  return (
    <>
      <Header
        title="Submit New Idea"
        subtitle="Add a new AI efficiency initiative to the dashboard"
      />
      <div
        style={{
          backgroundColor: "#111827",
          border: "1px solid #1f2937",
          borderRadius: "12px",
          padding: "32px",
        }}
      >
        <IdeaForm mode="create" />
      </div>
    </>
  );
}
