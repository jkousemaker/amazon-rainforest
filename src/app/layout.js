import localFont from "next/font/local";
import "./globals.css";
import LenisScroll from "@/components/LenisScroll";
import { Poppins } from "next/font/google";
import Overlay from "@/components/Overlay";
import IntroWrapper from "@/components/IntroWrapper";

import BackgroundCanvas from "@/components/BackgroundCanvas";
import Footer from "@/components/Footer";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Exploring Amazon",
  description: "Explore the Amazon Rainforest in an immersive atmosphere.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <LenisScroll>
          {/* <BackgroundCanvas /> */}
          <Overlay />
          <IntroWrapper />
          <main className="flex relative z-50 overflow-clip">{children}</main>
          <Footer />
        </LenisScroll>
      </body>
    </html>
  );
}
