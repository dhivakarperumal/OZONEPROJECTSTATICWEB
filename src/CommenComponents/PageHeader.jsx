import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const PageHeader = ({ title, subtitle, background }) => {
  const bgImage = background || "/PageHeaderIMG/3.png";

  return (
    <div
      className="relative w-full h-[260px] sm:h-[300px] md:h-[340px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>

      {/* Decorative left accent bar */}
      <div className="absolute left-0 top-0 h-full w-1 bg-[#0c5940]"></div>

      {/* Decorative bottom shimmer line */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#0c5940] via-[var(--secondary)] to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 flex flex-col items-center gap-3">

        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-1">
          <span className="w-2 h-2 rounded-full bg-[#0c5940] animate-pulse"></span>
          <span className="text-xs font-bold tracking-widest text-white/80 uppercase">Ozone Enterprises</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-lg">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-sm sm:text-base text-gray-300 max-w-xl">{subtitle}</p>
        )}

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-300 mt-1">
          <Link to="/" className="flex items-center gap-1 hover:text-white transition font-medium">
            <Home size={14} />
            Home
          </Link>
          <ChevronRight size={14} className="text-gray-500" />
          <span className="text-[#06C167] font-semibold">{title}</span>
        </div>

      </div>

      {/* Decorative circle blurs */}
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[var(--secondary)] opacity-10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-[#0c5940] opacity-10 blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default PageHeader;