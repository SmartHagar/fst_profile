/** @format */
"use client";
import React from "react";
import BennerEnhanced from "../banner/BennerEnhanced";
import Menu from "../navbar/Navbar";
import { usePathname } from "next/navigation";
import Footer from "../footer/Footer";

const ContainerLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <main className="flex flex-col min-h-screen">
      {pathname === "/dashboard" ? <BennerEnhanced /> : null}
      <Menu />
      <div className="flex-1">{children}</div>
      <div className="flex-shrink-0 mt-8">
        <Footer />
      </div>
    </main>
  );
};

export default ContainerLayout;
