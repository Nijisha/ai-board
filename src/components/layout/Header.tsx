import Link from "next/link";
import { PlusCircle } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  action?: { label: string; href: string };
}

export function Header({ title, subtitle, action }: HeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "32px",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#f9fafb",
            margin: 0,
            letterSpacing: "-0.5px",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: "14px", color: "#9ca3af", margin: "4px 0 0 0" }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 18px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #6366f1, #4f46e5)",
            color: "white",
            fontWeight: 600,
            fontSize: "14px",
            textDecoration: "none",
            boxShadow: "0 0 20px rgba(99,102,241,0.3)",
            transition: "opacity 0.15s",
          }}
        >
          <PlusCircle size={16} />
          {action.label}
        </Link>
      )}
    </div>
  );
}
