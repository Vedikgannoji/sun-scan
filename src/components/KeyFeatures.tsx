import { motion } from "framer-motion";
import { Zap, Target, Cloud, FileDown } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Fast",
    description: "Get instant solar potential calculations in seconds, not days.",
  },
  {
    icon: Target,
    title: "Accurate",
    description: "AI-powered analysis ensures precise irradiance measurements.",
  },
  {
    icon: Cloud,
    title: "Cloud-Based",
    description: "Access your data anywhere, anytime from any device.",
  },
  {
    icon: FileDown,
    title: "Downloadable",
    description: "Export professional PIV dashboards in PDF or CSV format.",
  },
];

const KeyFeatures = () => {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Key Features</h2>
          <p className="text-lg text-muted-foreground">
            Everything you need for accurate solar estimation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-medium transition-smooth">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
