import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/authContext";
import AppRoutes from "@/components/AppRoutes/AppRoutes";

import "./globals.css";
import ToastProvider from "@/components/ToastProvider/ToastProvider";
import { ModalProvider } from "@/contexts/modalContext";

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
            <ModalProvider>
              <AppRoutes>{children}</AppRoutes>
            </ModalProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
