"use client";

import { useAuth } from "@/contexts/authContext";
import React from "react";
import Header from "../navigation/Header/Header";
import AdminSidebar from "../navigation/AdminSidebar/AdminSidebar";

import "./styles.css";
import Modal from "../Modal/Modal";

type AppRoutesProps = {
  children: React.ReactNode;
};

export default function AppRoutes({ children }: Readonly<AppRoutesProps>) {
  const { user, isAdmin } = useAuth();

  if (!user) return <>{children}</>;

  return (
    <>
      <Modal />
      {isAdmin ? <AdminSidebar /> : <Header />}
      <section className={`${isAdmin ? "sidebar-layout" : ""}`}>{children}</section>
    </>
  );
}
