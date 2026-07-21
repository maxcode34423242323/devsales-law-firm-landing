import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function DevilSalesAutoCaseStudy() {
  const technologies = [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Sanity CMS",
    "Vercel",
    "Lead API",
    "Telegram CRM",
  ];

  const results = [
    ["100%", "Custom Platform"],
    ["CMS", "Inventory Control"],
    ["CRM", "Lead Automation"],
    ["SEO", "Growth Ready"],
  ];

  return (
    <main className="case-page min-h-screen">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-24 pt-48">
        <div className="case-ambient absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-200 opacity-40 blur-[140px]" />
        <div className="case-ambient absolute right-0 top-40 h-[350px] w-[350px] rounded-full bg-purple-200 opacity-40 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/work"
            className="text-sm text-zinc-500 transition hover:text-black"
          >
            ← Back to Work
          </Link>

          <p className="mt-16 mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
            Case Study
          </p>

          <h1 className="max-w-5xl text-6xl font-bold leading-tight tracking-tight text-black md:text-8xl">
            DevilSales Auto
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-zinc-600">
            A luxury automotive brokerage platform engineered to showcase
            premium vehicles, capture qualified leads and support future
            international expansion.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {["Luxury Automotive", "Lead Generation", "CMS Platform"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-zinc-200 bg-white/80 px-5 py-3 text-sm text-zinc-600 shadow-sm backdrop-blur"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl">
          <Image
            src="/images/devilsales-home.webp"
            alt="DevilSales Auto homepage"
            width={1200}
            height={772}
            sizes="(max-width: 767px) calc(100vw - 48px), 1200px"
            quality={70}
            unoptimized
            className="w-full object-cover"
            priority
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 border-t border-zinc-200 px-6 py-24 md:grid-cols-3">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Project
          </p>
          <p className="mt-4 text-2xl font-bold text-black">
            Automotive Platform
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Market
          </p>
          <p className="mt-4 text-2xl font-bold text-black">
            Italy + International
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Objective
          </p>
          <p className="mt-4 text-2xl font-bold text-black">
            Inventory + Lead Growth
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-t border-zinc-200 px-6 py-24">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
          The Challenge
        </p>

        <h2 className="max-w-4xl text-5xl font-bold tracking-tight text-black">
          Build a premium digital presence for a luxury automotive brand.
        </h2>

        <p className="mt-8 max-w-4xl text-lg leading-8 text-zinc-600">
          DevilSales Auto needed more than a simple dealership website. The
          platform had to present premium vehicles with a luxury visual style,
          manage inventory through a CMS, capture qualified leads, support
          multilingual expansion and create a digital foundation for future
          brokerage, sourcing and consulting services.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl">
          <Image
            src="/images/devilsales-car.webp"
            alt="DevilSales Auto vehicle page"
            width={1200}
            height={766}
            sizes="(max-width: 767px) calc(100vw - 48px), 1200px"
            quality={70}
            loading="eager"
            unoptimized
            className="w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-t border-zinc-200 px-6 py-24">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
          The Solution
        </p>

        <h2 className="max-w-4xl text-5xl font-bold tracking-tight text-black">
          A custom automotive platform built for conversion and control.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            [
              "Dynamic Vehicle Inventory",
              "A custom inventory system allows vehicles to be published, updated and managed through Sanity CMS without touching code.",
            ],
            [
              "Premium Vehicle Pages",
              "Individual car pages showcase gallery images, pricing, technical details and luxury positioning in a clean interface.",
            ],
            [
              "Lead Capture Architecture",
              "Conversion-focused forms collect buyer enquiries, consultation requests and sourcing leads directly from the website.",
            ],
            [
              "Telegram CRM Notifications",
              "Every lead is automatically sent to Telegram, creating a fast response workflow for sales conversations.",
            ],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <h3 className="text-xl font-semibold text-black">{title}</h3>
              <p className="mt-4 leading-relaxed text-zinc-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl">
          <Image
            src="/images/devilsales-lead.webp"
            alt="DevilSales Auto lead generation form"
            width={1200}
            height={727}
            sizes="(max-width: 767px) calc(100vw - 48px), 1200px"
            quality={70}
            loading="eager"
            unoptimized
            className="w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-t border-zinc-200 px-6 py-24">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
          Technology Stack
        </p>

        <h2 className="max-w-4xl text-5xl font-bold tracking-tight text-black">
          Modern stack. Fast execution. Scalable foundation.
        </h2>

        <div className="mt-10 flex flex-wrap gap-4">
          {technologies.map((tech) => (
            <div
              key={tech}
              className="rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm text-zinc-600 shadow-sm"
            >
              {tech}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-t border-zinc-200 px-6 py-24">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
          Results
        </p>

        <h2 className="max-w-4xl text-5xl font-bold tracking-tight text-black">
          A premium digital platform ready for lead generation and growth.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {results.map(([number, label]) => (
            <div
              key={label}
              className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg"
            >
              <p className="text-4xl font-bold text-black">{number}</p>
              <p className="mt-3 text-zinc-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-zinc-200 bg-zinc-50 px-6 py-32">
        <div className="case-ambient absolute left-1/2 top-20 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-blue-200 opacity-40 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <h2 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight text-black">
            Looking to build a digital platform that actually drives business?
          </h2>

          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-zinc-600">
            DevilSales Web designs and engineers premium websites and digital
            platforms for ambitious service businesses across the United
            States.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-black px-8 py-4 font-semibold text-white transition hover:opacity-90"
            >
              Book A Strategy Call
            </Link>

            <Link
              href="/work"
              className="rounded-xl border border-zinc-300 bg-white px-8 py-4 font-semibold text-black transition hover:bg-zinc-100"
            >
              Back To Work
            </Link>
          </div>
        </div>
      </section>

      <Footer compact />
    </main>
  );
}
