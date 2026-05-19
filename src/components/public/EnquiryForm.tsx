"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { EnquirySchema, EnquiryFormValues } from "@/types";
import { 
  Send, 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  User, 
  Mail, 
  Phone, 
  MessageSquare,
  Globe2,
  Building
} from "lucide-react";

export default function EnquiryForm({ 
  relatedItemId, 
  relatedItemType = "general",
  sourcePage = "Contact"
}: { 
  relatedItemId?: string, 
  relatedItemType?: "product" | "service" | "general",
  sourcePage?: string
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(EnquirySchema),
    defaultValues: {
      relatedItemId,
      relatedItemType,
      sourcePage,
    }
  });

  const onSubmit = async (data: EnquiryFormValues) => {
    setIsSubmitting(true);
    setError("");
    try {
      await addDoc(collection(db, "enquiries"), {
        ...data,
        status: "new",
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      reset();
    } catch (err: any) {
      setError("Failed to send enquiry. Please try again or contact via WhatsApp.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border-2 border-emerald-100 p-8 rounded-[2.5rem] text-center flex flex-col items-center gap-6 animate-fade-in shadow-xl shadow-emerald-50">
        <div className="bg-emerald-500 p-5 rounded-full text-white shadow-lg animate-bounce">
          <CheckCircle className="w-10 h-10" />
        </div>
        <div>
          <h3 className="text-3xl font-black text-emerald-900 mb-2">Message Transmitted</h3>
          <p className="text-emerald-700/70 font-medium">Our export specialist will analyze your request and contact you within 24 business hours.</p>
        </div>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-emerald-600 font-bold hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl relative overflow-hidden group">
      {/* Decorative background element */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-secondary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex flex-col gap-2 mb-8">
        <h2 className="text-3xl font-black text-primary tracking-tighter">SECURE ENQUIRY</h2>
        <p className="text-slate-400 font-bold tracking-widest text-xs uppercase underline decoration-secondary decoration-2 underline-offset-4">Global Trade Management Request</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-medium animate-shake">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Contact Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input 
                {...register("name")}
                className={`w-full pl-12 pr-6 py-4 bg-slate-50 border-2 ${errors.name ? 'border-red-200' : 'border-transparent'} focus:border-secondary focus:bg-white rounded-2xl outline-none transition-all text-primary font-medium`}
                placeholder="Full Name"
              />
            </div>
            {errors.name && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Official Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input 
                {...register("email")}
                className={`w-full pl-12 pr-6 py-4 bg-slate-50 border-2 ${errors.email ? 'border-red-200' : 'border-transparent'} focus:border-secondary focus:bg-white rounded-2xl outline-none transition-all text-primary font-medium`}
                placeholder="email@company.com"
              />
            </div>
            {errors.email && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phone */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Direct Phone</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input 
                {...register("phone")}
                className={`w-full pl-12 pr-6 py-4 bg-slate-50 border-2 ${errors.phone ? 'border-red-200' : 'border-transparent'} focus:border-secondary focus:bg-white rounded-2xl outline-none transition-all text-primary font-medium`}
                placeholder="+1 ..."
              />
            </div>
            {errors.phone && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1">{errors.phone.message}</p>}
          </div>

          {/* Country */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Destination Country</label>
            <div className="relative">
              <Globe2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input 
                {...register("country")}
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white rounded-2xl outline-none transition-all text-primary font-medium"
                placeholder="Global Destination"
              />
            </div>
          </div>
        </div>

        {/* Company Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Company Entity</label>
          <div className="relative">
            <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            <input 
              {...register("companyName")}
              className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white rounded-2xl outline-none transition-all text-primary font-medium"
              placeholder="Enterprise Name"
            />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Detailed Inquiry Specification</label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-6 w-4 h-4 text-slate-300" />
            <textarea 
              {...register("message")}
              rows={5}
              className={`w-full pl-12 pr-6 py-4 bg-slate-50 border-2 ${errors.message ? 'border-red-200' : 'border-transparent'} focus:border-secondary focus:bg-white rounded-2xl outline-none transition-all text-primary font-medium resize-none`}
              placeholder="Tell us about your requirements, volume, and urgency..."
            />
          </div>
          {errors.message && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1">{errors.message.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg hover:bg-slate-900 shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-3 border-b-4 border-slate-950"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          LODGE ENQUIRY
        </button>

        <p className="text-center text-[10px] text-slate-400 font-bold tracking-widest uppercase">
          Cloud Encrypted • Protected by Global Privacy Standards
        </p>
      </form>
    </div>
  );
}
