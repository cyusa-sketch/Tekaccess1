import ceoImage from "@/assets/ceo.jpg";

const CeoSection = () => {
  const milestones = [
    { year: "2018", role: "Founded TekAccess Ltd" },
    { year: "2019", role: "Expanded to East Africa" },
    { year: "2021", role: "Launched Green Logistics Initiative" },
    { year: "2023", role: "Achieved Carbon Neutral Operations" },
    { year: "2024", role: "Regional Expansion & Growth" },
  ];

  return (
    <section id="ceo" className="relative py-24 overflow-hidden">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background to-muted/20" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <div className="mb-4">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            CEO
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* CEO Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
              {/* Background decorative card */}
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl" />
              
              {/* Main image container */}
              <div className="relative glass-card overflow-hidden rounded-2xl h-full">
                <img
                  src={ceoImage}
                  alt="CEO - TekAccess"
                  className="w-full h-full object-cover object-top"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass-card px-6 py-3 rounded-full shadow-lg">
                <span className="text-sm font-semibold text-foreground">
                  Founder & CEO
                </span>
              </div>
            </div>
          </div>

          {/* CEO Info */}
          <div className="lg:pl-8">
            {/* Name and Title */}
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Chief Executive Officer
              </h2>
              <p className="text-lg text-muted-foreground">
                Visionary Leader & Industry Pioneer
              </p>
            </div>

            {/* Quote / Message */}
            <div className="glass-card p-6 rounded-xl mb-8 border-l-4 border-primary">
              <p className="text-muted-foreground italic leading-relaxed">
                "At TekAccess, we believe that sustainable logistics isn't just good for the planet—it's good for business. Our mission is to revolutionize the way goods move across Africa and beyond, creating value for our clients while protecting our environment for future generations."
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Journey & Milestones
              </h3>
              <div className="space-y-3">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 group"
                  >
                    <span className="w-16 text-sm font-bold text-primary shrink-0">
                      {milestone.year}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-primary/50 group-hover:bg-primary transition-colors shrink-0" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {milestone.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education / Credentials */}
            <div className="mt-8 pt-6 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Education:</span>{" "}
                MBA in Supply Chain Management, Business Administration & Strategic Leadership
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CeoSection;
