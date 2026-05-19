"use client";

import React from "react";
import Link from "next/link";
import { 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Share2,
  MessageCircle,
  Briefcase,
  Camera,
  ChevronRight
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Services", href: "/services" },
      { name: "Portfolio", href: "/gallery" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
    products: [
      { name: "Industrial Goods", href: "/products?cat=industrial" },
      { name: "Agriculture", href: "/products?cat=agri" },
      { name: "Chemicals", href: "/products?cat=chemicals" },
      { name: "Logistics", href: "/services?cat=logistics" },
    ],
  };

  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t-4 border-secondary transition-colors duration-300">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Company Info */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center group">
            <img src="/logo.jpeg" alt="Saraago Logo" className="h-10 md:h-12 object-contain bg-white px-3 py-1.5 rounded-xl" />
          </Link>
          <p className="text-slate-400 leading-relaxed max-w-xs text-sm">
            Empowering global businesses through reliable, efficient, and sustainable export solutions. Your trusted partner in international trade.
          </p>
          <div className="flex items-center gap-3">
            {[Share2, MessageCircle, Briefcase, Camera].map((Icon, idx) => (
              <Link 
                key={idx} 
                href="#" 
                className="bg-slate-800 p-2.5 rounded-full hover:bg-secondary transition-all"
              >
                <Icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            Company
            <span className="h-1 w-8 bg-secondary rounded-full" />
          </h3>
          <ul className="flex flex-col gap-3">
            {footerLinks.company.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className="text-slate-400 hover:text-secondary text-sm flex items-center gap-1 group transition-all"
                >
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services / Products */}
        <div>
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            Categories
            <span className="h-1 w-8 bg-secondary rounded-full" />
          </h3>
          <ul className="flex flex-col gap-3">
            {footerLinks.products.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className="text-slate-400 hover:text-secondary text-sm flex items-center gap-1 group transition-all"
                >
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            Contact Us
            <span className="h-1 w-8 bg-secondary rounded-full" />
          </h3>
          <div className="flex flex-col gap-5 text-sm">
            <div className="flex items-start gap-3">
              <div className="bg-slate-800 p-2 rounded-lg text-secondary">
                <MapPin className="w-4 h-4" />
              </div>
              <p className="text-slate-400 leading-tight pt-1">
                Railway Kua No- 03, Sutharon Ka Vas,<br />
                Genhu Road, Near Barmer RS Sub Post Office,<br />
                Barmer, Rajasthan - 344001
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-slate-800 p-2 rounded-lg text-secondary">
                <Phone className="w-4 h-4" />
              </div>
              <p className="text-slate-400">+91 9610114181</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-slate-800 p-2 rounded-lg text-secondary">
                <Mail className="w-4 h-4" />
              </div>
              <p className="text-slate-400">Saraagoexim@gmail.com</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-slate-800 p-2 rounded-lg text-secondary flex items-center justify-center">
                <span className="text-[9px] font-extrabold leading-none tracking-tighter">GST</span>
              </div>
              <p className="text-slate-400 font-medium text-xs">GSTIN: 08INLPK3173G1ZN</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto px-4 border-t border-slate-800 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
        <p>&copy; {currentYear} Saraago. All rights reserved.</p>
        <div className="flex gap-6 uppercase tracking-wider">
          <Link href="/privacy" className="hover:text-secondary">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-secondary">Terms of Service</Link>
          <Link href="/sitemap" className="hover:text-secondary">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
