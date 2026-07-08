import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from './Hero'
import HomeAbout from './HomeAbout'
import HomeProducts from './HomeProducts'
// import OfferBanner from './OfferBanner'
import HomeFeatures from './HomeFeatures'
import HomeStats from './HomeStats'
import HomeServices from './HomeServices'
import HomeReviews from './HomeReviews'
import HomeGallery from './HomeGallery'
import HomeFAQ from './HomeFAQ'
import CompanyLogos from './CompanyLogos'
import InstagramReels from './InstagramReels'
import CategorySection from "./CategorySection";
import ServiceSwiper from "./ServiceSwiper";

const RevealSection = ({ children, direction = "up", delay = 0, className = "", id }) => {
  const directionStyles = {
    left: { opacity: 0, x: -40 },
    right: { opacity: 0, x: 40 },
    bottom: { opacity: 0, y: 40 },
    up: { opacity: 0, y: 24 },
    fadeScale: { opacity: 0, scale: 0.96 },
  };

  const targetStyles = {
    left: { opacity: 1, x: 0 },
    right: { opacity: 1, x: 0 },
    bottom: { opacity: 1, y: 0 },
    up: { opacity: 1, y: 0 },
    fadeScale: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      id={id}
      className={className}
      initial={directionStyles[direction] || directionStyles.up}
      whileInView={targetStyles[direction] || targetStyles.up}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      className="relative overflow-hidden bg-[var(--background)]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-[#38B6FF]/20 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-5rem] top-1/3 h-80 w-80 rounded-full bg-[#0c5940]/20 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -25, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-[#08124E]/15 blur-3xl"
        />
      </div>

      <AnimatePresence>
        {loading && (
          <>
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.8 }}
              className="fixed top-0 left-0 z-[9999] h-screen w-1/2 bg-white/10 backdrop-blur-xl"
            />

            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "100%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8 }}
              className="fixed top-0 right-0 z-[9999] h-screen w-1/2 bg-white/10 backdrop-blur-xl"
            />
          </>
        )}
      </AnimatePresence>

      <Hero />
      <CategorySection/>  
      <RevealSection id="about-section" direction="left">
        <HomeAbout />
      </RevealSection>
      {/* <OfferBanner /> */}
      <RevealSection direction="bottom">
        <HomeProducts />
      </RevealSection>
      <RevealSection direction="right">
        <ServiceSwiper />
      </RevealSection>
      <RevealSection direction="bottom">
        <HomeFeatures />
      </RevealSection>
      {/* <RevealSection direction="bottom">
        <HomeStats />
      </RevealSection> */}
      <RevealSection direction="left">
        <HomeServices />
      </RevealSection>
      <RevealSection direction="bottom">
        <HomeGallery />
      </RevealSection>
      <RevealSection direction="bottom">
        <InstagramReels />
      </RevealSection>
      <RevealSection direction="bottom">
        <HomeFAQ />
      </RevealSection>
      <RevealSection direction="fadeScale">
        <HomeReviews />
      </RevealSection>
      {/* <CompanyLogos /> */}
    </motion.div>
  )
}

export default Home
