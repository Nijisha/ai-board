"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Idea, IdeaStatus } from "@/types";
import { StatusBadge } from "./StatusBadge";
import { PORTFOLIOS, STATUSES } from "@/lib/constants";
import { Pencil, Trash2, Eye, ChevronUp, ChevronDown } from "lucide-react";

interface IdeaTableProps {
  ideas: Idea[];
}

type SortKey = keyof Idea;

export function IdeaTable({ initialIdeas }: { initialIdeas: Idea[] }) {
  const router = useRouter();
  const [ideas, setIdeas] = useState(initialIdeas);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [portfolioFilter, setPortfolioFilter] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("slNo");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [deleting, setDeleting] = useState<number | null>(null);

  const filtered = useMemo(() => {
    let list = [...ideas];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (i) =>
          i.idea.toLowerCase().includes(q) ||
          i.owner.toLowerCase().includes(q) ||
          i.lead.toLowerCase().includes(q) ||
          i.portfolio.toLowerCase().includes(q)
      );
    }
    if (statusFilter) list = list.filter((i) => i.status === statusFilter);
    if (portfolioFilter) list = list.filter((i) => i.portfolio === portfolioFilter);

    list.sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });

    return list;
  }, [ideas, search, statusFilter, portfolioFilter, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  async function handleDelete(slNo: number) {
    if (!confirm("Delete this idea? This cannot be undone.")) return;
    setDeleting(slNo);
    await fetch(`/api/ideas/${slNo}`, { method: "DELETE" });
    setIdeas((prev) => prev.filter((i) => i.slNo !== slNo));
    setDeleting(null);
  }

  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k) return <ChevronUp size={12} color="#4b5563" />;
    return sortDir === "asc" ? (
      <ChevronUp size={12} color="#6366f1" />
    ) : (
      <ChevronDown size={12} color="#6366f1" />
    );
  }

  const thStyle: React.CSSProperties = {
    textAlign: "left",
    fontSize: "11px",
    color: "#6b7280",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    padding: "0 12px 12px 0",
    borderBottom: "1px solid #1f2937",
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
  };

  return (
    <div>
      {/* Filters */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search ideas, owners, leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: "200px",
            backgroundColor: "#111827",
            border: "1px solid #1f2937",
            borderRadius: "8px",
            padding: "10px 14px",
            color: "#f9fafb",
            fontSize: "14px",
            outline: "none",
          }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            backgroundColor: "#111827",
            border: "1px solid #1f2937",
            borderRadius: "8px",
            padding: "10px 14px",
            color: statusFilter ? "#f9fafb" : "#6b7280",
            fontSize: "14px",
            outline: "none",
          }}
        >
          <option value="">All Statuses</option>
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <select
          value={portfolioFilter}
          onChange={(e) => setPortfolioFilter(e.target.value)}
          style={{
            backgroundColor: "#111827",
            border: "1px solid #1f2937",
            borderRadius: "8px",
            padding: "10px 14px",
            color: portfolioFilter ? "#f9fafb" : "#6b7280",
            fontSize: "14px",
            outline: "none",
          }}
        >
          <option value="">All Portfolios</option>
          {PORTFOLIOS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Count */}
      <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "12px" }}>
        {filtered.length} idea{filtered.length !== 1 ? "s" : ""}
        {(search || statusFilter || portfolioFilter) ? " matching filters" : ""}
      </p>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {(
                [
                  ["#", "slNo"],
                  ["Idea", "idea"],
                  ["Owner", "owner"],
                  ["Lead", "lead"],
                  ["Portfolio", "portfolio"],
                  ["Status", "status"],
                  ["Rank", "ranking"],
                  ["Productivity", "productivityIncrease"],
                  ["Tickets", "ticketsReduced"],
                  ["Actions", null],
                ] as [string, SortKey | null][]
              ).map(([label, key]) => (
                <th
                  key={label}
                  style={thStyle}
                  onClick={() => key && handleSort(key)}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    {label}
                    {key && <SortIcon k={key} />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((idea) => (
              <tr
                key={idea.slNo}
                style={{ borderBottom: "1px solid #1f2937" }}
              >
                <td style={{ padding: "14px 12px 14px 0", color: "#4b5563", fontSize: "12px" }}>
                  {idea.slNo}
                </td>
                <td style={{ padding: "14px 12px 14px 0", maxWidth: "200px" }}>
                  <Link
                    href={`/ideas/${idea.slNo}`}
                    style={{ textDecoration: "none", color: "#f9fafb", fontWeight: 500, fontSize: "13px" }}
                  >
                    <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {idea.idea}
                    </span>
                  </Link>
                </td>
                <td style={{ padding: "14px 12px 14px 0", fontSize: "13px", color: "#9ca3af", whiteSpace: "nowrap" }}>
                  {idea.owner}
                </td>
                <td style={{ padding: "14px 12px 14px 0", fontSize: "13px", color: "#9ca3af", whiteSpace: "nowrap" }}>
                  {idea.lead}
                </td>
                <td style={{ padding: "14px 12px 14px 0", fontSize: "12px", color: "#9ca3af" }}>
                  {idea.portfolio}
                </td>
                <td style={{ padding: "14px 12px 14px 0" }}>
                  <StatusBadge status={idea.status} size="sm" />
                </td>
                <td style={{ padding: "14px 12px 14px 0", textAlign: "center" }}>
                  <span style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: idea.ranking >= 8 ? "#10b981" : idea.ranking >= 6 ? "#f59e0b" : "#9ca3af"
                  }}>
                    {idea.ranking}
                  </span>
                </td>
                <td style={{ padding: "14px 12px 14px 0", textAlign: "center" }}>
                  <span style={{ fontSize: "13px", color: idea.productivityIncrease > 0 ? "#06b6d4" : "#4b5563" }}>
                    {idea.productivityIncrease > 0 ? `+${idea.productivityIncrease}%` : "—"}
                  </span>
                </td>
                <td style={{ padding: "14px 12px 14px 0", textAlign: "center" }}>
                  <span style={{ fontSize: "13px", color: idea.ticketsReduced > 0 ? "#06b6d4" : "#4b5563" }}>
                    {idea.ticketsReduced > 0 ? idea.ticketsReduced.toLocaleString() : "—"}
                  </span>
                </td>
                <td style={{ padding: "14px 0 14px 0" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Link
                      href={`/ideas/${idea.slNo}`}
                      title="View"
                      style={{ color: "#6b7280", display: "flex" }}
                    >
                      <Eye size={15} />
                    </Link>
                    <Link
                      href={`/ideas/${idea.slNo}/edit`}
                      title="Edit"
                      style={{ color: "#6366f1", display: "flex" }}
                    >
                      <Pencil size={15} />
                    </Link>
                    <button
                      onClick={() => handleDelete(idea.slNo)}
                      disabled={deleting === idea.slNo}
                      title="Delete"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#ef4444",
                        padding: 0,
                        display: "flex",
                        opacity: deleting === idea.slNo ? 0.5 : 1,
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={10} style={{ padding: "40px", textAlign: "center", color: "#4b5563", fontSize: "14px" }}>
                  No ideas found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
