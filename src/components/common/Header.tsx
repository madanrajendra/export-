"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, User, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase/config";
import { signOut } from "firebase/auth";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { user, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => signOut(auth);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <Globe className="text-white w-6 h-6" />
          </div>
          <span className={cn(
            "font-bold text-xl tracking-tight transition-colors duration-300",
            scrolled ? "text-primary" : "text-primary"
          )}>
            GE<span className="text-secondary">SOLUTIONS</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-all hover:text-secondary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-secondary after:transition-all hover:after:w-full",
                pathname === link.href ? "text-secondary after:w-full" : "text-primary"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Section */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {isAdmin && (
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-1 text-sm font-semibold bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition-all"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-slate-100 rounded-full transition-all group"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-muted group-hover:text-red-500" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 text-sm font-semibold border-2 border-primary text-primary px-5 py-2 rounded-full hover:bg-primary hover:text-white transition-all shadow-sm"
            >
              <User className="w-4 h-4" />
              Log In
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl transition-all duration-300 overflow-hidden",
          isOpen ? "max-height-screen py-6" : "max-h-0 py-0"
        )}
      >
        <div className="container mx-auto px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-lg font-semibold py-2 border-b border-slate-100",
                pathname === link.href ? "text-secondary" : "text-primary"
              )}
            >
              {link.name}
            </Link>
          ))}
          {!user && (
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="mt-2 bg-primary text-white text-center py-3 rounded-xl font-bold"
            >
              Access Portal
            </Link>
          )}
          {user && (
            <div className="flex flex-col gap-2">
              {isAdmin && (
                <Link
                  href="/admin/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="bg-primary text-white text-center py-3 rounded-xl font-bold"
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="text-red-500 font-bold py-2"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
