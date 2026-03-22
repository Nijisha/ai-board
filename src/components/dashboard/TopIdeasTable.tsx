import Link from "next/link";
import { Idea } from "@/types";
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/constants";

interface TopIdeasTableProps {
  ideas: Idea[];
}

export function TopIdeasTable({ ideas }: TopIdeasTableProps) {
  return (
    <div
      style={{
        backgroundColor: "#111827",
        border: "1px solid #1f2937",
        borderRadius: "12px",
        padding: "20px",
        flex: 1,
      }}
    >
      <p style={{ fontSize: "14px", fontWeight: 600, color: "#f9fafb", margin: "0 0 16px 0" }}>
        Top Ranked Ideas
      </p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["#", "Idea", "Portfolio", "Lead", "Status", "Rank"].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  fontSize: "11px",
                  color: "#6b7280",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  padding: "0 8px 10px 0",
                  borderBottom: "1px solid #1f2937",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ideas.map((idea, idx) => (
            <tr key={idea.slNo}>
              <td style={{ padding: "12px 8px 12px 0", color: "#4b5563", fontSize: "12px" }}>
                {idx + 1}
              </td>
              <td style={{ padding: "12px 8px 12px 0" }}>
                <Link
                  href={`/ideas/${idea.slNo}`}
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#f9fafb",
                    textDecoration: "none",
                    display: "block",
                    maxWidth: "160px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {idea.idea}
                </Link>
                <span style={{ fontSize: "11px", color: "#6b7280" }}>{idea.owner}</span>
              </td>
              <td style={{ padding: "12px 8px 12px 0", fontSize: "12px", color: "#9ca3af" }}>
                {idea.portfolio.split(" ")[0]}
              </td>
              <td style={{ padding: "12px 8px 12px 0", fontSize: "12px", color: "#9ca3af" }}>
                {idea.lead.split(" ")[0]}
              </td>
              <td style={{ padding: "12px 8px 12px 0" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "3px 8px",
                    borderRadius: "20px",
                    backgroundColor: `${STATUS_COLORS[idea.status]}20`,
                    color: STATUS_COLORS[idea.status],
                  }}
                >
                  {STATUS_LABELS[idea.status]}
                </span>
              </td>
              <td style={{ padding: "12px 0 12px 0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: idea.ranking >= 8 ? "#10b981" : idea.ranking >= 6 ? "#f59e0b" : "#9ca3af",
                    }}
                  >
                    {idea.ranking}
                  </span>
                  <span style={{ fontSize: "11px", color: "#4b5563" }}>/10</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
