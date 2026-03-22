"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PortfolioBarChartProps {
  data: { portfolio: string; count: number }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#1f2937",
          border: "1px solid #374151",
          borderRadius: "8px",
          padding: "10px 14px",
          color: "#f9fafb",
          fontSize: "13px",
        }}
      >
        <p style={{ margin: "0 0 4px 0", fontWeight: 600 }}>{label}</p>
        <p style={{ margin: 0, color: "#6366f1" }}>
          {payload[0].value} idea{payload[0].value !== 1 ? "s" : ""}
        </p>
      </div>
    );
  }
  return null;
};

export function PortfolioBarChart({ data }: PortfolioBarChartProps) {
  const shortLabel = (name: string) => {
    const map: Record<string, string> = {
      "Platform Engineering": "Platform",
      "Data & Analytics": "Data",
      "Customer Experience": "CX",
      "Developer Productivity": "Dev Prod",
      Security: "Security",
      Payments: "Payments",
    };
    return map[name] || name;
  };

  const chartData = data.map((d) => ({ ...d, name: shortLabel(d.portfolio) }));

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
      <p
        style={{
          fontSize: "14px",
          fontWeight: 600,
          color: "#f9fafb",
          margin: "0 0 20px 0",
        }}
      >
        Ideas by Portfolio
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData} barSize={32}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: "#9ca3af", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#9ca3af", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99,102,241,0.05)" }} />
          <Bar
            dataKey="count"
            fill="#6366f1"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
