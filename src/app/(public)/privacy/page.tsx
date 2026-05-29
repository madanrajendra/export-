import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden font-sans pt-24 bg-white min-h-screen">
      <section className="py-16 bg-primary text-white text-center border-b-4 border-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-light mb-6">Privacy Policy</h1>
          <div className="w-16 h-1 bg-accent mx-auto" />
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl prose prose-slate">
          <p className="text-slate-600 leading-relaxed mb-6">
            At SARAAGO Exim, we respect your privacy and are committed to protecting your personal data. This privacy policy informs you about how we look after your personal data when you visit our website (www.saraagoexim.com) and tell you about your privacy rights.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-12 mb-4">1. Information We Collect</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            When you submit an enquiry, request a quotation, or communicate with us, we may collect information including your name, company name, email address, WhatsApp number, country, and product requirements.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-12 mb-4">2. How We Use Your Information</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            We use the information we collect to communicate with you regarding your product requirements, provide quotations, coordinate export orders, and maintain a professional business relationship. We do not sell your personal data to third parties.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-12 mb-4">3. Data Security</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-12 mb-4">4. Contact Us</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            If you have any questions about this privacy policy or our privacy practices, please contact us at saraagoexim@gmail.com.
          </p>
        </div>
      </section>
    </div>
  );
}
