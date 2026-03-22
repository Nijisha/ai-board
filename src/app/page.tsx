import { readIdeas } from "@/lib/excel";
import { computeDashboardSummary } from "@/lib/calculations";
import { Header } from "@/components/layout/Header";
import { KPICard } from "@/components/dashboard/KPICard";
import { BenefitsSummaryRow } from "@/components/dashboard/BenefitsSummaryRow";
import { PortfolioBarChart } from "@/components/dashboard/PortfolioBarChart";
import { StatusDonutChart } from "@/components/dashboard/StatusDonutChart";
import { TopIdeasTable } from "@/components/dashboard/TopIdeasTable";
import { RecentIdeasFeed } from "@/components/dashboard/RecentIdeasFeed";
import { StatusPipeline } from "@/components/dashboard/StatusPipeline";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const ideas = readIdeas();
  const summary = computeDashboardSummary(ideas);

  const deploymentRate =
    summary.totalIdeas > 0
      ? Math.round((summary.deployedCount / summary.totalIdeas) * 100)
      : 0;

  return (
    <>
      <Header
        title="AI Efficiency Dashboard"
        subtitle="Leadership view of engineering AI initiatives"
        action={{ label: "Add Idea", href: "/ideas/new" }}
      />

      {/* Core KPIs */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "24px", flexWrap: "wrap" }}>
        <KPICard
          label="Total AI Ideas"
          value={summary.totalIdeas}
          subtext={`Across ${summary.activePortfolios} portfolios`}
          icon="💡"
          accentColor="#6366f1"
          glowColor="rgba(99,102,241,0.15)"
        />
        <KPICard
          label="Deployed"
          value={summary.deployedCount}
          subtext={`${deploymentRate}% deployment rate`}
          icon="🚀"
          accentColor="#10b981"
          glowColor="rgba(16,185,129,0.15)"
        />
        <KPICard
          label="In Progress"
          value={summary.inProgressCount}
          subtext="Active development"
          icon="🔧"
          accentColor="#f59e0b"
          glowColor="rgba(245,158,11,0.15)"
        />
        <KPICard
          label="Avg Ranking"
          value={`${summary.avgRanking}/10`}
          subtext="Leadership impact score"
          icon="⭐"
          accentColor="#8b5cf6"
          glowColor="rgba(139,92,246,0.15)"
        />
      </div>

      {/* Benefits Summary */}
      <div style={{ marginBottom: "24px" }}>
        <p
          style={{
            fontSize: "12px",
            color: "#6b7280",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            margin: "0 0 12px 0",
            fontWeight: 600,
          }}
        >
          Aggregate Benefits
        </p>
        <BenefitsSummaryRow ideas={ideas} />
      </div>

      {/* Charts Row */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
        <PortfolioBarChart data={summary.byPortfolio} />
        <StatusDonutChart byStatus={summary.byStatus} />
      </div>

      {/* Top Ideas + Recent Feed */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
        <TopIdeasTable ideas={summary.topIdeas} />
        <RecentIdeasFeed ideas={summary.recentIdeas} />
      </div>

      {/* Status Pipeline */}
      <StatusPipeline byStatus={summary.byStatus} />
    </>
  );
}
