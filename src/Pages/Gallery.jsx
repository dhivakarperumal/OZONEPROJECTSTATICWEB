import React, { useState, useEffect } from "react";
import PageContainer from "../CommenComponents/PageContainer";
import PageHeader from "../CommenComponents/PageHeader";
import { galleryItems } from "../data/gallery";
import { X } from "lucide-react";

function PolaroidCard({ item, index, onClick }) {
  // deterministic angle based on index
  const angle = ((index * 37) % 21) - 10; // -10..10 deg
  const offsetX = ((index * 53) % 40) - 20; // -20..20 px
  const offsetY = ((index * 79) % 30) - 15; // -15..15 px

  return (
    <div
      onClick={() => onClick(item)}
      className="polaroid group cursor-pointer relative select-none"
      style={{
        transform: `translate(${offsetX}px, ${offsetY}px) rotate(${angle}deg)`,
      }}
    >
      <div className="rounded-lg overflow-hidden bg-white shadow-lg border border-gray-100">
        <img
          src={item.image}
          alt={item.title}
          className="w-56 h-40 object-cover block"
          onError={(e) => (e.target.style.display = "none")}
        />
        <div className="px-3 py-2 bg-white">
          <p className="text-sm font-semibold text-slate-800">{item.title}</p>
          <p className="text-xs text-slate-500 mt-1 uppercase">{item.category}</p>
        </div>
      </div>
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white rounded-b-md opacity-90 border-t border-gray-100" />
    </div>
  );
}

export default function Gallery() {
  const [items, setItems] = useState(galleryItems || []);
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const categories = ["All", ...Array.from(new Set(galleryItems.map((g) => g.category)))];

  useEffect(() => {
    if (filter === "All") setItems(galleryItems);
    else setItems(galleryItems.filter((g) => g.category === filter));
  }, [filter]);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Gallery" subtitle="A curated view of our installations and projects." />

      <PageContainer className="py-12">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-heading">Creative Gallery</h2>
            <p className="text-sm text-slate-600 mt-1">A playful take on our project photos — tap to enlarge.</p>
          </div>

          <div className="flex items-center gap-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-3 py-1 rounded-full text-sm font-semibold transition ${filter === c ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-slate-700'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Scattered canvas on desktop, grid on mobile */}
        <div className="relative w-full h-[640px] hidden md:block rounded-2xl border border-slate-100 bg-white/40 overflow-hidden">
          <div className="absolute inset-0 p-8">
            <div className="relative w-full h-full">
              {/* place cards with translate/rotation for scattered look */}
              <div className="absolute inset-0 flex flex-wrap items-start gap-6" style={{padding: '24px'}}>
                {items.map((it, i) => (
                  <div key={it.id} className="m-3">
                    <PolaroidCard item={it} index={i} onClick={setLightbox} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / small screens: regular responsive grid */}
        <div className="block md:hidden">
          <div className="grid grid-cols-2 gap-3">
            {items.map((it) => (
              <div key={it.id} className="rounded-lg overflow-hidden border border-gray-100 bg-white shadow-sm cursor-pointer" onClick={() => setLightbox(it)}>
                <img src={it.image} alt={it.title} className="w-full h-40 object-cover" onError={(e)=>e.target.style.display='none'} />
                <div className="p-2">
                  <p className="text-sm font-semibold">{it.title}</p>
                  <p className="text-xs text-slate-500">{it.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {lightbox && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
            <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center">
              <X size={18} />
            </button>

            <div className="relative max-w-4xl w-full rounded-lg overflow-hidden bg-white shadow-2xl" onClick={(e)=>e.stopPropagation()}>
              <img src={lightbox.image} alt={lightbox.title} className="w-full object-contain max-h-[80vh] bg-gray-900" onError={(e)=>e.target.style.display='none'} />
              <div className="p-4 bg-white">
                <h4 className="text-lg font-bold text-heading">{lightbox.title}</h4>
                <p className="text-sm text-slate-600 mt-1">{lightbox.category}</p>
                <p className="text-xs text-slate-500 mt-2">Click outside image or the X to close.</p>
              </div>
            </div>
          </div>
        )}

      </PageContainer>
    </div>
  );
}
