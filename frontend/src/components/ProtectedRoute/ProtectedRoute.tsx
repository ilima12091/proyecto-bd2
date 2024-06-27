"use client";

import { adminRoutes } from "@/constants/adminRoutes";
import { useAuth } from "@/contexts/authContext";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Readonly<ProtectedRouteProps>) {
  const { user } = useAuth();
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
    if (user?.role !== "admin" && adminRoutes.includes(pathName)) router.push("/");
  }, [user, router, pathName]);

  if (!user) return <div>Loading...</div>;

  return <>{children}</>;
}
