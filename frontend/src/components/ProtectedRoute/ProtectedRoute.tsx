"use client";

import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Readonly<ProtectedRouteProps>) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return <div>Loading...</div>;

  return <>{children}</>;
}
