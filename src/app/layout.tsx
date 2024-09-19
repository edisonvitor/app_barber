import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "./_components/ui/sonner";
import Footer from "./_components/Footer";
import AuthProviders from "./_components/AuthProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FSWBarber",
  description: "Barbearias FSW",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="dark">
      <body className={inter.className}>
        <AuthProviders>
          {/* Layout mobile-first */}
          <div className="flex h-full flex-col">
            {/* Mobile layout */}
            <div className="flex-1 p-4 md:hidden">{children}</div>

            {/* Desktop layout */}
            <div className="hidden md:flex md:flex-1 md:items-center md:justify-center lg:p-10">
              <div className="w-full lg:w-3/4 xl:w-2/3">{children}</div>
            </div>

            <Footer />
          </div>
        </AuthProviders>
        <Toaster />
      </body>
    </html>
  );
}
