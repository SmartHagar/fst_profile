/** @format */

// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ListMenu from "@/components/navbar/ListMenus";
import { ChevronDown, ChevronRight, List, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

  const isActiveLink = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  const isSubmenuActive = (children: { name: string; href: string }[]) => {
    return children.some((child) => isActiveLink(child.href));
  };

  const toggleSubmenu = (menuName: string) => {
    setOpenSubmenus((prev) =>
      prev.includes(menuName)
        ? prev.filter((name) => name !== menuName)
        : [...prev, menuName]
    );
  };

  const isSubmenuOpen = (menuName: string) => {
    return openSubmenus.includes(menuName);
  };

  return (
    <>
      {/* Navigation Menu */}
      <div className="bg-base-100 shadow-lg sticky top-0 z-40 border-b border-base-300">
        <div className="container flex justify-between relative">
          {/* Desktop Menu */}
          <div className="hidden xl:flex">
            {ListMenu.map((item) => (
              <div key={item.name} className="group relative">
                {/* Menu Item - Consistent spacing for all items */}
                {item.children && item.children.length > 0 ? (
                  <div
                    className={`flex items-center gap-1 px-4 py-4 hover:bg-base-200 transition-colors cursor-pointer ${
                      isSubmenuActive(item.children)
                        ? "bg-primary text-primary-content hover:bg-primary"
                        : ""
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                    <ChevronDown className="ml-1 text-xs" />
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    target={item.blank ? "_blank" : "_self"}
                    className={`flex items-center gap-2 px-2 py-4 hover:bg-base-200 transition-colors ${
                      isActiveLink(item.href!)
                        ? "bg-primary text-primary-content hover:bg-primary"
                        : ""
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                )}

                {/* Desktop Submenu - appears below */}
                {item.children && item.children.length > 0 && (
                  <div className="absolute top-full left-0 w-full min-w-48 bg-base-100 shadow-lg border border-base-300 rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        target={child.blank ? "_blank" : "_self"}
                        className={`block px-2 py-2 hover:bg-base-200 transition-colors first:border-t border-base-300 ${
                          isActiveLink(child.href)
                            ? "bg-primary text-primary-content hover:bg-primary"
                            : ""
                        }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex lg:justify-end justify-start items-center">
            <Link href="/login" className="btn btn-primary">
              Login
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <div className="xl:hidden flex justify-end p-4">
            <button
              className="btn btn-ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`xl:hidden ${
              isMobileMenuOpen
                ? "absolute top-20 right-0 bg-slate-50"
                : "hidden"
            }`}
          >
            {ListMenu.map((item) => (
              <div key={item.name}>
                {/* Mobile Menu Item */}
                {item.children && item.children.length > 0 ? (
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`w-full flex items-center justify-between px-4 py-3 hover:bg-base-200 transition-colors ${
                      isSubmenuActive(item.children)
                        ? "bg-primary text-primary-content hover:bg-primary"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                    {isSubmenuOpen(item.name) ? (
                      <ChevronDown />
                    ) : (
                      <ChevronRight />
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href!}
                    className={`w-full flex items-center gap-2 px-4 py-3 hover:bg-base-200 transition-colors ${
                      isActiveLink(item.href!)
                        ? "bg-primary text-primary-content hover:bg-primary"
                        : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                )}

                {/* Mobile Submenu */}
                {item.children &&
                  item.children.length > 0 &&
                  isSubmenuOpen(item.name) && (
                    <div className="bg-base-200">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={`block px-8 py-2 hover:bg-base-300 transition-colors border-l-2 ml-4 ${
                            isActiveLink(child.href)
                              ? "bg-primary text-primary-content border-l-primary"
                              : "border-l-base-400"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
