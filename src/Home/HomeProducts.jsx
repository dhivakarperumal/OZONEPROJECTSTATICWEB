import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import productsData from "../data/products.json";

const categories = ["All", ...new Set(productsData.map((p) => p.category))];

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const ProductCard = ({ product, delay }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <FadeIn delay={delay}>
      <div
        className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div className="relative overflow-hidden h-56 bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.src = "https://placehold.co/400x300/e6f4ed/0c5940?text=Ozone+Product";
            }}
          />
          {/* Gradient overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-400 ${hovered ? "opacity-100" : "opacity-0"}`}></div>

          {/* Badge */}
          <div className={`absolute top-3 left-3 ${product.badgeColor} text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md`}>
            {product.badge}
          </div>

          {/* Category tag */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
            {product.category}
          </div>

          {/* Quick view button on hover */}
          <div className={`absolute bottom-3 left-0 right-0 flex justify-center transition-all duration-400 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Link
              to="/products"
              className="flex items-center gap-1.5 bg-white text-[#0c5940] text-xs font-bold px-5 py-2 rounded-full shadow-lg hover:bg-[#0c5940] hover:text-white transition"
            >
              View Details <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-[var(--primary)] mb-2 group-hover:text-[#0c5940] transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
            {product.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {product.features.map((f, i) => (
              <div key={i} className="flex items-center gap-1 text-[11px] font-semibold text-[#0c5940] bg-[#e6f4ed] px-2.5 py-1 rounded-full">
                <CheckCircle2 size={11} />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

const HomeProducts = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? productsData.slice(0, 8)
      : productsData.filter((p) => p.category === activeCategory);

  return (
    <section className="py-20 bg-[var(--background)] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <FadeIn>
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e6f4ed] border border-[#0c5940]/20 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#0c5940] animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest text-[#0c5940] uppercase">Our Products</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[var(--primary)] mb-4 leading-tight">
              Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0c5940] to-[var(--secondary)]">Fitment Systems</span>
            </h2>
            <p className="text-gray-500 text-base max-w-2xl">
              Explore our complete range of architecturally designed fitment systems and hardware solutions — crafted for precision, durability and beauty.
            </p>
          </div>
        </FadeIn>

        {/* Category Filter */}
        <FadeIn delay={100}>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#0c5940] text-white border-[#0c5940] shadow-lg shadow-[#0c5940]/20"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#0c5940] hover:text-[#0c5940]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} delay={i * 80} />
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={200}>
          <div className="text-center">
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#0c5940] to-[#13328D] hover:from-[#094230] hover:to-[#081A59] text-white rounded-full font-bold text-sm tracking-wide transition-all duration-300 shadow-xl shadow-[#0c5940]/30 hover:shadow-[#0c5940]/50 hover:scale-105"
            >
              View All Products
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition">
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
          </div>
        </FadeIn>

      </div>
    </section>
  );
};

export default HomeProducts;
