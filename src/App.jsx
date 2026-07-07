import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./CommenComponents/Navbar";
import Footer from "./CommenComponents/Footer";
import "./index.css";

import ScrollToTop from "./CommenComponents/ScrollToTop";
import ScrollNavigator from "./CommenComponents/ScrollNavigator";
import Loader from "./CommenComponents/Loader";
import FloatingActions from "./CommenComponents/FloatingActions";
import TopHeader from "./CommenComponents/TopHeader";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [loading] = useState(false);
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex flex-col min-h-screen"
      >
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
        >
          <TopHeader />
        </motion.div>

        <Navbar />

        <ScrollToTop />
        <ScrollNavigator />
        <main className="flex-grow relative">
          <Outlet />
        </main>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          <Footer />
        </motion.div>

        <FloatingActions />
      </motion.div>
    </AnimatePresence>
  );
}

export default App;