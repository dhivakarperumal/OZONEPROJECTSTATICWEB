import React, { useState, useEffect } from "react";
import { X, Mail, Download, CheckCircle, BookOpen, Sparkles } from "lucide-react";

const CatalogueDownload = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setEmail("");
      setName("");
      setError("");
    }, 300);
  };

  const validateEmail = (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);

    // Simulate API call / subscription
    await new Promise((r) => setTimeout(r, 1500));

    setLoading(false);
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`catalogue-overlay ${visible ? "catalogue-overlay--visible" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`catalogue-modal ${visible ? "catalogue-modal--visible" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="catalogue-close"
          onClick={handleClose}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <>
            {/* Header */}
            <div className="catalogue-header">
              <div className="catalogue-icon-wrap">
                <BookOpen size={32} strokeWidth={1.5} />
                <span className="catalogue-sparkle"><Sparkles size={14} /></span>
              </div>
              <h2 className="catalogue-title">Download Our Catalogue</h2>
              <p className="catalogue-subtitle">
                Get free access to our full product catalogue — windows, doors, patios &amp; more.
                Enter your details below to unlock your download.
              </p>
            </div>

            {/* Preview Strip */}
            <div className="catalogue-preview">
              <div className="catalogue-preview-card">
                <div className="catalogue-preview-inner">
                  <img src="/logo.png" alt="Ozone Catalogue" />
                </div>
                <span>Product Catalogue 2025</span>
              </div>
              <ul className="catalogue-features">
                <li><CheckCircle size={14} /> Full product specifications</li>
                <li><CheckCircle size={14} /> Technical drawings &amp; dimensions</li>
                <li><CheckCircle size={14} /> Finish &amp; colour options</li>
                <li><CheckCircle size={14} /> Installation guidelines</li>
              </ul>
            </div>

            {/* Form */}
            <form className="catalogue-form" onSubmit={handleSubmit}>
              <div className="catalogue-field">
                <label htmlFor="cat-name">Your Name</label>
                <input
                  id="cat-name"
                  type="text"
                  placeholder="e.g. John Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
              <div className="catalogue-field">
                <label htmlFor="cat-email">Email Address</label>
                <div className="catalogue-input-wrap">
                  <Mail size={16} className="catalogue-input-icon" />
                  <input
                    id="cat-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
              </div>
              {error && <p className="catalogue-error">{error}</p>}
              <button
                type="submit"
                className="catalogue-submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="catalogue-spinner" />
                ) : (
                  <>
                    <Download size={18} />
                    Download Free Catalogue
                  </>
                )}
              </button>
              <p className="catalogue-note">
                🔒 We respect your privacy. No spam, unsubscribe anytime.
              </p>
            </form>
          </>
        ) : (
          /* Success State */
          <div className="catalogue-success">
            <div className="catalogue-success-icon">
              <CheckCircle size={52} strokeWidth={1.5} />
            </div>
            <h2>You're all set!</h2>
            <p>
              Thank you, <strong>{name}</strong>! Your catalogue download link has been sent to{" "}
              <strong>{email}</strong>.
            </p>
            <a
              href="/catalogue.pdf"
              download
              className="catalogue-download-btn"
              onClick={handleClose}
            >
              <Download size={18} />
              Download Now
            </a>
            <button className="catalogue-close-text" onClick={handleClose}>
              Close
            </button>
          </div>
        )}
      </div>

      <style>{`
        .catalogue-overlay {
          position: fixed;
          inset: 0;
          background: rgba(2, 19, 51, 0.75);
          backdrop-filter: blur(6px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .catalogue-overlay--visible {
          opacity: 1;
        }

        .catalogue-modal {
          background: #fff;
          border-radius: 20px;
          width: 100%;
          max-width: 480px;
          padding: 36px 32px 28px;
          position: relative;
          box-shadow: 0 32px 80px rgba(2, 19, 51, 0.35);
          transform: translateY(24px) scale(0.97);
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
          opacity: 0;
          max-height: 90vh;
          overflow-y: auto;
        }
        .catalogue-modal--visible {
          transform: translateY(0) scale(1);
          opacity: 1;
        }

        .catalogue-close {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: none;
          background: #f1f5f9;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .catalogue-close:hover {
          background: #e2e8f0;
          color: #021333;
        }

        /* Header */
        .catalogue-header {
          text-align: center;
          margin-bottom: 20px;
        }
        .catalogue-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          background: linear-gradient(135deg, #0c5940, #1a8a62);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          margin: 0 auto 14px;
          position: relative;
        }
        .catalogue-sparkle {
          position: absolute;
          top: -6px;
          right: -6px;
          background: #f59e0b;
          border-radius: 50%;
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }
        .catalogue-title {
          font-size: 22px;
          font-weight: 800;
          color: #021333;
          margin-bottom: 8px;
          letter-spacing: -0.3px;
        }
        .catalogue-subtitle {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.6;
        }

        /* Preview */
        .catalogue-preview {
          display: flex;
          align-items: center;
          gap: 16px;
          background: linear-gradient(135deg, #f0fdf8, #e8f5f1);
          border: 1px solid #c7ead9;
          border-radius: 12px;
          padding: 14px 16px;
          margin-bottom: 20px;
        }
        .catalogue-preview-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }
        .catalogue-preview-inner {
          width: 52px;
          height: 68px;
          background: #021333;
          border-radius: 6px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #0c5940;
        }
        .catalogue-preview-inner img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: brightness(2);
          opacity: 0.6;
        }
        .catalogue-preview-card span {
          font-size: 9px;
          color: #0c5940;
          font-weight: 700;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .catalogue-features {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .catalogue-features li {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 12.5px;
          color: #1e5c3f;
          font-weight: 500;
        }
        .catalogue-features li svg {
          color: #0c5940;
          flex-shrink: 0;
        }

        /* Form */
        .catalogue-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .catalogue-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .catalogue-field label {
          font-size: 12.5px;
          font-weight: 600;
          color: #374151;
        }
        .catalogue-field input,
        .catalogue-input-wrap input {
          width: 100%;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          padding: 11px 14px;
          font-size: 14px;
          color: #021333;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
          background: #f8fafc;
        }
        .catalogue-field input:focus,
        .catalogue-input-wrap input:focus {
          border-color: #0c5940;
          box-shadow: 0 0 0 3px rgba(12, 89, 64, 0.12);
          background: #fff;
        }
        .catalogue-input-wrap {
          position: relative;
        }
        .catalogue-input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          pointer-events: none;
        }
        .catalogue-input-wrap input {
          padding-left: 38px;
        }
        .catalogue-error {
          font-size: 12.5px;
          color: #ef4444;
          margin: 0;
          font-weight: 500;
        }
        .catalogue-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: linear-gradient(135deg, #0c5940, #1a7a50);
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 14px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          box-shadow: 0 6px 20px rgba(12, 89, 64, 0.35);
          margin-top: 4px;
        }
        .catalogue-submit:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
        }
        .catalogue-submit:disabled {
          opacity: 0.75;
          cursor: not-allowed;
        }
        .catalogue-spinner {
          width: 20px;
          height: 20px;
          border: 2.5px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .catalogue-note {
          font-size: 11.5px;
          color: #94a3b8;
          text-align: center;
          margin: 0;
        }

        /* Success */
        .catalogue-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 16px 0;
          gap: 12px;
        }
        .catalogue-success-icon {
          color: #0c5940;
          animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes popIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .catalogue-success h2 {
          font-size: 22px;
          font-weight: 800;
          color: #021333;
          margin: 0;
        }
        .catalogue-success p {
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
          margin: 0;
        }
        .catalogue-download-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #0c5940, #1a7a50);
          color: #fff;
          padding: 13px 28px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 6px 20px rgba(12, 89, 64, 0.35);
          transition: opacity 0.2s, transform 0.15s;
          margin-top: 6px;
        }
        .catalogue-download-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        .catalogue-close-text {
          background: none;
          border: none;
          font-size: 13px;
          color: #94a3b8;
          cursor: pointer;
          padding: 4px 8px;
          transition: color 0.2s;
        }
        .catalogue-close-text:hover {
          color: #475569;
        }

        @media (max-width: 480px) {
          .catalogue-modal {
            padding: 28px 20px 22px;
          }
          .catalogue-title {
            font-size: 19px;
          }
        }
      `}</style>
    </div>
  );
};

export default CatalogueDownload;
