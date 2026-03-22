import Link from "next/link";
import { Idea } from "@/types";
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/constants";

interface RecentIdeasFeedProps {
  ideas: Idea[];
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const AVATAR_COLORS = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
];

export function RecentIdeasFeed({ ideas }: RecentIdeasFeedProps) {
  return (
    <div
      style={{
        backgroundColor: "#111827",
        border: "1px solid #1f2937",
        borderRadius: "12px",
        padding: "20px",
        width: "320px",
        flexShrink: 0,
      }}
    >
      <p style={{ fontSize: "14px", fontWeight: 600, color: "#f9fafb", margin: "0 0 16px 0" }}>
        Recently Added
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {ideas.map((idea, idx) => (
          <Link
            key={idea.slNo}
            href={`/ideas/${idea.slNo}`}
            style={{ textDecoration: "none", display: "flex", alignItems: "flex-start", gap: "10px" }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                backgroundColor: AVATAR_COLORS[idx % AVATAR_COLORS.length],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 700,
                color: "white",
                flexShrink: 0,
              }}
            >
              {initials(idea.owner)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#f9fafb",
                  margin: "0 0 3px 0",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {idea.idea}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "11px", color: "#6b7280" }}>{idea.owner}</span>
                <span style={{ color: "#374151", fontSize: "11px" }}>·</span>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    padding: "1px 6px",
                    borderRadius: "20px",
                    backgroundColor: `${STATUS_COLORS[idea.status]}20`,
                    color: STATUS_COLORS[idea.status],
                  }}
                >
                  {STATUS_LABELS[idea.status]}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
