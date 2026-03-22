import { IdeaStatus } from "@/types";
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

const PIPELINE_STAGES: IdeaStatus[] = ["IDEATION", "IN_PROGRESS", "REVIEW", "DEPLOYED"];

interface StatusPipelineProps {
  byStatus: Record<IdeaStatus, number>;
}

export function StatusPipeline({ byStatus }: StatusPipelineProps) {
  return (
    <div
      style={{
        backgroundColor: "#111827",
        border: "1px solid #1f2937",
        borderRadius: "12px",
        padding: "20px",
      }}
    >
      <p style={{ fontSize: "14px", fontWeight: 600, color: "#f9fafb", margin: "0 0 20px 0" }}>
        Idea Pipeline
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
        {PIPELINE_STAGES.map((status, idx) => (
          <div key={status} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "12px",
                  backgroundColor: `${STATUS_COLORS[status]}15`,
                  border: `1px solid ${STATUS_COLORS[status]}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: STATUS_COLORS[status],
                }}
              >
                {byStatus[status] || 0}
              </div>
              <span style={{ fontSize: "11px", color: "#9ca3af", textAlign: "center", maxWidth: "70px" }}>
                {STATUS_LABELS[status]}
              </span>
            </div>
            {idx < PIPELINE_STAGES.length - 1 && (
              <ArrowRight size={16} color="#374151" style={{ flexShrink: 0, marginBottom: "20px" }} />
            )}
          </div>
        ))}
        {/* Deprecated pill */}
        {byStatus.DEPRECATED > 0 && (
          <div style={{ marginLeft: "auto", textAlign: "center" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "20px",
                backgroundColor: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)",
              }}
            >
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#ef4444" }}>
                {byStatus.DEPRECATED}
              </span>
              <span style={{ fontSize: "12px", color: "#9ca3af" }}>Deprecated</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
