import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import CeoSection from "@/components/CeoSection";
import Team from "@/components/Team";
import Blogs from "@/components/Blogs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import useFirebase from "@/hooks/useFirebase";

const Index = () => {
  // Initialize Firebase using the hook
  useFirebase();

  return (
    <div className="relative min-h-screen">
      {/* Animated mesh background */}
      <div className="mesh-background" />

      {/* Main content */}
      <Header />
      <main>
        <Hero />
        <AboutUs />
        <Services />
        <Partners />
        <CeoSection />
        <Team />
        <Blogs />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
