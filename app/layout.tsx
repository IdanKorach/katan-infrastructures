import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "אבי קטן תשתיות",
  description: "בחברת קטן תשתיות אנחנו מתמחים בעבודות בעומק האדמה שדורשות ידע, נסיון וטכנולוגיה מתקדמת. עם צוות מקצועי ומנוסה, אנו מבצעים מגוון עבודות תשתיות כולל חפירות, הקמת מערכות ניקוז, ושאיבת מי תהום בצורה בטוחה ויעילה. אצלנו בקטן תשתיות, הבטיחות והאיכות הם בראש סדר העדיפויות שלנו, ואנו מחויבים לספק פתרונות מותאמים אישית לכל פרויקט",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
