"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Idea, IdeaFormData, IdeaStatus } from "@/types";
import { PORTFOLIOS, STATUSES } from "@/lib/constants";

interface IdeaFormProps {
  defaultValues?: Partial<Idea>;
  mode: "create" | "edit";
  ideaId?: number;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#0a0f1e",
  border: "1px solid #1f2937",
  borderRadius: "8px",
  padding: "10px 14px",
  color: "#f9fafb",
  fontSize: "14px",
  outline: "none",
  marginTop: "6px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 500,
  color: "#9ca3af",
  display: "block",
};

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label style={labelStyle}>
        {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

export function IdeaForm({ defaultValues = {}, mode, ideaId }: IdeaFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<IdeaFormData>({
    idea: defaultValues.idea ?? "",
    description: defaultValues.description ?? "",
    owner: defaultValues.owner ?? "",
    lead: defaultValues.lead ?? "",
    portfolio: defaultValues.portfolio ?? "",
    status: defaultValues.status ?? "IDEATION",
    businessImpact: defaultValues.businessImpact ?? "",
    ranking: defaultValues.ranking ?? 5,
    costEfficiency: defaultValues.costEfficiency ?? "",
    productivityIncrease: defaultValues.productivityIncrease ?? 0,
    ticketsReduced: defaultValues.ticketsReduced ?? 0,
    timeSaved: defaultValues.timeSaved ?? "",
  });

  function set(field: keyof IdeaFormData, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.idea.trim() || !form.owner.trim() || !form.portfolio) {
      setError("Idea title, owner, and portfolio are required.");
      return;
    }
    setError("");
    setSaving(true);

    const url = mode === "create" ? "/api/ideas" : `/api/ideas/${ideaId}`;
    const method = mode === "create" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/ideas");
      router.refresh();
    } else {
      setError("Failed to save. Please try again.");
    }
    setSaving(false);
  }

  const sectionTitle = (title: string) => (
    <div
      style={{
        fontSize: "11px",
        fontWeight: 700,
        color: "#6b7280",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        padding: "16px 0 12px 0",
        borderTop: "1px solid #1f2937",
        marginTop: "8px",
      }}
    >
      {title}
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {sectionTitle("Core Information")}

          <Field label="Idea Title" required>
            <input
              type="text"
              value={form.idea}
              onChange={(e) => set("idea", e.target.value)}
              placeholder="e.g. AI-powered PR review bot"
              style={inputStyle}
            />
          </Field>

          <Field label="Description" required>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Describe what this idea does and how it works..."
              rows={4}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </Field>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Field label="Owner" required>
              <input
                type="text"
                value={form.owner}
                onChange={(e) => set("owner", e.target.value)}
                placeholder="Who submitted this?"
                style={inputStyle}
              />
            </Field>
            <Field label="Lead Developer" >
              <input
                type="text"
                value={form.lead}
                onChange={(e) => set("lead", e.target.value)}
                placeholder="Who is building it?"
                style={inputStyle}
              />
            </Field>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Field label="Portfolio" required>
              <select
                value={form.portfolio}
                onChange={(e) => set("portfolio", e.target.value)}
                style={{ ...inputStyle, color: form.portfolio ? "#f9fafb" : "#6b7280" }}
              >
                <option value="">Select portfolio...</option>
                {PORTFOLIOS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Status">
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value as IdeaStatus)}
                style={inputStyle}
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {sectionTitle("Benefits (Optional)")}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Field label="Cost Efficiency">
              <input
                type="text"
                value={form.costEfficiency}
                onChange={(e) => set("costEfficiency", e.target.value)}
                placeholder='e.g. "$120K/yr"'
                style={inputStyle}
              />
            </Field>
            <Field label="Time Saved">
              <input
                type="text"
                value={form.timeSaved}
                onChange={(e) => set("timeSaved", e.target.value)}
                placeholder='e.g. "8 hrs/week"'
                style={inputStyle}
              />
            </Field>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Field label="Productivity Increase (%)">
              <input
                type="number"
                min={0}
                max={100}
                value={form.productivityIncrease || ""}
                onChange={(e) => set("productivityIncrease", Number(e.target.value))}
                placeholder="e.g. 25"
                style={inputStyle}
              />
            </Field>
            <Field label="Tickets Reduced">
              <input
                type="number"
                min={0}
                value={form.ticketsReduced || ""}
                onChange={(e) => set("ticketsReduced", Number(e.target.value))}
                placeholder="e.g. 120"
                style={inputStyle}
              />
            </Field>
          </div>

          {sectionTitle("Leadership")}

          <Field label="Business Impact">
            <textarea
              value={form.businessImpact}
              onChange={(e) => set("businessImpact", e.target.value)}
              placeholder="Describe the business value and strategic importance..."
              rows={3}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </Field>

          <Field label={`Ranking: ${form.ranking}/10`}>
            <input
              type="range"
              min={1}
              max={10}
              value={form.ranking}
              onChange={(e) => set("ranking", Number(e.target.value))}
              style={{ width: "100%", marginTop: "8px", accentColor: "#6366f1" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#4b5563" }}>
              <span>Low (1)</span>
              <span style={{ color: "#6366f1", fontWeight: 600 }}>{form.ranking}</span>
              <span>High (10)</span>
            </div>
          </Field>
        </div>
      </div>

      {error && (
        <p style={{ color: "#ef4444", fontSize: "13px", marginTop: "16px" }}>{error}</p>
      )}

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "32px",
          paddingTop: "24px",
          borderTop: "1px solid #1f2937",
        }}
      >
        <button
          type="submit"
          disabled={saving}
          style={{
            padding: "12px 24px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #6366f1, #4f46e5)",
            color: "white",
            fontWeight: 600,
            fontSize: "14px",
            border: "none",
            cursor: saving ? "not-allowed" : "pointer",
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? "Saving..." : mode === "create" ? "Submit Idea" : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          style={{
            padding: "12px 24px",
            borderRadius: "8px",
            backgroundColor: "#1f2937",
            color: "#9ca3af",
            fontWeight: 600,
            fontSize: "14px",
            border: "1px solid #374151",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
