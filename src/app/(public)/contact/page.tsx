import React from "react";
import EnquiryForm from "@/components/public/EnquiryForm";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Globe2, 
  MessageCircle,
  X as XIcon,
  FileText,
} from "lucide-react";

// Inline SVG icons for social platforms removed from lucide-react
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Hero / Header */}
      <section className="bg-primary pt-20 pb-40 text-center relative overflow-hidden">
        <Globe2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 text-white/5 animate-pulse" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 text-secondary text-sm font-bold tracking-widest uppercase mb-6">
            <span className="h-0.5 w-6 bg-secondary rounded-full" />
            Global Outreach
            <span className="h-0.5 w-6 bg-secondary rounded-full" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
            Get in <span className="text-secondary italic">Touch</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Our export specialists are stationed across 45 countries to facilitate your international trade needs. Connect with our dedicated support team.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-4 -mt-24 pb-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Details Side */}
          <div className="space-y-8">
            <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 flex flex-col gap-10">
              <h2 className="text-2xl font-black text-primary uppercase tracking-tighter flex items-center gap-2">
                Office Information
                <span className="h-2 w-2 bg-secondary rounded-full" />
              </h2>

              <div className="flex flex-col gap-8">
                <div className="flex gap-5">
                  <div className="bg-slate-50 p-4 rounded-2xl text-secondary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1 uppercase tracking-widest text-xs">Principal Location</h4>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      123 Maritime Plaza, Suite 405,<br />
                      Dubai Business Bay, United Arab Emirates
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="bg-slate-50 p-4 rounded-2xl text-secondary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1 uppercase tracking-widest text-xs">Direct Support</h4>
                    <p className="text-slate-500 font-medium">+91 9610114181</p>
                    <p className="text-slate-400 text-[10px] font-bold">24/7 Response Line Active</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="bg-slate-50 p-4 rounded-2xl text-secondary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1 uppercase tracking-widest text-xs">Export Logistics</h4>
                    <p className="text-slate-500 font-medium">Saraagoexim@gmail.com</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="bg-slate-50 p-4 rounded-2xl text-secondary">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1 uppercase tracking-widest text-xs">Tax Registration</h4>
                    <p className="text-slate-500 font-bold text-sm">GSTIN: 08INLPK3173G1ZN</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="bg-slate-50 p-4 rounded-2xl text-secondary">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1 uppercase tracking-widest text-xs">Operational Hours</h4>
                    <p className="text-slate-500 font-medium">Monday - Friday: 08:00 - 18:00 (GMT+4)</p>
                    <p className="text-slate-500 font-medium">Saturday: 09:00 - 13:00</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-300 tracking-widest uppercase">Global Network</span>
                <div className="flex gap-4">
                  {[LinkedinIcon, XIcon, FacebookIcon].map((Icon, i) => (
                    <a key={i} href="#" className="text-slate-300 hover:text-secondary transition-colors">
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* WhatsApp CTA Card */}
            <a 
              href="https://wa.me/yournumber" 
              className="group bg-emerald-500 p-8 rounded-[3rem] text-white flex items-center justify-between shadow-xl shadow-emerald-100 hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-4 rounded-2xl group-hover:rotate-12 transition-transform">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-black text-xl leading-none mb-1 uppercase">Instant Support</h4>
                  <p className="text-white/80 text-sm font-bold tracking-widest uppercase">Chat with an expert</p>
                </div>
              </div>
              <div className="bg-white/20 p-2 rounded-full hidden sm:block">
                <IconChevronRight className="w-6 h-6" />
              </div>
            </a>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-2">
            <EnquiryForm sourcePage="Contact Page" />
          </div>
        </div>
      </section>

      {/* Map Segment (Placeholder) */}
      <section className="bg-slate-100 h-96 w-full grayscale opacity-50 contrast-125 mb-24 flex items-center justify-center relative group">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay" />
        <div className="bg-white p-6 rounded-3xl shadow-xl relative z-10 flex items-center gap-4 group-hover:scale-110 transition-transform">
          <div className="bg-primary p-3 rounded-xl text-secondary shadow-lg">
            <Globe2 className="w-8 h-8" />
          </div>
          <span className="font-black text-primary tracking-tighter uppercase">Virtual Node Active</span>
        </div>
      </section>
    </div>
  );
}

function IconChevronRight(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
