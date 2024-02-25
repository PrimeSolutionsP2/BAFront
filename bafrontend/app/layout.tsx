import "@/styles/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <h1>Always here</h1>
      <body>{children}</body>
    </html>
  );
}
