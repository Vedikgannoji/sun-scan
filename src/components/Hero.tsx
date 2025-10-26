import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-solar-farm.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 hero-gradient" />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6"
        >
          SunScan
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/90 mb-10"
        >
          Measure Solar Potential. Empower Clean Energy Decisions.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/estimate">
            <Button variant="hero" size="lg">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </div>
      
      {/* Floating Chat Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 flex items-center gap-3 shadow-medium">
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="text-white font-medium">Ask SolarBot a Question</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
