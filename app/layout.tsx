import type { Metadata } from "next";
import { Mukta } from "next/font/google";
import "./globals.css";

const mukta = Mukta({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'], 
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
      <body className={mukta.className}>{children}</body>
    </html>
  );
}
