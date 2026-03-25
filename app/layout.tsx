import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mastercard Connect — ICCP",
  description: "In Control for Commercial Payments — VCN Settlement Demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
