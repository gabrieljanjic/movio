import Navbar from "@/components/Navbar";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movio",
  description: "Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="theme-color">
        <Navbar />
        <main className="max-w-6xl mx-auto mt-8">{children}</main>
      </body>
    </html>
  );
}
