"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  BarChart, 
  MessageSquare, 
  ShoppingBag, 
  Eye, 
  TrendingUp, 
  ArrowUpRight, 
  Plus,
  Truck,
  Globe,
  Database
} from "lucide-react";
import { collection, query, limit, getDocs, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

interface Stats {
  enquiries: number;
  products: number;
  blogs: number;
  services: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ enquiries: 0, products: 0, blogs: 0, services: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [eCount, pCount, bCount, sCount] = await Promise.all([
          getCountFromServer(collection(db, "enquiries")),
          getCountFromServer(collection(db, "products")),
          getCountFromServer(collection(db, "blogs")),
          getCountFromServer(collection(db, "services")),
        ]);

        setStats({
          enquiries: eCount.data().count,
          products: pCount.data().count,
          blogs: bCount.data().count,
          services: sCount.data().count,
        });
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    { label: "New Enquiries", value: stats.enquiries, icon: MessageSquare, color: "bg-blue-500", trend: "+12%" },
    { label: "Total Products", value: stats.products, icon: ShoppingBag, color: "bg-amber-500", trend: "+3" },
    { label: "Active Services", value: stats.services, icon: Truck, color: "bg-emerald-500", trend: "Stable" },
    { label: "Blog Published", value: stats.blogs, icon: Database, color: "bg-purple-500", trend: "+1" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-primary tracking-tight mb-2 uppercase">Dashboard</h1>
          <p className="text-slate-400 font-bold tracking-widest text-xs">Performance Oversight & Operations</p>
        </div>
        <div className="flex gap-4">
          <Link 
            href="/admin/products/new" 
            className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-900 shadow-xl shadow-primary/10 transition-all border-b-4 border-slate-900 active:translate-y-1 active:border-b-0"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </Link>
          <div className="bg-white p-3 rounded-2xl border border-slate-100 hidden md:flex items-center gap-2">
            <Globe className="text-slate-300 w-5 h-5" />
            <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">Site Status: <span className="text-emerald-500">Live</span></span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-start justify-between mb-6">
              <div className={`${card.color} p-4 rounded-3xl text-white shadow-lg shadow-current/10 group-hover:scale-110 transition-transform`}>
                <card.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-black bg-slate-50 px-2 py-1 rounded-full text-slate-400 tracking-wider">
                <TrendingUp className="w-3 h-3" />
                {card.trend}
              </div>
            </div>
            <p className="text-slate-400 text-sm font-bold tracking-widest mb-1 uppercase">{card.label}</p>
            <h3 className="text-4xl font-black text-primary tracking-tighter">
              {loading ? <div className="h-9 w-16 bg-slate-100 animate-pulse rounded-lg" /> : card.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Enquiries (Simplified Preview) */}
        <div className="lg:col-span-3 bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm overflow-hidden relative">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-primary flex items-center gap-2">
              Recent Enquiries
              <span className="text-xs bg-slate-100 text-slate-400 px-2 py-1 rounded-full font-bold uppercase tracking-widest">New</span>
            </h2>
            <Link href="/admin/enquiries" className="text-secondary text-sm font-bold flex items-center gap-1 hover:gap-3 transition-all">
              View All <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="divide-y divide-slate-50 bg-slate-50/50 rounded-3xl overflow-hidden">
            {/* Mock recent list for UI demo */}
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="p-6 flex items-center justify-between hover:bg-white transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-2xl border border-slate-100 group-hover:bg-slate-50 transition-colors">
                    <Eye className="text-slate-300 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Inquiry Ref #GE-00{i+1}</h4>
                    <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">From: tech-global@example.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-amber-100 text-amber-600 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest">New</span>
                  <p className="text-xs text-slate-300 font-bold">2h ago</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-slate-300 tracking-widest uppercase">
            <span>Last Synced: Just now</span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 bg-emerald-500 rounded-full animate-ping" />
              Real-time Database Active
            </span>
          </div>
        </div>

        {/* Infrastructure Status removed per user request */}
      </div>
    </div>
  );
}
