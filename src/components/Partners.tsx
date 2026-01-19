import cheetahLogo from "@/assets/partners/cheetah.jpg";
import chubLogo from "@/assets/partners/chub.webp";
import chukLogo from "@/assets/partners/chuk.webp";
import edclLogo from "@/assets/partners/edcl.webp";
import gatsiboLogo from "@/assets/partners/gatsibo.webp";
import nyaruguruLogo from "@/assets/partners/nyaruguru.webp";
import rabLogo from "@/assets/partners/rab.webp";
import remaLogo from "@/assets/partners/rema.webp";
import rnpLogo from "@/assets/partners/rnp.png";
import "@/styles/marquee.css";

const Partners = () => {
  const partners = [
    { name: "Cheetah", logo: cheetahLogo },
    { name: "CHUB", logo: chubLogo },
    { name: "CHUK", logo: chukLogo },
    { name: "EDCL", logo: edclLogo },
    { name: "Gasabo District", logo: gatsiboLogo },
    { name: "Nyaruguru", logo: nyaruguruLogo },
    { name: "RAB", logo: rabLogo },
    { name: "REMA", logo: remaLogo },
    { name: "Rwanda National Police", logo: rnpLogo },
  ];

  // Double the partners for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="section-partners relative px-4 py-16 sm:py-20 overflow-hidden bg-muted/30">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-gradient-to-tl from-accent/5 to-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 sm:mb-12 text-center">
          <h2 className="relative mb-4 inline-block text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            <span className="text-foreground">Our Trusted </span>
            <span className="gradient-text">Partners</span>
            <span className="section-underline" />
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground px-4">
            We're proud to work with leading organizations across Rwanda
          </p>
        </div>

        {/* Marquee Container */}
        <div className="marquee-container">
          <div className="marquee-track">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={index}
                className="marquee-item group flex items-center justify-center p-4 sm:p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg bg-background/80 backdrop-blur-sm"
              >
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="max-h-16 sm:max-h-20 lg:max-h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
