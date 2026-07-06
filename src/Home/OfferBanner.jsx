import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Tag, Zap } from "lucide-react";

const offers = [
  {
    id: 1,
    eyebrow: "This Month Only",
    title: "Free Installation",
    subtitle: "On All Orders Above ₹50,000",
    desc: "Get professional installation absolutely free with any premium fitment system order.",
    cta: "Claim Now",
    ctaLink: "/contact",
    secondaryCta: "View Products",
    secondaryLink: "/products",
    Icon: Sparkles,
    gradient: "from-[#0c5940] to-[#081A59]",
    pill: "Free Offer",
    pillBg: "bg-emerald-400/20 text-emerald-300 border-emerald-400/30",
  },
  {
    id: 2,
    eyebrow: "Special Discount",
    title: "Up to 20% OFF",
    subtitle: "On Balcony Enclosure Systems",
    desc: "Transform your balcony with our premium enclosure systems at an unbeatable price.",
    cta: "Shop Now",
    ctaLink: "/products",
    secondaryCta: "Get Quote",
    secondaryLink: "/contact",
    Icon: Tag,
    gradient: "from-[#081A59] to-[#0c5940]",
    pill: "20% Savings",
    pillBg: "bg-sky-400/20 text-sky-300 border-sky-400/30",
  },
  {
    id: 3,
    eyebrow: "Flash Sale",
    title: "Buy 2 Get 1 FREE",
    subtitle: "On Mosquito Mesh Screens",
    desc: "Stock up this season — buy any two mesh screen units and get the third absolutely free.",
    cta: "Grab the Deal",
    ctaLink: "/contact",
    secondaryCta: "View Products",
    secondaryLink: "/products",
    Icon: Zap,
    gradient: "from-[#0c5940] to-[#13328D]",
    pill: "Flash Deal",
    pillBg: "bg-amber-400/20 text-amber-300 border-amber-400/30",
  },
];

const pad = (n) => String(n).padStart(2, "0");

const OfferBanner = () => {
  const [active, setActive] = useState(0);
  const [time, setTime] = useState({ h: 11, m: 59, s: 59 });
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        if (s > 0) return { h, m, s: s - 1 };
        if (m > 0) return { h, m: m - 1, s: 59 };
        if (h > 0) return { h: h - 1, m: 59, s: 59 };
        return { h: 23, m: 59, s: 59 };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const switchSlide = (i) => {
    setAnimating(true);
    setTimeout(() => {
      setActive(i);
      setAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const id = setInterval(() => {
      switchSlide((active + 1) % offers.length);
    }, 5000);
    return () => clearInterval(id);
  }, [active]);

  const offer = offers[active];
  const { Icon } = offer;

  return (
    <section className="py-16 bg-[var(--background)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-200 mb-3">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            <span className="text-xs font-black tracking-widest text-rose-600 uppercase">Exclusive Offers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--primary)]">
            Deals You Can't <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0c5940] to-[var(--secondary)]">Miss</span>
          </h2>
        </div>

        {/* ── Main Banner ── */}
        <div
          className={`relative rounded-3xl bg-gradient-to-br ${offer.gradient} overflow-hidden transition-opacity duration-300 ${animating ? "opacity-0" : "opacity-100"}`}
        >
          {/* Decorative circles */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/5 pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/5 pointer-events-none"></div>
          <div className="absolute top-8 right-48 w-24 h-24 rounded-full bg-white/5 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-0">

            {/* LEFT TEXT */}
            <div className="flex-1 px-8 py-12 lg:px-14 lg:py-14">
              {/* Pill */}
              <span className={`inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest border px-3 py-1.5 rounded-full mb-5 ${offer.pillBg}`}>
                <Icon size={11} /> {offer.pill}
              </span>

              {/* Eyebrow */}
              <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-2">{offer.eyebrow}</p>

              {/* Title */}
              <h3 className="text-5xl sm:text-6xl font-black text-white leading-none mb-3 tracking-tight">
                {offer.title}
              </h3>

              {/* Subtitle */}
              <p className="text-xl font-bold text-white/80 mb-4">{offer.subtitle}</p>

              {/* Description */}
              <p className="text-white/55 text-sm leading-relaxed mb-8 max-w-md">{offer.desc}</p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link
                  to={offer.ctaLink}
                  className="group inline-flex items-center gap-2 bg-white text-[#0c5940] hover:bg-[#0c5940] hover:text-white px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 shadow-xl"
                >
                  {offer.cta}
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to={offer.secondaryLink}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 backdrop-blur-sm"
                >
                  {offer.secondaryCta}
                </Link>
              </div>
            </div>

            {/* RIGHT: Countdown */}
            <div className="lg:w-72 w-full bg-black/20 backdrop-blur-md border-t lg:border-t-0 lg:border-l border-white/10 px-8 py-12 flex flex-col items-center justify-center gap-6">
              <p className="text-white/60 text-xs font-black uppercase tracking-widest text-center">⏳ Offer Ends In</p>

              {/* Timer blocks */}
              <div className="flex items-center gap-3">
                {[
                  { label: "HRS", val: pad(time.h) },
                  { label: "MIN", val: pad(time.m) },
                  { label: "SEC", val: pad(time.s) },
                ].map((t, i) => (
                  <React.Fragment key={i}>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-white/15 border border-white/20 rounded-2xl flex items-center justify-center">
                        <span className="text-3xl font-black text-white leading-none">{t.val}</span>
                      </div>
                      <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest mt-1.5">{t.label}</span>
                    </div>
                    {i < 2 && <span className="text-white/40 text-2xl font-black mb-5">:</span>}
                  </React.Fragment>
                ))}
              </div>

              {/* Slide dots */}
              <div className="flex gap-2 mt-2">
                {offers.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => switchSlide(i)}
                    className={`h-1.5 rounded-full transition-all duration-400 ${i === active ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/60"}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Bottom offer tabs ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
          {offers.map((o, i) => {
            const { Icon: OIcon } = o;
            return (
              <button
                key={o.id}
                onClick={() => switchSlide(i)}
                className={`group flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 text-left w-full ${
                  i === active
                    ? "border-[#0c5940] bg-[#e6f4ed] shadow-lg"
                    : "border-gray-100 bg-white hover:border-[#0c5940]/40 hover:shadow-md"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                  i === active ? "bg-[#0c5940] text-white" : "bg-gray-100 text-gray-500 group-hover:bg-[#e6f4ed] group-hover:text-[#0c5940]"
                }`}>
                  <OIcon size={20} />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{o.eyebrow}</p>
                  <p className={`text-sm font-black transition-colors ${i === active ? "text-[#0c5940]" : "text-gray-700"}`}>{o.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{o.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default OfferBanner;
