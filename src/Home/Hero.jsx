import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slidesData = [
  {
    id: 1,
    tag: "Premium Fitment Systems",
    title: "Transform Your Space with",
    highlight: "Ozone",
    desc: "Discover our world-class architectural hardware and tailor-made solutions designed for unmatched durability, premium aesthetics, and perfect fitment.",
    bgImage: "/Hero/1.png"
  },
  {
    id: 2,
    tag: "Innovative Engineering",
    title: "Unmatched Durability &",
    highlight: "Strength",
    desc: "Engineered to perfection. Our products undergo rigorous testing to ensure they stand the test of time while elevating your architectural spaces.",
    bgImage: "/Hero/2.png"
  },
  {
    id: 3,
    tag: "Tailored For You",
    title: "Aesthetically Crafted",
    highlight: "Solutions",
    desc: "From balcony screens to custom fitments, we provide bespoke hardware solutions that seamlessly blend with your modern design vision.",
    bgImage: "/Hero/3.png"
  },
  {
    id: 4,
    tag: "Global Standard",
    title: "State of the Art",
    highlight: "Hardware",
    desc: "Experience flawless integration and premium finishes with our architecturally superior hardware collections designed for every space.",
    bgImage: "/Hero/4.png"
  }
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gray-900 h-[600px] lg:h-[700px]">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        className="w-full h-full"
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center">
              {/* Full Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] scale-105"
                style={{ backgroundImage: `url('${slide.bgImage}')` }}
              ></div>
              
              {/* Dark Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
              
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-16">
                <div className="max-w-3xl">
                  
                  {/* Text Content */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse"></span>
                    <span className="text-sm font-bold tracking-wide text-white uppercase">{slide.tag}</span>
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1] text-white">
                    {slide.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-[var(--secondary)]">{slide.highlight}</span>
                  </h1>
                  
                  <p className="text-base sm:text-lg lg:text-xl mb-10 leading-relaxed text-gray-200">
                    {slide.desc}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
                    <Link to="/products" className="w-full sm:w-auto px-8 py-4 bg-[#0c5940] hover:bg-[#094230] text-white rounded-full font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-[#0c5940]/40">
                      Explore Products <ArrowRight size={20} />
                    </Link>
                    <Link to="/contact" className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-full font-semibold transition backdrop-blur-md flex items-center justify-center gap-2">
                      <PlayCircle size={20} /> Get a Quote
                    </Link>
                  </div>
                  
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <style dangerouslySetInnerHTML={{__html: `
        .swiper-pagination-bullet { background: white; opacity: 0.5; }
        .swiper-pagination-bullet-active { background: var(--accent); opacity: 1; }
        /* Optional gentle zoom effect on active slide */
        .swiper-slide-active .bg-cover { transform: scale(1); }
      `}} />
    </section>
  );
};

export default Hero;
