import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PlayCircle, ShieldCheck } from 'lucide-react';
import heroImg from '../assets/hero.png';

const Hero = () => {
  return (
    <section className="hero relative overflow-hidden py-16 lg:py-24">
      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse"></span>
              <span className="text-sm font-bold tracking-wide text-white uppercase">Premium Fitment Systems</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1]">
              Transform Your Space with <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-[var(--secondary)]">Ozone</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed text-[#dfe7ff]">
              Discover our world-class architectural hardware and tailor-made solutions designed for unmatched durability, premium aesthetics, and perfect fitment.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/products" className="w-full sm:w-auto px-8 py-4 bg-[#0c5940] hover:bg-[#094230] text-white rounded-full font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-[#0c5940]/40">
                Explore Products <ArrowRight size={20} />
              </Link>
              <Link to="/contact" className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-full font-semibold transition backdrop-blur-md flex items-center justify-center gap-2">
                <PlayCircle size={20} /> Get a Quote
              </Link>
            </div>
          </div>
          
          {/* Image Content */}
          <div className="flex-1 relative w-full mt-10 lg:mt-0">
            {/* Soft glowing background behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--secondary)] to-teal-400 opacity-20 rounded-full blur-3xl transform scale-110"></div>
            
            <div className="relative z-10 w-full max-w-md lg:max-w-full mx-auto">
              <img 
                src={heroImg} 
                alt="Ozone Fitment Systems" 
                className="w-full h-auto object-cover rounded-2xl shadow-2xl border border-white/20"
              />
              
              {/* Floating Quality Badge */}
              <div className="absolute -bottom-6 -left-6 lg:bottom-10 lg:-left-12 bg-white text-gray-800 p-4 rounded-xl shadow-xl animate-[bounce_4s_infinite]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#e6f4ed] rounded-full flex items-center justify-center text-[#0c5940]">
                    <ShieldCheck size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Certified</p>
                    <p className="text-sm font-bold text-gray-900">Premium Quality</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-[var(--secondary)] blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-teal-400 blur-3xl opacity-20 pointer-events-none"></div>
    </section>
  );
};

export default Hero;
