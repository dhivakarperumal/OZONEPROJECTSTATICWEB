import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Eye,
  Factory,
  Handshake,
  Layers,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import PageContainer from "../CommenComponents/PageContainer";
import PageHeader from "../CommenComponents/PageHeader";

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "500+", label: "Projects Delivered" },
  { value: "50+", label: "Skilled Professionals" },
  { value: "98%", label: "Client Satisfaction" },
];

const values = [
  {
    icon: <ShieldCheck size={20} />,
    title: "Premium Quality",
    text: "Every product is crafted with precision and built to last in demanding environments.",
  },
  {
    icon: <Layers size={20} />,
    title: "Custom Fitment",
    text: "We design tailored solutions that complement your architectural and functional requirements.",
  },
  {
    icon: <Users size={20} />,
    title: "Client-Centered Approach",
    text: "Our team works closely with clients to deliver smooth execution and dependable support.",
  },
];

const journeyPoints = [
  "Established as a trusted partner for premium architectural and fitment solutions.",
  "Continuously growing through innovation, performance-driven products, and tailored service.",
  "Now serving a broad spectrum of residential, commercial, and industrial environments.",
];

const capabilities = [
  {
    icon: <Factory size={18} />,
    title: "Manufacturing Excellence",
    text: "Precision-built systems designed for durability, consistency, and premium finishing.",
  },
  {
    icon: <Handshake size={18} />,
    title: "Reliable Partnerships",
    text: "We work hand-in-hand with designers, builders, and clients for seamless outcomes.",
  },
  {
    icon: <Building2 size={18} />,
    title: "Architectural Integration",
    text: "Our solutions blend beautifully into modern interiors and highly functional spaces.",
  },
  {
    icon: <Award size={18} />,
    title: "Quality Assurance",
    text: "A strict focus on standards ensures every project meets expectations from start to finish.",
  },
];

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
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
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="About Us"
        subtitle="Crafting premium architectural solutions with innovation, precision, and a commitment to exceptional quality."
      />

      <PageContainer className="py-16 sm:py-20 lg:py-24">
        <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <FadeIn className="w-full" delay={0}>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-success-dark">
                <span className="h-2.5 w-2.5 rounded-full bg-success" />
                Who We Are
              </div>

              <h2 className="mt-6 text-2xl font-black leading-tight text-heading sm:text-3xl lg:text-4xl">
                Elevating spaces with intelligent design and lasting performance.
              </h2>

              <p className="mt-5 text-sm leading-7 text-text sm:text-base">
                Ozone Enterprises is a trusted name in premium fitment systems and architectural solutions. With years of industry experience, we combine modern design thinking with dependable craftsmanship to create products that are both elegant and functional.
              </p>

              <p className="mt-4 text-sm leading-7 text-text sm:text-base">
                From concept to completion, our focus remains the same: deliver refined solutions that support comfort, efficiency, and visual appeal across residential, commercial, and industrial projects.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="relative bg-white rounded-3xl p-6 h-full border border-gray-100/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(12,89,64,0.12)] transition-all duration-500"
                  >
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0c5940] to-[#38B6FF] opacity-20"></div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#0c5940]/6 rounded-bl-full -z-10"></div>
                    <p className="text-xl sm:text-2xl font-black text-primary">{item.value}</p>
                    <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-500">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn className="w-full" delay={100}>
            <div className="relative">
              <div className="overflow-hidden rounded-4xl border border-slate-200 shadow-2xl">
                <img
                  src="/PageHeaderIMG/3.png"
                  alt="Ozone Enterprises team and workspace"
                  className="h-[27rem] w-full object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-success/15 text-success-dark">
                    <Award size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                      Certified
                    </p>
                    <p className="text-sm font-bold text-slate-800">Premium Standards</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 rounded-2xl bg-primary px-5 py-4 text-white shadow-xl">
                <p className="text-3xl font-black leading-none">100%</p>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                  Quality Focused
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <FadeIn delay={120} className="w-full">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1.5 text-sm font-semibold text-success-dark">
                <Sparkles size={16} />
                Our Story
              </div>
              <h3 className="mt-5 text-xl font-black text-heading sm:text-2xl">
                A journey shaped by trust, innovation, and craftsmanship.
              </h3>
              <p className="mt-4 text-sm sm:text-base leading-7 text-text">
                What began as a commitment to quality has grown into a trusted brand known for creating durable, elegant, and highly functional solutions for modern spaces.
              </p>
              <div className="mt-6 space-y-4">
                {journeyPoints.map((item) => (
                  <div key={item} className="relative flex items-start gap-3 rounded-2xl bg-white px-4 py-3 border border-gray-100 shadow-sm">
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0c5940] to-teal-700 text-white">
                      <CheckCircle2 size={16} />
                    </div>
                    <p className="text-xs sm:text-sm leading-6 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={180} className="w-full">
            <div className="grid gap-6">
              <div className="rounded-3xl bg-primary p-8 text-white shadow-xl group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0c5940] to-[#38B6FF] opacity-15"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/6 rounded-bl-full -z-10"></div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                  <Target size={20} />
                </div>
                <h3 className="mt-6 text-xl sm:text-2xl font-black">Our Mission</h3>
                <p className="mt-3 text-sm sm:text-base leading-7 text-slate-100">
                  To deliver premium fitment and architectural solutions that enhance the quality, comfort, and visual appeal of every space we touch.
                </p>
              </div>

              <div className="relative rounded-3xl bg-white p-8 h-full border border-gray-100/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(12,89,64,0.12)] transition-all duration-500 group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0c5940] to-[#38B6FF] opacity-20"></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#0c5940]/6 rounded-bl-full -z-10"></div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0c5940] to-teal-700 text-white shadow-lg">
                  <Eye size={20} />
                </div>
                <h3 className="mt-6 text-xl sm:text-2xl font-black text-heading">Our Vision</h3>
                <p className="mt-3 text-sm sm:text-base leading-7 text-text">
                  To be a forward-looking industry leader recognized for innovation, reliability, and enduring design excellence.
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        <section className="mt-20 overflow-hidden rounded-[2rem] bg-linear-to-r from-primary via-primary-light to-secondary p-8 shadow-2xl sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <FadeIn delay={100} className="w-full">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-white/90">
                  <Sparkles size={16} />
                  Our Commitment
                </div>
                <h3 className="mt-6 text-2xl font-black leading-tight text-white sm:text-3xl">
                  Built around quality, reliability, and timeless design.
                </h3>
                <p className="mt-4 text-sm sm:text-base leading-7 text-slate-100">
                  Our mission is simple: create premium products and dependable support that shape better living and working environments.
                </p>
                <Link
                  to="/products"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary"
                >
                  Explore our solutions <ArrowRight size={16} />
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={160} className="w-full">
              <div className="grid gap-4 md:grid-cols-2">
                {capabilities.map((item) => (
                  <div key={item.title} className="rounded-[1.4rem] border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-white">
                      {item.icon}
                    </div>
                    <h4 className="mt-4 text-sm sm:text-lg font-bold text-white">{item.title}</h4>
                    <p className="mt-2 text-xs sm:text-sm leading-6 text-slate-100">{item.text}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="mt-20">
          <FadeIn delay={100} className="w-full">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1.5 text-sm font-semibold text-success-dark">
                  <ShieldCheck size={16} />
                  Our Strengths
                </div>
                <h3 className="mt-4 text-2xl font-black text-heading sm:text-3xl">
                  Why clients trust Ozone Enterprises
                </h3>
              </div>
              <p className="max-w-2xl text-xs sm:text-sm leading-6 text-slate-600">
                We blend refined craftsmanship with practical innovation to create solutions that feel as strong as they look.
              </p>
            </div>
          </FadeIn>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {values.map((item) => (
              <FadeIn key={item.title} delay={140} className="w-full">
                <div className="relative bg-white rounded-3xl p-8 h-full border border-gray-100/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(12,89,64,0.12)] hover:-translate-y-2 transition-all duration-500 group overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0c5940] to-[#38B6FF] opacity-20"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#0c5940]/6 rounded-bl-full -z-10"></div>

                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-[#0c5940] to-teal-700 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h4 className="text-lg sm:text-xl font-black text-heading leading-tight pt-1">{item.title}</h4>
                  </div>

                  <p className="text-xs sm:text-sm leading-6 text-slate-600 mb-4">{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>


      </PageContainer>
    </div>
  );
}
