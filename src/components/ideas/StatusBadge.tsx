import { IdeaStatus } from "@/types";
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/constants";

interface StatusBadgeProps {
  status: IdeaStatus;
  size?: "sm" | "md";
}

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const color = STATUS_COLORS[status];
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: size === "sm" ? "10px" : "12px",
        fontWeight: 600,
        padding: size === "sm" ? "2px 6px" : "4px 10px",
        borderRadius: "20px",
        backgroundColor: `${color}20`,
        color,
        whiteSpace: "nowrap",
      }}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
