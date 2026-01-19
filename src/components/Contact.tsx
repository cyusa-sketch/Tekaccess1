import { Mail, Phone, MapPin, Send, User, MessageSquare, Building2 } from "lucide-react";
import { useState } from "react";
import locationImage from "@/assets/location.jpg";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return <section id="contact" className="section-contact relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden">
      {/* Unique background - Wave/aurora effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
        {/* Aurora waves */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden">
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] rounded-full bg-gradient-to-t from-primary/10 to-transparent blur-3xl transform rotate-12" />
          <div className="absolute bottom-10 right-1/4 w-[400px] h-[250px] rounded-full bg-gradient-to-t from-accent/10 to-transparent blur-3xl transform -rotate-12" />
          <div className="absolute bottom-20 left-1/2 w-[600px] h-[200px] rounded-full bg-gradient-to-t from-blue-500/5 to-transparent blur-3xl" />
        </div>
        {/* Top corner accent */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-primary/5 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="relative mb-4 inline-block text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-foreground">Contact </span>
            <span className="gradient-text">Us</span>
            <span className="section-underline" />
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Get in touch with our team for customized logistics solutions
          </p>
        </div>

        <div className="glass-card overflow-hidden border-2 border-primary/10">
          <div className="grid lg:grid-cols-2">
            {/* Map / Visual Side */}
            <div className="relative min-h-[400px] bg-gradient-to-br from-muted/50 to-muted overflow-hidden">
              {/* Embedded Map Placeholder with Glass Effect */}
              <div className="absolute inset-0">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3296.9526347545684!2d30.100397673996817!3d-1.9552070367210403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca7173e3331f3%3A0xdd65098bb9fbd168!2sTekaccess%20Ltd%20Headquarters!5e1!3m2!1sen!2smu!4v1768061167506!5m2!1sen!2smu" width="100%" height="100%" style={{
                border: 0
              }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="grayscale opacity-80 dark:opacity-50" />
                {/* Glass overlay on map */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Map Pin Indicator */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center shadow-lg animate-bounce">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-4 w-4 rotate-45 bg-primary" />
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="p-8 sm:p-12">
              <h3 className="mb-6 text-2xl font-bold text-foreground">
                Send us a message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="relative">
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="w-full rounded-xl border border-border/50 bg-background/50 py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" required />
                  </div>
                </div>

                {/* Email Input */}
                <div className="relative">
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="w-full rounded-xl border border-border/50 bg-background/50 py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" required />
                  </div>
                </div>

                {/* Message Input */}
                <div className="relative">
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                    Your Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your logistics needs..." rows={4} className="w-full resize-none rounded-xl border border-border/50 bg-background/50 py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" required />
                  </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="gradient-btn w-full flex items-center justify-center gap-2">
                  <Send className="h-5 w-5" />
                  Send Now
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info Bar */}
          <div className="border-t border-border/50 bg-muted/30">
            <div className="grid grid-cols-1 divide-y divide-border/50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[{
              icon: Phone,
              label: "WhatsApp",
              value: "+250 788 326 686",
              href: "https://wa.me/250788326686"
            }, {
              icon: Mail,
              label: "Email",
              value: "info@tekaccess.com",
              href: "mailto:info@tekaccess.com"
            }, {
              icon: MapPin,
              label: "Location",
              value: "Kigali, Rwanda",
              href: "https://maps.app.goo.gl/Wt95MviiuQpWtfgp7"
            }].map((item, index) => {})}
            </div>
          </div>
        </div>

        {/* Office Location Image Card */}
        <div className="mt-12 glass-card overflow-hidden border-2 border-primary/10">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative group overflow-hidden">
              <img src={locationImage} alt="TekAccess Office Location" className="w-full h-full min-h-[300px] lg:min-h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/80 lg:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent lg:hidden" />
              
              {/* Floating badge */}
              <div className="absolute top-4 left-4 glass-card px-4 py-2 flex items-center gap-2 border border-white/20">
                <Building2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Our Headquarters</span>
              </div>
            </div>

            {/* Info Side */}
            <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-background via-background to-primary/5">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Visit Our <span className="gradient-text">Office</span>
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Located in the heart of Kigali, our modern facility is equipped to handle all your logistics needs. 
                Drop by to discuss how we can help streamline your supply chain operations.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Address</h4>
                    <p className="text-sm text-muted-foreground">Kigali, Rwanda</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Phone</h4>
                    <p className="text-sm text-muted-foreground">+250 788 326 686 / +250 788 320 200</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email</h4>
                    <p className="text-sm text-muted-foreground">info@tekaccess.rw</p>
                  </div>
                </div>
              </div>

              <a href="https://maps.app.goo.gl/Wt95MviiuQpWtfgp7" target="_blank" rel="noopener noreferrer" className="gradient-btn mt-8 inline-flex items-center justify-center gap-2 w-fit">
                <MapPin className="h-4 w-4" />
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;