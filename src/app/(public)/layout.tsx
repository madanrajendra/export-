import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ChatbotWidget from "@/components/public/ChatbotWidget";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <main className="flex-grow pt-24 lg:pt-28">
        {children}
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}

