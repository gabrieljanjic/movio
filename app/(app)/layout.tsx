import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("APP LAYOUT SE RENDERA");
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto mb-4">{children}</main>
    </>
  );
}
