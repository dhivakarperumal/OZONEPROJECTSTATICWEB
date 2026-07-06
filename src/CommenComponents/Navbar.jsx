import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../../public/logo.png";// Replace with actual logo if needed
import PageContainer from "./PageContainer";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  
  const [productsMenu, setProductsMenu] = useState(false);
  const [fitmentMenu, setFitmentMenu] = useState(false);

  const productsRef = useRef();
  const fitmentRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (productsRef.current && !productsRef.current.contains(e.target)) {
        setProductsMenu(false);
      }
      if (fitmentRef.current && !fitmentRef.current.contains(e.target)) {
        setFitmentMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-semibold tracking-wide transition flex flex-col justify-center relative ${
      isActive
        ? "text-[#0c5940] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#0c5940]"
        : "text-gray-800 hover:text-[#0c5940]"
    }`;

  const dropdownBtnClass = "flex items-center gap-1 px-3 py-2 text-sm font-semibold tracking-wide text-gray-800 hover:text-[#0c5940] transition cursor-pointer";

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm py-2 md:py-3">
      <PageContainer>
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            {/* The image in the screenshot has a specific logo, adjust src as needed */}
            <img src={logo} alt="Ozone Enterprises" className="h-10 md:h-12 object-contain" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center justify-center flex-1 gap-4 xl:gap-8">
            <NavLink to="/" className={navClass}>Home</NavLink>
            <NavLink to="/about" className={navClass}>About Us</NavLink>
            
            {/* Products Dropdown */}
            <div className="relative" ref={productsRef}>
              <button 
                onClick={() => { setProductsMenu(!productsMenu); setFitmentMenu(false); }}
                className={dropdownBtnClass}
              >
                Products <ChevronDown size={16} />
              </button>
              {productsMenu && (
                <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md overflow-hidden mt-2 border border-gray-100 z-50">
                  <Link to="/products" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">All Products</Link>
                </div>
              )}
            </div>

            {/* Fitment Systems Dropdown */}
            {/* <div className="relative" ref={fitmentRef}>
              <button 
                onClick={() => { setFitmentMenu(!fitmentMenu); setProductsMenu(false); }}
                className={dropdownBtnClass}
              >
                Fitment Systems <ChevronDown size={16} />
              </button>
              {fitmentMenu && (
                <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md overflow-hidden mt-2 border border-gray-100 z-50">
                  <Link to="/fitment-systems" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">All Systems</Link>
                </div>
              )}
            </div> */}

            <NavLink to="/balcony-screens" className={navClass}>Balcony Screens</NavLink>
            <NavLink to="/gallery" className={navClass}>Gallery</NavLink>
            {/* <NavLink to="/downloads" className={navClass}>Downloads</NavLink> */}
            <NavLink to="/contact" className={navClass}>Contact Us</NavLink>
          </div>

          <div className="hidden lg:block shrink-0">
            <Link to="/quote" className="flex items-center gap-2 bg-[#0c5940] hover:bg-[#094230] text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 16 16 12 12 8"></polyline>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden text-gray-800">
            {mobileMenu ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </PageContainer>
      
      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col p-4 max-h-[80vh] overflow-y-auto">
          <NavLink to="/" onClick={() => setMobileMenu(false)} className="px-4 py-3 border-b text-gray-800 font-bold">Home</NavLink>
          <NavLink to="/about" onClick={() => setMobileMenu(false)} className="px-4 py-3 border-b text-gray-800 font-bold">About Us</NavLink>
          <button onClick={() => setProductsMenu(!productsMenu)} className="flex items-center justify-between px-4 py-3 border-b text-gray-800 font-bold">
            Products <ChevronDown size={16} className={`transition-transform ${productsMenu ? 'rotate-180' : ''}`} />
          </button>
          {productsMenu && (
            <div className="bg-gray-50 flex flex-col pl-8">
              <Link to="/products" onClick={() => setMobileMenu(false)} className="py-3 border-b border-gray-200 text-sm">All Products</Link>
            </div>
          )}
          <button onClick={() => setFitmentMenu(!fitmentMenu)} className="flex items-center justify-between px-4 py-3 border-b text-gray-800 font-bold">
            Fitment Systems <ChevronDown size={16} className={`transition-transform ${fitmentMenu ? 'rotate-180' : ''}`} />
          </button>
          {fitmentMenu && (
            <div className="bg-gray-50 flex flex-col pl-8">
              <Link to="/fitment-systems" onClick={() => setMobileMenu(false)} className="py-3 border-b border-gray-200 text-sm">All Systems</Link>
            </div>
          )}
          <NavLink to="/balcony-screens" onClick={() => setMobileMenu(false)} className="px-4 py-3 border-b text-gray-800 font-bold">Balcony Screens</NavLink>
          <NavLink to="/gallery" onClick={() => setMobileMenu(false)} className="px-4 py-3 border-b text-gray-800 font-bold">Gallery</NavLink>
          <NavLink to="/downloads" onClick={() => setMobileMenu(false)} className="px-4 py-3 border-b text-gray-800 font-bold">Downloads</NavLink>
          <NavLink to="/contact" onClick={() => setMobileMenu(false)} className="px-4 py-3 border-b text-gray-800 font-bold">Contact Us</NavLink>
          <div className="mt-4 px-4">
             <Link to="/quote" onClick={() => setMobileMenu(false)} className="flex justify-center items-center gap-2 bg-[#0c5940] hover:bg-[#094230] text-white px-5 py-3 rounded-lg font-semibold text-sm transition">
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;