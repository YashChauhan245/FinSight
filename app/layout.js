import { Inter } from "next/font/google";
import "./globals.css";
import NavbarClient from "@/components/navbar-client";
import Footer from "@/components/footer";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "FinSight · Personal finance",
  description: "Track transactions, review spending, and manage your monthly budget.",
  icons: {
    icon: { url: "/icon.png?v=forest", type: "image/png" },
    apple: "/icon.png?v=forest",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen flex flex-col`} suppressHydrationWarning>
        <NavbarClient />
        <main className="flex-1 pt-16">{children}</main>
        <Toaster richColors />
        <Footer />
      </body>
    </html>
  );
}
