import { IdeaStatus } from "@/types";

export const PORTFOLIOS = [
  "Platform Engineering",
  "Data & Analytics",
  "Payments",
  "Customer Experience",
  "Security",
  "Developer Productivity",
];

export const STATUSES: { value: IdeaStatus; label: string; color: string }[] = [
  { value: "IDEATION", label: "Ideation", color: "#6b7280" },
  { value: "IN_PROGRESS", label: "In Progress", color: "#f59e0b" },
  { value: "REVIEW", label: "In Review", color: "#3b82f6" },
  { value: "DEPLOYED", label: "Deployed", color: "#10b981" },
  { value: "DEPRECATED", label: "Deprecated", color: "#ef4444" },
];

export const STATUS_LABELS: Record<IdeaStatus, string> = {
  IDEATION: "Ideation",
  IN_PROGRESS: "In Progress",
  REVIEW: "In Review",
  DEPLOYED: "Deployed",
  DEPRECATED: "Deprecated",
};

export const STATUS_COLORS: Record<IdeaStatus, string> = {
  IDEATION: "#6b7280",
  IN_PROGRESS: "#f59e0b",
  REVIEW: "#3b82f6",
  DEPLOYED: "#10b981",
  DEPRECATED: "#ef4444",
};
