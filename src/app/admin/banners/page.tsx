"use client";

import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase/config";
import { Banner } from "@/types";
import { 
  Save, 
  Loader2, 
  X, 
  Plus, 
  Trash2,
  ImageIcon, 
  AlertCircle,
  FileText,
  Layers,
  Link as LinkIcon,
  ToggleLeft,
  ToggleRight,
  ArrowUpDown
} from "lucide-react";

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form State
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonLink, setButtonLink] = useState("");
  const [sortOrder, setSortOrder] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Fetch Banners
  const fetchBanners = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "banners"), orderBy("sortOrder", "asc"));
      const snapshot = await getDocs(q);
      const fetchedBanners = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Banner[];
      setBanners(fetchedBanners);
    } catch (err: any) {
      setError("Failed to fetch banners: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Handle Image Upload to Firebase Storage
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploading(true);
    setError("");
    const file = e.target.files[0];

    try {
      const storageRef = ref(storage, `banners/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await new Promise<void>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (err) => reject(err),
          () => resolve()
        );
      });

      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
      setSuccess("Image uploaded successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError("Image upload failed. " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // Submit Banner
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      setError("Please upload a slide image first.");
      return;
    }
    if (!title.trim()) {
      setError("Please enter a slide title.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const newBannerData = {
        title: title.trim(),
        subtitle: subtitle.trim() || "",
        buttonText: buttonText.trim() || "",
        buttonLink: buttonLink.trim() || "",
        imageUrl,
        isActive,
        sortOrder: Number(sortOrder) || 0,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "banners"), newBannerData);
      
      // Clear Form
      setTitle("");
      setSubtitle("");
      setButtonText("");
      setButtonLink("");
      setSortOrder(0);
      setImageUrl("");
      setIsActive(true);

      setSuccess("Banner added successfully!");
      setTimeout(() => setSuccess(""), 3000);
      fetchBanners();
    } catch (err: any) {
      setError("Failed to save banner: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // Toggle Active Status
  const toggleActiveStatus = async (banner: Banner) => {
    try {
      const bannerRef = doc(db, "banners", banner.id);
      await updateDoc(bannerRef, {
        isActive: !banner.isActive,
      });
      // Update local state
      setBanners(
        banners.map((b) => (b.id === banner.id ? { ...b, isActive: !b.isActive } : b))
      );
    } catch (err: any) {
      setError("Failed to update status: " + err.message);
    }
  };

  // Delete Banner
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;

    try {
      await deleteDoc(doc(db, "banners", id));
      setBanners(banners.filter((b) => b.id !== id));
      setSuccess("Banner deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError("Failed to delete banner: " + err.message);
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-black text-primary uppercase tracking-tighter">
          Homepage Banner Manager
        </h1>
        <p className="text-slate-400 font-bold tracking-widest text-xs">
          MANAGE HOME PAGE SLIDER CAROUSEL IMAGES AND ACTIONS
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Banner Creation Form */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-100 border border-slate-100 space-y-8">
            <h3 className="text-2xl font-black text-primary flex items-center gap-3">
              <Plus className="text-secondary w-6 h-6" />
              Add Banner Slide
            </h3>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 border border-red-100">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="font-bold text-xs tracking-wider uppercase">{error}</span>
              </div>
            )}

            {success && (
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center gap-3 border border-emerald-100">
                <FileText className="w-5 h-5 flex-shrink-0" />
                <span className="font-bold text-xs tracking-wider uppercase">{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload Box */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                  Slide Image
                </label>
                {imageUrl ? (
                  <div className="group aspect-[16/9] rounded-3xl overflow-hidden relative shadow-md border-2 border-slate-50">
                    <img src={imageUrl} alt="Slide Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => setImageUrl("")}
                      className="absolute top-2 right-2 bg-red-500 p-2 rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="aspect-[16/9] flex flex-col items-center justify-center gap-3 border-4 border-dashed border-slate-100 rounded-3xl cursor-pointer bg-slate-50/50 hover:bg-slate-50 hover:border-secondary transition-all group">
                    {uploading ? (
                      <Loader2 className="w-8 h-8 text-secondary animate-spin" />
                    ) : (
                      <>
                        <div className="bg-white p-3 rounded-2xl shadow-sm text-slate-300 group-hover:text-secondary group-hover:scale-110 transition-all">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Upload Banner Image
                        </span>
                      </>
                    )}
                    <input 
                      type="file" 
                      hidden 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      disabled={uploading} 
                    />
                  </label>
                )}
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                  Slide Title
                </label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white rounded-2xl outline-none transition-all font-bold text-primary"
                  placeholder="e.g. Connecting Markets Globally"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                  Slide Subtitle
                </label>
                <textarea 
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  rows={2}
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white rounded-2xl outline-none transition-all font-medium text-primary resize-none"
                  placeholder="e.g. Reliable supply chains and custom solutions."
                />
              </div>

              {/* Button Customization */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                    Button Text
                  </label>
                  <input 
                    type="text" 
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white rounded-2xl outline-none transition-all font-bold text-primary text-sm"
                    placeholder="e.g. Explore"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                    Button Link
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input 
                      type="text" 
                      value={buttonLink}
                      onChange={(e) => setButtonLink(e.target.value)}
                      className="w-full pl-10 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white rounded-2xl outline-none transition-all font-bold text-primary text-sm"
                      placeholder="/products"
                    />
                  </div>
                </div>
              </div>

              {/* Order & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-1">
                    <ArrowUpDown className="w-3 h-3" />
                    Sort Order
                  </label>
                  <input 
                    type="number" 
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white rounded-2xl outline-none transition-all font-bold text-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                    Active Status
                  </label>
                  <button 
                    type="button"
                    onClick={() => setIsActive(!isActive)}
                    className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 border-2 font-bold transition-all ${
                      isActive 
                        ? "bg-emerald-50 border-emerald-200 text-emerald-600" 
                        : "bg-slate-50 border-slate-200 text-slate-400"
                    }`}
                  >
                    {isActive ? (
                      <>
                        <ToggleRight className="w-5 h-5 text-emerald-500" />
                        <span>Visible</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="w-5 h-5 text-slate-400" />
                        <span>Hidden</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={saving || uploading}
                className="w-full py-5 bg-secondary text-primary font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-secondary/15 flex items-center justify-center gap-3 border-b-4 border-amber-900 active:border-b-0"
              >
                {saving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                ADD BANNER SLIDE
              </button>
            </form>
          </div>
        </div>

        {/* Banners Grid / List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-100 border border-slate-100 space-y-8">
            <h3 className="text-2xl font-black text-primary flex items-center gap-3">
              <Layers className="text-secondary w-6 h-6" />
              Active Carousel Slides
              <span className="text-xs text-slate-300 font-bold bg-slate-50 px-3 py-1 rounded-full">
                {banners.length} total
              </span>
            </h3>

            {loading ? (
              <div className="flex flex-col items-center py-20 gap-3">
                <Loader2 className="w-8 h-8 text-secondary animate-spin" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Loading Slides...
                </span>
              </div>
            ) : banners.length === 0 ? (
              <div className="text-center py-20 text-slate-300 font-medium">
                No banner slides created. Add your first slide using the form on the left.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {banners.map((banner) => (
                  <div 
                    key={banner.id} 
                    className="border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col"
                  >
                    <div className="aspect-[16/9] relative overflow-hidden bg-slate-900">
                      <img 
                        src={banner.imageUrl} 
                        alt={banner.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-end">
                        <span className="absolute top-4 left-4 bg-black/60 text-white font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                          Order: {banner.sortOrder}
                        </span>
                        <h4 className="text-white font-extrabold text-lg line-clamp-1">
                          {banner.title}
                        </h4>
                        {banner.subtitle && (
                          <p className="text-slate-300 text-xs line-clamp-1 mt-1 font-medium">
                            {banner.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-5 flex items-center justify-between bg-slate-50/50 flex-grow border-t border-slate-50">
                      <button
                        onClick={() => toggleActiveStatus(banner)}
                        className={`flex items-center gap-1.5 text-xs font-bold ${
                          banner.isActive ? "text-emerald-600" : "text-slate-400"
                        }`}
                      >
                        {banner.isActive ? (
                          <>
                            <ToggleRight className="w-5 h-5 text-emerald-500" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="w-5 h-5 text-slate-400" />
                            <span>Inactive</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleDelete(banner.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        title="Delete Banner"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
