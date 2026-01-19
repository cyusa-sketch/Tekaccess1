import { Lock, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import logo from "@/assets/logo.jpg";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#team", label: "Team" },
    { href: "#blogs", label: "Blogs" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-header py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center shrink-0">
          <img 
            src={logo} 
            alt="TekAccess Logo" 
            className="h-10 w-auto sm:h-12 object-contain"
          />
        </div>

        {/* Desktop Navigation - Center */}
        <nav className="hidden items-center lg:flex flex-1 justify-center mx-4">
          <div className="glass-card flex items-center gap-0.5 rounded-full px-1.5 py-1.5">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-all duration-300 hover:bg-primary/10 hover:text-primary whitespace-nowrap"
              >
                {link.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden items-center gap-2 lg:flex shrink-0">
          <ThemeToggle />
          
          <button
            onClick={() => window.location.href = "/login.html"}
            className="portal-btn flex items-center gap-2 text-sm whitespace-nowrap"
          >
            <Lock className="h-4 w-4" />
            <span className="hidden xl:inline">Manager Portal</span>
            <span className="xl:hidden">Portal</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="theme-toggle"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-foreground" />
            ) : (
              <Menu className="h-5 w-5 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="glass-card mx-4 mt-4 rounded-2xl p-4 max-h-[60vh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="rounded-xl px-4 py-3 text-left text-sm font-medium text-foreground/80 transition-all duration-300 hover:bg-primary/10 hover:text-primary"
              >
                {link.label}
              </button>
            ))}
            <div className="my-2 h-px bg-border/50" />
            <button
              onClick={() => window.location.href = "/login.html"}
              className="portal-btn flex w-full items-center justify-center gap-2 text-sm"
            >
              <Lock className="h-4 w-4" />
              Manager Portal
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
