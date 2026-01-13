import "../globals.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="max-w-6xl mx-auto">{children}</main>;
}
