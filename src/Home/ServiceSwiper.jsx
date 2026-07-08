import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import * as LucideIcons from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

import { services } from "../Home/HomeServices";

const ServiceSwiper = () => {
  return (
    <section className="py-20 bg-[#081A59] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#38B6FF]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#0c5940]/20 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 px-4">
          <span className="inline-block px-5 py-2 rounded-full bg-white/10 border border-white/20 text-[#38B6FF] text-sm font-bold uppercase tracking-widest">
            Our Services
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-white mt-5 mb-5">
            Comprehensive Solutions
          </h2>

          <p className="text-white/70 text-lg">
            Explore our premium mosquito protection and screening services for
            homes, apartments and commercial spaces.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          spaceBetween={30}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1.2,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1400: {
              slidesPerView: 4,
            },
          }}
          className="px-4 lg:px-8 pb-14"
        >
          {services.map((service) => {
            const Icon =
              LucideIcons[service.icon] || LucideIcons.Shield;

            return (
              <SwiperSlide key={service.id}>
                <div className="bg-white rounded-3xl p-8 h-[560px] flex flex-col shadow-xl transition duration-500 hover:-translate-y-3">

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0c5940] to-teal-700 flex items-center justify-center text-white shadow-lg mb-6">
                    <Icon size={28} />
                  </div>

                  <h3 className="text-3xl font-black text-[#081A59] leading-tight mb-5">
                    {service.title}
                  </h3>

                  <p className="text-gray-500 leading-8 mb-8">
                    {service.description}
                  </p>

                  <div className="border-t pt-6 flex-1 space-y-4">
                    {service.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3"
                      >
                        <LucideIcons.CheckCircle2
                          size={18}
                          className="text-[#38B6FF]"
                        />

                        <span className="font-semibold text-gray-800">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t mt-8 pt-6">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 font-bold text-[#0c5940] hover:text-[#38B6FF] transition"
                    >
                      Learn More
                      <LucideIcons.ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <style>{`
        .swiper-pagination-bullet{
          background:white;
          opacity:.4;
        }

        .swiper-pagination-bullet-active{
          background:#38B6FF;
          opacity:1;
          width:22px;
          border-radius:20px;
        }
      `}</style>
    </section>
  );
};

export default ServiceSwiper;