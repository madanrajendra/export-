"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  deleteDoc,
  updateDoc 
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Product } from "@/types";
import { 
  Plus, 
  ShoppingBag, 
  Search, 
  Filter, 
  MoreVertical, 
  Trash2, 
  Edit3, 
  Eye, 
  CheckCircle, 
  XCircle,
  Loader2,
  Box,
  Globe,
  ArrowUpRight
} from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const togglePublish = async (id: string, current: boolean) => {
    try {
      await updateDoc(doc(db, "products", id), { isPublished: !current });
    } catch (err) {
      console.error("Error toggling publish:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product? All image data will remain in storage.")) {
      try {
        await deleteDoc(doc(db, "products", id));
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-primary tracking-tight mb-2 uppercase">Global Inventory</h1>
          <p className="text-slate-400 font-bold tracking-widest text-xs">PRODUCT CATALOG & STOCK MANAGEMENT</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="bg-primary text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-slate-900 shadow-xl shadow-primary/10 transition-all border-b-4 border-slate-950 active:translate-y-1 active:border-b-0"
        >
          <Plus className="w-5 h-5" />
          Add To Catalog
        </Link>
      </div>

      {/* Toolkit */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-secondary transition-colors" />
          <input 
            type="text"
            placeholder="Search within inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-6 py-5 bg-white border border-slate-100 rounded-[2rem] outline-none shadow-sm focus:border-secondary transition-all font-medium text-primary"
          />
        </div>
        <div className="bg-white p-2 rounded-[2rem] border border-slate-100 flex items-center gap-2 shadow-sm">
          <div className="bg-slate-50 p-3 rounded-2xl text-slate-300">
            <Filter className="w-4 h-4" />
          </div>
          <select className="bg-transparent text-slate-400 font-bold text-xs uppercase tracking-widest px-4 outline-none border-0">
            <option>All Categories</option>
            <option>Industrial</option>
            <option>Agriculture</option>
            <option>Chemicals</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-80 gap-4">
          <Loader2 className="w-10 h-10 text-secondary animate-spin" />
          <p className="text-xs font-black text-slate-300 tracking-widest uppercase">Catalog Syncing...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-[4rem] p-32 text-center border-4 border-dashed border-slate-50">
          <div className="bg-slate-50 p-8 rounded-[2.5rem] inline-block mb-10 text-slate-200">
            <ShoppingBag className="w-20 h-20" />
          </div>
          <h3 className="text-3xl font-black text-primary mb-2">Inventory is empty</h3>
          <p className="text-slate-400 font-medium mb-10 max-w-sm mx-auto">Build your global presence by adding your first export product today.</p>
          <Link href="/admin/products/new" className="text-secondary font-black flex items-center justify-center gap-2 hover:gap-4 transition-all">
            Open Creation Suite <Plus />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {filteredProducts.map((p) => (
            <div 
              key={p.id}
              className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 group relative flex flex-col"
            >
              {/* Product Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                {p.images && p.images[0] ? (
                  <img 
                    src={p.images[0]} 
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-200">
                    <Box className="w-12 h-12" />
                    <span className="text-[10px] font-black uppercase tracking-widest">No Image Asset</span>
                  </div>
                )}
                
                {/* Status Badge */}
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  {p.isPublished ? (
                    <span className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1 uppercase tracking-widest">
                      <CheckCircle className="w-3 h-3" />
                      Live
                    </span>
                  ) : (
                    <span className="bg-slate-700 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1 uppercase tracking-widest">
                      <XCircle className="w-3 h-3" />
                      Draft
                    </span>
                  )}
                </div>

                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-xl flex gap-2 border border-white/50">
                    <Link href={`/admin/products/edit/${p.id}`} className="p-2.5 bg-primary text-white rounded-xl hover:bg-slate-900 transition-colors shadow-lg">
                      <Edit3 className="w-4 h-4" />
                    </Link>
                    <button 
                      onClick={() => handleDelete(p.id)}
                      className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-extrabold text-secondary bg-secondary/5 px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm border border-secondary/10">
                    {p.category}
                  </span>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">SKU: {p.slug.slice(0, 8).toUpperCase()}</p>
                </div>
                
                <h3 className="text-2xl font-black text-primary leading-tight mb-4 tracking-tighter truncate group-hover:text-secondary transition-colors">
                  {p.title}
                </h3>
                
                <p className="text-slate-400 text-sm font-medium line-clamp-2 mb-8 leading-relaxed">
                  {p.shortDescription}
                </p>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50 gap-4">
                  <button 
                    onClick={() => togglePublish(p.id, p.isPublished)}
                    className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
                  >
                    {p.isPublished ? "Unpublish" : "Go Live"}
                    <Globe className="w-3.5 h-3.5" />
                  </button>
                  <Link 
                    href={`/products/${p.slug}`}
                    target="_blank"
                    className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-primary hover:text-secondary transition-colors"
                  >
                    Public View
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
