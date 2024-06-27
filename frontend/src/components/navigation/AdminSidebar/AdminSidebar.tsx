import React, { useCallback } from "react";
import Image from "next/image";
import appLogo from "./../../../../public/app-logo.png";

import "./styles.css";
import { adminSidebarOptions } from "@/constants/adminSidebarOptions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/Button/Button";
import { useAuth } from "@/contexts/authContext";

export default function AdminSidebar() {
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
    <nav className="admin-sidebar">
      <Image src={appLogo} alt="App logo" className="sidebar-logo" />
      <ul className="sidebar-options">
        {adminSidebarOptions.map(({ label, path }) => (
          <li
            key={path}
            className={`sidebar-option ${isActive(path) ? "sidebar-option--active" : ""}`}
          >
            <Link className="sidebar-option-link" href={path}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <Button label="Cerrar sesión" onClick={handleLogout} />
    </nav>
  );
}
