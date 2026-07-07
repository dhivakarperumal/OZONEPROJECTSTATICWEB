import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

const FloatingActions = () => {
  const whatsappNumber = "919500630922";
  const phoneNumber = "+919500630922";
  const whatsappMessage = "Hi, I'm interested in Ozone Mosquito Screens. Can you help me?";

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          right: 0,
          top: "50%",
          transform: visible ? "translateY(-50%) translateX(0)" : "translateY(-50%) translateX(120px)",
          transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
          zIndex: 9998,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          paddingRight: "0",
        }}
      >
        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="floating-btn whatsapp-btn"
        >
          <span className="floating-label">WhatsApp Us</span>
          <span className="floating-icon-wrap whatsapp-icon-wrap">
            <FaWhatsapp size={22} />
          </span>
        </a>

        {/* Call Button */}
        <a
          href={`tel:${phoneNumber}`}
          aria-label="Call Us"
          className="floating-btn call-btn"
        >
          <span className="floating-label">Call Now</span>
          <span className="floating-icon-wrap call-icon-wrap">
            <span className="call-pulse" />
            <FaPhoneAlt size={18} />
          </span>
        </a>
      </div>

      <style>{`
        .floating-btn {
          display: flex;
          align-items: center;
          text-decoration: none;
          border-radius: 40px 0 0 40px;
          overflow: hidden;
          box-shadow: -4px 4px 20px rgba(0,0,0,0.22);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          transform: translateX(0);
        }
        .floating-btn:hover {
          transform: translateX(-6px);
          box-shadow: -6px 6px 28px rgba(0,0,0,0.3);
        }

        /* Label — hidden by default, slides in on hover */
        .floating-label {
          max-width: 0;
          overflow: hidden;
          white-space: nowrap;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.3px;
          transition: max-width 0.35s ease, padding 0.35s ease;
          padding: 0;
        }
        .floating-btn:hover .floating-label {
          max-width: 120px;
          padding: 0 12px 0 16px;
        }

        /* Icon wrap */
        .floating-icon-wrap {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 40px 0 0 40px;
          position: relative;
        }

        /* WhatsApp colours */
        .whatsapp-btn {
          background: linear-gradient(135deg, #1db954, #25D366);
        }
        .whatsapp-icon-wrap {
          background: rgba(0,0,0,0.12);
          color: #fff;
        }

        /* Call colours */
        .call-btn {
          background: linear-gradient(135deg, #0c5940, #1a7a50);
        }
        .call-icon-wrap {
          background: rgba(0,0,0,0.12);
          color: #fff;
        }

        /* Pulsing ring on call icon */
        .call-pulse {
          position: absolute;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.45);
          animation: callPulse 2s ease-out infinite;
        }
        @keyframes callPulse {
          0%   { transform: scale(0.8); opacity: 0.9; }
          70%  { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(0.8); opacity: 0; }
        }
      `}</style>
    </>
  );
};

export default FloatingActions;
