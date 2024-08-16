import type { Metadata } from "next";
import {  Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";


const montserrat = Montserrat({ weight: "500", subsets:["latin"]});
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
      <body className={montserrat.className}>
          <Navbar />
        <div className="flex justify-center h-screen p-0 pt-24 md:p-4 lg:pt-0 lg:px-72">
          {children}
        </div>
      </body>
    </html>
  );
}
