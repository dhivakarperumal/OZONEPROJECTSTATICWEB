import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  FaInstagram,
  FaPlay,
  FaPause,
  FaHeart,
  FaComment,
  FaShare,
  FaVolumeMute,
  FaVolumeUp,
  FaExpand,
} from "react-icons/fa";
import { X } from "lucide-react";
import reels from "../data/reels.json";

const getInstagramEmbedUrl = (url) => {
  if (!url) return null;
  const match = url.match(/instagram\.com\/(?:reel|p|tv)\/([A-Za-z0-9_-]+)/i);
  if (!match) return null;

  const type = url.includes("/reel/") ? "reel" : url.includes("/p/") ? "p" : "tv";
  return `https://www.instagram.com/${type}/${match[1]}/embed/`;
};

const loadInstagramEmbedScript = () => {
  if (typeof window === "undefined") return;
  if ((window.instgrm && window.instgrm.Embeds) || document.getElementById("instagram-embed-script")) return;
  const s = document.createElement("script");
  s.id = "instagram-embed-script";
  s.src = "https://platform.instagram.com/en_US/embeds.js";
  s.async = true;
  s.defer = true;
  s.onload = () => {
    try {
      window.instgrm && window.instgrm.Embeds && window.instgrm.Embeds.process();
    } catch (e) { }
  };
  document.body.appendChild(s);
};

const sortReels = (items) => {
  return [...items].sort((a, b) => {
    const aIsInstagram = /instagram\.com\/(?:reel|p|tv)\//i.test(a.instagramUrl || a.videoUrl);
    const bIsInstagram = /instagram\.com\/(?:reel|p|tv)\//i.test(b.instagramUrl || b.videoUrl);

    if (aIsInstagram && !bIsInstagram) return -1;
    if (!aIsInstagram && bIsInstagram) return 1;
    return 0;
  });
};

