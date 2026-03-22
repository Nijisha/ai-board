import { Idea, DashboardSummary, IdeaStatus } from "@/types";

export function computeDashboardSummary(ideas: Idea[]): DashboardSummary {
  const deployed = ideas.filter((i) => i.status === "DEPLOYED");
  const inProgress = ideas.filter((i) => i.status === "IN_PROGRESS");

  const portfolios = new Set(ideas.map((i) => i.portfolio)).size;

  const totalRanking = ideas.reduce((s, i) => s + (i.ranking || 0), 0);
  const avgRanking = ideas.length ? totalRanking / ideas.length : 0;

  const totalTickets = ideas.reduce((s, i) => s + (i.ticketsReduced || 0), 0);

  const ideasWithProductivity = ideas.filter((i) => i.productivityIncrease > 0);
  const avgProductivity = ideasWithProductivity.length
    ? ideasWithProductivity.reduce((s, i) => s + i.productivityIncrease, 0) /
      ideasWithProductivity.length
    : 0;

  const byStatus = {} as Record<IdeaStatus, number>;
  const allStatuses: IdeaStatus[] = [
    "IDEATION",
    "IN_PROGRESS",
    "REVIEW",
    "DEPLOYED",
    "DEPRECATED",
  ];
  allStatuses.forEach((s) => {
    byStatus[s] = ideas.filter((i) => i.status === s).length;
  });

  const portfolioMap = new Map<string, number>();
  ideas.forEach((i) => {
    portfolioMap.set(i.portfolio, (portfolioMap.get(i.portfolio) || 0) + 1);
  });
  const byPortfolio = Array.from(portfolioMap.entries())
    .map(([portfolio, count]) => ({ portfolio, count }))
    .sort((a, b) => b.count - a.count);

  const topIdeas = [...ideas]
    .sort((a, b) => b.ranking - a.ranking)
    .slice(0, 5);

  const recentIdeas = [...ideas].sort((a, b) => b.slNo - a.slNo).slice(0, 6);

  return {
    totalIdeas: ideas.length,
    deployedCount: deployed.length,
    inProgressCount: inProgress.length,
    avgRanking: Math.round(avgRanking * 10) / 10,
    activePortfolios: portfolios,
    totalTicketsReduced: totalTickets,
    avgProductivityIncrease: Math.round(avgProductivity * 10) / 10,
    byStatus,
    byPortfolio,
    topIdeas,
    recentIdeas,
  };
}
