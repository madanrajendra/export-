"use client";
import React from "react";
import { Wrench } from "lucide-react";

export default function AdminServicesPage() {
  return (
    <div className="flex flex-col items-center justify-center p-40 text-center">
      <div className="bg-slate-50 p-10 rounded-full text-slate-200 border-4 border-dashed border-slate-100 mb-6">
        <Wrench className="w-16 h-16" />
      </div>
      <h1 className="text-3xl font-black text-primary uppercase">Services Module</h1>
      <p className="text-slate-400 font-medium">Coming soon: Manage your export logistics services here.</p>
    </div>
  );
}
