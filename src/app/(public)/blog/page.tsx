"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Blog } from "@/types";
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  Tag, 
  Loader2, 
  Search,
  BookOpen,
  ChevronRight
} from "lucide-react";
import { DateTime } from "luxon";

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "blogs"), 
      where("status", "==", "published"),
      orderBy("publishedAt", "desc")
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Blog));
      setBlogs(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-12 pb-24">
      {/* Header Segment */}
      <section className="bg-slate-950 pt-24 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577705993349-8d3ef0435d8e?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 text-secondary text-sm font-bold tracking-widest uppercase mb-6 px-4 py-1 bg-secondary/5 rounded-full border border-secondary/10 backdrop-blur-md">
            Trade Insights & Industry Trends
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none animate-fade-in">
            Our <span className="text-secondary italic">Perspective</span> on Global <span className="underline decoration-secondary decoration-4 underline-offset-8">Markets</span>.
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Stay ahead of international export regulations, logistics innovations, and global supply chain strategies with our expert editorials.
          </p>
        </div>
      </section>

      {/* Filter Segment */}
      <section className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="bg-white/80 backdrop-blur-xl p-4 rounded-[2.5rem] border border-white shadow-2xl flex items-center gap-4 max-w-4xl mx-auto">
          <div className="flex-grow relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-secondary transition-colors" />
            <input 
              type="text" 
              placeholder="Search trade intelligence..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white rounded-[2rem] outline-none transition-all text-sm font-bold uppercase tracking-widest text-primary"
            />
          </div>
          <div className="hidden md:flex bg-slate-50 p-5 rounded-[2rem] text-slate-300">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>
      </section>

      {/* Blog Grid Segment */}
      <section className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-40 gap-6">
            <Loader2 className="w-12 h-12 text-secondary animate-spin" />
            <p className="text-sm font-black text-slate-300 uppercase tracking-[0.3em] animate-pulse">Syncing Publishing Hub...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-40 text-center flex flex-col items-center gap-6">
            <div className="bg-slate-50 p-10 rounded-full text-slate-200 border-4 border-dashed border-slate-100">
              <BookOpen className="w-20 h-20" />
            </div>
            <h3 className="text-3xl font-black text-primary uppercase tracking-tighter">No Articles Found</h3>
            <p className="text-slate-400 font-medium">Refining your search might help find specific trade insights.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredBlogs.map((blog) => (
              <Link 
                key={blog.id} 
                href={`/blog/${blog.slug}`}
                className="group bg-white rounded-[3rem] border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative flex flex-col"
              >
                {/* Visual Header */}
                <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                  {blog.coverImage ? (
                    <img 
                      src={blog.coverImage} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-200 bg-slate-50">
                      <BookOpen className="w-16 h-16" />
                    </div>
                  )}
                  
                  {/* Floating Action */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white p-4 rounded-full shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500">
                      <ChevronRight className="text-primary w-6 h-6" />
                    </div>
                  </div>

                  {/* Date Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md text-primary text-[10px] px-4 py-2 rounded-2xl font-black flex items-center gap-2 uppercase tracking-widest shadow-xl">
                      <Calendar className="w-3 h-3 text-secondary" />
                      {blog.publishedAt ? DateTime.fromJSDate(blog.publishedAt.toDate()).toFormat("MMM dd, yyyy") : "Draft"}
                    </span>
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-8 space-y-4 flex-grow flex flex-col">
                  <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span className="bg-secondary/10 text-secondary px-2 py-0.5 rounded-lg border border-secondary/5">Insights</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      5 Min Read
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-black text-primary leading-tight group-hover:text-secondary transition-colors tracking-tighter truncate">
                    {blog.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6 font-medium">
                    {blog.summary}
                  </p>

                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-secondary font-black text-[10px] uppercase tracking-widest">
                      Enterprise Trade Board
                      <span className="h-1 w-1 bg-slate-200 rounded-full" />
                      Global
                    </div>
                    <div className="h-10 w-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter / CTA Section */}
      <section className="container mx-auto px-4 pt-12">
        <div className="bg-primary rounded-[4rem] p-16 text-center text-white relative overflow-hidden shadow-2xl flex flex-col items-center gap-8 border-b-8 border-secondary">
          <BookOpen className="absolute -right-20 -top-20 w-80 h-80 text-white/5 -rotate-12" />
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter relative z-10 max-w-2xl">Elevate Your Global <span className="text-secondary">Trade Intelligence</span>.</h2>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl relative z-10">Subscribe to our quarterly brief on international market shifts and logistical breakthroughs.</p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg relative z-10">
            <input 
              type="email" 
              placeholder="Enterprise Email..."
              className="flex-grow bg-white/5 border border-white/10 px-8 py-5 rounded-[2rem] outline-none focus:border-secondary transition-all font-bold text-sm tracking-widest uppercase text-white"
            />
            <button className="bg-secondary text-white px-10 py-5 rounded-[2rem] font-black uppercase text-sm tracking-widest hover:scale-105 active:scale-95 shadow-xl shadow-secondary/10 transition-all border-b-4 border-amber-900 active:border-b-0">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
