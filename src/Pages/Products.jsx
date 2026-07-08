import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageContainer from "../CommenComponents/PageContainer";
import PageHeader from "../CommenComponents/PageHeader";
import {ArrowRight, ArrowUpRight, CheckCircle2 , Search, Filter, ChevronRight, SlidersHorizontal, Check, ChevronLeft, X } from "lucide-react";
import productsData from "../data/products.json";
import { Link, useLocation } from "react-router-dom";

export default function Products() {
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState(0);


  const FadeIn = ({ children, delay = 0, className = "" }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setVisible(true),
        { threshold: 0.15 }
      );

      observer.observe(el);

      return () => observer.disconnect();
    }, []);

    return (
      <div
        ref={ref}
        className={`transition-all duration-700 ${className}`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transitionDelay: `${delay}ms`,
        }}
      >
        {children}
      </div>
    );
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(
    location.state?.category || "All"
  );
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const itemsPerPage = showFilters ? 9 : 8;
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setSelectedImage(0);
  }, [selectedProduct]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location.state?.category) {
      setActiveCategory(location.state.category);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location.state]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory, showFilters]);

  const categories = ["All", ...new Set(productsData.map((p) => p.category))];

  const filteredProducts = productsData.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProduct]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 300, behavior: 'smooth' }); // scroll back to top of grid
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50/50"
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
    >
      <PageHeader title="Our Products" />

      <AnimatePresence>
        {loading && (
          <>
            {/* Left Curtain */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.8 }}
              className="fixed top-0 left-0 w-1/2 h-screen bg-[#0c5940]/30 z-[9999]"
            />

            {/* Right Curtain */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "100%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8 }}
              className="fixed top-0 right-0 w-1/2 h-screen bg-[#08124E]/30 z-[9999]"
            />
          </>
        )}
      </AnimatePresence>

      <PageContainer>
        <div className="py-12 md:py-16">
          {/* Header */}
          <FadeIn delay={100}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Premium Fitment Solutions
                </h2>
                <p className="text-gray-500 mt-2 text-lg">
                  Discover our range of high-quality architectural hardware.
                </p>
              </div>

              <div className="w-full md:w-auto flex justify-end">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border transition-all shadow-sm font-medium ${showFilters
                    ? "bg-[#0c5940] text-white border-[#0c5940]"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className={`flex flex-col lg:flex-row transition-all duration-300 ${showFilters ? 'gap-8 lg:gap-12' : 'gap-0'}`}>
              {/* Left Sidebar - Filters */}
              <aside
                className={`flex-shrink-0 transition-all duration-300 ease-in-out origin-left ${showFilters ? "opacity-100 lg:w-1/4 max-h-[2000px]" : "opacity-0 lg:w-0 overflow-hidden max-h-0 lg:max-h-none p-0 m-0 border-0"
                  }`}
              >
                <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24 ${!showFilters && 'hidden lg:block lg:invisible'}`}>

                  {/* Search */}
                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Search className="w-4 h-4 text-[#0c5940]" />
                      Search
                    </h3>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c5940]/20 focus:border-[#0c5940] transition-all text-sm"
                      />
                    </div>
                  </div>

                  <hr className="border-gray-100 mb-8" />

                  {/* Categories */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Filter className="w-4 h-4 text-[#0c5940]" />
                      Categories
                    </h3>
                    <div className="space-y-1">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setActiveCategory(category)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeCategory === category
                            ? "bg-[#0c5940]/10 text-[#0c5940]"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        >
                          {category}
                          {activeCategory === category && (
                            <Check className="w-4 h-4 text-[#0c5940]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>

              {/* Right Side - Products Grid */}
              <main className={`flex-grow transition-all duration-300 ${showFilters ? "lg:w-3/4" : "lg:w-full"}`}>
                <div className="mb-6 flex justify-between items-center text-sm text-gray-500">
                  <span>
                    Showing {filteredProducts.length === 0 ? 0 : startIndex + 1}-
                    {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} results
                  </span>
                  {activeCategory !== "All" && (
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                      Category: {activeCategory}
                    </span>
                  )}
                </div>

                {filteredProducts.length > 0 ? (
                  <>
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${showFilters ? 'xl:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-4'}`}>
                      {currentProducts.map((product) => (
                        <div
                          key={product.id}
                          className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col"
                        >
                          <div className="relative h-62 overflow-hidden bg-gray-100">
                            <img
                              src={
                                Array.isArray(product.image)
                                  ? product.image?.[0]
                                  : product.image
                              }
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-4 left-4">
                              <span
                                className={`${product.badgeColor} text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md uppercase tracking-wider`}
                              >
                                {product.badge}
                              </span>
                            </div>
                          </div>

                          <div className="p-5 flex flex-col flex-grow">
                            <div className="mb-3">
                              <span className="text-[#0c5940] text-[10px] font-semibold uppercase tracking-wider mb-1 block">
                                {product.category}
                              </span>
                              <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0c5940] transition-colors line-clamp-1">
                                {product.name}
                              </h3>
                            </div>

                            <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow leading-relaxed">
                              {product.description}
                            </p>

                            <div className="space-y-2 mb-5">
                              {product.features.slice(0, 3).map((feature, idx) => (
                                <div key={idx} className="flex items-center text-xs text-gray-600 font-medium">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#0c5940]/50 mr-2" />
                                  {feature}
                                </div>
                              ))}
                            </div>

                            <div className="pt-4 border-t border-gray-100 mt-auto">
                              <button
                                onClick={() => setSelectedProduct(product)}
                                className="w-full py-2.5 px-4 bg-gray-50 hover:bg-[#0c5940] text-gray-700 hover:text-white rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                              >
                                View Details
                                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="mt-12 flex justify-center items-center gap-2">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`p-2 rounded-lg border flex items-center justify-center transition-all ${currentPage === 1
                            ? "border-gray-200 text-gray-300 cursor-not-allowed"
                            : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                            }`}
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-all flex items-center justify-center ${currentPage === page
                              ? "bg-[#0c5940] text-white shadow-md shadow-[#0c5940]/20"
                              : "border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                              }`}
                          >
                            {page}
                          </button>
                        ))}

                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`p-2 rounded-lg border flex items-center justify-center transition-all ${currentPage === totalPages
                            ? "border-gray-200 text-gray-300 cursor-not-allowed"
                            : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                            }`}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-500">
                      We couldn't find any products matching "{searchTerm}" in {activeCategory}.
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setActiveCategory("All");
                      }}
                      className="mt-6 px-6 py-2 bg-[#0c5940] text-white rounded-full text-sm font-medium hover:bg-[#09422f] transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </main>
            </div>
          </FadeIn>
        </div>
      </PageContainer>
      {/* Premium Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="min-h-screen flex items-start lg:items-center justify-center p-3 md:p-6">

            <div className="relative bg-white w-full max-w-7xl h-[95vh] md:h-[95vh] rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.35)] flex flex-col">

              {/* Close */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-red-50 transition"
              >
                <X size={22} className="text-gray-700" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 h-full overflow-y-auto lg:overflow-hidden">

                {/* ===========================
              LEFT IMAGE SECTION
        =========================== */}

                <div className="relative bg-gradient-to-br from-[#eef8f4] via-white to-[#eef7ff] p-5 lg:p-8 flex flex-col shrink-0">

                  {/* Badge */}

                  <div className="flex flex-wrap items-center gap-3 mb-6">

                    <span
                      className={`${selectedProduct.badgeColor} px-3 py-1 rounded-full text-white text-[10px] md:px-4 md:py-1.5 md:text-xs font-bold uppercase tracking-wider`}
                    >
                      {selectedProduct.badge}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-[#e6f4ed] text-[#0c5940] text-[10px] md:px-4 md:py-1.5 md:text-xs font-bold uppercase tracking-wider">
                      {selectedProduct.category}
                    </span>

                    <span className="ml-auto px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] md:px-4 md:py-1.5 md:text-xs font-bold">
                      {selectedProduct.warranty}
                    </span>

                  </div>

                  {/* Main Image */}

                  <div className="flex-1 flex items-center justify-center">

                    <div className="relative w-full h-full flex items-center justify-center">

                      <div className="absolute w-[240px] h-[240px] md:w-[380px] md:h-[380px] rounded-full bg-[#0c5940]/5 blur-3xl"></div>

                      <img
                        src={
                          Array.isArray(selectedProduct.image)
                            ? selectedProduct.image[selectedImage]
                            : selectedProduct.image
                        }
                        alt={selectedProduct.name}
                        className="relative max-h-[260px] md:max-h-[430px] object-contain transition duration-500 hover:scale-105"
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
                              className={`w-14 h-14 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-md

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

                <div className="overflow-y-visible lg:overflow-y-auto p-5 lg:p-10">
                  {/* Product Header */}

                  <div className="mb-8">

                    <h2 className="text-2xl md:text-4xl font-black text-[var(--primary)] leading-tight">
                      {selectedProduct.name}
                    </h2>

                    <p className="mt-3 text-sm md:text-lg text-[#0c5940] font-semibold">
                      {selectedProduct.shortDescription}
                    </p>

                    <p className="mt-5 text-gray-600 text-sm md:text-base leading-6 md:leading-8">
                      {selectedProduct.description}
                    </p>

                  </div>

                  {/* Quick Info */}

                  <div className="grid grid-cols-2 gap-4 mb-8">

                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-3 md:p-4">
                      <p className="text-xs uppercase tracking-wider text-gray-500">
                        Product Size
                      </p>

                      <p className="font-bold text-gray-800 mt-2 text-sm md:text-base">
                        {selectedProduct.sizes}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                      <p className="text-xs uppercase tracking-wider text-gray-500">
                        Warranty
                      </p>

                      <p className="font-bold text-[#0c5940] mt-2 text-sm md:text-base">
                        {selectedProduct.warranty}
                      </p>
                    </div>

                  </div>

                  {/* Features */}

                  <div className="mb-10">

                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-5">
                      Key Features
                    </h3>

                    <div className="grid md:grid-cols-2 gap-3">

                      {selectedProduct.features.map((feature, index) => (

                        <div
                          key={index}
                          className="flex items-center gap-3 rounded-xl bg-[#f6fbf8] border border-[#d8efe5] px-3 py-2 md:px-4 md:py-3"
                        >

                          <CheckCircle2
                            size={16}
                            className="text-[#0c5940] shrink-0"
                          />

                          <span className="text-gray-700 text-xs md:text-sm font-medium">
                            {feature}
                          </span>

                        </div>

                      ))}

                    </div>

                  </div>

                  {/* Specifications */}

                  <div className="mb-10">

                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-5">
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

                          <p className="mt-2 font-semibold text-gray-800 text-sm md:text-base">
                            {value}
                          </p>

                        </div>

                      ))}

                    </div>

                  </div>

                  {/* Applications & Advantages */}

                  <div className="grid lg:grid-cols-2 gap-8 mb-10">

                    <div>

                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                        Applications
                      </h3>

                      <div className="space-y-3">

                        {selectedProduct.applications.map((item, i) => (

                          <div
                            key={i}
                            className="flex items-center gap-3"
                          >

                            <CheckCircle2
                              size={16}
                              className="text-blue-600"
                            />

                            <span className="text-gray-700 text-sm md:text-base">
                              {item}
                            </span>

                          </div>

                        ))}

                      </div>

                    </div>

                    <div>

                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                        Advantages
                      </h3>

                      <div className="space-y-3">

                        {selectedProduct.advantages.map((item, i) => (

                          <div
                            key={i}
                            className="flex items-center gap-3"
                          >

                            <CheckCircle2
                              size={16}
                              className="text-green-600"
                            />

                            <span className="text-gray-700 text-sm md:text-base">
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

                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                        Product Tags
                      </h3>

                      <div className="flex flex-wrap gap-3">

                        {selectedProduct.seo.keywords.map((keyword, index) => (

                          <span
                            key={index}
                            className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gray-100 text-gray-700 text-xs md:text-sm font-medium"
                          >
                            #{keyword}
                          </span>

                        ))}

                      </div>

                    </div>

                  )}

                  {/* Bottom CTA */}

                  <div className="rounded-3xl bg-gradient-to-r from-[#0c5940] via-[#10694b] to-[#13328D] p-8 text-white">

                    <h3 className="text-lg md:text-2xl font-bold mb-2">
                      Interested in this product?
                    </h3>

                    <p className="text-white/80 text-sm md:text-base mb-6">
                      Get premium quality products with expert installation and professional
                      support. Contact us today for a free consultation.
                    </p>

                    <div className="flex flex-wrap gap-4">

                      <Link
                        to="/products"
                        onClick={() => setSelectedProduct(null)}
                        className="inline-flex items-center gap-2 bg-white text-[#0c5940] px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold hover:scale-105 transition"
                      >
                        View All Products
                        <ArrowRight size={18} />
                      </Link>

                      <Link
                        to="/contact"
                        onClick={() => setSelectedProduct(null)}
                        className="inline-flex items-center gap-2 border border-white/40 px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold hover:bg-white/10 transition"
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
        </div>

      )}
    </motion.div>
  );
}
