import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import {
  FaInstagram,
  FaPlay,
  FaVolumeMute,
  FaVolumeUp,
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

// Note: Instagram embed script loading is handled dynamically when modals are expanded
// to avoid external DOM mutations that conflict with React's reconciliation.

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
  const embedUrl = getInstagramEmbedUrl(reel.instagramUrl || reel.videoUrl);

  // Auto-play native videos when visible
  useEffect(() => {
    if (embedUrl) return;
    const node = containerRef.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const visible = entry.intersectionRatio > 0.5;
          const v = videoRef.current;
          if (v) {
            if (visible) {
              v.muted = true;
              v.play().catch(() => {
                // Auto-play suppressed
              });
              setPlaying(true);
            } else {
              v.pause();
              setPlaying(false);
            }
          }
        });
      },
      { threshold: [0, 0.5, 1] }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, [embedUrl]);

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

  if (embedUrl) {
    return (
      <div className="relative w-full h-full overflow-hidden rounded-xl bg-black shadow-lg border border-gray-300/10">
        <iframe
          src={embedUrl}
          title={reel.caption}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          loading="lazy"
          className="w-full h-full border-0"
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full rounded-xl overflow-hidden shadow-lg cursor-pointer bg-black border border-gray-300/10 group"
      onClick={togglePlay}
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
          onEnded={() => setPlaying(false)}
        />
      </div>

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Top bar */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-2 text-white/80 text-xs">
          <FaInstagram className="text-pink-400 text-sm" />
          <span className="font-semibold">@ozone.official</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          className="text-white/80 hover:text-white transition"
        >
          {muted ? <FaVolumeMute size={13} /> : <FaVolumeUp size={13} />}
        </button>
      </div>

      {/* Play button when paused */}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <FaPlay className="text-white text-base ml-0.5" />
          </div>
        </div>
      )}

      {/* Caption */}
      <div className="absolute bottom-3 left-3 right-3 z-10">
        <p className="text-white text-xs font-semibold leading-tight line-clamp-2 drop-shadow-lg">
          {reel.caption}
        </p>
      </div>
    </div>
  );
};

// ─── Fullscreen Modal ───────────────────────────────────────────────────────
const ReelModal = ({ reel, onClose }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const embedUrl = getInstagramEmbedUrl(reel.instagramUrl || reel.videoUrl);

  useEffect(() => {
    const video = videoRef.current;
    if (video && !embedUrl) {
      video.play().catch(() => {
        // Auto-play suppressed
      });
    }
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, embedUrl]);

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
      className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 bg-white/15 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition z-10"
      >
        <X size={20} />
      </button>

      {/* Modal card */}
      <div
        className="relative w-full max-w-md rounded-xl overflow-hidden shadow-2xl bg-black border border-gray-300/10"
        style={{ height: "clamp(400px, 85vh, 750px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media */}
        {embedUrl ? (
          <div className="w-full h-full">
            <iframe
              src={embedUrl}
              title={reel.caption || "Instagram Reel"}
              className="w-full h-full border-0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              loading="lazy"
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

        {/* Simple overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Top controls */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 text-white/80 text-xs">
            <FaInstagram className="text-pink-400 text-sm" />
            <span className="font-semibold">@ozone.official</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            className="text-white/80 hover:text-white transition"
          >
            {muted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
          </button>
        </div>

        {/* Play button (native videos only) */}
        {!embedUrl && !playing && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <FaPlay className="text-white text-lg ml-1" />
            </div>
          </button>
        )}

        {/* Caption */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <p className="text-white text-sm font-semibold leading-snug drop-shadow-lg line-clamp-3">
            {reel.caption}
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Main Section ───────────────────────────────────────────────────────────
const InstagramReels = () => {
  const [expandedReel, setExpandedReel] = useState(null);
  const prioritizedReels = sortReels(reels).slice(0, 8);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 mb-4">
            <FaInstagram className="text-pink-500 text-sm" />
            <span className="text-gray-700 text-xs font-bold tracking-widest uppercase">Instagram</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Follow Our Latest Updates
          </h2>
          <p className="text-gray-600">
            Check out our recent projects and installations on Instagram
          </p>
        </div>

        {/* Swiper */}
        <style>{`
  .reels-swiper {
    padding: 0 !important;
  }

  .reels-swiper .swiper-slide {
    height: 380px;
    display: flex !important;
  }

  @media (min-width: 480px) {
    .reels-swiper .swiper-slide {
      height: 420px;
    }
  }

  @media (min-width: 640px) {
    .reels-swiper .swiper-slide {
      height: 460px;
    }
  }

  @media (min-width: 1024px) {
    .reels-swiper .swiper-slide {
      height: 500px;
    }
  }

  @media (min-width: 1280px) {
    .reels-swiper .swiper-slide {
      height: 540px;
    }
  }

  .reels-swiper .swiper-slide > div {
    width: 100%;
    height: 100%;
  }

  .reels-swiper .swiper-wrapper {
    align-items: stretch;
  }
`}</style>

        <Swiper
          className="reels-swiper"
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={1.1}
          centeredSlides={true}
          loop={prioritizedReels.length > 1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            480: { slidesPerView: 1.5, spaceBetween: 12 },
            640: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 16, centeredSlides: false },
            1280: { slidesPerView: 4, spaceBetween: 16, centeredSlides: false },
          }}
        >
          {prioritizedReels.map((reel) => (
            <SwiperSlide key={reel.id}>
              <ReelCard reel={reel} onExpand={setExpandedReel} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modal */}
      {expandedReel && (
        <ReelModal reel={expandedReel} onClose={() => setExpandedReel(null)} />
      )}
    </section>
  );
};

export default InstagramReels;
