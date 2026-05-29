"use client";

import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { LogOut, UploadCloud, Image as ImageIcon } from "lucide-react";

const IMAGE_SLOTS = [
  { id: "heroBanner", label: "Hero Banner (Top)" },
  { id: "product1", label: "Product Category 1 (Rings)" },
  { id: "product2", label: "Product Category 2 (Earrings)" },
  { id: "product3", label: "Product Category 3 (Pendants)" },
  { id: "product4", label: "Product Category 4 (Bracelets)" },
  { id: "product5", label: "Product Category 5 (Custom)" },
  { id: "quality1", label: "Quality Image 1" },
  { id: "quality2", label: "Quality Image 2" },
  { id: "quality3", label: "Quality Image 3" },
  { id: "quality4", label: "Quality Image 4" },
  { id: "founder", label: "Founder Profile Image" },
  { id: "contactForm", label: "Send Us Your Requirements (Contact Section)" },
];

export default function AdminDashboard() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  
  const [images, setImages] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchImages();
    }
  }, [user]);

  const fetchImages = async () => {
    try {
      const docRef = doc(db, "siteConfig", "images");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setImages(docSnap.data());
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleFileUpload = async (slotId: string, file: File) => {
    setUploading(prev => ({ ...prev, [slotId]: true }));
    try {
      const storageRef = ref(storage, `site-images/${slotId}_${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error("Upload error:", error);
          setUploading(prev => ({ ...prev, [slotId]: false }));
          alert("Upload failed. Make sure your Firebase Storage rules allow writing.");
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // Save to Firestore
          const docRef = doc(db, "siteConfig", "images");
          const newImages = { ...images, [slotId]: downloadURL };
          await setDoc(docRef, newImages, { merge: true });
          
          setImages(newImages);
          setUploading(prev => ({ ...prev, [slotId]: false }));
        }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploading(prev => ({ ...prev, [slotId]: false }));
    }
  };

  if (loading || fetching) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* Admin Header */}
      <header className="bg-primary text-white py-6 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-wide">SARAAGO Exim</h1>
            <span className="bg-secondary text-xs px-2 py-1 rounded-sm uppercase tracking-wider">Admin Panel</span>
          </div>
          <button 
            onClick={() => auth.signOut()}
            className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto px-4 lg:px-8 mt-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-primary mb-2">Image Management</h2>
          <p className="text-slate-600">Update the images used across your public website. Changes are applied instantly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {IMAGE_SLOTS.map((slot) => (
            <div key={slot.id} className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              
              {/* Image Preview */}
              <div className="h-48 bg-slate-100 relative flex items-center justify-center border-b border-slate-200">
                {images[slot.id] ? (
                  <img src={images[slot.id]} alt={slot.label} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-slate-400 flex flex-col items-center">
                    <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                    <span className="text-sm font-medium">No custom image</span>
                    <span className="text-xs">Using default local image</span>
                  </div>
                )}
                {uploading[slot.id] && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center backdrop-blur-sm">
                    <div className="flex flex-col items-center text-primary">
                      <div className="w-8 h-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin mb-2" />
                      <span className="text-sm font-bold">Uploading...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Upload Controls */}
              <div className="p-6">
                <h3 className="font-bold text-primary mb-4 text-lg">{slot.label}</h3>
                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    disabled={uploading[slot.id]}
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleFileUpload(slot.id, e.target.files[0]);
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <div className="bg-muted border border-slate-200 text-primary text-center py-3 rounded-sm font-medium flex items-center justify-center gap-2 pointer-events-none">
                    <UploadCloud className="w-5 h-5" />
                    {images[slot.id] ? "Change Image" : "Upload Image"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
