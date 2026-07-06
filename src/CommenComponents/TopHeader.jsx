import React from "react";
import { Phone, Mail } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

const TopHeader = () => {
  return (
    <div className="bg-[linear-gradient(135deg,#08164F_0%,#112B87_55%,#234CC4_100%)] text-white rounded-b-3xl">
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center">

        {/* Left */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium min-w-fit">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 hover:text-gray-200 transition"
          >
            <Phone size={16} />
            +91 98765 43210
          </a>

          <a
            href="mailto:info@ozone.com"
            className="flex items-center gap-2 hover:text-gray-200 transition"
          >
            <Mail size={16} />
            info@ozone.com
          </a>
        </div>

        {/* Center */}
        <div className="flex-1 overflow-hidden px-6">
          <marquee
            behavior="scroll"
            direction="left"
            scrollamount="5"
            className="text-sm font-medium"
          >
            Welcome to OZONE • Premium Mosquito Mesh Solutions • Quality Products • Free Site Visit • Contact us for the Best Price •
          </marquee>
        </div>

        {/* Right */}
       <div className="hidden lg:flex items-center gap-3 min-w-fit">

  <a
    href="#"
    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
  >
    <FaFacebookF className="text-sm" />
  </a>

  <a
    href="#"
    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
  >
    <FaInstagram className="text-sm" />
  </a>

  <a
    href="#"
    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
  >
    <FaLinkedinIn className="text-sm" />
  </a>

  <a
    href="#"
    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
  >
    <FaYoutube className="text-sm" />
  </a>

</div>

      </div>
    </div>
  );
};

export default TopHeader;