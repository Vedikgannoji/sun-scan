import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import KeyFeatures from "@/components/KeyFeatures";
import LoginCTA from "@/components/LoginCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <KeyFeatures />
      <LoginCTA />
      <Footer />
    </div>
  );
};

export default Index;
