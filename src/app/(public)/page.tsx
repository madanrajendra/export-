import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Globe2, 
  Zap,
  CheckCircle2,
  Users2
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay" />
        
        {/* Animated Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/40 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/30 rounded-full blur-[100px] animate-pulse delay-700" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-bold mb-6 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              GLOBAL LOGISTICS PARTNER
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
              Connecting <span className="text-secondary italic">Markets</span>, Delivering <span className="underline decoration-secondary/50 underline-offset-8">Trust</span>.
            </h1>
            
            <p className="text-slate-400 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl">
              From factory floor to global destinations. We simplify international trade with end-to-end export solutions managed by experts.
            </p>
            
            <div className="flex flex-wrap gap-5">
              <Link 
                href="/products" 
                className="bg-secondary text-white px-8 py-4 rounded-xl font-bold hover:scale-105 hover:shadow-[0_0_20px_rgba(180,83,9,0.4)] transition-all flex items-center gap-2 group"
              >
                Browse Products
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
        </div>
      </section>

      {/* Trust Stats */}
      <section className="container mx-auto px-4 -mt-32 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-white shadow-2xl rounded-3xl border border-slate-100">
          {[
            { label: "Founded", value: "2010", icon: ShieldCheck },
            { label: "Countries Served", value: "45+", icon: Globe2 },
            { label: "Tons Exported", value: "10,000+", icon: Truck },
            { label: "Happy Clients", value: "500+", icon: Users2 },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center p-4">
              <div className="bg-slate-50 p-3 rounded-2xl mb-3 text-secondary">
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Services Section */}
      <section className="container mx-auto px-4 pt-10">
        <div className="text-center mb-16">
          <h2 className="text-primary text-4xl font-bold mb-4">Our Core Capabilities</h2>
          <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Product Sourcing", 
              desc: "Direct access to certified manufacturers with stringent quality control standards.",
              icon: CheckCircle2
            },
            { 
              title: "Global Supply Chain", 
              desc: "Integrated logistics including air, sea, and land freight for timely global delivery.",
              icon: Zap
            },
            { 
              title: "Export Compliance", 
              desc: "Navigating complex international trade laws and customs documentation for you.",
              icon: ShieldCheck
            },
          ].map((service, i) => (
            <div key={i} className="group p-8 bg-slate-50 hover:bg-primary transition-all duration-500 rounded-3xl border border-transparent hover:border-secondary shadow-sm">
              <div className="bg-white p-4 rounded-2xl w-fit mb-6 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-500">
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-primary group-hover:text-white mb-4 transition-colors">{service.title}</h3>
              <p className="text-slate-500 group-hover:text-slate-300 leading-relaxed transition-colors">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-50 py-24 border-y border-slate-200">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80" 
                alt="Logistics container ship" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-secondary rounded-3xl -z-0 hidden md:block" />
          </div>
          
          <div>
            <h2 className="text-primary text-4xl font-bold mb-8">Why Thousands Trust GE Solutions</h2>
            <div className="flex flex-col gap-6">
              {[
                { title: "Quality Assurance", desc: "Every product undergoing multi-stage checks before dispatch." },
                { title: "Competitive Pricing", desc: "Leveraging direct manufacturing links for maximum value." },
                { title: "24/7 Tracking", desc: "Real-time visibility into your cargo's international journey." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="text-secondary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-primary mb-2">{item.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link href="/about" className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
                Learn more about our process <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4">
        <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl border-b-8 border-secondary">
          <Globe2 className="absolute top-10 right-10 w-64 h-64 text-white/5 -rotate-12" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 relative z-10">Ready to Expand Your Reach Globally?</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto relative z-10">
            Contact our export specialists today for a customized quote and seamless market integration strategy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link 
              href="/contact" 
              className="bg-secondary text-white px-10 py-5 rounded-2xl font-extrabold shadow-xl hover:scale-105 transition-transform"
            >
              Start Your Enquiry
            </Link>
            <Link 
              href="https://wa.me/yournumber" 
              className="bg-transparent border-2 border-white/20 text-white px-10 py-5 rounded-2xl font-extrabold hover:bg-white/10 transition-all"
            >
              WhatsApp Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
