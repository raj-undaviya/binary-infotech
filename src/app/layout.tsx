import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Binary Infotech | Custom Software, Web & Mobile App Solutions",
    template: "%s | Binary Infotech",
  },
  description: "Innovative software development company specializing in custom web development, mobile apps, UI/UX web design, game development, and digital marketing since 2001.",
  metadataBase: new URL("https://www.binaries.org.in"),
  openGraph: {
    title: "Binary Infotech | Custom Web & Mobile Solutions",
    description: "Empowering businesses through cutting-edge custom software and mobile applications.",
    url: "https://www.binaries.org.in",
    siteName: "Binary Infotech",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Binary Infotech | Web & Mobile Solutions",
    description: "Empowering businesses through cutting-edge custom software and mobile applications.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full scroll-smooth ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground flex flex-col antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
