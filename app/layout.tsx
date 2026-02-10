import "./globals.css";
import { Metadata } from "next";
import ToastProvider from "@/components/ToastProvider";

export const metadata: Metadata = {
  title: "Movio - Discover, Search & Comment Movies",
  description:
    "Movio lets you explore popular, trending, and upcoming movies from TMDB, leave comments, rate films, and interact with other movie fans. Your personal movie hub.",
  keywords:
    "movies, TV shows, film database, TMDB, movie search, trending movies, popular movies, now playing, movie ratings, movie reviews, movie comments, user login, social movies, film community",
  icons: {
    icon: "/images/favicon.ico",
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
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
