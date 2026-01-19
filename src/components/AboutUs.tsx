import { TrendingUp, CheckCircle } from "lucide-react";
import aboutTruckLoading from "@/assets/about-truck-loading.jpg";
import aboutMaterials from "@/assets/about-materials.jpg";
const AboutUs = () => {
  const stats = [
    { value: "250+", label: "Projects Completed" },
    { value: "410+", label: "Happy Customers" },
  ];

  return (
    <section id="about" className="relative overflow-hidden">
      {/* Hero Section - Dark background with image */}
      <div className="relative bg-foreground text-background py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-primary/10 blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-1/4 h-1/3 bg-primary/5 blur-[80px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6">
                  About <span className="text-primary">Us</span>
                </h2>
                <div className="w-16 sm:w-24 h-1 bg-primary mb-6 sm:mb-8 mx-auto lg:mx-0" />
              </div>
              
              <p className="text-background/70 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                With over 15 years of experience in logistics and supply chain management, 
                we've built a reputation for reliability, efficiency, and customer 
                satisfaction. Our dedicated team works around the clock to ensure your 
                shipments arrive on time, every time.
              </p>

              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 font-semibold transition-all hover:translate-x-1 text-sm sm:text-base"
              >
                ABOUT US
                <span className="ml-2">→</span>
              </a>
            </div>

            {/* Right - Image */}
            <div className="relative order-first lg:order-last">
              <div className="relative overflow-hidden">
                <img
                  src={aboutTruckLoading}
                  alt="Truck loading materials"
                  className="w-full h-[250px] sm:h-[350px] lg:h-[500px] object-cover"
                />
                {/* Orange overlay corner */}
                <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section - Mission & Vision */}
      <div className="relative bg-muted/50 py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left - Text Content */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <div>
                <p className="text-primary font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4">
                  Our Mission
                </p>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                  Forging Success From{" "}
                  <span className="text-primary">Earth's Depths</span>
                </h3>
              </div>
              
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-lg mx-auto lg:mx-0">
                We make sure your ideas are delivered properly. Understanding that businesses 
                need reliable and affordable logistics solutions, we've created tailored 
                packages that help entrepreneurs compete with larger competitors. Our 
                flexible services grow with your business.
              </p>

              <ul className="space-y-3 sm:space-y-4 text-left max-w-md mx-auto lg:mx-0">
                {["Global shipping network", "Real-time tracking", "24/7 customer support", "Eco-friendly solutions"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>

              <a 
                href="#services" 
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 sm:px-6 py-2.5 sm:py-3 font-semibold transition-all hover:translate-x-1 text-xs sm:text-sm"
              >
                OUR SERVICES
                <span className="ml-1">→</span>
              </a>
            </div>

            {/* Right - Image */}
            <div className="relative order-first lg:order-last">
              <div className="relative overflow-hidden border-2 sm:border-4 border-border/30">
                <img
                  src={aboutMaterials}
                  alt="Construction materials"
                  className="w-full h-[250px] sm:h-[350px] lg:h-[450px] object-cover"
                />
              </div>
              {/* Orange accent */}
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Third Section - Dark with content and stats */}
      <div className="relative bg-foreground text-background py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        {/* Background image overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${aboutMaterials})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/95 to-foreground/80" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left - Image */}
            <div className="relative hidden lg:block">
              <img
                src={aboutTruckLoading}
                alt="Truck loading operations"
                className="w-full h-[450px] object-cover"
              />
            </div>

            {/* Right - Content */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <div>
                <p className="text-primary font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4">
                  Why Choose Us
                </p>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-background mb-4 sm:mb-6">
                  From Roots To Riches,{" "}
                  <span className="text-primary">Unveiling Our Odyssey</span>
                </h3>
              </div>
              
              <p className="text-background/70 leading-relaxed text-sm sm:text-base max-w-lg mx-auto lg:mx-0">
                Making an impact together. We empower small business owners with 
                affordable and reliable logistics solutions. Our commitment to 
                excellence has helped hundreds of businesses grow and succeed.
              </p>

              {/* Stats */}
              <div className="flex gap-6 sm:gap-8 pt-2 sm:pt-4 justify-center lg:justify-start">
                {stats.map((stat, index) => (
                  <div key={index} className="space-y-1">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-background/60 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-2 sm:pt-4 justify-center lg:justify-start">
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 sm:px-6 py-2.5 sm:py-3 font-semibold transition-all hover:translate-x-1 text-xs sm:text-sm"
                >
                  GET STARTED
                  <span className="ml-1">→</span>
                </a>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-background/10 border border-background/20">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-base sm:text-lg font-bold text-background">15+</div>
                    <div className="text-[10px] sm:text-xs text-background/60">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
