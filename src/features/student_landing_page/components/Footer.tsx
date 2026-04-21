import Logo from "@/assets/logo.svg";

const Footer = () => {
  return (
    <footer className="py-10 border-t border-border bg-secondary/30">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <img src={Logo} alt="PhysioMantra" className="h-12" />
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} PhysioMantra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
