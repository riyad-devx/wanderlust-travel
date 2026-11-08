import type { Metadata } from "next";
import { Josefin_Sans, Lora } from "next/font/google";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar"
import "./globals.css";

const JosefinSans = Josefin_Sans({
  subsets: ["latin"],
});

const LoraSerif = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});



export const metadata: Metadata = {
  title: "Wanderlast | Discover Your Next Adventure",
  description:
    "Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${JosefinSans.className} ${LoraSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
