"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Product } from "@/types";
import { ArrowLeft, Loader2, Package, Truck, CheckCircle2, Factory } from "lucide-react";
import EnquiryForm from "@/components/public/EnquiryForm";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const q = query(collection(db, "products"), where("slug", "==", slug), where("isPublished", "==", true));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) setProduct({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Product);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  if (loading) return <div className="p-40 flex justify-center"><Loader2 className="w-12 h-12 text-secondary animate-spin" /></div>;
  if (!product) return <div className="p-40 text-center"><h1 className="text-4xl font-black mb-4">Product Not Found</h1></div>;

  return (
    <div className="container mx-auto px-4 pb-24">
      <button onClick={() => router.push("/products")} className="mt-8 mb-8 flex items-center gap-2 text-slate-400 font-bold hover:text-primary transition-colors">
        <ArrowLeft className="w-5 h-5" /> Return to Catalog
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <div className="aspect-[4/3] bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-100 shadow-xl mb-6">
            {product.images?.[0] ? <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" /> : <Package className="w-32 h-32 text-slate-200 m-auto mt-32" />}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
            {product.images?.slice(1).map((img, i) => (
              <img key={i} src={img} alt={`${product.title} ${i+2}`} className="w-24 h-24 rounded-2xl object-cover cursor-pointer hover:opacity-80 transition-opacity border-2 border-slate-100" />
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-secondary/10 text-secondary border border-secondary/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex">
            {product.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tighter leading-none">{product.title}</h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">{product.shortDescription}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex items-center gap-4">
              <Truck className="w-8 h-8 text-secondary" />
              <div><h4 className="font-bold text-xs uppercase tracking-widest text-slate-400">Shipping</h4><p className="font-black text-primary">Global</p></div>
            </div>
            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex items-center gap-4">
              <Factory className="w-8 h-8 text-secondary" />
              <div><h4 className="font-bold text-xs uppercase tracking-widest text-slate-400">Sourcing</h4><p className="font-black text-primary">Direct</p></div>
            </div>
          </div>

          <div className="prose prose-slate max-w-none pt-8 border-t border-slate-100">
            <h3 className="font-black text-xl mb-4 text-primary">Technical Documentation</h3>
            <p className="whitespace-pre-wrap">{product.fullDescription}</p>
          </div>
        </div>
      </div>

      <div className="mt-24 pt-24 border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12 tracking-tighter">Request Quotation</h2>
          <EnquiryForm relatedItemId={product.id} relatedItemType="product" sourcePage={`Product: ${product.title}`} />
        </div>
      </div>
    </div>
  );
}
