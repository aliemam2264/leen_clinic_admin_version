import type { Metadata } from "next";
import "./globals.css";
import { Tajawal } from "next/font/google";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Leen Clinic | جلدية وتجميل وليزر",
  description: "Landing page احترافية لعيادة تجميل وجلدية وليزر مع حجز واتساب، خدمات، أسعار، قبل وبعد، أجهزة، موقع وتواصل.",
  keywords: ["عيادة تجميل", "جلدية", "ليزر", "فيلر", "بوتكس", "تنظيف البشرة", "Leen"],
  openGraph: {
    title: "Leen Clinic | جلدية وتجميل وليزر",
    description: "احجزي موعدك عبر واتساب وشاهدي الخدمات والحالات قبل وبعد.",
    type: "website",
    locale: "ar_EG"
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={tajawal.className}>{children}</body>
    </html>
  );
}
