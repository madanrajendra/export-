"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { collection, query, where, getDocs, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Product } from "@/types";
import {
  ShoppingBag,
  ArrowRight,
  Search,
  Filter,
  MapPin,
  Globe2,
  Loader2,
  Box,
  Truck
} from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Rings", "Earrings", "Pendants", "Bracelets", "Custom Jewellery"];

  useEffect(() => {
    const q = query(
      collection(db, "products"),
      where("isPublished", "==", true),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredProducts = activeCategory === "All"
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="flex flex-col gap-12 pb-24">
      {/* Header Segment */}
      <section className="bg-slate-50 border-b border-slate-100 py-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 h-full w-1/2 bg-white/50 -skew-x-[25deg] translate-x-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-black text-primary tracking-tighter mb-6 leading-none">
                Global <span className="text-secondary italic">Standards</span>, Local <span className="underline decoration-secondary decoration-4 underline-offset-8">Sourcing</span>.
              </h1>
              <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
                Explore our certified export-grade inventory curated for international markets. High-quality compliance guaranteed.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-w-[300px]">
              <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-100 border border-slate-100">
                <div className="flex items-center gap-4 text-emerald-500 font-black text-xs tracking-widest uppercase mb-2">
                  <div className="h-2 w-2 bg-emerald-500 rounded-full animate-ping" />
                  Inventory Live
                </div>
                <h4 className="text-2xl font-black text-primary">{products.length} Products Available</h4>
                <p className="text-slate-400 text-sm font-medium">Ready for international dispatch</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Segment */}
      <section className="container mx-auto px-4 sticky top-28 z-40">
        <div className="bg-white/80 backdrop-blur-xl p-4 rounded-[2.5rem] border border-white shadow-2xl shadow-slate-100 flex flex-wrap items-center gap-4">
          <div className="hidden md:flex bg-slate-50 p-4 rounded-2xl text-slate-300">
            <Filter className="w-5 h-5" />
          </div>
          <div className="flex-grow flex items-center overflow-x-auto gap-2 pb-1 md:pb-0 scrollbar-hide no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeCategory === cat
                    ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105"
                    : "text-slate-400 hover:text-primary hover:bg-slate-50"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative group flex-grow lg:flex-grow-0 lg:min-w-[250px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-secondary transition-colors" />
            <input
              type="text"
              placeholder="Query Inventory..."
              className="w-full pl-10 pr-6 py-3 bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white rounded-2xl outline-none transition-all text-xs font-bold uppercase tracking-widest text-primary"
            />
          </div>
        </div>
      </section>

      {/* Grid Segment */}
      <section className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-40 gap-6">
            <Loader2 className="w-12 h-12 text-secondary animate-spin" />
            <p className="text-sm font-black text-slate-300 uppercase tracking-[0.3em] animate-pulse">Syncing International Catalog...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-40 text-center flex flex-col items-center gap-6">
            <div className="bg-slate-50 p-10 rounded-full text-slate-200">
              <Box className="w-20 h-20" />
            </div>
            <h3 className="text-3xl font-black text-primary uppercase">No matches found</h3>
            <p className="text-slate-400 font-medium max-w-sm">We are constantly expanding our range. Contact us for custom sourcing requests.</p>
            <Link href="/contact" className="bg-primary text-white px-10 py-4 rounded-2xl font-black hover:scale-105 transition-transform">
              Sourcing Support
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group flex flex-col bg-white rounded-[3rem] overflow-hidden border border-slate-100 hover:shadow-[0_0_50px_rgba(15,23,42,0.08)] hover:-translate-y-2 transition-all duration-500 relative"
              >
                {/* Image Wrap */}
                <div className="aspect-square bg-slate-100 relative overflow-hidden">
                  {product.images && product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-200">
                      <Box className="w-16 h-16" />
                    </div>
                  )}

                  {/* Floating Action */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white p-4 rounded-full shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500">
                      <ArrowRight className="text-primary w-6 h-6" />
                    </div>
                  </div>

                  <div className="absolute top-6 left-6">
                    <span className="bg-secondary text-white text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-[0.2em] shadow-lg">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Content Wrap */}
                <div className="p-8 space-y-4 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black text-primary leading-tight tracking-tighter truncate group-hover:text-secondary transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-slate-400 text-xs font-semibold leading-relaxed line-clamp-3 mb-4">
                    {product.shortDescription}
                  </p>

                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-500">
                      <Truck className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Global Shipping</span>
                    </div>
                    <div className="bg-primary p-2.5 rounded-xl text-white group-hover:bg-secondary transition-colors">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
