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
import { ChevronLeft, ChevronRight, ArrowRight, X } from "lucide-react";
import reels from "../data/reels.json";

const getInstagramEmbedUrl = (url) => {
  if (!url) return null;
  const match = url.match(/instagram\.com\/(?:reel|p|tv)\/([A-Za-z0-9_-]+)/i);
  if (!match) return null;

  const type = url.includes("/reel/") ? "reel" : url.includes("/p/") ? "p" : "tv";
  return `https://www.instagram.com/${type}/${match[1]}/embed/captioned/`;
};

// ─── Individual Reel Card ───────────────────────────────────────────────────
const ReelCard = ({ reel, onExpand }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [progress, setProgress] = useState(0);
  const embedUrl = getInstagramEmbedUrl(reel.videoUrl || reel.instagramUrl);

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

  const togglePlay = () => {
    if (embedUrl) {
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

  return (
    <div
      className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl cursor-pointer group select-none bg-black"
      onClick={togglePlay}
    >
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={`Instagram reel ${reel.id}`}
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <video
          ref={videoRef}
          src={reel.videoUrl}
          poster={reel.thumbnail}
          loop
          muted={muted}
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          onEnded={() => setPlaying(false)}
        />
      )}

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
        className="absolute right-4 bottom-24 flex flex-col items-center gap-5 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setLiked((v) => !v)}
          className="flex flex-col items-center gap-1"
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${liked
              ? "bg-red-500 scale-110"
              : "bg-white/20 border border-white/30 hover:bg-white/30"
              }`}
          >
            <FaHeart className="text-white text-sm" />
          </div>
          <span className="text-white text-[10px] font-bold">{reel.likes}</span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-all">
            <FaComment className="text-white text-sm" />
          </div>
          <span className="text-white text-[10px] font-bold">
            {reel.comments}
          </span>
        </button>

        <a
          href={reel.instagramUrl || reel.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1"
        >
          <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-all">
            <FaShare className="text-white text-sm" />
          </div>
          <span className="text-white text-[10px] font-bold">Share</span>
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
  const embedUrl = getInstagramEmbedUrl(reel.videoUrl || reel.instagramUrl);

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
          <iframe
            src={embedUrl}
            title={`Instagram reel modal ${reel.id}`}
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
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

        {/* Center play/pause */}
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

        {/* Right actions */}
        <div className="absolute right-4 bottom-28 flex flex-col items-center gap-5 z-10">
          <div className="flex flex-col items-center gap-1">
            <div className="w-11 h-11 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
              <FaHeart className="text-white" />
            </div>
            <span className="text-white text-xs font-bold">{reel.likes}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-11 h-11 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
              <FaComment className="text-white" />
            </div>
            <span className="text-white text-xs font-bold">{reel.comments}</span>
          </div>
          <a
            href={reel.instagramUrl || reel.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1"
          >
            <div className="w-11 h-11 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
              <FaShare className="text-white" />
            </div>
            <span className="text-white text-xs font-bold">Share</span>
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
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [expandedReel, setExpandedReel] = useState(null);

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

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
          <div>
            {/* <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 shadow-lg mb-5">
              <FaInstagram className="text-white text-base" />
              <span className="text-white text-xs font-black tracking-widest uppercase">
                Instagram Reels
              </span>
            </div> */}
            <h2 className="text-4xl sm:text-5xl font-black leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                Follow Our{" "}
              </span>

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                Journey
              </span>
            </h2>
            <p className="text-white/60 text-base mt-3 max-w-md">
              Watch our latest installations, products and behind-the-scenes moments.
              Click any reel to play instantly.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              ref={prevRef}
              className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[var(--primary)] transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              ref={nextRef}
              className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[var(--primary)] transition-all duration-300 hover:scale-110"
            >
              <ChevronRight size={20} />
            </button>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-bold text-sm rounded-full shadow-xl hover:shadow-pink-500/40 transition-all duration-300 hover:scale-105"
            >
              <FaInstagram />
              Follow Us
              <ArrowRight size={15} />
            </a>
          </div>
        </div>

        {/* Swiper */}
        <style>{`
  .reels-swiper .swiper-slide {
    height: 400px;
  }

  @media (min-width: 640px) {
    .reels-swiper .swiper-slide {
      height: 300px;
    }
  }

  @media (min-width: 1024px) {
    .reels-swiper .swiper-slide {
      height: 430px;
    }
  }
`}</style>

        <Swiper
          className="reels-swiper"
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.2}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onSwiper={(swiper) => {
            setTimeout(() => {
              if (swiper.params?.navigation) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              }
            }, 0);
          }}
          breakpoints={{
            480: { slidesPerView: 1.8, spaceBetween: 16 },
            640: { slidesPerView: 2.2, spaceBetween: 20, centeredSlides: true },
            1024: { slidesPerView: 3.2, spaceBetween: 24, centeredSlides: false },
            1280: { slidesPerView: 4, spaceBetween: 24, centeredSlides: false },
          }}
        >
          {reels.map((reel) => (
            <SwiperSlide key={reel.id}>
              <ReelCard reel={reel} onExpand={setExpandedReel} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Bottom CTA strip */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 bg-white border border-white/20 rounded-2xl px-8 py-5">
          <FaInstagram className="text-pink-500 text-2xl hidden sm:block" />
          <p className="text-gray-900 text-sm font-semibold text-center">
            We post new reels every week. Follow us for the latest projects &amp;
            product launches!
          </p>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[var(--primary)] font-bold text-sm rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg"
          >
            <FaInstagram className="text-pink-500" />
            @ozone.official
          </a>
        </div>
      </div>

      {/* Fullscreen modal */}
      {expandedReel && (
        <ReelModal reel={expandedReel} onClose={() => setExpandedReel(null)} />
      )}
    </section>
  );
};

export default InstagramReels;
