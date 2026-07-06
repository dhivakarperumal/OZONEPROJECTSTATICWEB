import React from "react";
import { Hexagon, Triangle, Circle, Square, Diamond, Star, Cloud, Shield } from "lucide-react";

// Mock company data using icons to look like logos
const companies = [
  { id: 1, name: "Vertex Build", icon: Triangle, color: "text-blue-600" },
  { id: 2, name: "Oasis Realty", icon: Circle, color: "text-emerald-600" },
  { id: 3, name: "Nexus Group", icon: Hexagon, color: "text-purple-600" },
  { id: 4, name: "Pinnacle Arch", icon: Diamond, color: "text-rose-600" },
];

const CompanyLogos = () => {
  return (
    <section className="py-20 bg-white overflow-hidden border-t border-gray-100">
      <div className="container mx-auto px-4 text-center mb-10">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
          Trusted by industry leading partners
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full flex items-center">
        {/* Gradient fades on the edges for a smooth effect */}
        <div className="absolute left-0 top-0 w-24 sm:w-48 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-24 sm:w-48 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Track */}
        <div className="flex animate-scroll whitespace-nowrap group">
          {/* Set 1 */}
          <div className="flex shrink-0 items-center justify-around min-w-full">
            {companies.map((company) => {
              const Icon = company.icon;
              return (
                <div key={company.id} className="mx-8 sm:mx-12 flex items-center gap-3 opacity-60 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100 cursor-pointer">
                  <Icon size={28} className={company.color} />
                  <span className="text-xl font-black text-gray-800 tracking-tight">{company.name}</span>
                </div>
              );
            })}
          </div>
          {/* Set 2 */}
          <div className="flex shrink-0 items-center justify-around min-w-full">
            {companies.map((company) => {
              const Icon = company.icon;
              return (
                <div key={`${company.id}-dup1`} className="mx-8 sm:mx-12 flex items-center gap-3 opacity-60 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100 cursor-pointer">
                  <Icon size={28} className={company.color} />
                  <span className="text-xl font-black text-gray-800 tracking-tight">{company.name}</span>
                </div>
              );
            })}
          </div>
          {/* Set 3 */}
          <div className="flex shrink-0 items-center justify-around min-w-full">
            {companies.map((company) => {
              const Icon = company.icon;
              return (
                <div key={`${company.id}-dup2`} className="mx-8 sm:mx-12 flex items-center gap-3 opacity-60 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100 cursor-pointer">
                  <Icon size={28} className={company.color} />
                  <span className="text-xl font-black text-gray-800 tracking-tight">{company.name}</span>
                </div>
              );
            })}
          </div>
          {/* Set 4 */}
          <div className="flex shrink-0 items-center justify-around min-w-full">
            {companies.map((company) => {
              const Icon = company.icon;
              return (
                <div key={`${company.id}-dup3`} className="mx-8 sm:mx-12 flex items-center gap-3 opacity-60 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100 cursor-pointer">
                  <Icon size={28} className={company.color} />
                  <span className="text-xl font-black text-gray-800 tracking-tight">{company.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default CompanyLogos;
