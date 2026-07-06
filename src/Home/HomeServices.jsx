import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Wrench, ShieldCheck, Clock, HeartHandshake, ArrowUpRight } from "lucide-react";

const services = [
  {
    id: 1,
    icon: Wrench,
    title: "Precision Installation",
    description: "Expert fitment executed by certified technicians ensuring flawless integration.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop",
    gradient: "from-[#0c5940] to-teal-800"
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: "Uncompromising Quality",
    description: "Every product is rigorously tested to meet and exceed global safety standards.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    gradient: "from-blue-900 to-indigo-900"
  },
  {
    id: 3,
    icon: Clock,
    title: "On-Time Delivery",
    description: "Streamlined logistics guaranteeing that your materials arrive exactly when needed.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    gradient: "from-amber-700 to-orange-900"
  },
  {
    id: 4,
    icon: HeartHandshake,
    title: "Dedicated Support",
    description: "Our team stands by you 24/7 with post-installation care and consultation.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop",
    gradient: "from-purple-900 to-fuchsia-900"
  }
];

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const ServiceCard = ({ service, index }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <FadeIn delay={index * 150}>
      <div 
        className="group relative h-[380px] rounded-[2rem] overflow-hidden cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          {/* Gradient Overlay (Dark at bottom for text readability, clear at top) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent opacity-90"></div>
          {/* Subtle Accent Color Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} mix-blend-multiply opacity-40 group-hover:opacity-60 transition-opacity duration-500`}></div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          {/* Icon Box */}
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-6 group-hover:-translate-y-4 transition-transform duration-500 shadow-xl">
            <Icon size={28} strokeWidth={1.5} />
          </div>

          <h3 className="text-2xl font-black text-white mb-3 group-hover:-translate-y-4 transition-transform duration-500">
            {service.title}
          </h3>
          
          <div className="overflow-hidden">
            <p className="text-white/80 text-sm leading-relaxed translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              {service.description}
            </p>
          </div>

          {/* Learn More Button */}
          <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white text-gray-900 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 shadow-2xl">
            <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

const HomeServices = () => {
  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0c5940]/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/4 translate-y-1/4"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Area */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <FadeIn className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-[#38B6FF] animate-pulse shadow-[0_0_10px_#38B6FF]"></span>
              <span className="text-xs font-black tracking-widest text-white uppercase">Premium Services</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1]">
              Elevating the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0c5940] via-[#38B6FF] to-white">Standard of Excellence</span>
            </h2>
          </FadeIn>
          
          <FadeIn delay={200}>
            <p className="text-gray-400 text-lg max-w-md lg:text-right">
              We go beyond merely supplying products. Our comprehensive service ecosystem ensures your architectural vision is realized with flawless precision.
            </p>
          </FadeIn>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default HomeServices;
