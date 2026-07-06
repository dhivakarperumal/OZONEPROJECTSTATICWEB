import React from 'react';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

const FloatingActions = () => {
  // Update these numbers as needed
  const whatsappNumber = "919876543210"; 
  const phoneNumber = "+919876543210";
  const whatsappMessage = "Hi, I'm interested in Ozone Mosquito Screens. Can you help me?";

  return (
    <div className="fixed top-32 right-6 z-50 flex flex-col gap-4">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_15px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] hover:-translate-y-1 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm font-semibold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          WhatsApp Us
          {/* Tooltip triangle */}
          <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 border-y-8 border-y-transparent border-l-8 border-l-white"></span>
        </span>
        <FaWhatsapp size={30} />
      </a>

      {/* Call Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="group relative flex items-center justify-center w-14 h-14 bg-[#0c5940] text-white rounded-full shadow-[0_4px_15px_rgba(12,89,64,0.4)] hover:shadow-[0_6px_20px_rgba(12,89,64,0.6)] hover:-translate-y-1 transition-all duration-300"
        aria-label="Call Us"
      >
        <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm font-semibold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Call Now
          {/* Tooltip triangle */}
          <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 border-y-8 border-y-transparent border-l-8 border-l-white"></span>
        </span>
        <FaPhoneAlt size={22} />
      </a>
    </div>
  );
};

export default FloatingActions;
