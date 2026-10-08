import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alele | Pet Portraits & Commissions",
  description: "Pet portraits, watercolor art, chibis and PNGTubers by Alele. Explore the portfolio and request a custom commission in USD.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
