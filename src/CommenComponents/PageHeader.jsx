import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const PageHeader = ({ title, subtitle, background }) => {
  const bgImage = background || "/PageHeaderIMG/3.png";
  const canvasRef = useRef(null);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      className="relative w-full h-[220px] sm:h-[250px] md:h-[280px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Layered dark overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-[#081A59]/70 to-black/60"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

      {/* Animated particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Left glowing vertical accent */}
      <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-transparent via-[#0c5940] to-transparent"></div>

      {/* Top shimmer bar */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--secondary)] to-transparent opacity-70"></div>

      {/* Bottom shimmer bar */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#0c5940] via-[var(--secondary)] to-transparent"></div>

      {/* Big glowing orbs */}
      <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-[var(--secondary)] opacity-10 blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-[#0c5940] opacity-15 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 rounded-full bg-[var(--primary)] opacity-10 blur-3xl pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center gap-4">

        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#0c5940] animate-ping"></span>
          <span className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase">Ozone Enterprises</span>
        </div>

        {/* Title with gradient highlight */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-2xl">
          <span className="relative">
            {title}
            {/* Underline glow */}
            <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-[#0c5940] via-[var(--secondary)] to-transparent rounded-full"></span>
          </span>
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Breadcrumb pill */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-5 py-2 text-sm text-gray-300 shadow-md mt-1">
          <Link to="/" className="flex items-center gap-1 hover:text-white transition-colors font-semibold text-white">
            <Home size={13} />
            Home
          </Link>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-[#06C167] font-bold">{title}</span>
        </div>

      </div>

      {/* Corner decorative dots grid */}
      <div className="absolute bottom-6 right-6 grid grid-cols-4 gap-1.5 opacity-20 pointer-events-none">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-white"></div>
        ))}
      </div>
      <div className="absolute top-6 left-8 grid grid-cols-3 gap-1.5 opacity-15 pointer-events-none">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-white"></div>
        ))}
      </div>

    </div>
  );
};

export default PageHeader;