import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import EstimatePreview from "@/components/EstimatePreview";
import DashboardPreview from "@/components/DashboardPreview";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <EstimatePreview />
      <DashboardPreview />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
