import type { Metadata } from "next";
import { Bebas_Neue, DM_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import StatusBar from "@/components/StatusBar";
import Cursor from "@/components/Cursor";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: "italic",
});

export const metadata: Metadata = {
  title: "Uriel Akira — Graphic Designer",
  description: "Junior designer based in Braga. Sharp eye for brand identity.",
  openGraph: {
    title: "Uriel Akira — Graphic Designer",
    description: "Junior designer based in Braga. Sharp eye for brand identity.",
    url: "https://akirauriel.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" />
      </head>
      <body className={`${bebas.variable} ${dmMono.variable} ${playfair.variable}`}>
        <StatusBar />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
