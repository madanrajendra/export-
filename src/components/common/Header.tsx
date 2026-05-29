"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Products", href: "/products" },
  { name: "Quality", href: "/#quality" },
  { name: "Export Process", href: "/#export-process" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      if (targetId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-white/80 backdrop-blur-sm py-4"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <img src="/logo.jpeg" alt="SARAAGO Exim" className="h-12 md:h-16 object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={cn(
                "text-sm font-medium transition-all hover:text-secondary relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-secondary after:transition-all hover:after:w-full text-primary"
              )}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Action Button */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="/#contact"
            onClick={(e) => handleLinkClick(e, "/#contact")}
            className="flex items-center gap-2 text-sm font-semibold bg-primary text-white px-6 py-2.5 rounded-sm hover:bg-secondary transition-all shadow-md"
          >
            Send Enquiry
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-primary"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-screen py-6 border-t border-slate-100" : "max-h-0 py-0"
        )}
      >
        <div className="container mx-auto px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-lg font-semibold py-3 border-b border-slate-100 text-primary hover:text-secondary"
            >
              {link.name}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={(e) => handleLinkClick(e, "/#contact")}
            className="mt-4 bg-primary text-white text-center py-3 rounded-sm font-bold shadow-md"
          >
            Request Quotation
          </a>
        </div>
      </div>
    </header>
  );
}

