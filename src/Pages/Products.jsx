import React, { useState, useEffect } from "react";
import PageContainer from "../CommenComponents/PageContainer";
import PageHeader from "../CommenComponents/PageHeader";
import { Search, Filter, ChevronRight, SlidersHorizontal, Check, ChevronLeft } from "lucide-react";
import productsData from "../data/products.json";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 300, behavior: 'smooth' }); // scroll back to top of grid
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <PageHeader title="Our Products" />
      
      <PageContainer>
        <div className="py-12 md:py-16">
          {/* Header */}
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
                className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border transition-all shadow-sm font-medium ${
                  showFilters
                    ? "bg-[#0c5940] text-white border-[#0c5940]"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <SlidersHorizontal className="w-5 h-5" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
            </div>
          </div>

          <div className={`flex flex-col lg:flex-row transition-all duration-300 ${showFilters ? 'gap-8 lg:gap-12' : 'gap-0'}`}>
            {/* Left Sidebar - Filters */}
            <aside 
              className={`flex-shrink-0 transition-all duration-300 ease-in-out origin-left ${
                showFilters ? "opacity-100 lg:w-1/4 max-h-[2000px]" : "opacity-0 lg:w-0 overflow-hidden max-h-0 lg:max-h-none p-0 m-0 border-0"
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
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                          activeCategory === category
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
                        <div className="relative h-56 overflow-hidden bg-gray-100">
                          <img
                            src={product.image}
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
                            <button className="w-full py-2.5 px-4 bg-gray-50 hover:bg-[#0c5940] text-gray-700 hover:text-white rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 group/btn">
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
                        className={`p-2 rounded-lg border flex items-center justify-center transition-all ${
                          currentPage === 1 
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
                          className={`w-10 h-10 rounded-lg text-sm font-medium transition-all flex items-center justify-center ${
                            currentPage === page
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
                        className={`p-2 rounded-lg border flex items-center justify-center transition-all ${
                          currentPage === totalPages 
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
        </div>
      </PageContainer>
    </div>
  );
}
