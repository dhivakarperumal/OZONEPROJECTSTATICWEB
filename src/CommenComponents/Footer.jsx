import React from "react";
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

const Footer = () => {
  return (
    <footer className="bg-[#021333] text-white pt-16 pb-12 mt-20">
      <PageContainer>
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-12">
          
          {/* Left: Tailor-Made Solutions */}
          <div className="lg:w-[30%]">
            <h3 className="text-[17px] font-bold mb-3 tracking-wide">TAILOR-MADE SOLUTIONS</h3>
            <p className="text-[13px] text-gray-300 leading-relaxed mb-5">
              Perfectly designed for all types of windows, doors & patios with reliable after-sales support you can count on.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white px-5 py-2 rounded-full font-semibold text-sm transition">
              Get in Touch <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right: Features */}
          <div className="lg:w-[70%] grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-gray-600 flex items-center justify-center mb-3">
                <Layout className="text-gray-300" strokeWidth={1.5} size={28} />
              </div>
              <p className="text-[12px] text-gray-300 leading-tight">Custom fit for every<br/>window & door</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-gray-600 flex items-center justify-center mb-3">
                <ShieldCheck className="text-gray-300" strokeWidth={1.5} size={28} />
              </div>
              <p className="text-[12px] text-gray-300 leading-tight">High durability<br/>& longevity</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-gray-600 flex items-center justify-center mb-3">
                <ThumbsUp className="text-gray-300" strokeWidth={1.5} size={28} />
              </div>
              <p className="text-[12px] text-gray-300 leading-tight">Aesthetically<br/>finished fitments</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-gray-600 flex items-center justify-center mb-3">
                <Settings className="text-gray-300" strokeWidth={1.5} size={28} />
              </div>
              <p className="text-[12px] text-gray-300 leading-tight">Multiple fitment<br/>options</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-gray-600 flex items-center justify-center mb-3">
                <HeadphonesIcon className="text-gray-300" strokeWidth={1.5} size={28} />
              </div>
              <p className="text-[12px] text-gray-300 leading-tight">Excellent after-sales<br/>support</p>
            </div>

          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-[#132852] mb-12"></div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Logo & Social */}
          <div className="lg:col-span-1 flex flex-col items-start">
            <Link to="/" className="inline-block mb-6">
              <img src={logo} alt="Ozone Enterprises" className="h-10 object-contain bg-white rounded p-1" />
            </Link>
            <div className="flex gap-3">
              <a href="#" className="w-7 h-7 rounded-full bg-white text-[#021333] flex items-center justify-center hover:bg-gray-200 transition">
                <FaFacebookF size={12} />
              </a>
              <a href="#" className="w-7 h-7 rounded-full bg-white text-[#021333] flex items-center justify-center hover:bg-gray-200 transition">
                <FaInstagram size={12} />
              </a>
              <a href="#" className="w-7 h-7 rounded-full bg-white text-[#021333] flex items-center justify-center hover:bg-gray-200 transition">
                <FaLinkedinIn size={12} />
              </a>
              <a href="#" className="w-7 h-7 rounded-full bg-white text-[#021333] flex items-center justify-center hover:bg-gray-200 transition">
                <FaYoutube size={12} />
              </a>
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
        Ambur
      </Link>
    </li>

    <li>
      <Link to="/contact" className="hover:text-white transition">
        Tirupathur
      </Link>
    </li>

    <li>
      <Link to="/contact" className="hover:text-white transition">
        Vellore
      </Link>
    </li>

    <li>
      <Link to="/contact" className="hover:text-white transition">
        Ranipet
      </Link>
    </li>

    <li>
      <Link to="/contact" className="hover:text-white transition">
        Gudiyatham
      </Link>
    </li>

    <li>
      <Link to="/contact" className="hover:text-white transition">
        Katpadi
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
                <span>Ozone Enterprises<br/>Tuscaloosa, Alabama,<br/>USA</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0" />
                <span>+1 (205) 545-7400</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0" />
                <span>info@ozone.com</span>
              </li>
            </ul>
          </div>

          {/* Download Catalogue */}
          <div className="lg:col-span-1 flex flex-col lg:items-end">
            <div className="text-left w-full">
              <h4 className="text-[13px] font-bold mb-4 tracking-wider uppercase">DOWNLOAD CATALOGUE</h4>
              <div className="flex items-center gap-3">
                {/* Simulated catalog image */}
                <div className="w-14 h-18 bg-gray-200 rounded border border-gray-400 overflow-hidden flex-shrink-0 relative">
                    <img src="./logo.png" alt="Catalogue" className="w-full h-full object-cover opacity-20" />
                </div>
                <button className="flex items-center gap-2 bg-white text-[#021333] hover:bg-gray-100 px-3 py-2 rounded font-semibold text-[11px] transition shadow">
                  Download PDF <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>

        </div>

      </PageContainer>
    </footer>
  );
};

export default Footer;