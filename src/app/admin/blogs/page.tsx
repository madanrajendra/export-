"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Blog } from "@/types";
import { 
  Plus, 
  FileText, 
  Search, 
  Filter, 
  MoreVertical, 
  Trash2, 
  Edit3, 
  Eye, 
  CheckCircle, 
  XCircle,
  Loader2,
  BookOpen,
  Calendar,
  Globe
} from "lucide-react";
import { DateTime } from "luxon";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Blog));
      setBlogs(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const toggleStatus = async (id: string, current: string) => {
    const nextStatus = current === "published" ? "draft" : "published";
    try {
      await updateDoc(doc(db, "blogs", id), { 
        status: nextStatus,
        publishedAt: nextStatus === "published" ? new Date() : null
      });
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this article? Action is irreversible.")) {
      try {
        await deleteDoc(doc(db, "blogs", id));
      } catch (err) {
        console.error("Error deleting article:", err);
      }
    }
  };

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-24">
      {/* Header Segment */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-primary tracking-tight mb-2 uppercase">Publishing Hub</h1>
          <p className="text-slate-400 font-bold tracking-widest text-xs">TRADE INTELLIGENCE & EDITORIAL CMS</p>
        </div>
        <Link 
          href="/admin/blogs/new" 
          className="bg-primary text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-slate-900 shadow-xl shadow-primary/10 transition-all border-b-4 border-slate-950 active:translate-y-1 active:border-b-0"
        >
          <Plus className="w-5 h-5" />
          Draft Article
        </Link>
      </div>

      {/* Control Segment */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-secondary transition-colors" />
          <input 
            type="text"
            placeholder="Search within editorial archive..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-6 py-5 bg-white border border-slate-100 rounded-[2rem] outline-none shadow-sm focus:border-secondary transition-all font-medium text-primary text-sm font-bold uppercase tracking-widest"
          />
        </div>
        <div className="bg-white p-2 rounded-[2rem] border border-slate-100 flex items-center gap-2 shadow-sm">
          <div className="bg-slate-50 p-4 rounded-2xl text-slate-300">
            <Filter className="w-4 h-4" />
          </div>
          <select className="bg-transparent text-slate-400 font-bold text-[10px] uppercase tracking-widest px-4 outline-none border-0 w-full">
            <option>All Content</option>
            <option>Published</option>
            <option>Drafts</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-40 gap-6">
          <Loader2 className="w-10 h-10 text-secondary animate-spin" />
          <p className="text-xs font-black text-slate-300 tracking-widest uppercase">Catalog Syncing...</p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="bg-white rounded-[4rem] p-32 text-center border-4 border-dashed border-slate-50">
          <div className="bg-slate-50 p-8 rounded-[2.5rem] inline-block mb-10 text-slate-200">
            <BookOpen className="w-20 h-20" />
          </div>
          <h3 className="text-3xl font-black text-primary uppercase tracking-tighter">Editorial Desk Empty</h3>
          <p className="text-slate-400 font-medium max-w-sm mx-auto mb-10">Start sharing global market expertise and export strategies with your audience.</p>
          <Link href="/admin/blogs/new" className="text-secondary font-black flex items-center justify-center gap-2 hover:gap-4 transition-all">
            Write First Post <Plus />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBlogs.map((b) => (
            <div 
              key={b.id}
              className="bg-white rounded-[2.5rem] p-6 border border-slate-100 hover:shadow-xl hover:scale-[1.005] transition-all duration-300 group flex items-center gap-6"
            >
              <div className="w-32 h-20 rounded-2xl bg-slate-50 overflow-hidden hidden sm:block border border-slate-100">
                {b.coverImage ? (
                  <img src={b.coverImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={b.title} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-200 uppercase text-[8px] font-black tracking-widest">No Asset</div>
                )}
              </div>

              <div className="flex-grow min-w-0 space-y-2">
                <div className="flex items-center gap-3">
                  <span className={`text-[9px] px-3 py-0.5 rounded-full font-black uppercase tracking-widest shadow-sm ${
                    b.status === "published" ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
                  }`}>
                    {b.status}
                  </span>
                  <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    <Calendar className="w-3 h-3" />
                    {b.createdAt ? DateTime.fromJSDate(b.createdAt.toDate()).toFormat("DD @ HH:mm") : "Draft"}
                  </span>
                </div>
                <h3 className="text-xl font-black text-primary tracking-tighter truncate group-hover:text-secondary transition-colors">
                  {b.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 pr-2">
                <button 
                  onClick={() => toggleStatus(b.id, b.status)}
                  className="p-3.5 bg-slate-50 text-slate-400 rounded-2xl hover:bg-emerald-50 hover:text-emerald-500 transition-all shadow-sm"
                  title={b.status === "published" ? "Unpublish" : "Go Live"}
                >
                  <Globe className="w-4 h-4" />
                </button>
                <Link 
                  href={`/admin/blogs/edit/${b.id}`}
                  className="p-3.5 bg-slate-50 text-slate-400 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm"
                >
                  <Edit3 className="w-4 h-4" />
                </Link>
                <button 
                  onClick={() => handleDelete(b.id)}
                  className="p-3.5 bg-red-50 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
