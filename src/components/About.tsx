import { motion } from "framer-motion";
import solarIcon from "@/assets/solar-analytics-icon.png";

const About = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              The Problem with Solar Estimation
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Traditional solar potential assessments are often inaccurate, time-consuming, and expensive. 
              Most homeowners and businesses struggle to get reliable data about their solar energy potential.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Our AI-powered platform analyzes your rooftop imagery and environmental factors to provide 
              precise, instant solar irradiance calculations—helping you make informed clean energy decisions.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img src={solarIcon} alt="Solar Analytics" className="w-full max-w-md" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
