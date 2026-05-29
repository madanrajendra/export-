"use client";

import React, { useState, useEffect } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { 
  Loader2, 
  Image as ImageIcon, 
  MapPin, 
  Filter,
  Maximize2,
  Box,
  Truck,
  Ship,
  Globe
} from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  description?: string;
  isActive: boolean;
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Rings", "Earrings", "Pendants", "Bracelets", "Custom Jewellery"];

  useEffect(() => {
    const q = query(
      collection(db, "gallery"), 
      where("isActive", "==", true),
      orderBy("sortOrder", "asc")
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryItem));
      setItems(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredItems = activeCategory === "All" 
    ? items 
    : items.filter(i => i.category === activeCategory);

  return (
    <div className="flex flex-col gap-12 pb-24">
      {/* Header Segment */}
      <section className="bg-slate-50 border-b border-slate-100 py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 text-secondary text-sm font-black tracking-[0.2em] uppercase mb-6 bg-white px-5 py-2 rounded-full shadow-xl border border-slate-100">
            Operations Showcase
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-primary tracking-tighter leading-none mb-8">
            Our <span className="text-secondary italic underline decoration-secondary/30 underline-offset-8">Global</span> Footprint.
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            A visual documentation of our premium jewellery collections, craftsmanship, and global exhibitions.
          </p>
        </div>
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/5 rounded-full blur-[100px]" />
      </section>

      {/* Filter Segment */}
      <section className="container mx-auto px-4 sticky top-28 z-40">
        <div className="bg-white/80 backdrop-blur-xl p-4 rounded-[2.5rem] border border-white shadow-2xl flex flex-wrap items-center gap-3 max-w-4xl mx-auto">
          <div className="hidden md:flex bg-slate-50 p-4 rounded-2xl text-slate-300">
            <Filter className="w-5 h-5" />
          </div>
          <div className="flex-grow flex items-center overflow-x-auto gap-2 pb-1 md:pb-0 scrollbar-hide no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105" 
                    : "text-slate-400 hover:text-primary hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid Segment */}
      <section className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-40 gap-6">
            <Loader2 className="w-12 h-12 text-secondary animate-spin" />
            <p className="text-sm font-black text-slate-300 uppercase tracking-[0.3em] animate-pulse">Syncing Visual Catalog...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-40 text-center flex flex-col items-center gap-6 bg-slate-50 rounded-[4rem] border-4 border-dashed border-slate-100">
            <ImageIcon className="w-20 h-20 text-slate-200" />
            <h3 className="text-3xl font-black text-primary uppercase">No Visuals Logged</h3>
            <p className="text-slate-400 font-medium">We are currently documenting new shipments and operational milestones.</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                className="break-inside-avoid relative group rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-2"
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Overlay Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-10 flex flex-col justify-end">
                  <div className="space-y-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2">
                      <span className="bg-secondary text-white text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest shadow-lg">
                        {item.category}
                      </span>
                      <div className="h-px flex-1 bg-white/20" />
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tighter leading-none">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-sm font-medium leading-relaxed italic">
                      {item.description || "Operational snapshot illustrating global trade efficiency and logistics precision."}
                    </p>
                    <button className="flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest hover:text-secondary transition-colors">
                      <Maximize2 className="w-4 h-4" />
                      View Full Details
                    </button>
                  </div>
                </div>

                {/* Always-on Tag */}
                <div className="absolute bottom-6 right-6 p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <Globe className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>


    </div>
  );
}
