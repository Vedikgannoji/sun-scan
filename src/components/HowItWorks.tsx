import { motion } from "framer-motion";
import { MapPin, Settings, BarChart3, Download } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MapPin,
    title: "Select Area on Map",
    description: "Choose your rooftop or site location",
  },
  {
    number: "02",
    icon: Settings,
    title: "Choose Configuration",
    description: "Set your solar panel preferences",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "View Power Potential",
    description: "See calculated energy generation",
  },
  {
    number: "04",
    icon: Download,
    title: "Download Report",
    description: "Get your professional PIV dashboard",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">
            Four simple steps to unlock your solar potential
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-sm font-bold text-primary mb-2">{step.number}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-primary/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