// ─── Individual Reel Card ───────────────────────────────────────────────────
const ReelCard = ({ reel, onExpand }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [progress, setProgress] = useState(0);
  const embedUrl = getInstagramEmbedUrl(reel.instagramUrl || reel.videoUrl);

  // Sync progress bar
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

  // Auto-play native videos when the reel card becomes visible. Skip for Instagram embeds
  useEffect(() => {
    if (embedUrl) return;
    const node = containerRef.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const visible = entry.intersectionRatio > 0.55;
          const v = videoRef.current;
          if (v) {
            if (visible) {
              v.muted = true;
              v.play().catch(() => { });
              setPlaying(true);
            } else {
              v.pause();
              setPlaying(false);
            }
          }
        });
      },
      { threshold: [0, 0.25, 0.55, 1] }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, [embedUrl]);

  // Note: do not auto-run Instagram's embed script here — it mutates the DOM
  // and can conflict with React's reconciliation. We render a static blockquote
  // and switch to an iframe only on explicit user gesture (click), avoiding
  // external DOM mutations that produce removeChild errors.

  const togglePlay = () => {
    if (embedUrl) {
      // Open fullscreen modal for Instagram embeds — modal will render an iframe
      // and attempt autoplay (muted). This avoids inline cross-origin autoplay
      // issues and external DOM mutations.
      onExpand(reel);
      return;
    }

    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
    } else {
      video.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !muted;
    setMuted(!muted);
  };

  if (embedUrl) {
    return (
      <div className="relative w-full h-full overflow-hidden rounded-3xl bg-black">
        <iframe
          src={embedUrl}
          title={reel.caption}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 w-full h-full border-0"
          style={{
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            transform: 'none',
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl cursor-pointer group select-none bg-black"
      onClick={(e) => {
        const anchor = e.target && e.target.closest ? e.target.closest('a') : null;
        if (anchor) e.preventDefault();
        togglePlay();
      }}
    >
      <div ref={containerRef} className="w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={reel.videoUrl}
          poster={reel.thumbnail}
          loop
          muted={muted}
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          onEnded={() => setPlaying(false)}
        />
      </div>

      {/* Dark overlay — lighter when playing */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${playing
          ? "bg-gradient-to-t from-black/70 via-transparent to-black/30"
          : "bg-gradient-to-t from-black/80 via-black/20 to-black/40"
          }`}
      />

      {/* ── Top bar ── */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
          <FaInstagram className="text-pink-400 text-sm" />
          <span className="text-white text-xs font-bold tracking-wide">
            @ozone.official
          </span>
        </div>
        {/* Expand / mute buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition"
          >
            {muted ? <FaVolumeMute size={12} /> : <FaVolumeUp size={12} />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onExpand(reel);
            }}
            className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition"
          >
            <FaExpand size={11} />
          </button>
        </div>
      </div>

      {/* ── Center play/pause indicator ── */}
      <div
        className={`absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-opacity duration-300 ${playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
          }`}
      >
        <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/60 backdrop-blur-sm flex items-center justify-center shadow-2xl">
          {playing ? (
            <FaPause className="text-white text-lg" />
          ) : (
            <FaPlay className="text-white text-lg ml-1" />
          )}
        </div>
      </div>

      {/* ── Right action buttons ── */}
      <div
        className="absolute right-4 bottom-4 flex flex-col items-center gap-4 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setLiked((v) => !v)}
          className="flex flex-col items-center gap-1"
          aria-label="Like"
        >
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${liked
              ? "bg-red-500 scale-110"
              : "bg-white/15 border border-white/20 hover:bg-white/30"
              }`}
          >
            <FaHeart className="text-white text-lg" />
          </div>
          <span className="text-white text-[11px] font-semibold">{reel.likes}</span>
        </button>

        <button
          className="flex flex-col items-center gap-1"
          aria-label="Comments"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/15 border border-white/20 flex items-center justify-center shadow-xl hover:bg-white/30 transition-all">
            <FaComment className="text-white text-lg" />
          </div>
          <span className="text-white text-[11px] font-semibold">{reel.comments}</span>
        </button>

        <a
          href={reel.instagramUrl || reel.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1"
          aria-label="View on Instagram"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/15 border border-white/20 flex items-center justify-center shadow-xl hover:bg-white/30 transition-all">
            <FaShare className="text-white text-lg" />
          </div>
          <span className="text-white text-[11px] font-semibold">View</span>
        </a>
      </div>

      {/* ── Bottom caption ── */}
      <div className="absolute bottom-5 left-4 right-16 z-10">
        <span className="text-pink-400 text-[10px] font-bold tracking-widest uppercase block mb-1">
          {reel.tag}
        </span>
        <p className="text-white font-bold text-sm leading-tight drop-shadow-lg line-clamp-2">
          {reel.caption}
        </p>
      </div>

      {/* ── Progress bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 z-20">
        <div
          className="h-full bg-gradient-to-r from-pink-500 to-yellow-400 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// ─── Fullscreen Modal ───────────────────────────────────────────────────────
const ReelModal = ({ reel, onClose }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const embedUrl = getInstagramEmbedUrl(reel.instagramUrl || reel.videoUrl);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => { });
    }
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => {
      if (video.duration)
        setProgress((video.currentTime / video.duration) * 100);
    };
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

  // Load Instagram embed script when modal contains an Instagram reel
  // Avoid calling Instagram embed script inside the modal as well. We prefer
  // to render an iframe only when the user initiates play to prevent external
  // DOM mutations from interfering with React's lifecycle.

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    playing ? video.pause() : video.play();
    setPlaying(!playing);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-11 h-11 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center text-white transition z-10"
      >
        <X size={20} />
      </button>

      {/* Modal card */}
      <div
        className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl bg-black"
        style={{ height: "85vh", maxHeight: "700px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media */}
        {embedUrl ? (
          // Render Instagram post as an iframe inside the modal and attempt autoplay
          <div className="w-full h-full">
            <iframe
              src={(() => {
                const src = embedUrl;
                const sep = src.includes("?") ? "&" : "?";
                return src + sep + "autoplay=1&mute=1";
              })()}
              title={reel.caption || "Instagram Reel"}
              className="w-full h-full object-cover border-0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              loading="lazy"
              style={{ background: "black" }}
            />
          </div>
        ) : (
          <video
            ref={videoRef}
            src={reel.videoUrl}
            poster={reel.thumbnail}
            loop
            muted={muted}
            playsInline
            className="w-full h-full object-cover"
          />
        )}

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* Top */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
            <FaInstagram className="text-pink-400 text-sm" />
            <span className="text-white text-xs font-bold">@ozone.official</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={toggleMute}
              className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition"
            >
              {muted ? <FaVolumeMute size={13} /> : <FaVolumeUp size={13} />}
            </button>
          </div>
        </div>

        {/* Center play/pause (only for native videos) */}
        {!embedUrl && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto"
          >
            <div
              className={`w-18 h-18 rounded-full bg-white/20 border-2 border-white/60 backdrop-blur-sm flex items-center justify-center shadow-2xl transition-opacity duration-300 ${playing ? "opacity-0 hover:opacity-100" : "opacity-100"
                }`}
              style={{ width: 72, height: 72 }}
            >
              {playing ? (
                <FaPause className="text-white text-2xl" />
              ) : (
                <FaPlay className="text-white text-2xl ml-1" />
              )}
            </div>
          </button>
        )}

        {/* Right actions */}
        <div className="absolute right-4 bottom-6 flex flex-col items-center gap-4 z-10">
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-white/15 border border-white/20 flex items-center justify-center shadow-xl">
              <FaHeart className="text-white text-lg" />
            </div>
            <span className="text-white text-[11px] font-semibold">{reel.likes}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-white/15 border border-white/20 flex items-center justify-center shadow-xl">
              <FaComment className="text-white text-lg" />
            </div>
            <span className="text-white text-[11px] font-semibold">{reel.comments}</span>
          </div>
          <a
            href={reel.instagramUrl || reel.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1"
          >
            <div className="w-12 h-12 rounded-full bg-white/15 border border-white/20 flex items-center justify-center shadow-xl">
              <FaShare className="text-white text-lg" />
            </div>
            <span className="text-white text-[11px] font-semibold">View</span>
          </a>
        </div>

        {/* Bottom caption */}
        <div className="absolute bottom-8 left-4 right-16 z-10">
          <span className="text-pink-400 text-xs font-bold tracking-widest uppercase block mb-1">
            {reel.tag}
          </span>
          <p className="text-white font-bold text-base leading-snug drop-shadow-lg">
            {reel.caption}
          </p>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-yellow-400 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// ─── Main Section ───────────────────────────────────────────────────────────
const InstagramReels = () => {
  const [expandedReel, setExpandedReel] = useState(null);
  const prioritizedReels = sortReels(reels);

  return (
    <section className="py-20 bg-[var(--primary)] relative overflow-hidden">
      {/* BG decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Removed Header */}

        {/* Swiper */}
        <style>{`
  .reels-swiper .swiper-slide {
  min-height: 460px;
  height: min(92vw, 620px);
}

@media (min-width: 640px) {
  .reels-swiper .swiper-slide {
    min-height: 520px;
    height: min(85vw, 650px);
  }
}

@media (min-width: 1024px) {
  .reels-swiper .swiper-slide {
    height: 500px;
  }
}

@media (min-width: 1280px) {
  .reels-swiper .swiper-slide {
    height: 550px;
  }
}
`}</style>

        <Swiper
          className="reels-swiper"
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1.2}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            480: { slidesPerView: 1.8, spaceBetween: 16 },
            640: { slidesPerView: 2.2, spaceBetween: 20, centeredSlides: true },
            1024: { slidesPerView: 3.2, spaceBetween: 24, centeredSlides: false },
            1280: { slidesPerView: 4, spaceBetween: 24, centeredSlides: false },
          }}
        >
          {prioritizedReels.map((reel) => (
            <SwiperSlide key={reel.id}>
              <ReelCard reel={reel} onExpand={setExpandedReel} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Removed Bottom CTA strip */}
      </div>

      {/* Fullscreen modal */}
      {expandedReel && (
        <ReelModal reel={expandedReel} onClose={() => setExpandedReel(null)} />
      )}
    </section>
  );
};

export default InstagramReels;
