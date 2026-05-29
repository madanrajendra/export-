"use client";

import React, { useState } from "react";
import { Mail, MapPin, Globe, MessageCircle, Send } from "lucide-react";

export default function ContactPage() {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    alert("Enquiry sent successfully!");
  };

  return (
    <div className="flex flex-col w-full overflow-hidden font-sans pt-24 bg-white min-h-screen">
      
      {/* Contact Header */}
      <section className="py-16 bg-primary text-white text-center border-b-4 border-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-light mb-6">Contact Us</h1>
          <div className="w-16 h-1 bg-accent mx-auto mb-6" />
          <p className="text-lg text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            For product enquiry, quotation or export sourcing discussion, contact our team with your product requirement and destination country.
          </p>
        </div>
      </section>

      {/* Contact Details & Form */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <h3 className="text-2xl font-bold text-primary mb-8 tracking-tight">Our Information</h3>
            
            <div className="flex items-start gap-4 p-6 bg-slate-50 border border-slate-100 rounded-sm">
              <div className="p-3 bg-white text-secondary shadow-sm">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-primary mb-1">Company</p>
                <p className="text-slate-600">SARAAGO Exim</p>
                <p className="text-slate-600 mt-2 font-semibold">Location</p>
                <p className="text-slate-600">Rajasthan, India</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-slate-50 border border-slate-100 rounded-sm">
              <div className="p-3 bg-white text-secondary shadow-sm">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-primary mb-1">Website</p>
                <a href="https://www.saraagoexim.com" className="text-slate-600 hover:text-secondary transition-colors">www.saraagoexim.com</a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-slate-50 border border-slate-100 rounded-sm">
              <div className="p-3 bg-white text-secondary shadow-sm">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-primary mb-1">Email</p>
                <a href="mailto:saraagoexim@gmail.com" className="text-slate-600 hover:text-secondary transition-colors">saraagoexim@gmail.com</a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-slate-50 border border-slate-100 rounded-sm">
              <div className="p-3 bg-white text-secondary shadow-sm">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-primary mb-1">WhatsApp</p>
                <a href="https://wa.me/919610114181" className="text-slate-600 hover:text-secondary transition-colors">+91 96101 14181</a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 shadow-2xl border border-slate-100">
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-primary mb-2">Send Us Your Requirements</h3>
                <div className="w-12 h-1 bg-secondary" />
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

                <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 justify-start mt-8">
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
