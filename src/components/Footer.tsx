
const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
          <h3 className="text-xl font-bold">SunScan</h3>
          <span className="hidden md:inline text-primary-foreground/60">|</span>
          <p className="text-primary-foreground/80 text-sm md:text-base">
            Empowering clean energy decisions through AI-powered solar potential estimation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
