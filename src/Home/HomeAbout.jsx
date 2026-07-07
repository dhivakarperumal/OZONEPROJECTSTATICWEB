import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Award,
  Users,
  Layers,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "50+", label: "Expert Team" },
  { value: "98%", label: "Client Satisfaction" },
];

const highlights = [
  { icon: <ShieldCheck size={20} />, text: "ISO Certified Premium Quality" },
  { icon: <Award size={20} />, text: "Award Winning Designs" },
  { icon: <Users size={20} />, text: "Trusted by 500+ Clients" },
  { icon: <Layers size={20} />, text: "Custom Fitment Solutions" },
];

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const CountUp = ({ value, duration = 2000, start }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    const numericValue = parseInt(value.replace(/\D/g, ""));
    const suffix = value.replace(/[0-9]/g, "");

    let startTime;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCount(Math.floor(progress * numericValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [start, value, duration]);

  const suffix = value.replace(/[0-9]/g, "");

  return (
    <>
      {count}
      {suffix}
    </>
  );
};

const HomeAbout = () => {
  const statsRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect(); // Run only once
        }
      },
      {
        threshold: 0.4,
      }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* ── LEFT: Image Stack ── */}
          <FadeIn className="flex-1 w-full" delay={0}>
            <div className="relative w-full max-w-lg mx-auto">

              {/* Main image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                <img
                  src="/PageHeaderIMG/3.png"
                  alt="Ozone About"
                  className="w-full h-[420px] object-cover"
                />
              </div>

              {/* Floating Experience Badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#0c5940] text-white p-5 rounded-2xl shadow-xl flex flex-col items-center gap-1">
                <span className="text-4xl font-black leading-none">15+</span>
                <span className="text-xs font-semibold tracking-wider uppercase text-white/80">Years of<br />Excellence</span>
              </div>

              {/* Floating certified tag */}
              <div className="absolute -top-5 -left-5 bg-white shadow-xl rounded-xl px-4 py-3 flex items-center gap-3 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#e6f4ed] flex items-center justify-center text-[#0c5940]">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Certified</p>
                  <p className="text-sm font-bold text-gray-800">ISO Premium Quality</p>
                </div>
              </div>

              {/* Dot grid decoration */}
              <div className="absolute -bottom-10 -left-10 grid grid-cols-5 gap-2 opacity-20 pointer-events-none z-[-1]">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-[#0c5940]" />
                ))}
              </div>

            </div>
          </FadeIn>

          {/* ── RIGHT: Content ── */}
          <div className="flex-1 w-full">

            {/* Section label */}
            <FadeIn delay={100}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e6f4ed] border border-[#0c5940]/20 mb-5">
                <span className="w-2 h-2 rounded-full bg-[#0c5940] animate-pulse"></span>
                <span className="text-xs font-bold tracking-widest text-[#0c5940] uppercase">Who We Are</span>
              </div>
            </FadeIn>

            {/* Heading */}
            <FadeIn delay={150}>
              <h2 className="text-4xl sm:text-5xl font-black text-[var(--primary)] leading-tight mb-4">
                Building Spaces <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0c5940] to-[var(--secondary)]">
                  That Inspire
                </span>
              </h2>
            </FadeIn>

            {/* Description */}
            <FadeIn delay={200}>
              <p className="text-gray-500 text-base leading-relaxed mb-4">
                Ozone Enterprises is a leading manufacturer and supplier of premium architectural hardware and fitment systems. With over 15 years of experience, we specialize in designing and delivering tailor-made solutions for residential, commercial, and industrial spaces.
              </p>
              <p className="text-gray-500 text-base leading-relaxed mb-7">
                Our products are engineered to meet the highest standards of durability, aesthetics, and functionality — giving your spaces a truly world-class finish.
              </p>
            </FadeIn>

            {/* Highlights */}
            <FadeIn delay={250}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                    <div className="w-9 h-9 rounded-lg bg-[#e6f4ed] text-[#0c5940] flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Stats row */}
            <FadeIn delay={300}>
              <div
                ref={statsRef}
                className="grid grid-cols-4 gap-4 mb-8 p-5 bg-gradient-to-r from-[#081A59] to-[#13328D] rounded-2xl text-white"
              >
                {stats.map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl sm:text-3xl font-black text-white">
                      <CountUp value={s.value} start={startCount} />
                    </div>
                    <div className="text-[10px] sm:text-xs font-semibold text-white/60 uppercase tracking-wider mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* CTA */}
            <FadeIn delay={350}>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#0c5940] hover:bg-[#094230] text-white rounded-full font-semibold text-sm transition shadow-lg shadow-[#0c5940]/30"
              >
                Learn More About Us <ArrowRight size={18} />
              </Link>
            </FadeIn>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
