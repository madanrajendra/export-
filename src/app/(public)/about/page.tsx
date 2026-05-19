import React from "react";
import { 
  History, 
  Target, 
  Heart, 
  ShieldCheck, 
  Award, 
  Users2,
  Globe,
  CheckCircle2
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero / Vision Statement */}
      <section className="bg-slate-50 pt-24 pb-32 text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 text-secondary text-sm font-bold tracking-widest uppercase mb-6 px-4 py-1 bg-secondary/5 rounded-full border border-secondary/10">
            Our Global Legacy
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-primary mb-10 tracking-tighter leading-none max-w-4xl mx-auto">
            Redefining <span className="text-secondary italic">Excellence</span> in International <span className="underline decoration-secondary/50 underline-offset-8">Trade</span>.
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Rooted in tradition, powered by innovation. We connect continents through a seamless supply chain dedicated to quality and transparency.
          </p>
        </div>
        
        {/* Abstract background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-0" />
      </section>

      {/* Mission & Values Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Our Mission", 
              desc: "To empower global businesses by providing high-quality, compliant, and cost-effective export solutions that foster mutual growth.",
              icon: Target
            },
            { 
              title: "Our Heritage", 
              desc: "With over a decade of industry expertise, we carry forward a legacy of trust and reliability across international maritime routes.",
              icon: History
            },
            { 
              title: "Our Integrity", 
              desc: "Transparency is our cornerstone. We ensure every transaction is documented, verified, and ethically sourced for global standards.",
              icon: ShieldCheck
            },
          ].map((item, i) => (
            <div key={i} className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-xl shadow-slate-100 flex flex-col gap-6 hover:translate-y-[-8px] transition-all duration-500">
              <div className="bg-slate-50 p-4 rounded-2xl w-fit text-secondary border border-secondary/5">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-primary uppercase tracking-tighter">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats/Credibility */}
      <section className="bg-primary py-24 text-white overflow-hidden relative">
        <Globe className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] text-white/5 -rotate-12" />
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tighter">Certified Global Reach & <span className="text-secondary">Unwavering</span> Standards.</h2>
            <div className="grid grid-cols-2 gap-8 text-center sm:text-left">
              <div>
                <p className="text-4xl font-black text-secondary mb-1">1500+</p>
                <p className="text-slate-400 font-bold tracking-widest text-xs uppercase">Annual Shipments</p>
              </div>
              <div>
                <p className="text-4xl font-black text-secondary mb-1">98%</p>
                <p className="text-slate-400 font-bold tracking-widest text-xs uppercase">On-Time Accuracy</p>
              </div>
              <div>
                <p className="text-4xl font-black text-secondary mb-1">45</p>
                <p className="text-slate-400 font-bold tracking-widest text-xs uppercase">Trade Corridors</p>
              </div>
              <div>
                <p className="text-4xl font-black text-secondary mb-1">ISO 9001</p>
                <p className="text-slate-400 font-bold tracking-widest text-xs uppercase">Compliance Level</p>
              </div>
            </div>
          </div>
          <div className="aspect-[16/10] bg-slate-800 rounded-[3rem] border border-white/5 relative overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1577705993349-8d3ef0435d8e?auto=format&fit=crop&q=80" 
              alt="Global logistics management" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <p className="text-sm font-bold text-slate-300 italic">"Global trade isn't just about moving goods; it's about building bridges between cultures and economies."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Redux */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-20">
          <h2 className="text-primary text-4xl font-black uppercase tracking-widest">Core Values</h2>
          <div className="h-1.5 w-16 bg-secondary mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Transparency", icon: Award },
            { title: "Efficiency", icon: Users2 },
            { title: "Ethics", icon: Heart },
            { title: "Safety", icon: ShieldCheck },
          ].map((v, i) => (
            <div key={i} className="group p-10 bg-slate-50 border border-slate-100 rounded-[3rem] hover:bg-white hover:shadow-2xl hover:border-secondary transition-all duration-500 text-center flex flex-col items-center gap-4">
              <div className="bg-white p-5 rounded-3xl text-secondary shadow-sm group-hover:scale-110 transition-transform">
                <v.icon className="w-8 h-8" />
              </div>
              <h4 className="font-black text-xl text-primary uppercase tracking-tighter">{v.title}</h4>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">Setting the benchmark for excellence in every container we ship.</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Segment */}
      <section className="container mx-auto px-4">
        <div className="bg-secondary rounded-[4rem] p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-secondary/20">
          <CheckCircle2 className="absolute -left-10 -bottom-10 w-64 h-64 text-white/10 -rotate-12" />
          <h2 className="text-4xl font-black mb-8 relative z-10 tracking-tighter">Experience International Trade Reimagined.</h2>
          <p className="text-white/80 text-xl font-medium mb-12 max-w-xl mx-auto relative z-10">Our global trade advisors are ready to guide you through your next export project with precision.</p>
          <div className="flex flex-wrap justify-center gap-6 relative z-10">
            <a href="/contact" className="bg-primary text-white px-10 py-5 rounded-2xl font-black hover:scale-105 transition-transform shadow-xl">Contact Experts</a>
            <a href="/products" className="bg-white text-secondary px-10 py-5 rounded-2xl font-black hover:bg-slate-50 transition-colors shadow-xl">Explore Inventory</a>
          </div>
        </div>
      </section>
    </div>
  );
}
