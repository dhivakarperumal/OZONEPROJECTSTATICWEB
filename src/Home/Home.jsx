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
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
    >
      <AnimatePresence>
        {loading && (
          <>
            {/* Left Curtain */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.8 }}
              className="fixed top-0 left-0 w-1/2 h-screen bg-[#0c5940]/30 z-[9999]"
            />

            {/* Right Curtain */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "100%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8 }}
              className="fixed top-0 right-0 w-1/2 h-screen bg-[#08124E]/30 z-[9999]"
            />
          </>
        )}
      </AnimatePresence>
      <Hero />
      <HomeAbout />
      {/* <OfferBanner /> */}
      <HomeProducts />
      <HomeFeatures />
      <HomeStats />
      <HomeServices />
      <HomeGallery />
      <InstagramReels />
      <HomeFAQ />
      <HomeReviews />
      {/* <CompanyLogos /> */}
    </motion.div>
  )
}

export default Home
