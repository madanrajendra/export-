"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase/config";
import { doc, getDoc, collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { Product } from "@/types";
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Globe2, 
  Diamond,
  FileCheck,
  PackageCheck,
  Send,
  MessageCircle,
  Gem
} from "lucide-react";

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    country: "",
    email: "",
    whatsapp: "",
    productCategory: "",
    quantity: "",
    targetPrice: "",
    diamondReq: "",
    metalReq: "",
    certReq: "",
    message: ""
  });

  const [images, setImages] = useState<Record<string, string>>({});
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "siteConfig", "images");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setImages(docSnap.data());
        }

        const q = query(
          collection(db, "products"),
          where("isPublished", "==", true),
          orderBy("createdAt", "desc")
        );
        const productSnap = await getDocs(q);
        const fetchedProducts = productSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    // Submit logic here
    alert("Enquiry sent successfully!");
  };

  return (
    <div className="flex flex-col w-full overflow-hidden font-sans">
      
      {/* 1. Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-primary overflow-hidden">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 z-0 bg-primary">
          <img 
            src={images?.heroBanner || "/img1.jpeg"} 
            alt="Premium Lab-Grown Diamond Ring" 
            className="w-full h-full object-cover opacity-30 transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 pt-24 md:pt-32">
          <div className="flex flex-col justify-center max-w-2xl text-center md:text-left">
            <div className="inline-block px-5 py-2 mb-6 md:mb-8 mx-auto md:mx-0 rounded-none border border-accent/40 bg-primary/40 backdrop-blur-md w-fit">
              <span className="text-accent font-medium text-xs tracking-[0.2em] uppercase">Premium Export Brand</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-6 md:mb-8">
              Premium Lab-Grown Diamond Jewellery <span className="text-accent block mt-2 font-serif italic">Export from India</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 mb-10 md:mb-12 leading-relaxed font-light max-w-lg mx-auto md:mx-0">
              Export-ready jewellery sourcing with clear specifications. Custom designs, certified stones and professional documentation for global buyers.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="#contact" className="bg-accent text-primary px-10 py-4 rounded-none font-medium uppercase tracking-wider hover:bg-white transition-colors text-center text-sm">
                Send Enquiry
              </a>
              <a href="#products" className="bg-transparent border border-white/30 text-white px-10 py-4 rounded-none font-medium uppercase tracking-wider hover:bg-white/10 transition-colors text-center text-sm">
                View Collections
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-4 text-sm font-medium text-white">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent" /> Custom Designs</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent" /> IGI/GIA Certified Stones</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent" /> 14K & 18K Gold</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent" /> Export Documentation</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. About Section */}
      <section id="about" className="py-16 md:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light text-primary mb-8 tracking-tight">About SARAAGO Exim</h2>
            <div className="w-px h-16 bg-accent mx-auto mb-12" />
            <p className="text-xl text-slate-500 leading-relaxed mb-8 font-light">
              SARAAGO Exim is an India-based export company focused on premium lab-grown diamond jewellery sourcing and export coordination. We work with selected jewellery manufacturing networks to help international buyers source rings, earrings, pendants, necklaces, bracelets and custom jewellery with clear specifications, professional communication and proper export documentation.
            </p>
            <p className="text-xl text-slate-500 leading-relaxed mb-8 font-light">
              Helping global buyers source jewellery from Indian manufacturing networks.
            </p>
            <p className="text-xl text-primary leading-relaxed font-medium">
              Built for long-term B2B jewellery buyers. We focus on quality, clarity and long-term business relationships. From enquiry to quotation, sample coordination, production follow-up, quality check and shipment support, our team works to keep the complete process professional and buyer-friendly.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Product Categories */}
      <section id="products" className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Product Categories</h2>
            <div className="w-16 h-1 bg-secondary mx-auto mb-6 rounded-full" />
            <p className="text-slate-600 max-w-2xl mx-auto">Export-ready jewellery sourcing with clear specifications.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: "product1", title: "Lab-Grown Diamond Rings", desc: "Solitaire rings, halo rings, engagement rings, eternity bands and custom ring designs in 14K and 18K gold.", fallback: "/img1.jpeg" },
              { id: "product2", title: "Earrings", desc: "Stud earrings, halo earrings, drop earrings and custom diamond earring designs as per buyer requirement.", fallback: "/img2.jpeg" },
              { id: "product3", title: "Pendants & Necklaces", desc: "Everyday pendants, solitaire pendants, tennis necklaces and custom necklace designs for international buyers.", fallback: "/img3.jpeg" },
              { id: "product4", title: "Bracelets", desc: "Tennis bracelets, lightweight bracelets and premium custom bracelet designs based on diamond quality, metal purity and design.", fallback: "/img4.jpeg" },
              { id: "product5", title: "Custom Jewellery", desc: "Buyers can share reference images, CAD designs or sample requirements. We coordinate custom jewellery development with manufacturing partners.", fallback: "/img1.jpeg" },
            ].map((prod, i) => (
              <div key={i} className="bg-white group cursor-pointer border border-transparent hover:border-secondary/30 transition-all duration-300 shadow-sm hover:shadow-xl rounded-sm overflow-hidden block">
                <div className="h-64 overflow-hidden">
                  <img src={images?.[prod.id] || prod.fallback} alt={prod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-xl font-bold text-primary mb-3">{prod.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{prod.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3.5 Featured Products (Dynamic from Admin) */}
      {products && products.length > 0 && (
        <section id="featured-products" className="py-16 md:py-24 bg-white border-t border-slate-200">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Latest Collections</h2>
              <div className="w-16 h-1 bg-secondary mx-auto mb-6 rounded-full" />
              <p className="text-slate-600 max-w-2xl mx-auto">Explore our newest export-ready jewellery designs added by our team.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((prod: any) => (
                <a href={`/products/${prod.slug || prod.id}`} key={prod.id} className="bg-slate-50 group cursor-pointer border border-slate-100 hover:border-secondary/30 transition-all duration-300 shadow-sm hover:shadow-xl rounded-[2rem] overflow-hidden flex flex-col">
                  <div className="h-72 overflow-hidden bg-white p-4">
                    <img src={(prod.images && prod.images[0]) ? prod.images[0] : "/img1.jpeg"} alt={prod.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 rounded-xl" />
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-extrabold text-secondary bg-secondary/10 px-3 py-1 rounded-full uppercase tracking-tighter">
                        {prod.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-primary mb-3 leading-tight">{prod.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-6 flex-grow">{prod.shortDescription}</p>
                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest group-hover:text-secondary transition-colors mt-auto">
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
        </div>
      </section>
      )}

      {/* 4. Product Specification Format */}
      <section className="py-16 md:py-20 bg-primary text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Standard Product Specifications</h2>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
          </div>
          <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-sm p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
              {[
                { label: "Product Type", value: "Lab-Grown Diamond Jewellery" },
                { label: "Diamond Type", value: "CVD / HPHT Lab-Grown Diamond" },
                { label: "Carat", value: "As per buyer requirement" },
                { label: "Colour", value: "D / E / F / G / H options available" },
                { label: "Clarity", value: "VVS / VS / SI options available" },
                { label: "Cut", value: "Excellent / Very Good" },
                { label: "Metal", value: "14K / 18K Gold" },
                { label: "Gold Colour", value: "Yellow Gold / White Gold / Rose Gold" },
                { label: "Certification", value: "IGI / GIA / As per buyer requirement" },
                { label: "Customization", value: "Available" },
                { label: "MOQ", value: "Based on design, product type and order value" },
                { label: "Packaging", value: "Export-ready packaging as per buyer requirement" },
              ].map((spec, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-start py-3 border-b border-white/10 last:border-0">
                  <span className="text-accent font-semibold w-1/2 sm:w-1/3 mb-1 sm:mb-0">{spec.label}</span>
                  <span className="text-white/90 w-full sm:w-2/3">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Why Choose SARAAGO Exim</h2>
            <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { title: "Quality-Focused Sourcing", desc: "We coordinate with selected jewellery manufacturing networks to source products as per buyer specifications.", icon: Gem },
              { title: "Clear Product Specifications", desc: "Diamond carat, colour, clarity, cut, metal purity, gold colour, certification and finishing details are clearly confirmed.", icon: FileCheck },
              { title: "Custom Design Support", desc: "Buyers can share reference designs, CAD files, photos or sample requirements for custom jewellery development.", icon: Diamond },
              { title: "Professional Documentation", desc: "We support quotation, proforma invoice, commercial invoice, packing list and shipment coordination details.", icon: FileCheck },
              { title: "Transparent Communication", desc: "Clear communication from enquiry to shipment. Our team keeps buyers updated from enquiry to sample, production, quality check and dispatch.", icon: MessageCircle },
              { title: "India Jewellery Advantage", desc: "India has strong jewellery manufacturing capability, skilled craftsmanship and competitive sourcing options for international buyers.", icon: Globe2 },
            ].map((feat, i) => (
              <div key={i} className="flex flex-col gap-6 items-start p-10 bg-white border border-slate-100 hover:border-accent/40 hover:shadow-2xl transition-all duration-500 group">
                <div className="p-4 bg-muted text-primary group-hover:bg-primary group-hover:text-accent transition-colors duration-500 rounded-none border border-slate-200 group-hover:border-accent">
                  <feat.icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-medium text-xl text-primary mb-3 tracking-wide">{feat.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Quality & Certification */}
      <section id="quality" className="py-16 md:py-24 bg-muted border-t border-slate-200">
        <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Quality & Certification</h2>
            <div className="w-16 h-1 bg-secondary mb-8 rounded-full" />
            <p className="text-slate-600 leading-relaxed mb-6">
              Each jewellery order is handled with attention to diamond specifications, metal purity, finishing, stone setting, certification and packaging requirements.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              Based on buyer demand, lab-grown diamonds can be supplied with recognized certification such as <strong>IGI, GIA</strong> or equivalent laboratory certification.
            </p>
            <ul className="space-y-4">
              {[
                "Diamond type: CVD / HPHT",
                "Carat weight, colour grade, clarity grade and cut grade",
                "Metal purity: 14K / 18K gold",
                "Gold colour: Yellow / White / Rose",
                "Certificate requirement",
                "Product weight, stone setting, finishing and polish",
                "Packaging requirement and export documentation"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-primary font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              <img src={images?.quality1 || "/img1.jpeg"} alt="Jewellery inspection" className="rounded-sm w-full h-48 object-cover" />
              <img src={images?.quality2 || "/img2.jpeg"} alt="Diamond certificate" className="rounded-sm w-full h-48 object-cover mt-8" />
              <img src={images?.quality3 || "/img3.jpeg"} alt="Jewellery packaging" className="rounded-sm w-full h-48 object-cover" />
              <img src={images?.quality4 || "/img4.jpeg"} alt="Export shipment" className="rounded-sm w-full h-48 object-cover mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Export Process */}
      <section id="export-process" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Export Process</h2>
            <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 md:-ml-px hidden md:block" />
            
            <div className="space-y-12 relative">
              {[
                { step: "01", title: "Buyer Enquiry", desc: "Buyer shares product requirement, reference image, quantity, destination country and target specifications." },
                { step: "02", title: "Requirement Confirmation", desc: "We confirm product category, diamond quality, metal purity, design, size, certificate, packaging and delivery expectations." },
                { step: "03", title: "Quotation", desc: "A clear quotation is shared with product details, price basis and production timeline." },
                { step: "04", title: "CAD / Sample Approval", desc: "For custom designs, CAD or sample approval is taken before production starts." },
                { step: "05", title: "Production Coordination", desc: "The order is coordinated with selected manufacturing partners as per confirmed specifications." },
                { step: "06", title: "Quality Check & Documentation", desc: "Product details are checked and export documents are prepared as per shipment requirement." },
                { step: "07", title: "Shipping Support", desc: "Shipment is coordinated through suitable courier or logistics channels based on buyer location and order type." }
              ].map((process, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-start md:items-center gap-6 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:text-left md:pl-12' : 'md:text-right md:pr-12'}`}>
                    <h4 className="text-xl font-bold text-primary mb-2 flex items-center gap-4 md:inline-flex">
                      <span className="md:hidden bg-secondary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0">{process.step}</span>
                      {process.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed">{process.desc}</p>
                  </div>
                  <div className="hidden md:flex absolute left-1/2 -ml-6 w-12 h-12 bg-white border-4 border-secondary text-primary font-bold rounded-full items-center justify-center z-10 shadow-md">
                    {process.step}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Founder Section */}
      <section className="py-16 md:py-24 bg-primary text-white border-b-8 border-secondary">
        <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex justify-center lg:justify-end">
            <div className="relative p-2 bg-white/10 rounded-sm w-full max-w-[260px] h-[320px] md:max-w-xs md:h-96">
              {/* Founder Image Placeholder */}
              <img 
                src={images?.founder || "/founder.jpg"} 
                alt="Sunil Kumar - Founder" 
                className="w-full h-full object-cover object-top rounded-sm transition-all duration-500"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Founder's Message</h2>
            <div className="w-16 h-1 bg-accent mb-8 rounded-full" />
            <div className="bg-white/5 p-8 border-l-4 border-accent rounded-sm">
              <p className="text-lg text-white/90 leading-relaxed italic mb-6">
                "At SARAAGO Exim, our focus is to build a reliable export brand from India with honesty, clarity and professional service.
              </p>
              <p className="text-lg text-white/90 leading-relaxed italic mb-8">
                We understand that international buyers need correct product details, timely communication and trustworthy coordination. Our aim is to create long-term business relationships by keeping the process clear from enquiry to delivery."
              </p>
              <div>
                <p className="text-xl font-bold text-white mb-1">Sunil Kumar</p>
                <p className="text-accent font-medium uppercase tracking-wider text-sm">Founder, SARAAGO Exim</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Buyer Enquiry Call-to-action */}
      <section className="py-16 md:py-20 bg-primary text-white border-b-4 border-secondary text-center">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-light mb-6">Looking for Lab-Grown Diamond Jewellery from India?</h2>
          <p className="text-white/80 text-lg md:text-xl font-light max-w-3xl mx-auto mb-10">
            Share your product requirement and our team will help you with specifications, quotation, sourcing coordination and export process support.
          </p>
          <div className="flex justify-center">
            <a href="#contact" className="bg-accent text-primary px-10 py-4 font-medium uppercase tracking-wider hover:bg-white transition-colors text-sm shadow-xl">
              Start Your Enquiry
            </a>
          </div>
        </div>
      </section>

      {/* 10. Contact Form */}
      <section id="contact" className="py-16 md:py-24 bg-muted relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Image Section */}
            <div className="hidden lg:block">
              <img 
                src={images?.contactForm || "/img3.jpeg"} 
                alt="Send Us Your Requirements" 
                className="w-full h-full object-cover rounded-sm shadow-xl"
              />
            </div>
            {/* Form Section */}
            <div className="bg-white p-6 sm:p-8 shadow-xl border border-slate-100 w-full">
              <div className="text-center mb-10">
                <h3 className="text-2xl font-bold text-primary mb-2">Send Us Your Requirements</h3>
                <div className="w-12 h-1 bg-secondary mx-auto" />
              </div>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary">Name <span className="text-red-500">*</span></label>
                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary">Company Name</label>
                <input type="text" name="company" value={formData.company} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all" placeholder="Your Company" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary">Country <span className="text-red-500">*</span></label>
                <input required type="text" name="country" value={formData.country} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all" placeholder="Destination Country" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary">Email <span className="text-red-500">*</span></label>
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all" placeholder="your@email.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary">WhatsApp Number <span className="text-red-500">*</span></label>
                <input required type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all" placeholder="With country code" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary">Product Category</label>
                <select name="productCategory" value={formData.productCategory} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all">
                  <option value="">Select Category</option>
                  <option value="Rings">Rings</option>
                  <option value="Earrings">Earrings</option>
                  <option value="Pendants">Pendants / Necklaces</option>
                  <option value="Bracelets">Bracelets</option>
                  <option value="Custom">Custom Jewellery</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary">Quantity</label>
                <input type="text" name="quantity" value={formData.quantity} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all" placeholder="e.g. 50 pieces" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary">Target Price (Optional)</label>
                <input type="text" name="targetPrice" value={formData.targetPrice} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all" placeholder="USD" />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-primary">Diamond Requirement</label>
                <input type="text" name="diamondReq" value={formData.diamondReq} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all" placeholder="e.g. CVD, 1 Carat, VVS, E color" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary">Metal Requirement</label>
                <input type="text" name="metalReq" value={formData.metalReq} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all" placeholder="e.g. 14K White Gold" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary">Certification Requirement</label>
                <select name="certReq" value={formData.certReq} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all">
                  <option value="">Any</option>
                  <option value="IGI">IGI</option>
                  <option value="GIA">GIA</option>
                  <option value="Other">Other Equivalent</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-primary">Message & Reference Links</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} rows={4} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all" placeholder="Share any specific requirements or links to reference images" />
              </div>

              <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <button type="submit" className="bg-primary text-white px-12 py-5 font-medium tracking-wider uppercase text-sm hover:bg-secondary transition-all flex items-center justify-center gap-3">
                  <Send className="w-4 h-4" />
                  Request Quotation
                </button>
                <a href="https://wa.me/919610114181" target="_blank" rel="noreferrer" className="bg-white border border-primary text-primary px-12 py-5 font-medium tracking-wider uppercase text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Enquiry
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

  </div>
  );
}
