import { Plus_Jakarta_Sans, Manrope, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "FinSight - AI-Powered Financial Management",
  description: "Track, plan, and grow your finances with AI-powered insights.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${plusJakarta.variable} ${manrope.variable} ${inter.variable} font-sans antialiased text-slate-900 bg-slate-50/40 min-h-screen flex flex-col`} suppressHydrationWarning>
          <Header />
          <main className="flex-1 pt-14" suppressHydrationWarning>{children}</main>
          <Toaster richColors />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}