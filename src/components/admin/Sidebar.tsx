"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart2, 
  Image as ImageIcon, 
  ShoppingBag, 
  Truck, 
  FileText, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ChevronRight,
  Globe,
  PlusCircle,
  Briefcase
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { auth } from "@/lib/firebase/config";
import { signOut } from "firebase/auth";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const sidebarItems = [
  { label: "Overview", href: "/admin/dashboard", icon: BarChart2 },
  { label: "Banners", href: "/admin/banners", icon: ImageIcon },
  { label: "Products", href: "/admin/products", icon: ShoppingBag },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Enquiries", href: "/admin/enquiries", icon: MessageSquare, badge: "New" },
  { label: "Gallery", href: "/admin/gallery", icon: Truck },
  { label: "Blog Posts", href: "/admin/blogs", icon: FileText },
  { label: "Subscribers", href: "/admin/users", icon: Users },
  { label: "Site Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => signOut(auth);

  return (
    <aside 
      className={cn(
        "h-screen sticky top-0 bg-primary text-white flex flex-col transition-all duration-500 border-r-4 border-secondary/20 shadow-2xl",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Sidebar Header */}
      <div className="p-6 flex items-center justify-between border-b border-white/5 h-20">
        {!collapsed && (
          <Link href="/admin/dashboard" className="flex items-center gap-2 group">
            <Globe className="text-secondary w-6 h-6 animate-spin-slow" />
            <span className="font-black text-lg tracking-tighter">GE<span className="text-secondary">CMS</span></span>
          </Link>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 hover:bg-white/10 rounded-lg transition-colors group"
        >
          <ChevronRight className={cn("w-5 h-5 transition-transform", !collapsed && "rotate-180")} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-grow p-4 space-y-1.5 mt-4 overflow-y-auto custom-scrollbar">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 p-3.5 rounded-2xl font-bold transition-all group relative",
                isActive 
                  ? "bg-secondary text-white shadow-lg shadow-secondary/20" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "scale-110")} />
              {!collapsed && <span className="flex-grow text-sm">{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-black animate-pulse">
                  {item.badge}
                </span>
              )}
              {collapsed && (
                <div className="absolute left-full ml-4 px-3 py-1 bg-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-xl border border-white/10 pointer-events-none">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/5 space-y-2">
        {!collapsed && (
          <Link 
            href="/admin/products/new"
            className="flex items-center justify-center gap-2 bg-white/5 text-slate-300 py-3 rounded-2xl hover:bg-white/10 transition-colors font-bold text-sm mb-4"
          >
            <PlusCircle className="w-4 h-4" />
            New Entry
          </Link>
        )}
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3.5 rounded-2xl font-bold text-red-400 hover:bg-red-500/10 transition-all group"
        >
          <LogOut className="w-5 h-5 flex-shrink-0 group-hover:rotate-12 transition-transform" />
          {!collapsed && <span className="text-sm">Disconnect</span>}
        </button>
      </div>

      <style jsx global>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </aside>
  );
}
