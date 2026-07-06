import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: "How long does installation take?",
    answer: "Most installations are completed within a single day. For larger commercial projects or complex custom fits, we will provide a clear, accurate timeline during your free site inspection."
  },
  {
    id: 2,
    question: "Do you offer warranties on your products?",
    answer: "Yes, we stand by our quality. We offer a comprehensive warranty of up to 5 years on our premium mesh materials and a 1-year warranty on our installation and craftsmanship."
  },
  {
    id: 3,
    question: "How do I clean and maintain the mosquito screens?",
    answer: "Our screens are designed for very low maintenance. You can simply wipe them down with a damp cloth or gently vacuum them to remove dust. We also offer professional annual maintenance services if needed."
  },
  {
    id: 4,
    question: "Will the screens block natural light or ventilation?",
    answer: "Not at all! Our premium mesh designs are specially engineered to provide maximum airflow and crystal-clear visibility, ensuring your home stays bright and breezy while keeping pests out."
  },
  {
    id: 5,
    question: "Can you install screens on my existing doors and windows?",
    answer: "Absolutely. Our fitment systems are highly customizable and can be seamlessly integrated into your existing window and door frames without requiring any structural changes to your home."
  }
];

const HomeFAQ = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 px-5 bg-white relative overflow-hidden">
      <div className="container mx-auto px-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-8xl mx-auto">
          
          {/* Left Column - Header Info */}
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0c5940]/5 border border-[#0c5940]/10 mb-6 w-max">
              <span className="w-2 h-2 rounded-full bg-[#0c5940] animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest text-[#0c5940] uppercase">Got Questions?</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0c5940] to-[#38B6FF]">Questions</span>
            </h2>
            
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              We know you want the best protection for your space. Here are the most common questions our customers ask before making a decision.
            </p>
            
            <div className="hidden lg:block">
              <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col gap-4">
                <h3 className="font-bold text-gray-900 text-lg">Still have questions?</h3>
                <p className="text-gray-500 text-sm">Our team of experts is ready to help you find the perfect mosquito screen solution.</p>
                <a href="/contact" className="inline-flex items-center justify-center bg-[#0c5940] text-white px-6 py-3 rounded-xl font-bold transition-all hover:bg-[#08402d] hover:-translate-y-1 w-max">
                  Contact Us Today
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Accordion */}
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <div 
                key={faq.id} 
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  openId === faq.id 
                    ? "border-[#0c5940]/30 bg-[#0c5940]/5 shadow-sm" 
                    : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={`font-bold text-[17px] pr-8 ${openId === faq.id ? "text-[#0c5940]" : "text-gray-900"}`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                    openId === faq.id ? "bg-[#0c5940] text-white rotate-180" : "bg-gray-50 text-gray-400"
                  }`}>
                    <ChevronDown size={18} strokeWidth={3} />
                  </div>
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    openId === faq.id ? "max-h-48 opacity-100 mb-6" : "max-h-0 opacity-0 mb-0"
                  }`}
                >
                  <p className="px-6 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;
