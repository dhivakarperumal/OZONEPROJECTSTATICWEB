import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink, Link } from "react-router-dom";
import { ChevronDown, X, Phone, Mail, ArrowUpRight } from "lucide-react";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import logo from "../../public/logo.png";
import PageContainer from "./PageContainer";

// ── Custom 3-stripe swoosh hamburger icon ───────────────────────────────────
const SwooshMenuIcon = () => (
  <svg width="34" height="30" viewBox="0 0 40 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4 Q14 1 28 6 Q36 9 38 7 Q34 12 22 10 Q8 8 4 12 Q2 8 4 4Z" fill="#38B6FF" />
    <path d="M2 15 Q12 12 27 17 Q35 20 38 18 Q34 23 21 21 Q7 19 2 23 Q0 19 2 15Z" fill="#0c5940" />
    <path d="M4 26 Q14 23 29 28 Q37 31 38 29 Q35 34 22 32 Q8 30 4 34 Q2 30 4 26Z" fill="#081A59" />
  </svg>
);

const navLinks = [
  { to: "/", label: "Home",            color: "#38B6FF" },
  { to: "/about", label: "About Us",   color: "#0c5940" },
  { to: "/products", label: "Products", color: "#38B6FF" },
  { to: "/services", label: "Services", color: "#0c5940" },
  { to: "/gallery", label: "Gallery",  color: "#081A59" },
  { to: "/contact", label: "Contact Us", color: "#38B6FF" },
];

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [fitmentOpen, setFitmentOpen] = useState(false);
  const productsRef = useRef();
  const fitmentRef = useRef();

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenu]);

  useEffect(() => {
    const handler = (e) => {
      if (productsRef.current && !productsRef.current.contains(e.target)) setProductsOpen(false);
      if (fitmentRef.current && !fitmentRef.current.contains(e.target)) setFitmentOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const closeMobile = () => {
    setMobileMenu(false);
    setProductsOpen(false);
    setFitmentOpen(false);
  };

  const navClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-semibold tracking-wide transition flex flex-col justify-center relative group ${
      isActive
        ? "text-[#0c5940] after:content-[''] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2.5px] after:bg-[#0c5940]"
        : "text-gray-800 hover:text-[#0c5940] after:content-[''] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2.5px] after:bg-[#0c5940] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
    }`;

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-white shadow-sm py-2 md:py-3"
      >
        <PageContainer>
          <div className="flex items-center justify-between relative">

            {/* Logo */}
            <div className="flex-1 lg:flex-none z-10">
              <Link to="/" className="flex items-center" onClick={closeMobile}>
                <img src={logo} alt="Ozone Enterprises" className="h-10 md:h-12 object-contain" />
              </Link>
            </div>

            {/* Desktop Links */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center gap-1 lg:gap-2 xl:gap-4 w-max z-0"
            >
              <NavLink to="/" className={navClass}>Home</NavLink>
              <NavLink to="/about" className={navClass}>About Us</NavLink>
              <NavLink to="/products" className={navClass}>Products</NavLink>
              <NavLink to="/services" className={navClass}>Services</NavLink>
              <NavLink to="/gallery" className={navClass}>Gallery</NavLink>
              <NavLink to="/contact" className={navClass}>Contact Us</NavLink>
            </motion.div>

            {/* Desktop CTA */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="hidden lg:block shrink-0 z-10"
            >
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link to="/contact" className="flex items-center gap-2 bg-[#0c5940] hover:bg-[#094230] text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition shadow-md">
                  Get a Quote
                </Link>
              </motion.div>
            </motion.div>

            {/* Mobile Toggle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="flex items-center lg:hidden z-10"
            >
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenu(!mobileMenu)}
                className="flex items-center justify-center w-11 h-11 rounded-xl hover:bg-gray-50 transition"
                aria-label="Toggle menu"
              >
                {mobileMenu ? <X size={26} className="text-white" strokeWidth={2.5} /> : <SwooshMenuIcon />}
              </motion.button>
            </motion.div>
          </div>
        </PageContainer>
      </nav>

      {/* ── Full-screen mobile overlay ── */}
      {/* Backdrop */}
      <motion.div
        initial={false}
        animate={{ opacity: mobileMenu ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-400 lg:hidden ${
          mobileMenu ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={closeMobile}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full z-50 lg:hidden flex flex-col
          bg-gradient-to-b from-[#081A59] via-[#0c2e50] to-[#0c5940]
          transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${mobileMenu ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#38B6FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-0 w-40 h-40 bg-[#0c5940]/30 rounded-full blur-3xl pointer-events-none" />

        {/* Header inside drawer */}
        <div className="relative flex items-center justify-between px-6 pt-6 pb-5 border-b border-white/10">
          <Link to="/" onClick={closeMobile}>
            <img src={logo} alt="Ozone" className="h-9 object-contain brightness-0 invert" />
          </Link>
          <button
            onClick={closeMobile}
            className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav items */}
        <div className="relative flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1">

          {navLinks.map((link, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: mobileMenu ? 1 : 0, x: mobileMenu ? 0 : 24 }}
              transition={{ duration: 0.28, delay: mobileMenu ? i * 0.05 : 0 }}
            >
              <NavLink
                to={link.to}
                onClick={closeMobile}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-4 py-4 rounded-2xl font-bold text-base transition-all duration-300
                  ${isActive
                    ? "bg-white/15 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <span className="flex items-center gap-4">
                  <span
                    className="w-2 h-8 rounded-full flex-shrink-0"
                    style={{ backgroundColor: link.color }}
                  />
                  {link.label}
                </span>
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-white/60" />
              </NavLink>
            </motion.div>
          ))}



         
        </div>

        {/* Footer: CTA + contact + socials */}
        <div className="relative px-6 pb-8 pt-4 border-t border-white/10 flex flex-col gap-4">
          <Link
            to="/contact"
            onClick={closeMobile}
            className="flex justify-center items-center gap-2 bg-white text-[#0c5940] px-5 py-3.5 rounded-2xl font-black text-sm transition-all shadow-xl hover:bg-gray-100 hover:scale-[1.02]"
          >
            Get a Free Quote →
          </Link>

          <div className="flex flex-col gap-2">
            <a href="tel:+918950678907" className="flex items-center gap-2 text-white/60 text-xs hover:text-white transition">
              <Phone size={13} /> +91 89506 78907
            </a>
            <a href="mailto:support@ozone.com" className="flex items-center gap-2 text-white/60 text-xs hover:text-white transition">
              <Mail size={13} /> support@ozone.com
            </a>
          </div>

          <div className="flex gap-3">
            {[
              { icon: FaInstagram, href: "#", color: "hover:bg-pink-500" },
              { icon: FaFacebookF, href: "#", color: "hover:bg-blue-600" },
              { icon: FaYoutube,   href: "#", color: "hover:bg-red-600"  },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                className={`w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white transition-all ${s.color}`}
              >
                <s.icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;