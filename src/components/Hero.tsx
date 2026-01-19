import { useState, useEffect } from "react";
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import heroBg1 from "@/assets/hero-bg.jpg";
import heroBg2 from "@/assets/hero-bg-2.jpg";
import heroBg3 from "@/assets/hero-bg-3.jpg";
import heroBg4 from "@/assets/hero-bg-4.jpg";
import heroBg5 from "@/assets/hero-bg-5.jpg";
import heroBg6 from "@/assets/hero-bg-6.jpg";
import heroBg7 from "@/assets/hero-bg-7.jpg";
const heroImages = [heroBg1, heroBg2, heroBg3, heroBg4, heroBg5, heroBg6, heroBg7];
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % heroImages.length);
  };
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + heroImages.length) % heroImages.length);
  };
  return <section id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"}`}>
            <img src={image} alt={`Logistics background ${index + 1}`} className="h-full w-full object-cover" />
          </div>)}
        {/* Overlay gradient - lighter to show images clearly */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-transparent dark:from-background/85 dark:via-background/60 dark:to-background/20" />
      </div>

      {/* Slide Navigation Arrows */}
      
      

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {heroImages.map((_, index) => <button key={index} onClick={() => goToSlide(index)} className={`h-2 transition-all duration-300 rounded-full ${index === currentSlide ? "w-8 bg-primary" : "w-2 bg-foreground/30 hover:bg-foreground/50"}`} aria-label={`Go to slide ${index + 1}`} />)}
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center px-3 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl w-full">
          <div className="max-w-2xl">
            {/* Glass card for content */}
            <div className="glass-card p-5 sm:p-8 lg:p-12 animate-fade-in">
              {/* Badge */}
              <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 border border-primary/20">
                <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 animate-pulse rounded-full bg-primary" />
                <span className="text-xs sm:text-sm font-medium text-primary">
                  Where Sustainability meets Style
                </span>
              </div>

              {/* Heading */}
              <h1 className="mb-4 sm:mb-6 text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
                <span className="gradient-text">Green solutions</span>
                <br />
                <span className="text-foreground">for a </span>
                <span className="text-foreground">sustainable,</span>
                <br />
                <span className="gradient-text">efficient</span>
                <span className="text-foreground"> future</span>
              </h1>

              {/* Description */}
              <p className="mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                We deliver green logistics solutions that prioritize efficiency
                and sustainability. From eco-friendly shipping to optimized
                supply chain management.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button onClick={() => scrollToSection("#contact")} className="gradient-btn flex items-center justify-center gap-2 text-sm sm:text-base">
                  Discover Our Services
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                <button onClick={() => scrollToSection("#about")} className="glass-card flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 font-medium text-foreground transition-all duration-300 hover:bg-foreground/5 text-sm sm:text-base">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary/10">
                    <Play className="h-3 w-3 sm:h-4 sm:w-4 text-primary fill-primary" />
                  </div>
                  Learn More
                </button>
              </div>
            </div>

            {/* Stats below the card */}
            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-4">
              {[{
              value: "500+",
              label: "Clients Served"
            }, {
              value: "150+",
              label: "Countries"
            }, {
              value: "99%",
              label: "Satisfaction"
            }].map((stat, index) => <div key={index} className="glass-card p-2.5 sm:p-4 text-center animate-fade-in" style={{
              animationDelay: `${(index + 1) * 150}ms`
            }}>
                  <div className="text-lg sm:text-2xl lg:text-3xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="glass-card h-12 w-7 rounded-full p-1">
          <div className="h-3 w-full rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>;
};
export default Hero;