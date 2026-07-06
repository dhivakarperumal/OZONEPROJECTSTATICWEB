import React, { useState, useEffect } from "react";
import PageContainer from "../CommenComponents/PageContainer";
import PageHeader from "../CommenComponents/PageHeader";
import { galleryItems } from "../data/gallery";
import { X, CheckCircle, Users, Award, Zap } from "lucide-react";
import { Link } from "react-router-dom";

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
      <PageHeader title="Gallery" />

      <PageContainer className="py-12">

        {/* Gallery Section Header */}
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

        {/* Gallery Grid */}

        <div className={filter === "All" ? "grid grid-cols-1 lg:grid-cols-12 gap-4" : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 auto-rows-[200px]"}>

          {filter === "All" ? (
            <>
              {/* Left */}
              <div className="col-span-1 lg:col-span-6 flex flex-col gap-4">

                {/* Featured 1 */}
                <div
                  className="h-[300px] sm:h-[380px] lg:h-[460px] rounded-3xl overflow-hidden relative group cursor-pointer"
                  onClick={() => handleImageClick(items[0])}
                >
                  <img
                    src={items[0]?.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  {items[0]?.featured && (
                    <div className="absolute top-4 left-4 z-10 bg-white text-sm px-3 py-1.5 rounded-full text-slate-800 font-semibold tracking-wider shadow-lg">
                      {items[0]?.category}
                    </div>
                  )}
                </div>

                {/* Featured 2 */}
                <div
                  className="h-[200px] sm:h-[250px] lg:h-[220px] rounded-3xl overflow-hidden relative group cursor-pointer"
                  onClick={() => handleImageClick(items[5])}
                >
                  <img
                    src={items[5]?.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  {items[5]?.featured && (
                    <div className="absolute top-4 left-4 z-10 bg-white text-sm px-3 py-1.5 rounded-full text-slate-800 font-semibold tracking-wider shadow-lg">
                      {items[5]?.category}
                    </div>
                  )}
                </div>

              </div>

              {/* Right */}
              <div className="col-span-1 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

                {items.slice(1, 5).map((it) => (
                  <div
                    key={it.id}
                    className="h-[220px] sm:h-[280px] lg:h-[340px] rounded-3xl overflow-hidden relative group cursor-pointer"
                    onClick={() => handleImageClick(it)}
                  >
                    <img
                      src={it.image}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />
                    {it.featured && (
                      <div className="absolute top-4 left-4 z-10 bg-white text-sm px-3 py-1.5 rounded-full text-slate-800 font-semibold tracking-wider shadow-lg">
                        {it.category}
                      </div>
                    )}
                  </div>
                ))}

              </div>
            </>
          ) : (
            // Category view - square images
            items.map((it) => (
              <div
                key={it.id}
                className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm group"
              >
                <img src={it.image} alt={it.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e)=>e.target.style.display='none'} />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full text-white">
                    <p className="text-sm font-bold">{it.title}</p>
                    <p className="text-[11px] uppercase tracking-wider text-white/70">{it.category}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

         {/* Intro Section */}
        <div className="mb-16 mt-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-black text-heading mb-4">
                Premium Quality Products & Installation
              </h2>
              <p className="text-lg text-slate-600 mb-4">
                Welcome to Ozone's comprehensive gallery showcasing our diverse range of high-quality windows, railings, doors, shutters, balcony solutions, and protective screens. Each project demonstrates our commitment to excellence and customer satisfaction.
              </p>
              <p className="text-slate-600 mb-6">
                Explore our portfolio to see how we transform spaces with innovative designs and superior craftsmanship. Whether you're looking for modern aesthetics or traditional elegance, our products combine durability, functionality, and style.
              </p>
              <div className="flex gap-4">
                <Link to="/quote" className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition">
                  Get Free Quote
                </Link>
                <Link to="/contact" className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <h3 className="font-bold text-heading text-2xl">100%</h3>
                  <p className="text-sm text-slate-600">Quality Assured</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <h3 className="font-bold text-heading text-2xl">Expert</h3>
                  <p className="text-sm text-slate-600">Installation</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <h3 className="font-bold text-heading text-2xl">Custom</h3>
                  <p className="text-sm text-slate-600">Solutions</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <h3 className="font-bold text-heading text-2xl">24/7</h3>
                  <p className="text-sm text-slate-600">Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-16 py-12 border-y border-gray-200">
          <div className="text-center">
            <div className="text-5xl font-black text-primary mb-2">2000+</div>
            <p className="text-slate-600 font-semibold">Installations</p>
            <p className="text-sm text-slate-500 mt-1">Completed Projects</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-black text-primary mb-2">15+</div>
            <p className="text-slate-600 font-semibold">Years Experience</p>
            <p className="text-sm text-slate-500 mt-1">Industry Leadership</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-black text-primary mb-2">5000+</div>
            <p className="text-slate-600 font-semibold">Happy Customers</p>
            <p className="text-sm text-slate-500 mt-1">Satisfied Clients</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-black text-primary mb-2">6</div>
            <p className="text-slate-600 font-semibold">Product Categories</p>
            <p className="text-sm text-slate-500 mt-1">Complete Solutions</p>
          </div>
        </div>

        {/* Category Descriptions Section */}
        <div className="my-20">
          <h2 className="text-4xl font-black text-heading mb-12 text-center">Our Product Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Windows", desc: "Premium sliding, casement, and decorative window systems designed for maximum light and ventilation." },
              { name: "Railings", desc: "Modern glass and stainless steel railings that provide safety without compromising aesthetics." },
              { name: "Doors", desc: "Elegant sliding, folding, and French doors perfect for seamless indoor-outdoor transitions." },
              { name: "Shutters", desc: "Functional and decorative shutters offering privacy, light control, and style enhancement." },
              { name: "Balcony", desc: "Complete balcony enclosure and safety mesh solutions for secure outdoor living spaces." },
              { name: "Screens", desc: "High-quality mosquito mesh and security screens protecting your home from insects and intruders." }
            ].map((cat, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="text-primary" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-heading mb-3">{cat.name}</h3>
                <p className="text-slate-600 leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="my-20 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-12">
          <h2 className="text-4xl font-black text-heading mb-12 text-center">Why Choose Ozone</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Premium Quality", desc: "Certified materials and expert craftsmanship" },
              { icon: Zap, title: "Fast Installation", desc: "Quick turnaround without compromising quality" },
              { icon: Users, title: "Expert Team", desc: "Experienced professionals with 15+ years expertise" },
              { icon: CheckCircle, title: "Warranty Backed", desc: "Comprehensive warranty on all products" }
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Icon className="text-primary" size={32} />
                  </div>
                  <h3 className="font-bold text-heading mb-2">{feat.title}</h3>
                  <p className="text-sm text-slate-600">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="my-20">
          <h2 className="text-4xl font-black text-heading mb-12 text-center">Customer Reviews</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Rajesh Kumar", city: "Mumbai", review: "Outstanding quality and excellent installation service. Highly recommended!", rating: 5 },
              { name: "Priya Sharma", city: "Delhi", review: "The best windows and railings I've seen. Professional team and great after-sales support.", rating: 5 },
              { name: "Vikram Patel", city: "Bangalore", review: "Impressed with the quality and durability. Great value for money!", rating: 5 }
            ].map((test, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                <div className="flex gap-1 mb-4">
                  {[...Array(test.rating)].map((_, j) => (
                    <span key={j} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-slate-600 mb-4 italic">"{test.review}"</p>
                <div className="border-t pt-4">
                  <p className="font-bold text-heading">{test.name}</p>
                  <p className="text-sm text-slate-500">{test.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="my-20 bg-gradient-to-r from-primary to-secondary rounded-3xl p-16 text-white text-center">
          <h2 className="text-4xl font-black mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
            Get a free consultation and quote from our expert team. Let's create something beautiful together!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/quote" className="px-8 py-4 bg-white text-primary rounded-lg font-bold hover:bg-gray-100 transition">
              Get Free Quote
            </Link>
            <Link to="/contact" className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition">
              Contact Us Now
            </Link>
          </div>
        </div>

        {/* Modal / Detail */}
        {modal && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setModal(null)}>
            <div className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setModal(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center z-20">
                <X size={18} />
              </button>

              <img src={modal.image} alt={modal.title} className="w-full h-72 object-cover bg-gray-100" onError={(e) => e.target.style.display = 'none'} />
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
