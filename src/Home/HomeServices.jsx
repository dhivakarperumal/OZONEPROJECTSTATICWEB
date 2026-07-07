import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import * as LucideIcons from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const services = [
  {
    id: 1,
    title: "Mosquito Screen Installation",
    icon: "ShieldCheck",
    description: "Professional installation for all types of mosquito screen systems.",
    items: [
      "Window Screens",
      "Door Screens",
      "Sliding Screens",
      "Pleated Screens",
      "Roll-Up Screens",
      "Fixed Frame Screens"
    ]
  },
  {
    id: 2,
    title: "Window Solutions",
    icon: "LayoutPanelLeft",
    description: "Custom mosquito screen solutions for every window type.",
    items: [
      "Sliding Windows",
      "Casement Windows",
      "uPVC Windows",
      "Aluminium Windows",
      "Wooden Windows",
      "Custom Window Frames"
    ]
  },
  {
    id: 3,
    title: "Door Solutions",
    icon: "DoorOpen",
    description: "Premium mosquito screen doors with elegant designs.",
    items: [
      "Hinged Doors",
      "Sliding Doors",
      "Magnetic Doors",
      "French Doors",
      "Balcony Doors",
      "Folding Doors"
    ]
  },
  {
    id: 4,
    title: "Balcony Screens",
    icon: "Building2",
    description: "Heavy-duty balcony screening systems with privacy and protection.",
    items: [
      "Manual Screens",
      "Motorized Screens",
      "Zip Screens",
      "Sun Control Screens",
      "Privacy Screens",
      "Rain Protection"
    ]
  },
  {
    id: 5,
    title: "Retractable Systems",
    icon: "MoveHorizontal",
    description: "Smooth retractable mosquito screen solutions.",
    items: [
      "Roll-Up Screens",
      "Invisible Screens",
      "Vertical Systems",
      "Horizontal Systems",
      "Heavy Duty Screens",
      "Motorized Systems"
    ]
  },
  {
    id: 6,
    title: "Premium Mesh Products",
    icon: "Grid2X2",
    description: "High-quality mesh materials for every application.",
    items: [
      "Fiberglass Mesh",
      "Stainless Steel Mesh",
      "Aluminium Mesh",
      "Pet Resistant Mesh",
      "Solar Mesh",
      "Anti-Pollen Mesh"
    ]
  },
  {
    id: 7,
    title: "Commercial Solutions",
    icon: "BriefcaseBusiness",
    description: "Complete mosquito protection for commercial buildings.",
    items: [
      "Office Buildings",
      "Hotels",
      "Hospitals",
      "Restaurants",
      "Shopping Malls",
      "Factories"
    ]
  },
  {
    id: 8,
    title: "Residential Solutions",
    icon: "House",
    description: "Custom mosquito screen solutions for modern homes.",
    items: [
      "Apartments",
      "Independent Houses",
      "Luxury Villas",
      "Farm Houses",
      "Duplex Homes",
      "Residential Complexes"
    ]
  },
  {
    id: 9,
    title: "Custom Fabrication",
    icon: "Hammer",
    description: "Tailor-made screen systems designed to fit your space.",
    items: [
      "Custom Frames",
      "Special Sizes",
      "Premium Finishes",
      "Site Measurement",
      "Frame Manufacturing",
      "Customized Designs"
    ]
  },
  {
    id: 10,
    title: "Repair & Maintenance",
    icon: "Wrench",
    description: "Reliable maintenance and repair services.",
    items: [
      "Mesh Replacement",
      "Frame Repair",
      "Roller Repair",
      "Track Cleaning",
      "Lock Replacement",
      "Annual Maintenance"
    ]
  },
  {
    id: 11,
    title: "Consultation",
    icon: "MessageCircleMore",
    description: "Expert consultation to choose the perfect screen solution.",
    items: [
      "Free Site Visit",
      "Product Suggestion",
      "Design Consultation",
      "Measurements",
      "Budget Planning",
      "Technical Support"
    ]
  },
  {
    id: 12,
    title: "After Sales Support",
    icon: "Headphones",
    description: "Dedicated customer service after installation.",
    items: [
      "Product Warranty",
      "Installation Warranty",
      "AMC Support",
      "Spare Parts",
      "Customer Assistance",
      "Quick Service"
    ]
  }
];

const HomeServices = () => {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#0c5940] animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest text-[#0c5940] uppercase">Comprehensive Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Everything You Need for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0c5940] to-teal-600">Mosquito Protection</span>
          </h2>
          <p className="text-gray-500 text-lg">
            From expert consultation to flawless installation and after-sales care, we provide an end-to-end service ecosystem.
          </p>
        </div>

        <div className="relative pb-12">
            <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              }
            }}
            className="services-swiper !pb-14"
          >
            {services.map((service) => {
              const IconComponent = LucideIcons[service.icon] || LucideIcons.Shield;
              
              return (
                <SwiperSlide key={service.id} className="h-auto">
                  <div className="relative bg-white rounded-3xl p-8 h-full border border-gray-100/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_-12px_rgba(12,89,64,0.16)] hover:-translate-y-2 transition-all duration-500 flex flex-col group overflow-hidden z-10">
                    
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0c5940] to-[#38B6FF] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Background glow on hover */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#0c5940]/5 rounded-bl-full -z-10 group-hover:bg-[#0c5940]/10 transition-colors duration-500"></div>
                    <div className="absolute inset-0 rounded-[1.5rem] ring-1 ring-transparent transition-all duration-500 group-hover:ring-[#0c5940]/10"></div>

                    {/* Header: Icon & Title */}
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-[#0c5940] to-teal-700 flex items-center justify-center text-white shadow-lg shadow-[#0c5940]/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                        <IconComponent size={26} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-[17px] font-black text-gray-900 leading-tight group-hover:text-[#0c5940] transition-colors pt-1">
                        {service.title}
                      </h3>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-500 text-[13px] leading-relaxed mb-6 flex-grow">
                      {service.description}
                    </p>
                    
                    {/* Feature Pills instead of a vertical list */}
                    <div className="flex flex-wrap gap-2 mt-auto border-t border-gray-50 pt-5">
                      {service.items.slice(0, 3).map((item, idx) => (
                        <span key={idx} className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#f4faf7] border border-[#0c5940]/10 text-[#0c5940] text-[10px] font-bold uppercase tracking-wider">
                          {item}
                        </span>
                      ))}
                      {service.items.length > 3 && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                          +{service.items.length - 3} More
                        </span>
                      )}
                    </div>

                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      
      {/* Custom styles for Swiper pagination to match theme */}
      <style>{`
        .services-swiper {
          position: static;
        }

        .services-swiper .swiper-pagination {
          bottom: 0px !important;
        }
        .services-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background-color: #cbd5e1;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .services-swiper .swiper-pagination-bullet-active {
          background-color: #0c5940;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

export default HomeServices;
