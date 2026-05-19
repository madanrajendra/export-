"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { LogIn, Globe, ShieldCheck, Mail, Lock, Loader2 } from "lucide-react";

// Keep in sync with AuthContext ADMIN_EMAILS
const ADMIN_EMAILS = ["madancse.gcem@gmail.com"];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect admins straight to the dashboard
      if (ADMIN_EMAILS.includes(email.trim().toLowerCase())) {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (ADMIN_EMAILS.includes(result.user.email?.trim().toLowerCase() ?? "")) {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100 relative overflow-hidden">
        {/* Branding */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="bg-primary p-4 rounded-3xl shadow-xl">
            <Globe className="text-secondary w-8 h-8 animate-pulse" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-black text-primary">ACCESS PORTAL</h1>
            <p className="text-slate-400 text-sm font-medium">Global Export Solutions Management</p>
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

        <div className="my-8 flex items-center gap-4 text-slate-300">
          <div className="h-px flex-1 bg-slate-100" />
          <span className="text-xs font-bold uppercase tracking-wider">or verify with</span>
          <div className="h-px flex-1 bg-slate-100" />
        </div>

        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-4 border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-600"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
          Google Cloud Partner
        </button>

        <p className="mt-8 text-center text-sm font-medium text-slate-400">
          First time here? <Link href="/register" className="text-secondary hover:underline">Request access</Link>
        </p>

        {/* System footer */}
        <div className="absolute bottom-0 left-0 right-0 py-2 bg-slate-50 text-[10px] text-center text-slate-300 font-bold tracking-widest border-t border-slate-100 uppercase">
          End-to-End Encryption Enabled
        </div>
      </div>
    </div>
  );
}
