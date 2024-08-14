import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eventogether",
  description: "Find people for events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Navbar />
        <div className="flex justify-center h-screen p-0 py-24 md:p-4 lg:py-32 lg:px-72">
          {children}
        </div>
      </body>
    </html>
  );
}
