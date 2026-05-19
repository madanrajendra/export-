"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection, addDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase/config";
import { ProductSchema, Product } from "@/types";
import { useRouter } from "next/navigation";
import { 
  Save, 
  Loader2, 
  X, 
  Plus, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Package,
  FileText,
  Layers,
  ArrowLeft,
  Link as LinkIcon,
  Image as ImageIcon
} from "lucide-react";
import { z } from "zod";

type ProductFormValues = z.infer<typeof ProductSchema>;

export default function ProductForm({ 
  initialData, 
  id 
}: { 
  initialData?: Partial<Product>, 
  id?: string 
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      shortDescription: initialData?.shortDescription || "",
      fullDescription: initialData?.fullDescription || "",
      category: initialData?.category || "Industrial",
      images: initialData?.images || [],
      isPublished: initialData?.isPublished || false,
    }
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploading(true);
    const files = Array.from(e.target.files);
    
    try {
      const uploadPromises = files.map(async (file) => {
        const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
        await uploadBytesResumable(storageRef, file);
        return getDownloadURL(storageRef);
      });

      const urls = await Promise.all(uploadPromises);
      const newImages = [...images, ...urls];
      setImages(newImages);
      setValue("images", newImages);
    } catch (err) {
      setError("Image upload failed. Check your storage bucket permissions.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setValue("images", newImages);
  };

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    setError("");
    try {
      if (id) {
        await updateDoc(doc(db, "products", id), {
          ...data,
          updatedAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "products"), {
          ...data,
          createdAt: serverTimestamp(),
        });
      }
      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message || "Something went wrong saving the product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header Layout */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.back()} 
          className="p-4 bg-white rounded-3xl border border-slate-100 shadow-sm hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-400" />
        </button>
        <div>
          <h1 className="text-4xl font-black text-primary uppercase tracking-tighter">
            {id ? "Edit Inventory Item" : "Create New Export Product"}
          </h1>
          <p className="text-slate-400 font-bold tracking-widest text-xs">GLOBAL CATALOG MANAGEMENT SUITE</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Info Card */}
          <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-100 border border-slate-100 space-y-8">
            <h3 className="text-2xl font-black text-primary flex items-center gap-3">
              <Package className="text-secondary w-6 h-6" />
              Core Specifications
            </h3>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 border border-red-100">
                <AlertCircle className="w-5 h-5" />
                <span className="font-bold text-sm tracking-widest uppercase">{error}</span>
              </div>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Entity Name</label>
                  <input 
                    {...register("title")}
                    className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white rounded-3xl outline-none transition-all font-bold text-primary"
                    placeholder="Product Title"
                  />
                  {errors.title && <p className="text-[10px] text-red-500 font-black uppercase tracking-widest ml-4">{errors.title.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">URL Identifier (Slug)</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input 
                      {...register("slug")}
                      className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white rounded-3xl outline-none transition-all font-bold text-primary"
                      placeholder="product-unique-slug"
                    />
                  </div>
                  {errors.slug && <p className="text-[10px] text-red-500 font-black uppercase tracking-widest ml-4">{errors.slug.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Market Snapshot (Short Description)</label>
                <textarea 
                  {...register("shortDescription")}
                  rows={2}
                  className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white rounded-3xl outline-none transition-all font-medium text-primary resize-none"
                  placeholder="Concise overview for lead cards..."
                />
                {errors.shortDescription && <p className="text-[10px] text-red-500 font-black uppercase tracking-widest ml-4">{errors.shortDescription.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Comprehensive Details (Rich Documentation)</label>
                <textarea 
                  {...register("fullDescription")}
                  rows={8}
                  className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white rounded-3xl outline-none transition-all font-medium text-primary"
                  placeholder="Technical specs, certifications, and compliance info..."
                />
                {errors.fullDescription && <p className="text-[10px] text-red-500 font-black uppercase tracking-widest ml-4">{errors.fullDescription.message}</p>}
              </div>
            </div>
          </div>

          {/* Media Assets Card */}
          <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-100 border border-slate-100 space-y-8">
            <h3 className="text-2xl font-black text-primary flex items-center gap-3">
              <ImageIcon className="text-secondary w-6 h-6" />
              Visual Assets
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Multi-image Support</span>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((url, i) => (
                <div key={i} className="group aspect-square rounded-3xl overflow-hidden relative shadow-md border-2 border-slate-50">
                  <img src={url} alt="Uploaded" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  <button 
                    type="button" 
                    onClick={() => removeImage(i)}
                    className="absolute top-2 right-2 bg-red-500 p-2 rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              <label className="aspect-square flex flex-col items-center justify-center gap-3 border-4 border-dashed border-slate-100 rounded-[2.5rem] cursor-pointer bg-slate-50/50 hover:bg-slate-50 hover:border-secondary transition-all group">
                {uploading ? (
                  <Loader2 className="w-8 h-8 text-secondary animate-spin" />
                ) : (
                  <>
                    <div className="bg-white p-4 rounded-2xl shadow-sm text-slate-300 group-hover:text-secondary group-hover:scale-110 transition-all">
                      <Plus className="w-8 h-8" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Add Asset</span>
                  </>
                )}
                <input type="file" multiple hidden accept="image/*" onChange={handleImageUpload} disabled={uploading} />
              </label>
            </div>
            {errors.images && <p className="text-[10px] text-red-500 font-black uppercase tracking-widest ml-4">{errors.images.message}</p>}
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-8">
          <div className="bg-primary p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-[80px]" />
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <Layers className="w-5 h-5" />
              Finalize Entry
            </h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-white/5 rounded-[2rem] border border-white/5 group-hover:border-secondary/20 transition-all">
                <span className="text-sm font-bold uppercase tracking-widest">Public Status</span>
                <button 
                  type="button" 
                  onClick={() => setValue("isPublished", !watch("isPublished"))}
                  className={`w-14 h-8 rounded-full relative transition-colors duration-500 ${watch("isPublished") ? 'bg-emerald-500' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-500 ${watch("isPublished") ? 'left-7 shadow-[0_0_15px_rgba(255,255,255,0.6)]' : 'left-1'}`} />
                </button>
              </div>

              <div className="space-y-2 px-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Catalog Category</label>
                <select 
                  {...register("category")}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-secondary transition-all"
                >
                  <option className="bg-primary" value="Industrial">Industrial</option>
                  <option className="bg-primary" value="Agriculture">Agriculture</option>
                  <option className="bg-primary" value="Chemicals">Chemicals</option>
                  <option className="bg-primary" value="Electronics">Electronics</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || uploading}
                className="w-full py-5 bg-secondary text-primary font-black rounded-[2rem] hover:scale-[1.03] active:scale-95 transition-all shadow-xl shadow-secondary/20 flex items-center justify-center gap-3 border-b-4 border-amber-900 active:border-b-0"
              >
                {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                {id ? "COMMIT UPDATES" : "LODGE INTO CATALOG"}
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-100 p-8 rounded-[3rem] text-center">
            <FileText className="w-10 h-10 text-slate-100 mx-auto mb-4" />
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-loose">
              By saving this entity, you certify quality compliance for international trade.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
