import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { TanstackProvider } from "@/providers/TanstackProvider";
import { Toaster } from "@/components/ui/sonner";

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
      <body className={inter.className}>
        <TanstackProvider>
          <div>
            {children}
            <Toaster />
          </div>
        </TanstackProvider>

      </body>
    </html>
  );
}
