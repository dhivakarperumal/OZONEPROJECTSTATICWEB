import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  Layout,
  ThumbsUp,
  Settings,
  HeadphonesIcon
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import logo from "../../public/logo.png";
import PageContainer from "./PageContainer";
import CatalogueDownload from "./CatalogueDownload";

const Footer = () => {
  const [catalogueOpen, setCatalogueOpen] = useState(false);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
      className="bg-[#021333] text-white pt-16 pb-12 "
    >
      <PageContainer>

        {/* Top Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-12"
        >

          {/* Left: Tailor-Made Solutions */}
          <div className="lg:w-[30%]">
            <h3 className="text-[17px] font-bold mb-3 tracking-wide">TAILOR-MADE SOLUTIONS</h3>
            <p className="text-[13px] text-gray-300 leading-relaxed mb-5">
              Perfectly designed for all types of windows, doors & patios with reliable after-sales support you can count on.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-(--accent) hover:bg-(--accent-dark) text-white px-5 py-2 rounded-full font-semibold text-sm transition">
              Get in Touch <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right: Features */}
          <div className="lg:w-[70%] grid grid-cols-2 md:grid-cols-5 gap-4 text-center">

            <motion.div whileHover={{ y: -4, scale: 1.03 }} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-gray-600 flex items-center justify-center mb-3">
                <Layout className="text-gray-300" strokeWidth={1.5} size={28} />
              </div>
              <p className="text-[12px] text-gray-300 leading-tight">Custom fit for every<br />window & door</p>
            </motion.div>

            <motion.div whileHover={{ y: -4, scale: 1.03 }} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-gray-600 flex items-center justify-center mb-3">
                <ShieldCheck className="text-gray-300" strokeWidth={1.5} size={28} />
              </div>
              <p className="text-[12px] text-gray-300 leading-tight">High durability<br />& longevity</p>
            </motion.div>

            <motion.div whileHover={{ y: -4, scale: 1.03 }} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-gray-600 flex items-center justify-center mb-3">
                <ThumbsUp className="text-gray-300" strokeWidth={1.5} size={28} />
              </div>
              <p className="text-[12px] text-gray-300 leading-tight">Aesthetically<br />finished fitments</p>
            </motion.div>

            <motion.div whileHover={{ y: -4, scale: 1.03 }} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-gray-600 flex items-center justify-center mb-3">
                <Settings className="text-gray-300" strokeWidth={1.5} size={28} />
              </div>
              <p className="text-[12px] text-gray-300 leading-tight">Multiple fitment<br />options</p>
            </motion.div>

            <motion.div whileHover={{ y: -4, scale: 1.03 }} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-gray-600 flex items-center justify-center mb-3">
                <HeadphonesIcon className="text-gray-300" strokeWidth={1.5} size={28} />
              </div>
              <p className="text-[12px] text-gray-300 leading-tight">Excellent after-sales<br />support</p>
            </motion.div>

          </div>

        </motion.div>

        {/* Divider */}
        <div className="border-t border-[#132852] mb-12"></div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
        >

          {/* Logo & Social */}
          <div className="lg:col-span-1 flex flex-col items-start">
            <Link to="/" className="inline-block mb-6">
              <img src={logo} alt="Ozone Enterprises" className="h-10 object-contain bg-white rounded p-1" />
            </Link>
            <div className="flex gap-3">
              <motion.a whileHover={{ y: -3, scale: 1.08 }} href="#" className="w-7 h-7 rounded-full bg-white text-[#021333] flex items-center justify-center hover:bg-gray-200 transition">
                <FaFacebookF size={12} />
              </motion.a>
              <motion.a whileHover={{ y: -3, scale: 1.08 }} href="https://www.instagram.com/ozone_enterprises_?igsh=MTNydnc0MWd1YnJiZA==" className="w-7 h-7 rounded-full bg-white text-[#021333] flex items-center justify-center hover:bg-gray-200 transition">
                <FaInstagram size={12} />
              </motion.a>
              <motion.a whileHover={{ y: -3, scale: 1.08 }} href="#" className="w-7 h-7 rounded-full bg-white text-[#021333] flex items-center justify-center hover:bg-gray-200 transition">
                <FaLinkedinIn size={12} />
              </motion.a>
              <motion.a whileHover={{ y: -3, scale: 1.08 }} href="#" className="w-7 h-7 rounded-full bg-white text-[#021333] flex items-center justify-center hover:bg-gray-200 transition">
                <FaYoutube size={12} />
              </motion.a>
            </div>
          </div>


          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-[13px] font-bold mb-4 tracking-wider uppercase">QUICK LINKS</h4>
            <ul className="space-y-2.5 text-[13px] text-gray-400">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/products" className="hover:text-white transition">Products</Link></li>
              <li><Link to="/services" className="hover:text-white transition">Services</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition">Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>



          {/* Service Areas */}
          <div className="lg:col-span-1">
            <h4 className="text-[13px] font-bold mb-4 tracking-wider uppercase">
              SERVICE AREAS
            </h4>

            <ul className="space-y-2.5 text-[13px] text-gray-400">
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Tirupathur District
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Krishnagiri District 
                </Link> 
              </li>

              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Vellore District
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Dharmapuri District
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Tiruvannamalai District
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-1">
            <h4 className="text-[13px] font-bold mb-4 tracking-wider uppercase">CONTACT US</h4>
            <ul className="space-y-3 text-[13px] text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>Ozone Enterprises<br />Tuscaloosa, Alabama,<br />USA</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0" />
                <span>+1 (205) 545-7400</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0" />
                <span>Ozoneenterprises0625@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Download Catalogue */}
          <div className="lg:col-span-1">
            <h4 className="text-[13px] font-bold mb-4 tracking-wider uppercase">DOWNLOAD CATALOGUE</h4>
            <div
              style={{
                background: "linear-gradient(135deg, rgba(12,89,64,0.25) 0%, rgba(26,122,80,0.15) 100%)",
                border: "1px solid rgba(12,89,64,0.5)",
                borderRadius: "14px",
                padding: "18px 16px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {/* Top: icon + title */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "56px",
                    background: "linear-gradient(160deg,#1a7a50,#0c5940)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 4px 14px rgba(12,89,64,0.45)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src="/logo.png"
                    alt="Catalogue"
                    style={{ width: "100%", height: "100%", objectFit: "contain", opacity: 0.35, filter: "brightness(3)" }}
                  />
                  {/* PDF badge */}
                  <span
                    style={{
                      position: "absolute",
                      bottom: "4px",
                      right: "3px",
                      background: "#f59e0b",
                      color: "#000",
                      fontSize: "7px",
                      fontWeight: 800,
                      borderRadius: "3px",
                      padding: "1px 3px",
                      letterSpacing: "0.3px",
                    }}
                  >PDF</span>
                </div>
                <div>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#fff", margin: 0 }}>
                    Product Catalogue 2025
                  </p>
                  <p style={{ fontSize: "11px", color: "#94a3b8", margin: "3px 0 0" }}>
                    Full specs · Finishes · Dimensions
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />

              {/* Download Button */}
              <motion.button
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setCatalogueOpen(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
                  color: "#111",
                  border: "none",
                  borderRadius: "9px",
                  padding: "10px 14px",
                  fontWeight: 700,
                  fontSize: "12px",
                  cursor: "pointer",
                  width: "100%",
                  boxShadow: "0 4px 16px rgba(245,158,11,0.35)",
                  transition: "opacity 0.2s, transform 0.15s",
                  letterSpacing: "0.2px",
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Free PDF
              </motion.button>

              <p style={{ fontSize: "10px", color: "#64748b", textAlign: "center", margin: 0 }}>
                🔒 Enter your email to unlock
              </p>
            </div>
          </div>

        </motion.div>

      </PageContainer>

      <CatalogueDownload isOpen={catalogueOpen} onClose={() => setCatalogueOpen(false)} />
    </motion.footer>
  );
};

export default Footer;