import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import * as LucideIcons from "lucide-react";
import PageContainer from "../CommenComponents/PageContainer";

import "swiper/css";

import { services } from "../Home/HomeServices";

const FadeIn = ({ children, delay = 0, className = "" }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => entry.isIntersecting && setVisible(true),
            {
                threshold: 0.15,
            }
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
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
};

const ServiceSwiper = () => {
    return (
        <section className="py-20 bg-[#081A59] relative overflow-hidden">

            {/* Background Glow */}
            <PageContainer>
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
                        pagination={{ clickable: true }}
                        loop
                        spaceBetween={30}
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
                        className="pb-14"
                    >
                        {services.map((service, index) => {
                            const IconComponent =
                                LucideIcons[service.icon] || LucideIcons.Shield;

                            return (
                                <SwiperSlide key={service.id}>
                                    <FadeIn delay={index * 80}>
                                        <div className="relative bg-white rounded-3xl p-8 border border-gray-100/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(12,89,64,0.15)] hover:-translate-y-2 transition-all duration-500 flex flex-col group overflow-hidden h-[540px]">

                                            {/* Top Accent Line */}
                                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0c5940] to-[#38B6FF] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                            {/* Background Glow */}
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0c5940]/5 rounded-bl-full -z-10 group-hover:bg-[#0c5940]/10 transition-colors duration-500"></div>

                                            {/* Header */}
                                            <div className="flex flex-col gap-4 mb-5">
                                                <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-[#0c5940] to-teal-700 flex items-center justify-center text-white shadow-lg shadow-[#0c5940]/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                                    <IconComponent size={26} strokeWidth={1.5} />
                                                </div>

                                                <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-[#0c5940] transition-colors">
                                                    {service.title}
                                                </h3>
                                            </div>

                                            {/* Description */}
                                            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                                {service.description}
                                            </p>

                                            {/* Items */}
                                            <div className="mt-auto pt-5 border-t border-gray-50 flex flex-col gap-3">
                                                {service.items.map((item, idx) => (
                                                    <div key={idx} className="flex items-start gap-2">
                                                        <LucideIcons.CheckCircle2
                                                            size={16}
                                                            className="text-[#38B6FF] mt-0.5 shrink-0"
                                                        />
                                                        <span className="text-sm font-semibold text-gray-700">
                                                            {item}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Learn More */}
                                            <div className="mt-6 pt-4 border-t border-gray-50">
                                                <Link
                                                    to="/contact"
                                                    className="inline-flex items-center gap-2 text-sm font-bold text-[#0c5940] hover:text-[#38B6FF] transition-colors group/link"
                                                >
                                                    Learn More
                                                    <LucideIcons.ArrowRight
                                                        size={16}
                                                        className="group-hover/link:translate-x-1 transition-transform"
                                                    />
                                                </Link>
                                            </div>

                                        </div>
                                    </FadeIn>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>


            </PageContainer>
        </section>
    );
};

export default ServiceSwiper;