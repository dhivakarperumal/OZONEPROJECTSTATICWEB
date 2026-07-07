import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageContainer from "../CommenComponents/PageContainer";
import PageHeader from "../CommenComponents/PageHeader";
import { services } from "../Home/HomeServices";
import * as LucideIcons from "lucide-react";

export default function Services() {

  const [loading, setLoading] = useState(true);

  const FadeIn = ({ children, delay = 0, className = "" }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setVisible(true),
        {
          threshold: 0.15,
        }
      );

      observer.observe(el);

      return () => observer.disconnect();
    }, []);

    return (
      <div
        ref={ref}
        className={`transition-all duration-700 ${className}`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transitionDelay: `${delay}ms`,
        }}
      >
        {children}
      </div>
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gray-50 pb-20"
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
      <PageHeader title="Our Services" />
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
      <PageContainer>
        <div className="py-16">
          <FadeIn delay={0}>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                Comprehensive Solutions for Your Space
              </h2>
              <p className="text-gray-600 text-lg">
                Explore our wide range of premium mosquito protection and screening services, tailored to meet your residential and commercial needs.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = LucideIcons[service.icon] || LucideIcons.Shield;

              return (
                <FadeIn key={service.id} delay={index * 80}>
                  <div key={service.id} className="relative bg-white rounded-3xl p-8 border border-gray-100/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(12,89,64,0.15)] hover:-translate-y-2 transition-all duration-500 flex flex-col group overflow-hidden">
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0c5940] to-[#38B6FF] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Background glow on hover */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#0c5940]/5 rounded-bl-full -z-10 group-hover:bg-[#0c5940]/10 transition-colors duration-500"></div>

                    {/* Header: Icon & Title */}
                    <div className="flex flex-col gap-4 mb-5">
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-[#0c5940] to-teal-700 flex items-center justify-center text-white shadow-lg shadow-[#0c5940]/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                        <IconComponent size={26} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-[#0c5940] transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Items List */}
                    <div className="mt-auto pt-5 border-t border-gray-50 flex flex-col gap-3">
                      {service.items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <LucideIcons.CheckCircle2 size={16} className="text-[#38B6FF] mt-0.5 shrink-0" />
                          <span className="text-sm font-semibold text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </PageContainer>
    </motion.div>
  );
}
