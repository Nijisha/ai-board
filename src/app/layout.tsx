import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "AI Efficiency Dashboard",
  description: "Leadership view of AI innovation ideas across engineering teams",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <Sidebar />
          <main
            style={{
              flex: 1,
              padding: "40px",
              overflowY: "auto",
              backgroundColor: "#0a0f1e",
            }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
