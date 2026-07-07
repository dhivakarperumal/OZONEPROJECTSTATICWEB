import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Which mosquito screen is best?", a: "The best screen depends on your specific needs. Pleated screens are excellent for large doors and French windows, while roller screens are perfect for standard windows. Invisible screens provide great visibility." },
  { q: "Do you provide installation?", a: "Yes, we provide professional installation services by our trained experts to ensure a perfect fit." },
  { q: "Warranty?", a: "We offer up to a 5-year warranty on premium mesh materials and a 1-year warranty on installation." },
  { q: "Custom sizes available?", a: "Absolutely! Every screen is custom-manufactured to match your exact window or door dimensions." },
  { q: "Service areas?", a: "We proudly serve for districts Tirupattur, Krishnagiri, Vellore, Dharmapuri, Tiruvannamalai." },
  { q: "Maintenance?", a: "Our screens require minimal maintenance. Simply dust them lightly or vacuum them occasionally." }
];

export default function ServicesFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side: Image */}
          <div className="w-full h-full min-h-[400px] lg:min-h-full rounded-3xl overflow-hidden shadow-lg relative">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
              alt="Support & Installation"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c5940]/90 via-[#0c5940]/20 to-transparent flex flex-col justify-end p-8">
              <h3 className="text-white text-2xl font-bold mb-2">Still have questions?</h3>
              <p className="text-white/90">Our expert support team is always ready to assist you with any inquiries.</p>
            </div>
          </div>

          {/* Right Side: Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === index ? 'border-[#0c5940] shadow-md' : 'border-gray-200'}`}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                >
                  <span className={`font-bold text-lg pr-8 transition-colors ${openIndex === index ? 'text-[#0c5940]' : 'text-gray-700'}`}>
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-[#0c5940]' : 'text-gray-400'}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0'}`}>
                  <div className="px-6 text-gray-600">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
