import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const inter = Lato({
  subsets: ["latin"],
  weight: '400',
  display: 'swap'
});

export const metadata: Metadata = {
  title: "taskIt",
  description: "Dont' Think, Just Do It 🚀",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
