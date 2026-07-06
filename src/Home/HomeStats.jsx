import React, { useState, useEffect, useRef } from 'react';
import { Award, Users, ShieldCheck } from 'lucide-react';

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    let animationFrame;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };

    animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return (
    <span ref={countRef}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const HomeStats = () => {
  const stats = [
    {
      id: 1,
      icon: <Award size={32} className="text-[#38B6FF]" />,
      number: 10,
      suffix: "+",
      label: "Years of Experience",
      description: "Delivering excellence since day one."
    },
    {
      id: 2,
      icon: <Users size={32} className="text-[#38B6FF]" />,
      number: 5000,
      suffix: "+",
      label: "Installations Done",
      description: "Happy families & businesses secured."
    },
    {
      id: 3,
      icon: <ShieldCheck size={32} className="text-[#38B6FF]" />,
      number: 100,
      suffix: "%",
      label: "Quality Guarantee",
      description: "Premium materials & flawless fitment."
    }
  ];

  return (
    <section className="py-20 bg-[#081A59] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#38B6FF] opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#0c5940] opacity-20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
            <span className="text-xs font-bold tracking-widest text-[#38B6FF] uppercase">Why Choose Us</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Numbers That Speak For <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38B6FF] to-teal-300">Themselves</span>
          </h2>
          <p className="text-white/70 text-lg">
            We take pride in our track record of transforming spaces with premium mosquito protection solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              
              <div className="text-5xl font-black text-white mb-2 flex items-baseline">
                <CountUp end={stat.number} suffix={stat.suffix} />
              </div>
              
              <h3 className="text-lg font-bold text-[#38B6FF] mb-2">{stat.label}</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeStats;
