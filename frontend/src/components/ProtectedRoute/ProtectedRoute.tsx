"use client";

import { adminRoutes } from "@/constants/adminRoutes";
import { useAuth } from "@/contexts/authContext";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Spinner from "../Spinner/Spinner";

import "./styles.css";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Readonly<ProtectedRouteProps>) {
  const { user, isAdmin, isLoading } = useAuth();
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) router.replace("/login");
    if (!isAdmin && adminRoutes.includes(pathName)) router.push("/");
  }, [user, router, pathName, isAdmin, isLoading]);

  if (!user)
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );

  return <>{children}</>;
}
