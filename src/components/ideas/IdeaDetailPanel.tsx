"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Idea } from "@/types";
import { StatusBadge } from "./StatusBadge";
import { Pencil, Trash2, ArrowLeft } from "lucide-react";

interface IdeaDetailPanelProps {
  idea: Idea;
}

function MetricCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string;
  icon: string;
  color: string;
}) {
  const isEmpty = !value || value === "0" || value === "";
  return (
    <div
      style={{
        backgroundColor: "#0a0f1e",
        border: `1px solid ${isEmpty ? "#1f2937" : color + "40"}`,
        borderRadius: "10px",
        padding: "16px",
        flex: 1,
      }}
    >
      <div style={{ fontSize: "20px", marginBottom: "8px" }}>{icon}</div>
      <p style={{ fontSize: "11px", color: "#6b7280", margin: "0 0 4px 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </p>
      <p style={{ fontSize: "18px", fontWeight: 700, color: isEmpty ? "#374151" : color, margin: 0 }}>
        {isEmpty ? "—" : value}
      </p>
    </div>
  );
}

export function IdeaDetailPanel({ idea }: IdeaDetailPanelProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this idea permanently?")) return;
    setDeleting(true);
    const res = await fetch(`/api/ideas/${idea.slNo}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/ideas");
      router.refresh();
    } else {
      alert("Failed to delete. Please try again.");
      setDeleting(false);
    }
  }

  return (
    <div>
      {/* Back */}
      <Link
        href="/ideas"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          color: "#9ca3af",
          textDecoration: "none",
          fontSize: "13px",
          marginBottom: "24px",
        }}
      >
        <ArrowLeft size={14} /> Back to All Ideas
      </Link>

      {/* Header card */}
      <div
        style={{
          backgroundColor: "#111827",
          border: "1px solid #1f2937",
          borderRadius: "12px",
          padding: "28px",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <StatusBadge status={idea.status} />
              <span style={{ fontSize: "12px", color: "#6b7280" }}>#{idea.slNo}</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#f9fafb", margin: "0 0 16px 0" }}>
              {idea.idea}
            </h1>
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              <div>
                <span style={{ fontSize: "11px", color: "#6b7280", display: "block" }}>Owner</span>
                <span style={{ fontSize: "14px", color: "#f9fafb", fontWeight: 500 }}>{idea.owner}</span>
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "#6b7280", display: "block" }}>Lead Developer</span>
                <span style={{ fontSize: "14px", color: "#f9fafb", fontWeight: 500 }}>{idea.lead || "—"}</span>
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "#6b7280", display: "block" }}>Portfolio</span>
                <span style={{ fontSize: "14px", color: "#f9fafb", fontWeight: 500 }}>{idea.portfolio}</span>
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "#6b7280", display: "block" }}>Ranking</span>
                <span style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: idea.ranking >= 8 ? "#10b981" : idea.ranking >= 6 ? "#f59e0b" : "#9ca3af"
                }}>
                  {idea.ranking}/10
                </span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
            <Link
              href={`/ideas/${idea.slNo}/edit`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "9px 16px",
                borderRadius: "8px",
                backgroundColor: "#1f2937",
                color: "#f9fafb",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 500,
                border: "1px solid #374151",
              }}
            >
              <Pencil size={14} /> Edit
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleting}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "9px 16px",
                borderRadius: "8px",
                backgroundColor: "rgba(239,68,68,0.1)",
                color: "#ef4444",
                fontSize: "13px",
                fontWeight: 500,
                border: "1px solid rgba(239,68,68,0.2)",
                cursor: deleting ? "not-allowed" : "pointer",
                opacity: deleting ? 0.7 : 1,
              }}
            >
              <Trash2 size={14} /> {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div
        style={{
          backgroundColor: "#111827",
          border: "1px solid #1f2937",
          borderRadius: "12px",
          padding: "24px",
          marginBottom: "20px",
        }}
      >
        <p style={{ fontSize: "12px", color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 12px 0" }}>
          Description
        </p>
        <p style={{ fontSize: "15px", color: "#d1d5db", lineHeight: 1.7, margin: 0 }}>
          {idea.description || "No description provided."}
        </p>
      </div>

      {/* Benefit Metrics */}
      <div style={{ marginBottom: "20px" }}>
        <p style={{ fontSize: "12px", color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 12px 0" }}>
          Benefits
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <MetricCard
            label="Cost Efficiency"
            value={idea.costEfficiency}
            icon="💰"
            color="#10b981"
          />
          <MetricCard
            label="Productivity Increase"
            value={idea.productivityIncrease > 0 ? `+${idea.productivityIncrease}%` : ""}
            icon="⚡"
            color="#f59e0b"
          />
          <MetricCard
            label="Tickets Reduced"
            value={idea.ticketsReduced > 0 ? idea.ticketsReduced.toLocaleString() : ""}
            icon="🎫"
            color="#06b6d4"
          />
          <MetricCard
            label="Time Saved"
            value={idea.timeSaved}
            icon="⏱️"
            color="#8b5cf6"
          />
        </div>
      </div>

      {/* Business Impact */}
      {idea.businessImpact && (
        <div
          style={{
            backgroundColor: "#111827",
            border: "1px solid #1f2937",
            borderLeft: "3px solid #6366f1",
            borderRadius: "12px",
            padding: "24px",
          }}
        >
          <p style={{ fontSize: "12px", color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 12px 0" }}>
            Business Impact
          </p>
          <p style={{ fontSize: "15px", color: "#d1d5db", lineHeight: 1.7, margin: 0 }}>
            {idea.businessImpact}
          </p>
        </div>
      )}
    </div>
  );
}
