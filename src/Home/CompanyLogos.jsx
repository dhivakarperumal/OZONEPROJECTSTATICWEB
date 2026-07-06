import React from "react";
import {
  AppWindow,
  DoorClosed,
  ScrollText,
  AlignJustify,
  ArrowLeftRight,
  Link2,
  Magnet,
  GripVertical,
} from "lucide-react";

const fitments = [
  { id: 1, name: "Window Fitments",  icon: AppWindow },
  { id: 2, name: "Door Fitments",    icon: DoorClosed },
  { id: 3, name: "Roll Fitments",    icon: ScrollText },
  { id: 4, name: "Pleated Fitments", icon: AlignJustify },
  { id: 5, name: "Glide Fitments",   icon: ArrowLeftRight },
  { id: 6, name: "Zip Fitments",     icon: Link2 },
  { id: 7, name: "Magnet Fitments",  icon: Magnet },
  { id: 8, name: "Velcro Fitments",  icon: GripVertical },
];

// Duplicate for seamless infinite loop
const ticker = [...fitments, ...fitments];

const CompanyLogos = () => {
  return (
    <section className="company-logos-section">
      {/* Heading */}
      <div className="company-logos-heading">
        <span className="company-logos-pill">Our Fitment Systems</span>
        <h2 className="company-logos-title">
          Trusted Solutions for Every Space
        </h2>
        <p className="company-logos-sub">
          From windows to doors — precision-engineered fitment systems
          built for lasting performance.
        </p>
      </div>

      {/* Marquee Track */}
      <div className="company-logos-track-wrap">
        {/* Left fade */}
        <div className="company-logos-fade company-logos-fade--left" />
        {/* Right fade */}
        <div className="company-logos-fade company-logos-fade--right" />

        <div className="company-logos-track">
          {ticker.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="company-logos-card">
                <div className="company-logos-icon-ring">
                  <Icon size={28} strokeWidth={1.4} />
                </div>
                <span className="company-logos-label">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        /* ── Section ── */
        .company-logos-section {
          padding: 72px 0 64px;
          background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
          border-top: 1px solid #e9eef6;
          border-bottom: 1px solid #e9eef6;
          overflow: hidden;
        }

        /* ── Heading ── */
        .company-logos-heading {
          text-align: center;
          margin-bottom: 52px;
          padding: 0 20px;
        }
        .company-logos-pill {
          display: inline-block;
          background: linear-gradient(135deg, #0c5940, #1a7a50);
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          padding: 5px 16px;
          border-radius: 999px;
          margin-bottom: 16px;
        }
        .company-logos-title {
          font-size: clamp(22px, 4vw, 32px);
          font-weight: 800;
          color: #021333;
          margin: 0 0 12px;
          letter-spacing: -0.4px;
          line-height: 1.2;
        }
        .company-logos-sub {
          font-size: 15px;
          color: #64748b;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* ── Track wrapper with fade edges ── */
        .company-logos-track-wrap {
          position: relative;
          overflow: hidden;
        }
        .company-logos-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }
        .company-logos-fade--left {
          left: 0;
          background: linear-gradient(to right, #f8fafc 0%, transparent 100%);
        }
        .company-logos-fade--right {
          right: 0;
          background: linear-gradient(to left, #ffffff 0%, transparent 100%);
        }

        /* ── Scrolling track ── */
        .company-logos-track {
          display: flex;
          align-items: stretch;
          gap: 20px;
          width: max-content;
          animation: logoScroll 22s linear infinite;
          padding: 10px 0;
        }
        .company-logos-track:hover {
          animation-play-state: paused;
        }
        @keyframes logoScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── Individual card ── */
        .company-logos-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          min-width: 148px;
          padding: 28px 20px;
          background: #ffffff;
          border: 1.5px solid #e8edf5;
          border-radius: 18px;
          cursor: default;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          box-shadow: 0 2px 12px rgba(2,19,51,0.05);
        }
        .company-logos-card:hover {
          border-color: #0c5940;
          box-shadow: 0 8px 30px rgba(12,89,64,0.14);
          transform: translateY(-4px);
        }

        /* ── Icon ring ── */
        .company-logos-icon-ring {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f0fdf8, #e6f7f0);
          border: 1.5px solid #c7ead9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0c5940;
          transition: background 0.3s, border-color 0.3s;
          flex-shrink: 0;
        }
        .company-logos-card:hover .company-logos-icon-ring {
          background: linear-gradient(135deg, #0c5940, #1a7a50);
          border-color: #0c5940;
          color: #fff;
        }

        /* ── Label ── */
        .company-logos-label {
          font-size: 12px;
          font-weight: 700;
          color: #334155;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          line-height: 1.4;
          transition: color 0.3s;
        }
        .company-logos-card:hover .company-logos-label {
          color: #0c5940;
        }
      `}</style>
    </section>
  );
};

export default CompanyLogos;
