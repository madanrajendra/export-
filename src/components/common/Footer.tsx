"use client";

import React from "react";
import Link from "next/link";
import { 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight,
  Globe
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { name: "Home", href: "/#home" },
      { name: "About", href: "/#about" },
      { name: "Products", href: "/#products" },
      { name: "Gallery", href: "/gallery" },
      { name: "Blogs", href: "/blog" },
      { name: "Quality", href: "/#quality" },
      { name: "Export Process", href: "/#export-process" },
      { name: "Contact", href: "/#contact" },
    ],
    products: [
      { name: "Rings", href: "/#products" },
      { name: "Earrings", href: "/#products" },
      { name: "Pendants", href: "/#products" },
      { name: "Necklaces", href: "/#products" },
      { name: "Bracelets", href: "/#products" },
      { name: "Custom Jewellery", href: "/#products" },
    ],
  };

  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t-4 border-secondary transition-colors duration-300">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Company Info */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center group">
            <img src="/logo.jpeg" alt="SARAAGO Exim" className="h-12 md:h-16 object-contain bg-white px-2 py-1 rounded-sm" />
          </Link>
          <p className="text-slate-400 leading-relaxed max-w-xs text-sm">
            Premium lab-grown diamond jewellery sourcing and export coordination from India.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            Quick Links
            <span className="h-1 w-8 bg-secondary rounded-full" />
          </h3>
          <ul className="flex flex-col gap-3">
            {footerLinks.quickLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="text-slate-400 hover:text-white text-sm flex items-center gap-1 group transition-all"
                >
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Product Categories */}
        <div>
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            Product Categories
            <span className="h-1 w-8 bg-secondary rounded-full" />
          </h3>
          <ul className="flex flex-col gap-3">
            {footerLinks.products.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="text-slate-400 hover:text-white text-sm flex items-center gap-1 group transition-all"
                >
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            Contact
            <span className="h-1 w-8 bg-secondary rounded-full" />
          </h3>
          <div className="flex flex-col gap-5 text-sm">
            <div className="flex items-start gap-3">
              <div className="bg-slate-800 p-2 rounded-lg text-secondary">
                <MapPin className="w-4 h-4" />
              </div>
              <p className="text-slate-400 leading-tight pt-1">
                Rajasthan, India
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-slate-800 p-2 rounded-lg text-secondary">
                <Mail className="w-4 h-4" />
              </div>
              <p className="text-slate-400">saraagoexim@gmail.com</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-slate-800 p-2 rounded-lg text-secondary">
                <Globe className="w-4 h-4" />
              </div>
              <p className="text-slate-400">www.saraagoexim.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto px-4 border-t border-slate-800 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
        <p>&copy; 2026 SARAAGO Exim. All rights reserved.</p>
        <div className="flex gap-6 uppercase tracking-wider">
          <Link href="/login" className="hover:text-white transition-colors">Admin</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
