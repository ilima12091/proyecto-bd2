"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { headerOptions } from "@/constants/headerOptions";
import appLogo from "./../../../../public/app-logo.png";
import Button from "@/components/Button/Button";
import { useAuth } from "@/contexts/authContext";

import "./styles.css";

export default function Header() {
  const { logout } = useAuth();
  const pathname = usePathname();

  const isActive = useCallback(
    (path: string) => {
      return pathname === path;
    },
    [pathname]
  );

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <Image src={appLogo} alt="App logo" className="header-logo" />
      <ul className="header-items">
        {headerOptions.map(({ href, name }) => (
          <li
            key={href}
            className={`header-item ${isActive(href) ? "header-item--active" : ""}`}
          >
            <Link href={href}>{name}</Link>
          </li>
        ))}
        <li>
          <Button label="Cerrar sesión" onClick={handleLogout} />
        </li>
      </ul>
    </header>
  );
}
