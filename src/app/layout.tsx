import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/keyboard";
import "swiper/css/mousewheel";
import "swiper/css/virtual";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Project Mosaic",
  description: "Превращаем скроллинг в обучение.",
  applicationName: "Project Mosaic",
  appleWebApp: { capable: true, title: "Project Mosaic", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#071018",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
