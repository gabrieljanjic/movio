export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="w-full bg-gray-100 mx-auto">{children}</main>;
}
