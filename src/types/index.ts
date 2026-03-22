export type IdeaStatus =
  | "IDEATION"
  | "IN_PROGRESS"
  | "REVIEW"
  | "DEPLOYED"
  | "DEPRECATED";

export interface Idea {
  slNo: number;
  idea: string;
  description: string;
  owner: string;
  lead: string;
  portfolio: string;
  status: IdeaStatus;
  businessImpact: string;
  ranking: number;
  costEfficiency: string;
  productivityIncrease: number;
  ticketsReduced: number;
  timeSaved: string;
}

export interface DashboardSummary {
  totalIdeas: number;
  deployedCount: number;
  inProgressCount: number;
  avgRanking: number;
  activePortfolios: number;
  totalTicketsReduced: number;
  avgProductivityIncrease: number;
  byStatus: Record<IdeaStatus, number>;
  byPortfolio: { portfolio: string; count: number }[];
  topIdeas: Idea[];
  recentIdeas: Idea[];
}

export type IdeaFormData = Omit<Idea, "slNo">;
