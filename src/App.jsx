import { Outlet } from "react-router-dom";
import Navbar from "./CommenComponents/Navbar";
import Header from "./CommenComponents/Header";
import Footer from "./CommenComponents/Footer";
import "./index.css";

import ScrollToTop from "./CommenComponents/ScrollToTop";
import ScrollNavigator from "./CommenComponents/ScrollNavigator";
import Loader from "./CommenComponents/Loader";
import FloatingActions from "./CommenComponents/FloatingActions";
import TopHeader from "./CommenComponents/TopHeader";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const [transition, setTransition] = useState(false);

  useEffect(() => {
    setTransition(true);

    const timer = setTimeout(() => {
      setTransition(false);
    }, 900);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <TopHeader />
      <Navbar />
      <ScrollToTop />
      <ScrollNavigator />
      <main className="flex-grow relative">
        <>
          <AnimatePresence>
            {transition && (
              <>
                {/* Left Curtain */}
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: "-100%" }}
                  exit={{ x: "-100%" }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  className="fixed top-0 left-0 w-1/2 h-screen bg-[#0c5940] z-[9999]"
                />

                {/* Right Curtain */}
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: "100%" }}
                  exit={{ x: "100%" }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  className="fixed top-0 right-0 w-1/2 h-screen bg-[#0c5940] z-[9999]"
                />
              </>
            )}
          </AnimatePresence>

          <Outlet key={location.pathname} />
        </>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

export default App;