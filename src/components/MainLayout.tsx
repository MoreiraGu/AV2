import { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../styles/mainlayout.css";

interface MainLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export default function MainLayout({ children, showSidebar = false }: MainLayoutProps) {
  return (
    <div className="layout-container">
      <Navbar titulo="Aerocode" />
      <div className={`layout-content ${showSidebar ? "with-sidebar" : ""}`}>
        {showSidebar && <Sidebar />}
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
