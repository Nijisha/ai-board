"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { IdeaStatus } from "@/types";
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/constants";

interface StatusDonutChartProps {
  byStatus: Record<IdeaStatus, number>;
}

const CustomTooltip = ({ active, payload }: any) => {
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
        <p style={{ margin: "0 0 4px 0", fontWeight: 600 }}>{payload[0].name}</p>
        <p style={{ margin: 0, color: payload[0].payload.fill }}>
          {payload[0].value} idea{payload[0].value !== 1 ? "s" : ""}
        </p>
      </div>
    );
  }
  return null;
};

export function StatusDonutChart({ byStatus }: StatusDonutChartProps) {
  const data = (Object.keys(byStatus) as IdeaStatus[])
    .filter((s) => byStatus[s] > 0)
    .map((status) => ({
      name: STATUS_LABELS[status],
      value: byStatus[status],
      fill: STATUS_COLORS[status],
    }));

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div
      style={{
        backgroundColor: "#111827",
        border: "1px solid #1f2937",
        borderRadius: "12px",
        padding: "20px",
        width: "320px",
        flexShrink: 0,
      }}
    >
      <p style={{ fontSize: "14px", fontWeight: 600, color: "#f9fafb", margin: "0 0 8px 0" }}>
        Ideas by Status
      </p>
      <div style={{ position: "relative" }}>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.fill} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <p style={{ fontSize: "24px", fontWeight: 700, color: "#f9fafb", margin: 0 }}>
            {total}
          </p>
          <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>Total</p>
        </div>
      </div>
      {/* Legend */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" }}>
        {data.map((d) => (
          <div key={d.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: d.fill }} />
              <span style={{ fontSize: "12px", color: "#9ca3af" }}>{d.name}</span>
            </div>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#f9fafb" }}>{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
