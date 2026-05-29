"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Banner } from "@/types";
import { ChevronLeft, ChevronRight, ArrowRight, Loader2 } from "lucide-react";

// Fallback banners in case Firestore is empty or loading
const FALLBACK_BANNERS = [
  {
    id: "fallback-1",
    title: "Connecting Markets, Delivering Trust",
    subtitle: "From factory floor to global destinations. We simplify international trade with end-to-end export solutions managed by experts.",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80",
    buttonText: "Browse Products",
    buttonLink: "/products",
    isActive: true,
    sortOrder: 1,
    createdAt: null
  },
  {
    id: "fallback-2",
    title: "Global Supply Chain & Logistics",
    subtitle: "Direct access to certified manufacturers, logistics services, compliance management, and secure container shipping.",
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80",
    buttonText: "Our Services",
    buttonLink: "/services",
    isActive: true,
    sortOrder: 2,
    createdAt: null
  },
  {
    id: "fallback-3",
    title: "Premium Agriculture & Industrial Trade",
    subtitle: "High quality agro-products and industrial tools exported globally under strict quality control standards.",
    imageUrl: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80",
    buttonText: "Get a Quote",
    buttonLink: "/contact",
    isActive: true,
    sortOrder: 3,
    createdAt: null
  }
];

export default function HeroSlider() {
  const [banners, setBanners] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch Banners from Firestore
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const q = query(
          collection(db, "banners"),
          where("isActive", "==", true),
          orderBy("sortOrder", "asc")
        );
        const snapshot = await getDocs(q);
        const fetchedBanners = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        if (fetchedBanners.length > 0) {
          setBanners(fetchedBanners);
        } else {
          setBanners(FALLBACK_BANNERS);
        }
      } catch (error) {
        console.error("Error loading banners, using fallbacks:", error);
        setBanners(FALLBACK_BANNERS);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Auto-play
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, banners]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  if (loading) {
    return (
      <div className="min-h-[90vh] bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 text-secondary animate-spin mb-4" />
        <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">Initializing Canvas...</p>
      </div>
    );
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-950 w-full select-none">
      {/* Background Slides */}
      {banners.map((slide, idx) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(${(idx - currentIndex) * 100}%)` }}
        >
          {/* Cover Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] ease-out scale-105"
            style={{ 
              backgroundImage: `url('${slide.imageUrl}')`,
              transform: idx === currentIndex ? 'scale(1)' : 'scale(1.05)'
            }}
          />
          {/* Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent opacity-85" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-30" />
        </div>
      ))}

      {/* Animated Orbs (floating background ambiance) */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none z-10" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/15 rounded-full blur-[100px] pointer-events-none z-10" />

      {/* Main Slide Content Wrapper */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl">
          {/* Subheader Banner */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold mb-6 tracking-widest uppercase animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            SARAAGO EXIM GROUP
          </div>

          {/* Dynamic Content Display */}
          {banners.map((slide, idx) => {
            if (idx !== currentIndex) return null;
            return (
              <div key={slide.id} className="animate-fade-in-up space-y-8">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
                  {slide.title.split(" ").map((word: string, i: number) => {
                    // Let's highlight specific words or just styling
                    if (i % 4 === 2) {
                      return <span key={i} className="text-secondary italic mr-3">{word}</span>;
                    }
                    return <span key={i} className="mr-3">{word}</span>;
                  })}
                </h1>
                
                <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
                  {slide.subtitle}
                </p>

                {/* Call To Action Buttons */}
                <div className="flex flex-wrap gap-5 pt-4">
                  <Link 
                    href={slide.buttonLink || "/products"} 
                    className="bg-secondary text-white px-8 py-4 rounded-xl font-bold hover:scale-105 hover:shadow-[0_0_20px_rgba(180,83,9,0.3)] transition-all flex items-center gap-2 group"
                  >
                    {slide.buttonText || "Learn More"}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    href="/contact" 
                    className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
                  >
                    Get a Quote
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Manual Slide Controls */}
      {banners.length > 1 && (
        <>
          {/* Arrow Left */}
          <button
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-secondary hover:text-white transition-all backdrop-blur-sm hidden md:block active:scale-90"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          {/* Arrow Right */}
          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-secondary hover:text-white transition-all backdrop-blur-sm hidden md:block active:scale-90"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-8 bg-secondary" : "w-2.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* custom local styles for fade-in animations */}
      <style jsx global>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
