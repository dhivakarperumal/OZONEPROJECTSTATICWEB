import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ChevronDown,
  CheckCircle,
  XCircle,
  Headset,
  ShieldCheck,
  Users,
  ThumbsUp,
  PhoneCall,
} from "lucide-react";
import PageHeader from "../CommenComponents/PageHeader";

// ─── EmailJS Credentials ──────────────────────────────────────────────────────
// 1. Sign up at https://www.emailjs.com (free plan: 200 emails/month)
// 2. Create a Service  → paste the Service ID  below
// 3. Create a Template → paste the Template ID below
//    Template variables to use: {{name}}, {{email}}, {{phone}}, {{subject}}, {{message}}, {{time}}
// 4. Go to Account → API Keys → paste your Public Key below
const EMAILJS_SERVICE_ID = "service_v0zovjm";
const EMAILJS_TEMPLATE_ID = "template_u8r3kha";
// ─────────────────────────────────────────────────────────────────────────────

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const ContactUs = () => {
  const [loading, setLoading] = useState(true);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSendError("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          ...formData,
          from_name: formData.name,
          from_email: formData.email,
          time: new Date().toLocaleString(),
        }
      );
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setSendError(
        err?.text
          ? `Failed to send message: ${err.text}`
          : "Failed to send message. Please try again or contact us directly."
      );
    } finally {
      setSending(false);
    }
  };

  const subjectOptions = [
    "General Inquiry",
    "Order Related",
    "Product Information",
    "Project / Bulk Order",
    "Warranty & Maintenance",
    "Installation Request",
    "Dealership Inquiry",
    "Other",
  ];

  const contactCards = [
    {
      icon: MapPin,
      title: "Our Address",
      lines: [
        "No. 12, Green Park Avenue,",
        "Anna Nagar, Chennai – 600040,",
        "Tamil Nadu, India.",
      ],
    },
    {
      icon: Phone,
      title: "Phone Number",
      lines: ["+91 89506 78907", "+91 91598 50960"],
    },
    {
      icon: Mail,
      title: "Email Address",
      lines: ["info@ozoneenterprises.com", "support@ozoneenterprises.com"],
    },
    {
      icon: Clock,
      title: "Working Hours",
      lines: ["Monday – Saturday: 9:00 AM – 7:00 PM", "Sunday: Closed"],
    },
  ];

  const stats = [
    { icon: Headset, title: "Quick Support", desc: "We provide fast and reliable support." },
    { icon: ShieldCheck, title: "Trusted Service", desc: "Quality service you can trust and rely on." },
    { icon: Users, title: "Expert Team", desc: "Our expert team is always ready to help you." },
    { icon: ThumbsUp, title: "Customer Satisfaction", desc: "Your satisfaction is our top priority." },
  ];

  return (
    <motion.div
      className="bg-[#EEF4FB] min-h-screen"
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
    >
      <PageHeader title="Contact Us" />

      <AnimatePresence>
        {loading && (
          <>
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.8 }}
              className="fixed top-0 left-0 w-1/2 h-screen bg-[#0c5940]/30 z-[9999]"
            />

            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "100%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8 }}
              className="fixed top-0 right-0 w-1/2 h-screen bg-[#08124E]/30 z-[9999]"
            />
          </>
        )}
      </AnimatePresence>

      {/* ─── MAIN SECTION ─── */}
      <FadeIn delay={100}>
        <section className="py-14 px-5 md:py-20">
          <div className="container mx-auto px-0 sm:px-10 lg:px-8 max-w-8xl">
            <div className="grid lg:grid-cols-2 gap-10 items-start">

              {/* ── LEFT SIDE ── */}
              <div className="flex flex-col gap-8">
                {/* Heading */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#081A59] font-bold text-xs tracking-[0.2em] uppercase">
                      Get In Touch
                    </span>
                    <div className="flex-1 h-px bg-[#081A59]/30 max-w-[60px]" />
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-black text-[#081A59] mb-4 leading-tight">
                    Contact Us
                  </h1>
                  <p className="text-gray-500 text-base leading-relaxed max-w-md">
                    We're here to help and answer any question you might have.
                    We look forward to hearing from you!
                  </p>
                  <div className="w-12 h-1 bg-[#081A59] rounded-full mt-4" />
                </div>

                {/* Contact Info Card */}
                <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 grid sm:grid-cols-2 gap-5">
                  {contactCards.map((card, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[#081A59]/10 flex items-center justify-center flex-shrink-0">
                        <card.icon className="w-5 h-5 text-[#081A59]" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm mb-1">{card.title}</p>
                        {card.lines.map((line, j) => (
                          <p key={j} className="text-gray-500 text-xs leading-relaxed">{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Image + CTA overlay */}
                <div className="relative rounded-3xl overflow-hidden h-64 sm:h-72 shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop"
                    alt="Ozone Installation"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/800x500/081A59/ffffff?text=Ozone+Enterprises";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081A59]/80 via-[#081A59]/20 to-transparent" />

                  {/* CTA pill */}
                  <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 w-[92%] sm:w-auto sm:left-5 sm:translate-x-0 sm:right-5">
                    <div className="flex items-center gap-3 sm:gap-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:px-5 sm:py-4 shadow-2xl">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#081A59] flex items-center justify-center flex-shrink-0 shadow-lg">
                        <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-[#081A59] text-[10px] sm:text-[11px] font-semibold opacity-70">We are just</p>
                        <p className="text-[#081A59] text-base sm:text-xl font-black leading-tight">One Call Away!</p>
                      </div>
                      <a
                        href="tel:+918950678907"
                        className="ml-auto bg-[#081A59] text-white text-[10px] sm:text-xs font-bold px-3 py-2 sm:px-4 sm:py-2 rounded-xl hover:bg-[#0c2e50] transition whitespace-nowrap"
                      >
                        Call Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── RIGHT SIDE: FORM ── */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <div className="mb-8">
                  <h2 className="text-2xl font-black text-gray-900 mb-2">Send Us a Message</h2>
                  <p className="text-gray-500 text-sm">
                    Fill out the form below and we will get back to you as soon as possible.
                  </p>
                  <div className="w-10 h-1 bg-[#081A59] rounded-full mt-3" />
                </div>

                {submitted ? (
                  <div className="py-16 text-center">
                    <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-green-50 flex items-center justify-center border border-green-100">
                      <CheckCircle className="w-10 h-10 text-[#0c5940]" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                    <p className="text-gray-500 text-sm max-w-xs mx-auto">
                      Thank you for reaching out. We'll get back to you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-[#081A59] font-semibold text-sm hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your Name"
                          className="w-full px-4 py-3.5 pr-10 bg-[#EEF4FB] border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-[#081A59] focus:ring-2 focus:ring-[#081A59]/10 transition"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Your Email"
                          className="w-full px-4 py-3.5 pr-10 bg-[#EEF4FB] border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-[#081A59] focus:ring-2 focus:ring-[#081A59]/10 transition"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" /></svg>
                        </span>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your Phone"
                        className="w-full px-4 py-3.5 pr-10 bg-[#EEF4FB] border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-[#081A59] focus:ring-2 focus:ring-[#081A59]/10 transition"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.14 13.5 19.79 19.79 0 0 1 2 4.82 2 2 0 0 1 3.98 2.63h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                      </span>
                    </div>

                    {/* Subject */}
                    <div className="relative">
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 pr-10 bg-[#EEF4FB] border border-gray-200 rounded-xl text-sm appearance-none focus:outline-none focus:border-[#081A59] focus:ring-2 focus:ring-[#081A59]/10 transition cursor-pointer text-gray-500"
                      >
                        <option value="" disabled>Subject</option>
                        {subjectOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        maxLength="1000"
                        rows="5"
                        placeholder="Your Message"
                        className="w-full px-4 py-3.5 pr-10 bg-[#EEF4FB] border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-[#081A59] focus:ring-2 focus:ring-[#081A59]/10 transition resize-none"
                      />
                      <span className="absolute right-3 top-4 text-gray-400 pointer-events-none">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                      </span>
                    </div>

                    {/* Error Banner */}
                    {sendError && (
                      <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                        <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{sendError}</span>
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full py-4 bg-[#081A59] hover:bg-[#0c2e50] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-xl hover:shadow-[#081A59]/30 hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none cursor-pointer"
                    >
                      {sending ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          SEND MESSAGE
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ─── STATS BAR ─── */}
      <FadeIn delay={200}>
        <section className="bg-[#081A59] px-5 py-10">
          <div className="container mx-auto px-0 sm:px-6 lg:px-8 max-w-8xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <s.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{s.title}</p>
                    <p className="text-white/60 text-xs mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ─── MAP SECTION ─── */}
      <FadeIn delay={300}>
        <section className="py-14 px-5 bg-white">
          <div className="container mx-auto px-0 sm:px-6 lg:px-8 max-w-8xl">
            <div className="grid lg:grid-cols-2 gap-10 items-center">

              {/* Map */}
              <div className="w-full h-72 overflow-hidden rounded-3xl border border-gray-100 shadow-xl sm:h-96">
                <iframe
                  title="Ozone location map"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3895.0832650806783!2d78.56543597506867!3d12.510639887763997!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf0aa99f30dad%3A0x3f1a0a176b2f0b02!2sOzone%20Enterprises!5e0!3m2!1sen!2sin!4v1783402321437"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Text */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[#081A59] font-bold text-xs tracking-[0.2em] uppercase">Find Us</span>
                  <div className="flex-1 h-px bg-[#081A59]/30 max-w-[60px]" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-[#081A59] mb-4 leading-tight">
                  We Provide Service<br />
                  <span className="text-[#0c5940]">All Over India</span>
                </h2>
                <div className="w-10 h-1 bg-[#081A59] rounded-full mb-5" />
                <p className="text-gray-500 text-base leading-relaxed mb-6">
                  No matter where you are, our team is ready to serve you with the best solutions for your needs. With a network across major cities in India, we ensure timely delivery and installation.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: "Chennai", sub: "Head Office" },
                    { label: "Bangalore", sub: "Branch Office" },
                    { label: "Hyderabad", sub: "Service Center" },
                    { label: "Mumbai", sub: "Dealership Partner" },
                  ].map((city, i) => (
                    <div key={i} className="flex items-center gap-3 bg-[#EEF4FB] rounded-2xl px-4 py-3">
                      <MapPin className="w-4 h-4 text-[#081A59] flex-shrink-0" />
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{city.label}</p>
                        <p className="text-gray-500 text-xs">{city.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </motion.div>
  );
};

export default ContactUs;
