import React from "react";
import { PhoneCall, MapPin, Ruler, FileText, Factory, Wrench, SearchCheck, HeartHandshake } from "lucide-react";

const steps = [
  { icon: PhoneCall, title: "Free Consultation" },
  { icon: MapPin, title: "Site Visit" },
  { icon: Ruler, title: "Measurement" },
  { icon: FileText, title: "Quotation" },
  { icon: Factory, title: "Manufacturing" },
  { icon: Wrench, title: "Installation" },
  { icon: SearchCheck, title: "Quality Check" },
  { icon: HeartHandshake, title: "After Sales Support" },
];

export default function ServicesInstallation() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Installation Process</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center relative group">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-1/2 w-full h-[2px] bg-gray-200 -z-10"></div>
              )}
              <div className="w-16 h-16 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center mb-4 group-hover:border-[#0c5940] transition-colors bg-white z-10">
                <step.icon className="w-7 h-7 text-gray-600 group-hover:text-[#0c5940] transition-colors" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">{step.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
