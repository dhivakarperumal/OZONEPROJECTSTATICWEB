import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, X, ZoomIn } from "lucide-react";

import { galleryItems } from "../data/gallery";

const fallbackColors = [
  "from-[#0c5940] to-[#094230]",
  "from-[#081A59] to-[#13328D]",
  "from-[#13328D] to-[#38B6FF]",
  "from-[#0c5940] to-[#38B6FF]",
  "from-[#081A59] to-[#0c5940]",
  "from-[#38B6FF] to-[#13328D]",
  "from-[#0c5940] to-[#081A59]",
];

const GalleryCard = ({ item, index, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${item.span}`}
      style={{ minHeight: "200px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(item)}
    >
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        style={{ minHeight: "200px" }}
        onError={(e) => { e.target.style.display = "none"; }}
      />

      {/* Fallback gradient bg */}
      <div className={`absolute inset-0 bg-gradient-to-br ${fallbackColors[index % fallbackColors.length]} flex items-center justify-center -z-10`}>
        <span className="text-white/20 text-6xl font-black">{index + 1}</span>
      </div>

      {/* Hover overlay */}
      <div className={`absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-3 transition-all duration-400 ${hovered ? "opacity-100" : "opacity-0"}`}>
        <div className="w-12 h-12 rounded-full bg-white/20 border border-white/40 backdrop-blur-sm flex items-center justify-center text-white">
          <ZoomIn size={20} />
        </div>
        <div className="text-center px-4">
          <p className="text-white font-bold text-sm">{item.title}</p>
          <p className="text-white/60 text-xs mt-0.5">{item.category}</p>
        </div>
      </div>

      {/* Category pill */}
      <div className={`absolute top-3 left-3 bg-black/40 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full transition-all duration-300 ${hovered ? "opacity-0" : "opacity-100"}`}>
        {item.category}
      </div>
    </div>
  );
};

const HomeGallery = () => {
  const [lightbox, setLightbox] = useState(null);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e6f4ed] border border-[#0c5940]/20 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#0c5940] animate-pulse"></span>
              <span className="text-xs font-black tracking-widest text-[#0c5940] uppercase">Our Gallery</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[var(--primary)] leading-tight">
              Our Work Speaks <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0c5940] to-[var(--secondary)]">For Itself</span>
            </h2>
          </div>
          <Link
            to="/gallery"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#0c5940] text-[#0c5940] hover:bg-[#0c5940] hover:text-white font-bold text-sm transition-all duration-300"
          >
            View Full Gallery
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryItems.map((item, i) => (
            <GalleryCard key={item.id} item={item} index={i} onClick={setLightbox} />
          ))}
        </div>

      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 w-11 h-11 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center text-white transition"
          >
            <X size={20} />
          </button>

          <div
            className="relative max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.image}
              alt={lightbox.title}
              className="w-full max-h-[80vh] object-contain bg-gray-900"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            {/* Fallback for lightbox */}
            <div className={`absolute inset-0 bg-gradient-to-br ${fallbackColors[lightbox.id % fallbackColors.length]} flex items-center justify-center -z-10`}>
              <span className="text-white/20 text-9xl font-black">{lightbox.id}</span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-8 py-6">
              <p className="text-white font-bold text-xl">{lightbox.title}</p>
              <p className="text-white/60 text-sm mt-1">{lightbox.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeGallery;
