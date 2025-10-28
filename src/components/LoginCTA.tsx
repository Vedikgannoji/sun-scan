import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LoginCTA = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-primary/5 rounded-2xl p-12 border border-primary/10"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Create an account to save your results and access advanced features
          </p>
          <div className="flex justify-center">
            <Link to="/auth">
              <Button size="lg" variant="default">
                Get Started
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LoginCTA;
