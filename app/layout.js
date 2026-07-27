import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

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
        <body className={`${manrope.variable} ${inter.variable} font-sans antialiased text-slate-900 bg-white min-h-screen flex flex-col`} suppressHydrationWarning>
          <Header />
          <main className="flex-1 pt-14" suppressHydrationWarning>{children}</main>
          <Toaster richColors />

          <footer className="border-t border-slate-200/80 bg-white mt-8">
            <div className="container mx-auto px-6 py-12">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
                {/* Brand */}
                <div className="col-span-2 space-y-3">
                  <p className="font-extrabold text-lg text-slate-900 font-manrope">
                    Fin<span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">Sight</span>
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
                    AI-powered personal finance — built for students, freelancers, and first-jobbers who want clarity without complexity.
                  </p>
                  <p className="text-xs text-slate-400">Made with 💗 by Yash Chauhan</p>
                </div>

                {/* Product */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Product</h4>
                  <ul className="space-y-2">
                    {["Dashboard", "Add Transaction", "Budget Tracker", "AI Assistant", "Accounts"].map(l => (
                      <li key={l}><a href="/dashboard" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">{l}</a></li>
                    ))}
                  </ul>
                </div>

                {/* Resources */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Resources</h4>
                  <ul className="space-y-2">
                    {["Features", "How It Works", "AI Demo", "Pricing", "FAQ"].map(l => (
                      <li key={l}><a href={`#${l.toLowerCase().replace(/ /g, '-')}`} className="text-xs text-slate-500 hover:text-slate-900 transition-colors">{l}</a></li>
                    ))}
                  </ul>
                </div>

                {/* Security */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Security</h4>
                  <ul className="space-y-2">
                    {["256-bit Encryption", "Read-only Access", "GDPR Compliant", "No Card Required", "Data Deletion"].map(l => (
                      <li key={l}><span className="text-xs text-slate-500">{l}</span></li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 pt-6 gap-3">
                <p className="text-xs text-slate-400" suppressHydrationWarning>
                  © {new Date().getFullYear()} FinSight AI. All rights reserved.
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <a href="#" className="hover:text-slate-700 transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-slate-700 transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-slate-700 transition-colors">Contact</a>
                </div>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}