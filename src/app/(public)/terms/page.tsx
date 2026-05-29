import React from "react";

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col w-full overflow-hidden font-sans pt-24 bg-white min-h-screen">
      <section className="py-16 bg-primary text-white text-center border-b-4 border-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-light mb-6">Terms of Service</h1>
          <div className="w-16 h-1 bg-accent mx-auto" />
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl prose prose-slate">
          <p className="text-slate-600 leading-relaxed mb-6">
            These Terms of Service govern your use of the SARAAGO Exim website (www.saraagoexim.com). By accessing our website and engaging with our services, you agree to be bound by these terms.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-12 mb-4">1. Export Coordination Services</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            SARAAGO Exim acts as an export coordinator and sourcing partner for lab-grown diamond jewellery from India. All product specifications, CAD designs, and manufacturing timelines will be agreed upon formally via Quotation or Proforma Invoice prior to order execution.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-12 mb-4">2. Quotations and Pricing</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Prices provided in our quotations are valid only for the specified period and are subject to change based on international diamond and gold market fluctuations until a formal order is confirmed and advance payment is received.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-12 mb-4">3. Intellectual Property</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            All content, including text, graphics, logos, and images on this site, is the property of SARAAGO Exim or its content suppliers and is protected by international copyright laws. Custom CAD designs shared by buyers remain their intellectual property and will not be shared or replicated for other clients.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-12 mb-4">4. Limitation of Liability</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            SARAAGO Exim shall not be liable for any direct, indirect, incidental, consequential or special damages arising out of or in any way connected with your access to or use of our website or export services, beyond the scope of any formal purchase agreements.
          </p>
        </div>
      </section>
    </div>
  );
}
