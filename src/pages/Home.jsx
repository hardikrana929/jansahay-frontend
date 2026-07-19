import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

import Hero from "../components/home/Hero";
import Feature from "../components/home/Feature";
import HowItWorks from "../components/home/HowItWorks";
import CTASection from "../components/home/CTASection";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);
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
