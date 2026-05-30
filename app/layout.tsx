import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "CertMaster — Premium Sertifikat Yaratish Platformasi",
  description: "O'zbekistonning eng zamonaviy sertifikat tayyorlash platformasi. CertMaster bilan QR kodli, elektron imzoli hujjatlarni osongina yarating.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <Header />

        <main style={{ minHeight: 'calc(100vh - 140px)', padding: '40px 0' }}>
          {children}
        </main>

        <footer style={{ borderTop: '1px solid var(--border-color)', padding: '24px 0', marginTop: 'auto' }}>
          <div className="container footer-inner" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            <p>&copy; {new Date().getFullYear()} CertMaster. Barcha huquqlar himoyalangan.</p>
            <div className="flex gap-4">
              <Link href="/legal">Maxfiylik siyosati</Link>
              <Link href="/legal#terms">Foydalanish shartlari</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
