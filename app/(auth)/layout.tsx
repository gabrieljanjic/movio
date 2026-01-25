export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("AUTH LAYOUT SE RENDERA");
  return <main className="max-w-6xl mx-auto">{children}</main>;
}
