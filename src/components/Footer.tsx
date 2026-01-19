import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <footer className="section-footer relative mt-20 border-t border-border/50 px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
      {/* Unique background - Subtle radial gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/3 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gradient-radial from-primary/5 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img 
                src={logo} 
                alt="TekAccess Logo" 
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-muted-foreground">
              Providing innovative logistics solutions with efficiency,
              reliability, and customer satisfaction at our core.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {["#services", "#about", "#team", "#blogs", "#contact"].map((href) => (
                <button
                  key={href}
                  onClick={() => scrollToSection(href)}
                  className="text-left text-muted-foreground transition-colors hover:text-primary"
                >
                  {href.replace("#", "").charAt(0).toUpperCase() +
                    href.slice(2)}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">
              Connect With Us
            </h4>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "https://www.facebook.com/people/TekAccess-Ltd/", label: "Facebook" },
                { icon: Twitter, href: "https://twitter.com/Tekaccessltd", label: "Twitter" },
                { icon: Linkedin, href: "https://www.linkedin.com/company/tekaccess-ltd?originalSubdomain=rw", label: "LinkedIn" },
                { icon: Instagram, href: "https://www.instagram.com/tekaccessltd?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", label: "Instagram" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="glass-card flex h-10 w-10 items-center justify-center transition-all duration-300 hover:bg-primary/10 hover:border-primary/30 hover:scale-110"
                >
                  <social.icon className="h-4 w-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border/50 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} TekAccess Logistics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
