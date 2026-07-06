import React, { useState, useEffect, useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const reviews = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Architect, Chennai",
    avatar: "RK",
    rating: 5,
    review:
      "Ozone's sliding window systems are absolutely world-class. The precision engineering and smooth operation left my clients completely impressed. The installation team was professional and efficient. Highly recommended for any premium project!",
    project: "Luxury Villa, ECR",
    color: "from-[#0c5940] to-[#094230]",
  },
  {
    id: 2,
    name: "Priya Nair",
    role: "Interior Designer, Bangalore",
    avatar: "PN",
    rating: 5,
    review:
      "I've specified Ozone products across 20+ projects and the quality is consistently outstanding. The balcony enclosure systems are a game-changer — clients are always blown away by how premium they look and feel.",
    project: "Premium Apartments, Whitefield",
    color: "from-[#081A59] to-[#13328D]",
  },
  {
    id: 3,
    name: "Suresh Mehta",
    role: "Real Estate Developer",
    avatar: "SM",
    rating: 5,
    review:
      "We partnered with Ozone for our entire 200-unit residential project. The folding door systems and glass railings elevated the entire development. Delivery was on time, installation was flawless. Will definitely partner again!",
    project: "200-Unit Residential, Pune",
    color: "from-[#0c5940] to-[#38B6FF]",
  },
  {
    id: 4,
    name: "Anitha Rajan",
    role: "Homeowner, Coimbatore",
    avatar: "AR",
    rating: 5,
    review:
      "Transformed our entire balcony with Ozone's enclosure system. The mosquito mesh screens are a blessing — fresh air with zero insects! The after-sales support is equally impressive. Couldn't be happier.",
    project: "Home Renovation, RS Puram",
    color: "from-[#13328D] to-[#0c5940]",
  },
  {
    id: 5,
    name: "Mohammed Irfan",
    role: "Contractor, Hyderabad",
    avatar: "MI",
    rating: 5,
    review:
      "As a contractor working on high-end projects, quality matters everything. Ozone's louvre shutters and casement window fitments are the best I've used. Durable, precise, and the clients love the aesthetic finish.",
    project: "Commercial Complex, HITEC City",
    color: "from-[#0c5940] to-[#081A59]",
  },
  {
    id: 6,
    name: "Deepa Krishnan",
    role: "Property Manager, Kochi",
    avatar: "DK",
    rating: 5,
    review:
      "Managing 15 properties, I needed a reliable fitment partner. Ozone delivered on every front — quality products, quick installation, and excellent warranty support. My go-to brand for all future projects.",
    project: "Luxury Apartments, Marine Drive",
    color: "from-[#081A59] to-[#0c5940]",
  },
];

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={16}
        className={s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}
      />
    ))}
  </div>
);

const HomeReviews = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-20 overflow-hidden relative" style={{ background: "linear-gradient(135deg, #081A59 0%, #0c5940 100%)" }}>

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
      />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-4">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="text-xs font-black tracking-widest text-white/70 uppercase">Client Reviews</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-[#38B6FF]">500+</span> Clients
            </h2>
            <p className="text-white/50 mt-3 text-sm max-w-md">
              Hear from homeowners, architects and developers who trust Ozone for their premium fitment needs.
            </p>
          </div>

          {/* Overall rating */}
          <div className="shrink-0 flex flex-col items-center bg-white/10 border border-white/15 backdrop-blur-md rounded-2xl px-8 py-5 gap-1">
            <span className="text-5xl font-black text-white">4.9</span>
            <StarRating rating={5} />
            <span className="text-white/50 text-xs font-semibold mt-1">Based on 500+ reviews</span>
          </div>
        </div>

        {/* Swiper */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {reviews.map((r) => (
              <SwiperSlide key={r.id}>
                <div className="group bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 hover:border-white/30 rounded-3xl p-7 flex flex-col gap-5 h-full transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/30">

                  {/* Quote icon */}
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/40 group-hover:text-amber-400 group-hover:bg-amber-400/10 transition-all">
                    <Quote size={18} />
                  </div>

                  {/* Review text */}
                  <p className="text-white/75 text-sm leading-relaxed flex-1">
                    "{r.review}"
                  </p>

                  {/* Rating */}
                  <StarRating rating={r.rating} />

                  {/* Project tag */}
                  <div className="text-[11px] font-bold text-white/40 uppercase tracking-widest border-t border-white/10 pt-4">
                    📍 {r.project}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center text-white text-sm font-black shadow-lg`}>
                      {r.avatar}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{r.name}</p>
                      <p className="text-white/50 text-xs">{r.role}</p>
                    </div>
                    {/* Verified badge */}
                    <div className="ml-auto flex items-center gap-1 bg-emerald-400/15 border border-emerald-400/25 text-emerald-300 text-[10px] font-bold px-2 py-1 rounded-full">
                      ✓ Verified
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Nav Buttons */}
          <button
            ref={prevRef}
            className="absolute left-0 top-1/2 -translate-y-8 -translate-x-4 z-10 w-11 h-11 bg-white/15 hover:bg-white/30 border border-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hidden lg:flex"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            ref={nextRef}
            className="absolute right-0 top-1/2 -translate-y-8 translate-x-4 z-10 w-11 h-11 bg-white/15 hover:bg-white/30 border border-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hidden lg:flex"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Bottom trust bar */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { val: "500+", label: "Happy Clients" },
            { val: "4.9★", label: "Average Rating" },
            { val: "15+", label: "Years Trusted" },
            { val: "100%", label: "Verified Reviews" },
          ].map((item, i) => (
            <div key={i} className="text-center bg-white/8 border border-white/10 rounded-2xl py-4 px-3 backdrop-blur-sm">
              <div className="text-2xl font-black text-white">{item.val}</div>
              <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mt-1">{item.label}</div>
            </div>
          ))}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-pagination-bullet { background: rgba(255,255,255,0.4); }
        .swiper-pagination-bullet-active { background: #06C167; }
      `}} />
    </section>
  );
};

export default HomeReviews;
