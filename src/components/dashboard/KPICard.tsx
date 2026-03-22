interface KPICardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: string;
  accentColor?: string;
  glowColor?: string;
}

export function KPICard({
  label,
  value,
  subtext,
  icon,
  accentColor = "#6366f1",
  glowColor = "rgba(99,102,241,0.15)",
}: KPICardProps) {
  return (
    <div
      style={{
        backgroundColor: "#111827",
        border: "1px solid #1f2937",
        borderRadius: "12px",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
        flex: 1,
      }}
    >
      {/* Glow accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: `linear-gradient(90deg, ${accentColor}, transparent)`,
          borderRadius: "12px 12px 0 0",
        }}
      />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: "12px", color: "#9ca3af", margin: "0 0 8px 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {label}
          </p>
          <p style={{ fontSize: "28px", fontWeight: 700, color: "#f9fafb", margin: 0, lineHeight: 1 }}>
            {value}
          </p>
          {subtext && (
            <p style={{ fontSize: "12px", color: "#6b7280", margin: "6px 0 0 0" }}>
              {subtext}
            </p>
          )}
        </div>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            backgroundColor: glowColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
