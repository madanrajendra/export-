"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AdminSidebar from "@/components/admin/Sidebar";
import { Loader2, ShieldAlert } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push("/login");
    }
  }, [user, isAdmin, loading, router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-secondary animate-spin" />
          <p className="text-slate-400 font-bold tracking-widest text-xs uppercase animate-pulse">
            Authenticating Session...
          </p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="h-screen flex items-center justify-center bg-red-50 p-4">
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border-2 border-red-100 flex flex-col items-center text-center gap-6 max-w-md">
          <div className="bg-red-500 p-5 rounded-full text-white animate-bounce shadow-xl shadow-red-200">
            <ShieldAlert className="w-12 h-12" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-primary mb-2">Access Restriced</h1>
            <p className="text-slate-500 font-medium">This zone is restricted to verified administrators only. Your activity has been logged.</p>
          </div>
          <button 
            onClick={() => router.push("/")}
            className="bg-primary text-white px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-transform"
          >
            Safely Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <AdminSidebar />
      <main className="flex-grow min-w-0 p-8 pt-10 overflow-x-hidden overflow-y-auto">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
