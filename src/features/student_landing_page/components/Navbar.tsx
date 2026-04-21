import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo.svg";
import { useState, useEffect } from "react";

interface NavbarProps {
    onApplyClick: () => void;
}

const Navbar = ({ onApplyClick }: NavbarProps) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm border-b border-border/50" : "bg-transparent"}`}>
            <div className="section-container">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                        <img src={Logo} alt="PhysioMantra" className="h-10 sm:h-12" />
                        <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-foreground">PhysioMantra</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:gap-6">
                        <button
                            onClick={() => scrollToSection("earnings")}
                            className="hidden md:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Earnings
                        </button>
                        <button
                            onClick={() => scrollToSection("how-it-works")}
                            className="hidden md:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Our Process
                        </button>
                        <button
                            onClick={() => scrollToSection("faq")}
                            className="hidden md:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            FAQ
                        </button>
                        <Button
                            onClick={onApplyClick}
                            className="premium-button font-bold rounded-lg px-6"
                        >
                            Apply Now
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
