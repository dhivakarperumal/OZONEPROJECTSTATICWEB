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
                  <div className="bg-white rounded-2xl p-6 sm:p-8 h-full border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0c5940]/10 to-teal-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-[#0c5940]">
                      <IconComponent size={32} strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#0c5940] transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-500 text-sm mb-6 flex-grow">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2 border-t border-gray-100 pt-5">
                      {service.items.slice(0, 4).map((item, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <LucideIcons.Check size={16} className="text-teal-500 mr-2 shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                      {service.items.length > 4 && (
                        <li className="text-xs font-semibold text-[#0c5940] pt-2">
                          + {service.items.length - 4} more options
                        </li>
                      )}
                    </ul>
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
