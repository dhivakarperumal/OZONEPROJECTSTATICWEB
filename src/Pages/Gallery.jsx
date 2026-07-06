import React, { useState, useEffect } from "react";
import PageContainer from "../CommenComponents/PageContainer";
import PageHeader from "../CommenComponents/PageHeader";
import { galleryItems } from "../data/gallery";
import { X } from "lucide-react";

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [items, setItems] = useState(galleryItems);
  const [modal, setModal] = useState(null);

  const categories = ["All", ...Array.from(new Set(galleryItems.map((g) => g.category)))];

  useEffect(() => {
    if (filter === "All") {
      // Show only featured images when "All" is selected
      setItems(galleryItems.filter((g) => g.featured));
    } else {
      // Show all images from selected category
      setItems(galleryItems.filter((g) => g.category === filter));
    }
  }, [filter]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setModal(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Gallery" subtitle="Browse projects with interactive tiles and details." />

      <PageContainer className="py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-black text-heading">Projects Gallery</h2>
            <p className="text-sm text-slate-600 mt-1">Hover or tap any tile to view category and details.</p>
          </div>

          <div className="flex flex-wrap gap-2">
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[160px]">
          {items.map((it) => (
            <div
              key={it.id}
              className={`relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm group cursor-pointer ${it.span}`}
              onClick={() => setModal(it)}
            >
              <img src={it.image} alt={it.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e)=>e.target.style.display='none'} />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full text-white">
                  <p className="text-sm font-bold">{it.title}</p>
                  <p className="text-[11px] uppercase tracking-wider text-white/70">{it.category}</p>
                </div>
              </div>

              <div className="absolute top-3 left-3 bg-white/80 text-sm px-2 py-1 rounded-full text-slate-800 font-semibold tracking-wider">{it.category}</div>
            </div>
          ))}
        </div>

        {/* Modal / Detail */}
        {modal && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setModal(null)}>
            <div className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl" onClick={(e)=>e.stopPropagation()}>
              <button onClick={() => setModal(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center z-20">
                <X size={18} />
              </button>

              <img src={modal.image} alt={modal.title} className="w-full h-72 object-cover bg-gray-100" onError={(e)=>e.target.style.display='none'} />
              <div className="p-6">
                <h3 className="text-xl font-bold text-heading">{modal.title}</h3>
                <p className="text-xs text-slate-500 uppercase mt-1">{modal.category}</p>
                <p className="mt-3 text-sm text-slate-600">Detailed project description can go here. Add specs, challenges, and outcomes to give visitors context about this installation.</p>
              </div>
            </div>
          </div>
        )}

      </PageContainer>
    </div>
  );
}
