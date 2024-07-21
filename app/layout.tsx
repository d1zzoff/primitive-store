import { Montserrat } from "next/font/google";
import "./globals.css";
import "./reset.css";
import Provider from "@/utils/Provider";
import { Metadata } from "next";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TemniyStore — Магазин аккаунтов",
  description:
    "Лучший магазин аккаунтов в социальных сетях — TemniyStore. Мы гарантируем лучшее соотношение цены и качества на рынке!",
  openGraph: {
    title: "TemniyStore — Магазин аккаунтов",
    description:
      "Лучший магазин аккаунтов в социальных сетях — TemniyStore. Мы гарантируем лучшее соотношение цены и качества на рынке!",
    url: "https://temniy.store",
    type: "website",
    images: [
      {
        url: "https://temniy.store/og-image.jpg",
        width: 500,
        height: 500,
        alt: "TemniyStore Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@temniystore",
    title: "TemniyStore — Магазин аккаунтов",
    description:
      "Лучший магазин аккаунтов в социальных сетях — TemniyStore. Мы гарантируем лучшее соотношение цены и качества на рынке!",
    images: [
      {
        url: "https://temniy.store/og-image.jpg",
        width: 500,
        height: 500,
        alt: "TemniyStore Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} debug-montserrat`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
