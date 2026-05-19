"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Product } from "@/types";
import ProductForm from "@/components/admin/ProductForm";
import { Loader2, PackageSearch } from "lucide-react";

export default function EditProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      try {
        const docRef = doc(db, "products", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-6">
        <Loader2 className="w-12 h-12 text-secondary animate-spin" />
        <p className="text-sm font-black text-slate-300 uppercase underline decoration-secondary decoration-4 underline-offset-8">Fetching Catalog Entity...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-center gap-6">
        <div className="bg-slate-50 p-8 rounded-full border-2 border-slate-100 text-slate-200">
          <PackageSearch className="w-16 h-16" />
        </div>
        <h2 className="text-3xl font-black text-primary uppercase tracking-tighter">Entity Not Found</h2>
        <p className="text-slate-400 font-medium">The specified product ID does not exist in our global database.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <ProductForm initialData={product} id={id as string} />
    </div>
  );
}
