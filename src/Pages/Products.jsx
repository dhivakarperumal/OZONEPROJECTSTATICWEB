import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import PageContainer from "../CommenComponents/PageContainer";
import PageHeader from "../CommenComponents/PageHeader";
import { Search, Filter, ChevronRight, SlidersHorizontal, Check, ChevronLeft, X, CheckCircle2 } from "lucide-react";
import productsData from "../data/products.json";

export default function Products() {
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
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const itemsPerPage = showFilters ? 9 : 8;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

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
                              src={Array.isArray(product.image) ? product.image[0] : product.image}
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-md transition-all duration-500 ease-out">
          {/* Backdrop */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setSelectedProduct(null)}
          ></div>

          <div
            className="relative bg-white rounded-[2rem] shadow-2xl shadow-slate-900/20 w-full max-w-5xl max-h-[90vh] min-h-[60vh] overflow-hidden flex flex-col lg:flex-row animate-in fade-in zoom-in-[0.98] slide-in-from-bottom-4 duration-500 ease-out ring-1 ring-black/5"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 z-20 p-3 bg-white/90 hover:bg-[#0c5940] hover:text-white text-gray-500 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 group"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Left Image Side */}
            <div className="w-full lg:w-1/2 h-72 lg:h-auto relative overflow-hidden bg-gray-50 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10"></div>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              {/* Badges on Image */}
              <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                <span className={`${selectedProduct.badgeColor} text-white text-xs font-black px-4 py-2 rounded-full shadow-lg backdrop-blur-md uppercase tracking-widest border border-white/20`}>
                  {selectedProduct.badge}
                </span>
              </div>

              {/* Overlay Category */}
              <div className="absolute bottom-6 left-8 z-20">
                <span className="text-white/90 text-sm font-semibold uppercase tracking-widest mb-1 block drop-shadow-md">
                  Category
                </span>
                <span className="text-white text-2xl font-bold drop-shadow-lg">
                  {selectedProduct.category}
                </span>
              </div>
            </div>

            {/* Right Content Side */}
            <div className="w-full lg:w-1/2 flex flex-col bg-white relative overflow-y-auto custom-scrollbar">
              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0c5940]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              <div className="p-8 lg:p-12 flex flex-col flex-grow z-10 relative">

                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
                    {selectedProduct.name}
                  </h2>
                  <div className="w-16 h-1.5 bg-gradient-to-r from-[#0c5940] to-emerald-400 rounded-full"></div>
                </div>

                {/* Description */}
                <div className="mb-10">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-10 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900 mb-5 uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#0c5940]" />
                    Product Specifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                    {selectedProduct.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 rounded-full bg-[#0c5940] mr-3 shadow-[0_0_8px_rgba(12,89,64,0.5)]" />
                        <span className="font-medium text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contact"
                    className="flex-1 bg-gradient-to-r from-[#0c5940] to-[#0a4632] hover:from-[#09422f] hover:to-[#073526] text-white py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 shadow-[0_8px_20px_rgba(12,89,64,0.25)] hover:shadow-[0_12px_25px_rgba(12,89,64,0.35)] hover:-translate-y-1 flex items-center justify-center gap-2 group"
                  >
                    Request a Quote
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="sm:flex-none px-8 py-4 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </motion.div>
  );
}
