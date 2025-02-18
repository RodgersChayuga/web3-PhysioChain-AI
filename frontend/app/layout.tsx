import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Leaderboard } from "@/components/doctor/LeaderboardEntry";
import { RiskAlertsSection } from "@/components/doctor/RiskAlertsSection";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PhysioChain",
  description: "AI-Enhanced Decentralized Physiotherapy Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex bg-gray-50`}
      >

        <div className="flex-1">

          {children}
        </div>


      </body>
    </html>
  );
}
