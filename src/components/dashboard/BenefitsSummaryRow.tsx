import { Idea } from "@/types";
import { KPICard } from "./KPICard";

interface BenefitsSummaryRowProps {
  ideas: Idea[];
}

export function BenefitsSummaryRow({ ideas }: BenefitsSummaryRowProps) {
  const totalTickets = ideas.reduce((s, i) => s + (i.ticketsReduced || 0), 0);

  const withProductivity = ideas.filter((i) => i.productivityIncrease > 0);
  const avgProductivity = withProductivity.length
    ? Math.round(
        withProductivity.reduce((s, i) => s + i.productivityIncrease, 0) /
          withProductivity.length
      )
    : 0;

  const withCost = ideas.filter((i) => i.costEfficiency && i.costEfficiency.trim() !== "");
  const withTime = ideas.filter((i) => i.timeSaved && i.timeSaved.trim() !== "");

  return (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <KPICard
        label="Total Tickets Reduced"
        value={totalTickets.toLocaleString()}
        subtext="Across all deployed ideas"
        icon="🎫"
        accentColor="#06b6d4"
        glowColor="rgba(6,182,212,0.15)"
      />
      <KPICard
        label="Avg Productivity Increase"
        value={`${avgProductivity}%`}
        subtext={`From ${withProductivity.length} ideas with data`}
        icon="⚡"
        accentColor="#f59e0b"
        glowColor="rgba(245,158,11,0.15)"
      />
      <KPICard
        label="Cost Efficiency Wins"
        value={withCost.length}
        subtext="Ideas with cost data reported"
        icon="💰"
        accentColor="#10b981"
        glowColor="rgba(16,185,129,0.15)"
      />
      <KPICard
        label="Time Saved Initiatives"
        value={withTime.length}
        subtext="Ideas with time savings reported"
        icon="⏱️"
        accentColor="#8b5cf6"
        glowColor="rgba(139,92,246,0.15)"
      />
    </div>
  );
}
