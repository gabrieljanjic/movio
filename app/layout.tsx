import Navbar from "@/components/Navbar";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movio - Discover, Search & Comment Movies",
  description:
    "Movio lets you explore popular, trending, and upcoming movies from TMDB, leave comments, rate films, and interact with other movie fans. Your personal movie hub.",
  keywords:
    "movies, TV shows, film database, TMDB, movie search, trending movies, popular movies, now playing, movie ratings, movie reviews, movie comments, user login, social movies, film community",
  icons: {
    icon: "/images/favicon.png",
  },
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
        <main className="max-w-6xl mx-auto mb-8">{children}</main>
      </body>
    </html>
  );
}
