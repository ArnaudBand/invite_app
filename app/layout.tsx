import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "You're Invited! | Irambona Denis & Elysee - Celebration of Apostleship",
  description: "Join us in celebrating the sacred news of Irambona Denis & Elysee being titled as Apostles. November 1st, 2025. RSVP now!",
  keywords: ["apostleship", "celebration", "invitation", "Irambona Denis", "Elysee", "religious ceremony"],
  authors: [{ name: "Irambona Denis & Elysee" }],

  // Open Graph metadata for social sharing (Facebook, LinkedIn, etc.)
  openGraph: {
    title: "You're Invited! Celebration of Apostleship",
    description: "Join Irambona Denis & Elysee in celebrating their apostleship on November 1st, 2025",
    type: "website",
    locale: "en_US",
    siteName: "Apostleship Celebration Invitation",
    images: [
      {
        url: "/og-image.jpg", // You'll need to add this image to your public folder
        width: 1200,
        height: 630,
        alt: "Celebration of Apostleship - Irambona Denis & Elysee",
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "You're Invited! Celebration of Apostleship",
    description: "Join Irambona Denis & Elysee in celebrating their apostleship on November 1st, 2025",
    images: ["/og-image.jpg"], // Same image as Open Graph
  },

  // Additional metadata
  robots: {
    index: true,
    follow: true,
  },

  // Favicon and app icons
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // Verification (optional, for search console)
  // verification: {
  //   google: "your-google-verification-code",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional meta tags for better sharing */}
        <meta name="theme-color" content="#d97706" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}