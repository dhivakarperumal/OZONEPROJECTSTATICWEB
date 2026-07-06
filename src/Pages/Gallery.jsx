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

  const handleImageClick = (item) => {
    // Only allow clicking featured images to change filter
    if (item.featured) {
      setFilter(item.category);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Gallery" subtitle="Browse projects with interactive tiles and details." />

      <PageContainer className="py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-black text-heading">
              {filter === "All" ? "Projects Gallery" : `${filter} Gallery`}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {filter === "All" ? "Click any category to view all images" : `Viewing all ${filter} images`}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${filter === c ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-slate-700 hover:border-primary'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

      <div className="grid grid-cols-12 gap-4">

  {/* Left */}
  <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">

    {/* Windows */}
    <div
      className="h-[460px] rounded-3xl overflow-hidden relative group cursor-pointer"
      onClick={() => handleImageClick(items[0])}
    >
      <img
        src={items[0]?.image}
        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
      />
    </div>

    {/* Screens */}
    <div
      className="h-[220px] rounded-3xl overflow-hidden relative group cursor-pointer"
      onClick={() => handleImageClick(items[5])}
    >
      <img
        src={items[5]?.image}
        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
      />
    </div>

  </div>

  {/* Right */}
  <div className="col-span-12 lg:col-span-6 grid grid-cols-2 gap-4">

    {items.slice(1, 5).map((it) => (
      <div
        key={it.id}
        className="h-[340px] rounded-3xl overflow-hidden relative group cursor-pointer"
        onClick={() => handleImageClick(it)}
      >
        <img
          src={it.image}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
        />
      </div>
    ))}

  </div>

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
