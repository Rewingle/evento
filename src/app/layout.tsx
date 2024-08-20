import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";


const montserrat = Montserrat({ weight: "500", subsets: ["latin"] });
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
        <div className="grid grid-rows-10 h-screen w-full">
          <div className="row-span-1">
            <Navbar />
          </div>
          <div className="flex justify-center h-full pt-12 md:p-4 lg:px-72 row-span-9">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
