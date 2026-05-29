"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { LogIn, Globe, ShieldCheck, Mail, Lock, Loader2 } from "lucide-react";

// Keep in sync with AuthContext ADMIN_EMAILS
const ADMIN_EMAILS = ["madancse.gcem@gmail.com"];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("saraagoexim@gmail.com");
  const [password, setPassword] = useState("Saraagoexim@1234");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      const cleanEmail = email.trim().toLowerCase();
      // Redirect admins straight to the dashboard
      if (ADMIN_EMAILS.includes(cleanEmail) || cleanEmail === "saraagoexim@gmail.com") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  // Removed Google login

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100 relative overflow-hidden">
        {/* Branding */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="p-2 bg-white rounded-2xl shadow-md border border-slate-100">
            <img src="/logo.jpeg" alt="Saraago Logo" className="h-10 object-contain" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-black text-primary">ACCESS PORTAL</h1>
            <p className="text-slate-400 text-sm font-medium">Saraago Management</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-start gap-2 text-sm border border-red-100">
            <ShieldCheck className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-widest">Work Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-secondary transition-colors" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white rounded-2xl outline-none transition-all text-primary font-medium"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-widest">Security Code</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-secondary transition-colors" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white rounded-2xl outline-none transition-all text-primary font-medium"
                placeholder="********"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-2xl font-black text-lg hover:bg-slate-900 shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5" />}
            Secure Entry
          </button>
        </form>

        {/* Removed Google Login and Request Access link */}

        {/* System footer */}
        <div className="absolute bottom-0 left-0 right-0 py-2 bg-slate-50 text-[10px] text-center text-slate-300 font-bold tracking-widest border-t border-slate-100 uppercase">
          End-to-End Encryption Enabled
        </div>
      </div>
    </div>
  );
}
