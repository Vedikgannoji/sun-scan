import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download, FileText, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  // Mock data for past estimations
  const estimations = [
    {
      id: 1,
      date: "2024-01-15",
      address: "123 Solar Street, CA 90210",
      irradiance: "5.2 kWh/m²/day",
      capacity: "8.4 kW"
    },
    {
      id: 2,
      date: "2024-01-10",
      address: "456 Green Avenue, CA 90211",
      irradiance: "4.8 kWh/m²/day",
      capacity: "7.2 kW"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 px-6 pb-16">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-bold mb-2">Welcome back, User 👋</h1>
            <p className="text-xl text-muted-foreground">
              Your solar estimation dashboard
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Link to="/estimate">
              <Button variant="hero" size="lg">
                <Plus className="w-5 h-5 mr-2" />
                New Estimation
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Past Estimations</h2>
            <div className="grid gap-6">
              {estimations.map((est, idx) => (
                <motion.div
                  key={est.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                >
                  <Card className="p-6 shadow-soft hover:shadow-medium transition-smooth">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <FileText className="w-6 h-6 text-primary" />
                          <div>
                            <h3 className="font-semibold text-lg">{est.address}</h3>
                            <p className="text-sm text-muted-foreground">
                              Estimated on {est.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-6 text-sm">
                          <div>
                            <span className="text-muted-foreground">Irradiance: </span>
                            <span className="font-medium">{est.irradiance}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Capacity: </span>
                            <span className="font-medium">{est.capacity}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          PDF
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Excel
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
