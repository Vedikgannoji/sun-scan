import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">SunScan</h3>
            <p className="text-primary-foreground/80">
              Empowering clean energy decisions through AI-powered solar potential estimation.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/estimate" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Estimate
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-primary-foreground/80">
            © 2024 SunScan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
