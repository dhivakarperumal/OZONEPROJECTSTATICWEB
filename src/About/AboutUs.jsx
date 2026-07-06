import React from "react";
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Eye,
  Layers,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import PageContainer from "../CommenComponents/PageContainer";
import PageHeader from "../CommenComponents/PageHeader";

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "500+", label: "Projects Delivered" },
  { value: "50+", label: "Skilled Professionals" },
  { value: "98%", label: "Client Satisfaction" },
];

const values = [
  {
    icon: <ShieldCheck size={20} />,
    title: "Premium Quality",
    text: "Every product is crafted with precision and built to last in demanding environments.",
  },
  {
    icon: <Layers size={20} />,
    title: "Custom Fitment",
    text: "We design tailored solutions that complement your architectural and functional requirements.",
  },
  {
    icon: <Users size={20} />,
    title: "Client-Centered Approach",
    text: "Our team works closely with clients to deliver smooth execution and dependable support.",
  },
];

const milestones = [
  "Advanced manufacturing and fitment expertise",
  "Trusted by residential, commercial, and industrial clients",
  "Focused on innovation, durability, and seamless finishes",
  "End-to-end support from consultation to installation",
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="About Us"
        subtitle="Crafting premium architectural solutions with innovation, precision, and a commitment to exceptional quality."
      />

      <PageContainer className="py-16 sm:py-20 lg:py-24">
        <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-success-dark">
              <span className="h-2.5 w-2.5 rounded-full bg-success" />
              Who We Are
            </div>

            <h2 className="mt-6 text-3xl font-black leading-tight text-heading sm:text-4xl lg:text-5xl">
              Elevating spaces with intelligent design and lasting performance.
            </h2>

            <p className="mt-5 text-base leading-8 text-text sm:text-lg">
              Ozone Enterprises is a trusted name in premium fitment systems and architectural solutions. With years of industry experience, we combine modern design thinking with dependable craftsmanship to create products that are both elegant and functional.
            </p>

            <p className="mt-4 text-base leading-8 text-text sm:text-lg">
              From concept to completion, our focus remains the same: deliver refined solutions that support comfort, efficiency, and visual appeal across residential, commercial, and industrial projects.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <p className="text-2xl font-black text-primary">{item.value}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-4xl border border-slate-200 shadow-2xl">
              <img
                src="/PageHeaderIMG/3.png"
                alt="Ozone Enterprises team and workspace"
                className="h-[27rem] w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-success/15 text-success-dark">
                  <Award size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                    Certified
                  </p>
                  <p className="text-sm font-bold text-slate-800">Premium Standards</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 rounded-2xl bg-primary px-5 py-4 text-white shadow-xl">
              <p className="text-3xl font-black leading-none">100%</p>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                Quality Focused
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-3">
          {values.map((item, index) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-success/12 text-success-dark">
                {item.icon}
              </div>
              <h3 className="mt-5 text-xl font-bold text-heading">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary">
                <CheckCircle2 size={16} />
                Trusted by modern projects
              </div>
            </div>
          ))}
        </section>

        <section className="mt-16 overflow-hidden rounded-4xl bg-linear-to-r from-primary via-primary-light to-secondary p-8 shadow-2xl sm:p-10 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-white/90">
                <Sparkles size={16} />
                Our Commitment
              </div>

              <h3 className="mt-6 text-3xl font-black leading-tight text-white sm:text-4xl">
                Building trust through craftsmanship and consistency.
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-100">
                Our mission is simple: deliver premium products and dependable service that shape better living and working environments.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                  <Target size={16} />
                  Vision-led execution
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                  <Eye size={16} />
                  Future-ready solutions
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                  <Building2 size={20} />
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">Why clients choose us</p>
                  <p className="text-sm text-slate-200">Quality, reliability, and timeless design</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {milestones.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/10 px-4 py-3">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-success-light" />
                    <p className="text-sm leading-7 text-slate-100">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary">
                Explore our solutions <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </section>
      </PageContainer>
    </div>
  );
}
