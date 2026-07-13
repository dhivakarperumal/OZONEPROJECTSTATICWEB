import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, BookOpen, ChevronDown } from 'lucide-react';
import CatalogueDownload from '../CommenComponents/CatalogueDownload';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slidesData = [
  {
    id: 1,
    tag: "Sales & Services",
    title: "Window Nets and ",
    highlight: "Doors",
    desc: "We provide premium quality mosquito net solutions for windows, doors, balconies, and open spaces that keep insects out while allowing fresh air and natural light inside.",
    bgImage: "/Hero/1.png"
  },
  {
    id: 2,
    tag: "Sales & Services",
    title: "Window",
    highlight: "Blinds",
    desc: "Enhance your interiors with stylish roller blinds, zebra blinds, Venetian blinds, vertical blinds, and customized window coverings that perfectly blend beauty with functionality.",
    bgImage: "/Hero/2.png"
  },
  {
    id: 3,
    tag: "Sales & Services",
    title: "UPVC",
    highlight: "Systems",
    desc: "We supply and install premium UPVC doors and windows designed for durability, thermal insulation, weather resistance, and modern architectural elegance.",
    bgImage: "/Hero/3.png"
  },
  {
    id: 4,
    tag: "Sales & Services",
    title: "Complete Home",
    highlight: "Solutions",
    desc: "From consultation and customized manufacturing to professional installation and after-sales service, we offer complete solutions for mosquito nets, window blinds, and UPVC systems.",
    bgImage: "/Hero/4.png"
  }
];

const Hero = () => {
  const [catalogueOpen, setCatalogueOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gray-900 h-[90vh] md:h-[600px] lg:h-[700px]">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          enabled: window.innerWidth >= 768,
        }}
        className="w-full h-full"
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center">
              <motion.div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${slide.bgImage}')` }}
                animate={{ scale: [1.04, 1.12, 1.04], opacity: [0.95, 1, 0.95] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

              <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex items-end md:items-center pb-8 md:pb-0">
                <div className="max-w-3xl">
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse"></span>
                    <span className="text-sm font-bold tracking-wide text-white uppercase">{slide.tag}</span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.25 }}
                    className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-2 md:mb-6 tracking-tight leading-[1.2] text-white"
                  >
                    {slide.title}  <span className="text-cyan-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                      {slide.highlight}
                    </span>
                  </motion.h1>

                  {/* <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="text-xs sm:text-lg lg:text-xl mb-0 md:mb-10 leading-5 md:leading-9 text-gray-200 max-w-xl"
                  >
                    {slide.desc}
                  </motion.p> */}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.55 }}
                    className="hidden md:flex flex-col sm:flex-row items-center justify-start gap-4"
                  >
                    <Link to="/products" className="w-full sm:w-auto px-8 py-4 bg-[#0c5940] hover:bg-[#094230] text-white rounded-full font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-[#0c5940]/40">
                      Explore Products <ArrowRight size={20} />
                    </Link>
                    <Link to="/contact" className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-full font-semibold transition backdrop-blur-md flex items-center justify-center gap-2">
                      <PlayCircle size={20} /> Get a Quote
                    </Link>
                    <button
                      onClick={() => setCatalogueOpen(true)}
                      className="w-full sm:w-auto px-8 py-4 bg-amber-400 hover:bg-amber-300 text-gray-900 rounded-full font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30"
                    >
                      <BookOpen size={20} /> Download Catalogue
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <a
        href="#about-section"
        className="hidden md:flex absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex-col items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-white/90"
      >
        <span>Scroll Down</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md"
        >
          <ChevronDown size={18} />
        </motion.span>
      </a>

      <CatalogueDownload isOpen={catalogueOpen} onClose={() => setCatalogueOpen(false)} />

      <style dangerouslySetInnerHTML={{
        __html: `
        .swiper-pagination-bullet { background: white; opacity: 0.5; }
        .swiper-pagination-bullet-active { background: var(--accent); opacity: 1; }
        /* Optional gentle zoom effect on active slide */
        .swiper-slide-active .bg-cover { transform: scale(1); }
      `}} />
    </section>
  );
};

export default Hero;
