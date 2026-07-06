import React from "react";
import { Star, Users, Maximize, Wallet, ShieldCheck, Zap, HeartHandshake, Shield } from "lucide-react";

const features = [
  { icon: Star, title: "Premium Quality" },
  { icon: Users, title: "Experienced Team" },
  { icon: Maximize, title: "Custom Sizes" },
  { icon: Wallet, title: "Affordable Price" },
  { icon: ShieldCheck, title: "Warranty" },
  { icon: Zap, title: "Fast Installation" },
  { icon: HeartHandshake, title: "Excellent Support" },
  { icon: Shield, title: "Genuine Materials" },
];

export default function ServicesWhyChoose() {
  return (
    <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Why Choose Us</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="relative bg-white rounded-3xl p-8 border border-gray-100/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(12,89,64,0.15)] hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center group overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0c5940] to-[#38B6FF] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Background glow on hover */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#0c5940]/5 rounded-bl-full -z-10 group-hover:bg-[#0c5940]/10 transition-colors duration-500"></div>

              {/* Icon */}
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-[#0c5940] to-teal-700 flex items-center justify-center text-white shadow-lg shadow-[#0c5940]/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 mb-5">
                <feature.icon size={28} strokeWidth={1.5} />
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-black text-gray-900 group-hover:text-[#0c5940] transition-colors">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
