import type { Metadata } from "next";
import { Poppins, Vidaloka } from "next/font/google";
import "./globals.css";

// Configure Poppins for general text
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

// Configure Vidaloka for the brand/logo and headings
const vidaloka = Vidaloka({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-vidaloka",
});

export const metadata: Metadata = {
  title: "Markies - Talents Agency Sg",
  description: "A Singapore Based Talent Agency",
  icons: {
    icon: "/images/cropped-favicon-1-32x32.png",
    apple: "/images/cropped-favicon-1-180x180.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${poppins.variable} ${vidaloka.variable} font-sans antialiased bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
