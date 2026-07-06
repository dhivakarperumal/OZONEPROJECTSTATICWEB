import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollNavigator = () => {
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowButtons(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed right-6 bottom-6 z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        showButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        className="group flex items-center justify-center w-12 h-12 bg-white border border-gray-100 text-[#0c5940] rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_25px_rgba(12,89,64,0.15)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        aria-label="Scroll to top"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0c5940] to-[#38B6FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <ArrowUp size={22} strokeWidth={2.5} className="relative z-10 transition-all duration-300 group-hover:-translate-y-1 group-hover:text-white text-[#081A59]" />
      </button>
    </div>
  );
};

export default ScrollNavigator;