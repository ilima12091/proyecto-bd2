import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/authContext";
import AppRoutes from "@/components/AppRoutes/AppRoutes";

import "./globals.css";
import ToastProvider from "@/components/ToastProvider/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PENCUCU",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ToastProvider>
            <AppRoutes>{children}</AppRoutes>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
