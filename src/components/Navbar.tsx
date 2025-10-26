import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-smooth ${
        isScrolled ? "bg-background shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          SunScan
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-white hover:text-white/80 transition-smooth">
            Home
          </Link>
          <Link to="/auth">
            <Button size="sm">Login</Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
