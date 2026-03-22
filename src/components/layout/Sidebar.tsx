"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Lightbulb, PlusCircle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: BarChart3 },
  { href: "/ideas", label: "All Ideas", icon: Lightbulb },
  { href: "/ideas/new", label: "Add Idea", icon: PlusCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        backgroundColor: "#111827",
        borderRight: "1px solid #1f2937",
        width: "220px",
        minHeight: "100vh",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "24px 20px",
          borderBottom: "1px solid #1f2937",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #6366f1, #06b6d4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Zap size={18} color="white" />
        </div>
        <div>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "#f9fafb", margin: 0 }}>
            AI Efficiency
          </p>
          <p style={{ fontSize: "11px", color: "#6b7280", margin: 0 }}>Dashboard</p>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "16px 12px", flex: 1 }}>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "8px",
                marginBottom: "4px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: active ? 600 : 400,
                color: active ? "#f9fafb" : "#9ca3af",
                backgroundColor: active ? "#1f2937" : "transparent",
                transition: "all 0.15s",
              }}
            >
              <Icon size={16} color={active ? "#6366f1" : "#6b7280"} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: "16px 20px",
          borderTop: "1px solid #1f2937",
          fontSize: "11px",
          color: "#4b5563",
        }}
      >
        Leadership View · v1.0
      </div>
    </aside>
  );
}
