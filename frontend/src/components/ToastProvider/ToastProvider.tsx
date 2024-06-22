"use client";
import React from "react";
import { Toaster } from "react-hot-toast";

type ToastProviderProps = {
  children: React.ReactNode;
};

export default function ToastProvider({ children }: Readonly<ToastProviderProps>) {
  return (
    <>
      <Toaster position="bottom-right" />
      {children}
    </>
  );
}
