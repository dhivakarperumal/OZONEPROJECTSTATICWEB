import React, { useState, useRef, useEffect } from "react";
import { Shield, Leaf, CheckCircle2, Flame, Sun, Lightbulb, Sparkles } from "lucide-react";

const features = [
  {
    id: 1,
    title: "MICROBAN",
    icon: Shield,
    description: "Lifetime protection from bacteria and fungus.",
    color: "from-blue-600 to-cyan-500",
    shadow: "shadow-blue-500/30"
  },
  {
    id: 2,
    title: "LEAD FREE",
    icon: CheckCircle2,
    description: "No lead is used in any of the Phifer screens.",
    color: "from-[#0c5940] to-teal-600",
    shadow: "shadow-[#0c5940]/30"
  },
  {
    id: 3,
    title: "ENERGY SAVING",
    icon: Sun,
    description: "Saves wind energy & allows excellent airflow.",
    color: "from-amber-400 to-orange-500",
    shadow: "shadow-amber-500/30"
  },
  {
    id: 4,
    title: "LIGHT SAVING",
    icon: Lightbulb,
    description: "Excellent outward light, screens are almost invisible.",
    color: "from-yellow-400 to-amber-500",
    shadow: "shadow-yellow-500/30"
  }
];

const FadeIn = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  
  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
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

const FeatureCard = ({ feature, index }) => {
  const Icon = feature.icon;
  return (
    <FadeIn delay={index * 100}>
      <div className="group relative bg-white rounded-3xl p-8 h-full transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-2 border border-gray-100 overflow-hidden z-10">
        
        {/* Subtle hover gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 -z-10`}></div>

        <div className="flex flex-col items-center text-center">
          {/* Icon Wrapper */}
          <div className={`relative w-20 h-20 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${feature.color} text-white shadow-lg ${feature.shadow} transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
            {/* Sparkle decorative icon on hover */}
            <Sparkles size={14} className="absolute -top-2 -right-2 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
            <Icon size={36} strokeWidth={1.5} />
          </div>

          <h3 className="text-[15px] font-black tracking-wide text-gray-900 mb-3 group-hover:text-[#0c5940] transition-colors">
            {feature.title}
          </h3>
          
          <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
            {feature.description}
          </p>
        </div>

        {/* Decorative corner accent */}
        <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-bl-[100px] -z-10`}></div>
      </div>
    </FadeIn>
  );
};

const HomeFeatures = () => {
  return (
    <section className="py-24 bg-[#fbfdfc] relative overflow-hidden">
      {/* Abstract Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0c5940]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-sm border border-gray-100 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#0c5940] animate-pulse"></span>
              <span className="text-[11px] font-black tracking-[0.2em] text-[#0c5940] uppercase">Certifications & Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
              Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0c5940] to-teal-500">Excellence</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Our products are built with industry-leading technology, ensuring safety, durability, and performance for a lifetime.
            </p>
          </FadeIn>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default HomeFeatures;
