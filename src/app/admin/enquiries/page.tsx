"use client";

import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Enquiry } from "@/types";
import { 
  MessageSquare, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  MoreVertical, 
  Trash2, 
  CheckCircle, 
  RefreshCcw,
  Loader2,
  Filter,
  Eye,
  Building
} from "lucide-react";
import { DateTime } from "luxon";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "new" | "in-progress" | "closed">("all");

  useEffect(() => {
    const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Enquiry));
      setEnquiries(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: Enquiry["status"]) => {
    try {
      await updateDoc(doc(db, "enquiries", id), { status: newStatus });
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      try {
        await deleteDoc(doc(db, "enquiries", id));
      } catch (err) {
        console.error("Error deleting enquiry:", err);
      }
    }
  };

  const filteredEnquiries = enquiries.filter(e => filter === "all" || e.status === filter);

  const getStatusColor = (status: Enquiry["status"]) => {
    switch (status) {
      case "new": return "bg-blue-500 text-white shadow-blue-100";
      case "in-progress": return "bg-amber-500 text-white shadow-amber-100";
      case "closed": return "bg-slate-400 text-white shadow-slate-100";
      default: return "bg-slate-200 text-slate-800 shadow-slate-100";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-primary tracking-tight mb-2 uppercase">Lead Center</h1>
          <p className="text-slate-400 font-bold tracking-widest text-xs">ENQUIRY & COMMUNICATION MANAGEMENT</p>
        </div>
        
        {/* Filters */}
        <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
          {["all", "new", "in-progress", "closed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === f 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-slate-400 hover:text-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <Loader2 className="w-8 h-8 text-secondary animate-spin" />
          <p className="text-xs font-black text-slate-300 tracking-widest uppercase">Fetching Leads...</p>
        </div>
      ) : filteredEnquiries.length === 0 ? (
        <div className="bg-white rounded-[3rem] p-20 text-center border-4 border-dashed border-slate-50">
          <div className="bg-slate-50 p-6 rounded-full inline-block mb-6 text-slate-200">
            <Filter className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-black text-primary mb-2">No leads found</h3>
          <p className="text-slate-400 font-medium">Try adjusting your filters or wait for new incoming requests.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredEnquiries.map((e) => (
            <div 
              key={e.id}
              className="bg-white rounded-[2.5rem] p-8 border border-slate-100 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 group"
            >
              <div className="flex flex-col lg:flex-row gap-8 justify-between items-start">
                {/* Main Content */}
                <div className="space-y-6 flex-grow min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`${getStatusColor(e.status)} text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest shadow-lg`}>
                      {e.status}
                    </span>
                    <span className="bg-slate-50 text-slate-400 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-slate-100">
                      {e.sourcePage}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                      <Calendar className="w-3 h-3" />
                      {e.createdAt ? DateTime.fromJSDate(e.createdAt.toDate()).toFormat("DD @ HH:mm") : "Just now"}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-primary tracking-tight truncate">{e.name}</h3>
                    <p className="text-slate-500 font-medium line-clamp-2 leading-relaxed italic bg-slate-50/50 p-4 rounded-2xl border-l-4 border-secondary">{e.message}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Mail className="w-4 h-4 text-secondary" />
                      <span className="text-xs font-bold truncate">{e.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Phone className="w-4 h-4 text-secondary" />
                      <span className="text-xs font-bold">{e.phone}</span>
                    </div>
                    {e.companyName && (
                      <div className="flex items-center gap-2 text-slate-400">
                        <Building className="w-4 h-4 text-secondary" />
                        <span className="text-xs font-bold truncate">{e.companyName}</span>
                      </div>
                    )}
                    {e.country && (
                      <div className="flex items-center gap-2 text-slate-400">
                        <MapPin className="w-4 h-4 text-secondary" />
                        <span className="text-xs font-bold truncate">{e.country}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-auto flex-shrink-0 pt-2 lg:pt-0">
                  <div className="flex flex-row lg:flex-col gap-2 flex-grow">
                    {e.status === "new" && (
                      <button 
                        onClick={() => handleUpdateStatus(e.id, "in-progress")}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-amber-50 text-amber-600 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-100 transition-all"
                      >
                        <RefreshCcw className="w-4 h-4" />
                        Process
                      </button>
                    )}
                    {e.status !== "closed" && (
                      <button 
                        onClick={() => handleUpdateStatus(e.id, "closed")}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-100 transition-all"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Resolve
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3.5 bg-slate-50 text-slate-400 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(e.id)}
                      className="p-3.5 bg-red-50 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
