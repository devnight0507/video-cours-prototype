import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/mock/auth-context";

export const metadata: Metadata = {
  title: "CourseHub - Video Course Platform",
  description: "Learn from the best courses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
