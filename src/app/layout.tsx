import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "./_components/ui/sonner";
import Footer from "./_components/Footer";
import AuthProviders from "./_components/AuthProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FSWBarber",
  description: "Barbaearias FSW",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="dark">
      <AuthProviders>
        <body className={inter.className}>
          {children}
          <Footer />
          <Toaster />
        </body>
      </AuthProviders>
    </html>
  );
}
