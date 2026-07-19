import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

import Hero from "../components/home/Hero";
import Feature from "../components/home/Feature";
import HowItWorks from "../components/home/HowItWorks";
import CTASection from "../components/home/CTASection";

const Home = () => {
  return (
    <>
      <Navbar />

      <Hero />

      <Feature />

      <HowItWorks />

      <CTASection />

      <Footer />
    </>
  );
};

export default Home;
