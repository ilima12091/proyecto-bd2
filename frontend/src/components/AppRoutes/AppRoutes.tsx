"use client";

import { useAuth } from "@/contexts/authContext";
import React from "react";
import Header from "../navigation/Header/Header";

type AppRoutesProps = {
  children: React.ReactNode;
};

export default function AppRoutes({ children }: Readonly<AppRoutesProps>) {
  const { user } = useAuth();

  if (!user) return <>{children}</>;

  return (
    <>
      <Header />
      {children}
    </>
  );
}
