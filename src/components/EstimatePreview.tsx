import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Upload, Sun, Zap, DollarSign } from "lucide-react";

const EstimatePreview = () => {
  return (
    <section className="py-24 px-6 bg-secondary">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Estimate Your Solar Potential Instantly
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your rooftop or site image and get estimated irradiance, capacity, 
            and cost savings instantly.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-12 border-2 border-dashed border-border hover:border-primary transition-smooth cursor-pointer">
              <div className="text-center">
                <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Upload Your Image</h3>
                <p className="text-muted-foreground mb-6">
                  Drag & drop or click to upload your rooftop image
                </p>
                <Link to="/estimate">
                  <Button variant="hero" size="lg">
                    Estimate Now
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Card className="p-6 shadow-soft">
              <div className="flex items-center gap-4">
                <Sun className="w-10 h-10 text-primary" />
                <div>
                  <h4 className="font-semibold text-lg">Solar Irradiance</h4>
                  <p className="text-muted-foreground">Average: 5.2 kWh/m²/day</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-soft">
              <div className="flex items-center gap-4">
                <Zap className="w-10 h-10 text-primary" />
                <div>
                  <h4 className="font-semibold text-lg">Energy Capacity</h4>
                  <p className="text-muted-foreground">Estimated: 8.4 kW system</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-soft">
              <div className="flex items-center gap-4">
                <DollarSign className="w-10 h-10 text-primary" />
                <div>
                  <h4 className="font-semibold text-lg">Annual Savings</h4>
                  <p className="text-muted-foreground">Projected: $1,250/year</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EstimatePreview;
