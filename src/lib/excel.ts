import * as XLSX from "xlsx";
import path from "path";
import fs from "fs";
import { Idea } from "@/types";

const DATA_FILE = path.join(process.cwd(), "data", "ideas.xlsx");

const COLUMN_MAP: Record<string, keyof Idea> = {
  "Sl.No": "slNo",
  Idea: "idea",
  Description: "description",
  Owner: "owner",
  Lead: "lead",
  Portfolio: "portfolio",
  Status: "status",
  "Business Impact": "businessImpact",
  Ranking: "ranking",
  "Cost Efficiency": "costEfficiency",
  "Productivity Increase": "productivityIncrease",
  "Tickets Reduced": "ticketsReduced",
  "Time Saved": "timeSaved",
};

const REVERSE_MAP: Record<keyof Idea, string> = Object.fromEntries(
  Object.entries(COLUMN_MAP).map(([k, v]) => [v, k])
) as Record<keyof Idea, string>;

export function readIdeas(): Idea[] {
  if (!fs.existsSync(DATA_FILE)) return [];
  const workbook = XLSX.readFile(DATA_FILE);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);

  return rows.map((row) => ({
    slNo: Number(row["Sl.No"] ?? 0),
    idea: String(row["Idea"] ?? ""),
    description: String(row["Description"] ?? ""),
    owner: String(row["Owner"] ?? ""),
    lead: String(row["Lead"] ?? ""),
    portfolio: String(row["Portfolio"] ?? ""),
    status: String(row["Status"] ?? "IDEATION") as Idea["status"],
    businessImpact: String(row["Business Impact"] ?? ""),
    ranking: Number(row["Ranking"] ?? 0),
    costEfficiency: String(row["Cost Efficiency"] ?? ""),
    productivityIncrease: Number(row["Productivity Increase"] ?? 0),
    ticketsReduced: Number(row["Tickets Reduced"] ?? 0),
    timeSaved: String(row["Time Saved"] ?? ""),
  }));
}

export function writeIdeas(ideas: Idea[]): void {
  const rows = ideas.map((idea) => ({
    "Sl.No": idea.slNo,
    Idea: idea.idea,
    Description: idea.description,
    Owner: idea.owner,
    Lead: idea.lead,
    Portfolio: idea.portfolio,
    Status: idea.status,
    "Business Impact": idea.businessImpact,
    Ranking: idea.ranking,
    "Cost Efficiency": idea.costEfficiency,
    "Productivity Increase": idea.productivityIncrease,
    "Tickets Reduced": idea.ticketsReduced,
    "Time Saved": idea.timeSaved,
  }));

  const sheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, "Ideas");

  // Ensure data directory exists
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  XLSX.writeFile(workbook, DATA_FILE);
}

export function nextSlNo(ideas: Idea[]): number {
  if (ideas.length === 0) return 1;
  return Math.max(...ideas.map((i) => i.slNo)) + 1;
}
