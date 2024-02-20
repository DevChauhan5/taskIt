import type { Metadata } from "next";
import { Acme } from "next/font/google";
import "./globals.css";

const acme = Acme({ 
  subsets: ["latin"],
  weight: ['400'], 
});

export const metadata: Metadata = {
  title: "taskit",
  description: "All you need to manage yourself!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={acme.className}>{children}</body>
    </html>
  );
}
