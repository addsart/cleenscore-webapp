export const metadata = {
  title: "CleenScore — Waitlist",
  description: "Scan smarter. Choose cleaner.",
};

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
