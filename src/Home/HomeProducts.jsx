import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
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

const ProductCard = ({ product, onQuickView }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_-12px_rgba(12,89,64,0.18)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative h-62 overflow-hidden bg-gray-100">
        <img
          src={Array.isArray(product.image) ? product.image[0] : product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.src = "https://placehold.co/400x300/e6f4ed/0c5940?text=Ozone+Product";
          }}
        />
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-400 ${hovered ? "opacity-100" : "opacity-0"}`}></div>
        <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent transition-all duration-500 group-hover:ring-[#0c5940]/10" />

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
          <button
            onClick={() => onQuickView(product)}
            className="flex items-center gap-1.5 bg-white text-[#0c5940] text-xs font-bold px-5 py-2 rounded-full shadow-lg hover:bg-[#0c5940] hover:text-white transition"
          >
            Quick View <ArrowUpRight size={13} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-[var(--primary)] mb-2 group-hover:text-[#0c5940] transition-colors">
          {product.name}
        </h3>
        {/* <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
          {product.description}
        </p> */}

        {/* Features */}
        <div className="flex flex-col gap-2 mt-auto">
          {product.features.slice(0, 5).map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-[11px] font-semibold text-[#0c5940] bg-[#e6f4ed] px-2.5 py-1.5 rounded-full w-fit"
            >
              <CheckCircle2 size={11} />
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const HomeProducts = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setSelectedImage(0);
  }, [selectedProduct]);

  const filtered =
    activeCategory === "All"
      ? productsData
      : productsData.filter((p) => p.category === activeCategory);

  return (
    <section className="py-20 bg-[var(--background)] overflow-hidden">
      <style>{`
        .products-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d1d5db;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .products-swiper .swiper-pagination-bullet-active {
          width: 28px;
          border-radius: 4px;
          background: #0c5940;
        }
        .products-swiper .swiper-slide {
          height: auto;
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <FadeIn>
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e6f4ed] border border-[#0c5940]/20 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#0c5940] animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest text-[#0c5940] uppercase">Our Products</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[var(--primary)] mb-4 leading-tight">
              Premium <span
                className="text-transparent bg-clip-text font-bold"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #0c5940 0%, #0ea5e9 45%, #22c55e 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  WebkitTextStroke: "0.8px rgba(0,0,0,0.15)",
                  textShadow: "0 3px 10px rgba(0,0,0,0.35)",
                }}
              >
                Fitment Systems
              </span>
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
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${activeCategory === cat
                  ? "bg-[#0c5940] text-white border-[#0c5940] shadow-lg shadow-[#0c5940]/20"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#0c5940] hover:text-[#0c5940]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Swiper Carousel */}
        <FadeIn delay={150}>
          <div className="relative">
            {/* Custom Navigation Buttons */}
            <button
              ref={prevRef}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20 w-12 h-12 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center text-[#0c5940] hover:bg-[#0c5940] hover:text-white transition-all duration-300 hover:scale-110 hidden sm:flex"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              ref={nextRef}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20 w-12 h-12 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center text-[#0c5940] hover:bg-[#0c5940] hover:text-white transition-all duration-300 hover:scale-110 hidden sm:flex"
            >
              <ChevronRight size={22} />
            </button>

            <Swiper
              key={activeCategory}
              className="products-swiper !pb-12"
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              loop={filtered.length > 3}
              autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onSwiper={(swiper) => {
                // Re-init navigation after mount so refs are attached
                setTimeout(() => {
                  if (swiper.params?.navigation) {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.destroy();
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }
                }, 0);
              }}
              breakpoints={{
                480: { slidesPerView: 1.3, centeredSlides: true },
                640: { slidesPerView: 2, centeredSlides: false },
                1024: { slidesPerView: 3, centeredSlides: false },
                1280: { slidesPerView: 4, centeredSlides: false },
              }}
            >
              {filtered.map((product) => (
                <SwiperSlide key={product.id} className="h-auto">
                  <ProductCard product={product} onQuickView={setSelectedProduct} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={200}>
          <div className="text-center mt-4">
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

      {/* Product Modal */}

      {selectedProduct && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 md:p-6">

          <div className="relative bg-white w-full max-w-7xl h-[95vh] rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.35)]">

            {/* Close */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-red-50 transition"
            >
              <X size={22} className="text-gray-700" />
            </button>

            <div className="grid lg:grid-cols-2 h-full">

              {/* ===========================
              LEFT IMAGE SECTION
        =========================== */}

              <div className="relative bg-gradient-to-br from-[#eef8f4] via-white to-[#eef7ff] p-6 lg:p-8 flex flex-col">

                {/* Badge */}

                <div className="flex flex-wrap items-center gap-3 mb-6">

                  <span
                    className={`${selectedProduct.badgeColor} px-4 py-1.5 rounded-full text-white text-xs font-bold uppercase tracking-wider`}
                  >
                    {selectedProduct.badge}
                  </span>

                  <span className="px-4 py-1.5 rounded-full bg-[#e6f4ed] text-[#0c5940] text-xs font-bold uppercase tracking-wider">
                    {selectedProduct.category}
                  </span>

                  <span className="ml-auto px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                    {selectedProduct.warranty}
                  </span>

                </div>

                {/* Main Image */}

                <div className="flex-1 flex items-center justify-center">

                  <div className="relative w-full h-full flex items-center justify-center">

                    <div className="absolute w-[380px] h-[380px] rounded-full bg-[#0c5940]/5 blur-3xl"></div>

                    <img
                      src={
                        Array.isArray(selectedProduct.image)
                          ? selectedProduct.image[selectedImage]
                          : selectedProduct.image
                      }
                      alt={selectedProduct.name}
                      className="relative max-h-[430px] object-contain transition duration-500 hover:scale-105"
                    />
                  </div>
                </div>

                {/* Thumbnails */}
                {Array.isArray(selectedProduct.image) &&
                  selectedProduct.image.length > 1 && (
                    <div className="mt-6">
                      <h5 className="text-sm font-semibold text-gray-700 mb-3">
                        Product Images
                      </h5>
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {selectedProduct.image.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-md

    ${selectedImage === index
                                ? "border-[#0c5940] scale-105"
                                : "border-gray-200 hover:border-[#0c5940]"
                              }
  `}
                          >
                            <img
                              src={img}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
              </div>

              {/* ===========================
              RIGHT CONTENT SECTION
        =========================== */}

              <div className="overflow-y-auto p-7 lg:p-10">
                {/* Product Header */}

                <div className="mb-8">

                  <h2 className="text-4xl font-black text-[var(--primary)] leading-tight">
                    {selectedProduct.name}
                  </h2>

                  <p className="mt-3 text-lg text-[#0c5940] font-semibold">
                    {selectedProduct.shortDescription}
                  </p>

                  <p className="mt-5 text-gray-600 leading-8">
                    {selectedProduct.description}
                  </p>

                </div>

                {/* Quick Info */}

                <div className="grid grid-cols-2 gap-4 mb-8">

                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Product Size
                    </p>

                    <p className="font-bold text-gray-800 mt-2">
                      {selectedProduct.sizes}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Warranty
                    </p>

                    <p className="font-bold text-[#0c5940] mt-2">
                      {selectedProduct.warranty}
                    </p>
                  </div>

                </div>

                {/* Features */}

                <div className="mb-10">

                  <h3 className="text-xl font-bold text-gray-900 mb-5">
                    Key Features
                  </h3>

                  <div className="grid md:grid-cols-2 gap-3">

                    {selectedProduct.features.map((feature, index) => (

                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-xl bg-[#f6fbf8] border border-[#d8efe5] px-4 py-3"
                      >

                        <CheckCircle2
                          size={18}
                          className="text-[#0c5940] shrink-0"
                        />

                        <span className="text-gray-700 text-sm font-medium">
                          {feature}
                        </span>

                      </div>

                    ))}

                  </div>

                </div>

                {/* Specifications */}

                <div className="mb-10">

                  <h3 className="text-xl font-bold text-gray-900 mb-5">
                    Specifications
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">

                    {Object.entries(selectedProduct.specification).map(([key, value]) => (

                      <div
                        key={key}
                        className="rounded-2xl border border-gray-200 p-4 hover:border-[#0c5940] transition"
                      >

                        <p className="text-xs uppercase tracking-wider text-gray-500">

                          {key.replace(/([A-Z])/g, " $1")}

                        </p>

                        <p className="mt-2 font-semibold text-gray-800">
                          {value}
                        </p>

                      </div>

                    ))}

                  </div>

                </div>

                {/* Applications & Advantages */}

                <div className="grid lg:grid-cols-2 gap-8 mb-10">

                  <div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Applications
                    </h3>

                    <div className="space-y-3">

                      {selectedProduct.applications.map((item, i) => (

                        <div
                          key={i}
                          className="flex items-center gap-3"
                        >

                          <CheckCircle2
                            size={17}
                            className="text-blue-600"
                          />

                          <span className="text-gray-700">
                            {item}
                          </span>

                        </div>

                      ))}

                    </div>

                  </div>

                  <div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Advantages
                    </h3>

                    <div className="space-y-3">

                      {selectedProduct.advantages.map((item, i) => (

                        <div
                          key={i}
                          className="flex items-center gap-3"
                        >

                          <CheckCircle2
                            size={17}
                            className="text-green-600"
                          />

                          <span className="text-gray-700">
                            {item}
                          </span>

                        </div>

                      ))}

                    </div>

                  </div>

                </div>

                {/* SEO Keywords */}

                {selectedProduct.seo?.keywords && (

                  <div className="mb-10">

                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Product Tags
                    </h3>

                    <div className="flex flex-wrap gap-3">

                      {selectedProduct.seo.keywords.map((keyword, index) => (

                        <span
                          key={index}
                          className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium"
                        >
                          #{keyword}
                        </span>

                      ))}

                    </div>

                  </div>

                )}

                {/* Bottom CTA */}

                <div className="rounded-3xl bg-gradient-to-r from-[#0c5940] via-[#10694b] to-[#13328D] p-8 text-white">

                  <h3 className="text-2xl font-bold mb-2">
                    Interested in this product?
                  </h3>

                  <p className="text-white/80 mb-6">
                    Get premium quality products with expert installation and professional
                    support. Contact us today for a free consultation.
                  </p>

                  <div className="flex flex-wrap gap-4">

                    <Link
                      to="/products"
                      onClick={() => setSelectedProduct(null)}
                      className="inline-flex items-center gap-2 bg-white text-[#0c5940] px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
                    >
                      View All Products
                      <ArrowRight size={18} />
                    </Link>

                    <Link
                      to="/contact"
                      onClick={() => setSelectedProduct(null)}
                      className="inline-flex items-center gap-2 border border-white/40 px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition"
                    >
                      Contact Us
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
              {/* End Right Side */}
            </div>
          </div>
        </div>

      )}
    </section>
  );
};

export default HomeProducts;
