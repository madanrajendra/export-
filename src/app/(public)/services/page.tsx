"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Service } from "@/types";
import { Loader2, Box, ArrowRight, ShieldCheck, Globe2, Truck } from "lucide-react";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "services"),
      where("isPublished", "==", true),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
      setServices(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col gap-16 pb-24">
      <section className="bg-slate-950 pt-24 pb-32 text-center text-white relative">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
            Export <span className="text-secondary">Services</span>.
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Comprehensive logistics, sourcing, and trade management solutions.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-20 relative z-20">
        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="w-10 h-10 animate-spin text-secondary" /></div>
        ) : services.length === 0 ? (
          <div className="text-center p-20 bg-white shadow-xl rounded-[3rem]">
            <h3 className="text-2xl font-bold">Services updating soon</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <div key={service.id} className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 flex flex-col group hover:-translate-y-2 transition-transform">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                  <Globe2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">{service.title}</h3>
                <p className="text-slate-500 mb-8 flex-grow">{service.shortDescription}</p>
                <Link href={`/contact?service=${service.id}`} className="flex items-center gap-2 text-primary font-bold group-hover:text-secondary group-hover:gap-4 transition-all">
                  Inquire Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
