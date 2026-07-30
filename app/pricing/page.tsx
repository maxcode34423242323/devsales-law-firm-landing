"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "../lib/track";
import PricingLeadForm from "./PricingLeadForm";
import PricingQuickLeadForm from "./PricingQuickLeadForm";

const reveal = {
  initial: { opacity: 0, y: 42 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: .75, ease: [.22, 1, .36, 1] as const },
};

const premiumReferences = [
  { category: "Plastic Surgery", title: "Austin-Weston", image: "/images/reference-austin-plastic.png", url: "https://www.austin-weston.com" },
  { category: "Medical Spa", title: "SkinSpirit", image: "/images/reference-skinspirit.png", url: "https://www.skinspirit.com" },
  { category: "Luxury Home Builders", title: "DWELL44", image: "/images/reference-dwell44-better.jpg", url: "https://dwell44.com/blogs/portfolio" },
  { category: "Restoration", title: "FIRST ONSITE", image: "/images/reference-first-onsite.png", url: "https://firstonsite.com" },
  { category: "Cosmetic Dentistry", title: "Apa Aesthetic", image: "/images/reference-apa-aesthetic.png", url: "https://apaaesthetic.com" },
  { category: "Commercial Landscaping", title: "BrightView", image: "/images/reference-brightview.png", url: "https://www.brightview.com" },
];

const growthClients = [
  ["Motocenter Srl", "Auto Dealership", "Clear communication from start to finish, and the site was delivered exactly on schedule. Exactly what we needed."],
  ["Eurocar Viadana", "Auto Dealership", "The whole process was smooth and fast, with great communication throughout. The final result looks premium and works great on mobile."],
  ["Autosalone Mia Car", "Auto Dealership", "Very happy with the final result. Responsive team, clear communication throughout, and a website that's fast and easy to navigate."],
  ["Castello Car Volkswagen Service", "Service Center", "Professional from the first call to launch. Great communication throughout, and the final website was exactly the quality we were looking for."],
  ["Cisauto Group", "Auto Dealership", "DevilSales understood exactly what we needed. Responsive and easy to work with — the final site is polished and loads fast."],
];

const approachBenefits = [
  ["01", "A site that matches your growth stage", "Whether you need to launch fast or build a real platform, the project is scoped to where your business actually is — not a generic package."],
  ["02", "Built around how customers decide", "Clear structure, focused messaging and calls to action designed around how people actually choose who to work with."],
  ["03", "Fast where it matters", "Responsive development and technical SEO foundations, on either track."],
  ["04", "Tracking you can trust", "GCLID, UTM capture and conversion events prepared for Google Ads, GA4 and lead qualification."],
];

const commitmentBenefits = [
  ["01", "Direct access, no account managers", "You work directly with the person building your site from the first call to launch — not a rotating team."],
  ["02", "Fixed scope before work begins", "Your investment and deliverables are locked in writing before development starts. No surprise invoices."],
  ["03", "Real work becomes your reference", "Every project we complete becomes part of the portfolio above — real work, real credit, real case study."],
  ["04", "One accountable team", "Strategy, design, development and tracking from a single team, not handed off between departments."],
];

const processSteps = [
  ["01", "Discover", "Your market, audience, competitors and current site performance."],
  ["02", "Position", "A clear track — Growth or Premium — and a sharper offer."],
  ["03", "Design", "A distinct visual system built around trust and conversion."],
  ["04", "Develop", "Responsive build, integrations and tracking, scoped to your track."],
  ["05", "Launch & improve", "QA, measurement and a growth-ready handoff."],
];

const faqs = [
  ["What's the difference between Premium and Growth?", "Growth projects are focused, single-purpose websites built fast on a proven foundation. Premium projects involve custom platform work — CMS-driven content, integrations, CRM automation, or multi-stage user flows — which takes more strategy and development time."],
  ["How much does a website actually cost?", "Investment depends on scope, integrations, content and timeline. Tell us your budget range in the form and we'll confirm the exact number and the right track for you before any work begins."],
  ["How long does a project take?", "Growth websites typically launch in 2–4 weeks. Premium platforms usually take 6–10 weeks depending on scope and integrations."],
  ["Can you redesign our existing website?", "Yes, at either tier. We can preserve useful content and SEO equity while rebuilding the strategy, visual system and technical foundation."],
  ["Will the website be ready for paid ads?", "Yes. Every project ships with a clear conversion path and form, phone-click and lead tracking prepared for Google Ads and GA4."],
  ["Do you provide SEO?", "Yes — every build, Growth or Premium, includes technical SEO foundations by default. Ongoing content and search growth can be scoped separately based on your market and goals."],
  ["Do you provide ongoing support after launch?", "Yes. Ongoing content updates, hosting and support can be scoped separately based on what the site needs after it goes live."],
];

export default function PricingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [quickFormOpen, setQuickFormOpen] = useState(false);
  const testimonialTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = testimonialTrackRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
      },
      { threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleSpotlightMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    event.currentTarget.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  }

  return (
    <main className="pr-page">
      <header className="pr-topbar">
        <span className="nav-brand"><i>DS</i><span><b>DEVILSALES</b><small>WEB STUDIO · USA</small></span></span>
        <a href="#get-started" className="pr-top-cta">Get a quote ↗︎</a>
        <button type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu" className="pr-menu-button"><span /><span /><span /></button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pr-mobile-overlay" onClick={() => setMenuOpen(false)}>
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: .4, ease: [.22, 1, .36, 1] }} className="pr-mobile-drawer" onClick={event => event.stopPropagation()}>
              <div className="pr-drawer-top">
                <span className="nav-brand"><i>DS</i><span><b>DEVILSALES</b><small>WEB STUDIO · USA</small></span></span>
                <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">×</button>
              </div>
              <nav className="pr-drawer-links">
                <a onClick={() => setMenuOpen(false)} href="#premium">Premium</a>
                <a onClick={() => setMenuOpen(false)} href="#growth">Growth</a>
                <a onClick={() => setMenuOpen(false)} href="#faq">FAQ</a>
              </nav>
              <a onClick={() => setMenuOpen(false)} href="#get-started" className="pr-drawer-cta">Get a quote ↗︎</a>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="pr-hero">
        <div className="purple-glow pr-glow-one" /><div className="purple-glow pr-glow-two" />
        <div className="pr-container relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="pr-eyebrow"><span />Two ways to work with DevilSales</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [.22, 1, .36, 1] }}>
            A website built for <em>where your business is now.</em>
          </motion.h1>
          <motion.div {...reveal} className="pr-hero-bottom">
            <p>Some businesses need a fast, professional website that gets them online and converting. Others need a custom platform built around content, integrations and growth. We build both — pick the track that fits.</p>
            <div className="pr-hero-actions"><a className="mixar-button fill" href="#premium">See Premium ↗︎</a><a className="mixar-button" href="#growth">See Growth ↗︎</a></div>
          </motion.div>
        </div>
      </section>

      <div className="ticker"><div>CUSTOM-BUILT, NOT TEMPLATED&nbsp; ✦ &nbsp;TRACKING BUILT FOR GROWTH&nbsp; ✦ &nbsp;ONE ACCOUNTABLE TEAM&nbsp; ✦ &nbsp;CUSTOM-BUILT, NOT TEMPLATED&nbsp; ✦ &nbsp;TRACKING BUILT FOR GROWTH&nbsp; ✦ &nbsp;</div></div>

      <section className="pr-section pr-intro">
        <div className="pr-container">
          <motion.div {...reveal} className="pr-intro-grid">
            <div><p className="section-kicker">[ The approach ]</p><h2>One team, two tracks, the right one for you.</h2></div>
            <div><p>Not every business needs the same website. We scope every project to the stage the business is actually at, then build it on the same foundation of strategy, design and tracking either way.</p><a href="#get-started" className="agency-button">Start a project ↗</a></div>
          </motion.div>

          <div className="pr-benefit-grid">
            {approachBenefits.map(([number, title, copy]) => <motion.article {...reveal} key={number} className="bento-card pr-benefit" onMouseMove={handleSpotlightMove}><span>{number}</span><h3>{title}</h3><p>{copy}</p></motion.article>)}
          </div>
        </div>
      </section>

      <section id="premium" className="pr-section pr-tier-section">
        <div className="pr-container">
          <motion.div {...reveal} className="pr-section-head">
            <div><p className="section-kicker">[ Premium ]</p><h2>Custom-built platforms for ambitious brands.</h2></div>
            <p>For businesses that need more than a website: content management, integrations, lead automation and a visual system built around how customers actually decide.</p>
          </motion.div>

          <motion.a {...reveal} href="https://www.louwmanexclusive.nl/en/" target="_blank" rel="noreferrer" aria-label="Visit Louwman Exclusive website" className="pr-flagship">
            <div className="pr-flagship-image"><Image src="/images/reference-louwman-exclusive.jpg" alt="Louwman Exclusive dealership" width={1200} height={772} sizes="(max-width: 767px) 100vw, 60vw" quality={72} className="object-cover" /></div>
            <div className="pr-flagship-copy">
              <p className="section-kicker">Luxury Automotive Dealership</p>
              <h3>Louwman Exclusive</h3>
              <p>A real luxury dealership platform in Utrecht, Netherlands, representing Lexus, McLaren, Morgan and other exclusive brands — the caliber of automotive site we study and build toward.</p>
              <span className="agency-button">Visit real website ↗</span>
              <span className="pr-flagship-note">Shown as an industry reference</span>
            </div>
          </motion.a>

          <motion.div {...reveal} className="pr-section-head" style={{ marginTop: 90 }}>
            <div><p className="section-kicker">[ Industry references — not our clients ]</p><h2>The caliber of work we study and build toward.</h2></div>
            <p>Real websites in high-value industries we analyze for design quality and conversion structure — not projects we built.</p>
          </motion.div>
          <div className="pr-portfolio-grid">
            {premiumReferences.map((item) => (
              <motion.a {...reveal} key={item.title} href={item.url} target="_blank" rel="noreferrer" aria-label={`Visit ${item.title} website`} className="pr-portfolio-card">
                <div className="pr-portfolio-image"><Image src={item.image} alt={`${item.title} website design`} fill sizes="(max-width: 767px) 100vw, 340px" quality={68} className="object-cover object-top" /></div>
                <div className="pr-portfolio-meta"><p>{item.category}</p><h3>{item.title}</h3><i>Visit real website ↗︎</i></div>
              </motion.a>
            ))}
          </div>

          <motion.div {...reveal} className="pr-investment" onMouseMove={handleSpotlightMove}>
            <div><p className="section-kicker !text-white/65">[ Premium ]</p><h2>Built for brands that <span>don&apos;t do average.</span></h2></div>
            <div><p>Book a short strategy call — we&apos;ll confirm scope, timeline and whether Premium is the right fit for what you need.</p><a href="#get-started" className="mixar-button fill">Book a Strategy Call ↗︎</a></div>
          </motion.div>
        </div>
      </section>

      <section id="growth" className="pr-section pr-tier-section pr-growth-section">
        <div className="pr-container">
          <motion.div {...reveal} className="pr-section-head">
            <div><p className="section-kicker">[ Growth ]</p><h2>A fast, professional website for a growing business.</h2></div>
            <p>For businesses that need a clean, credible site live quickly — clear information, a fast mobile experience, technical SEO foundations included, and a real path to contact.</p>
          </motion.div>

          <motion.div {...reveal} className="pr-investment" onMouseMove={handleSpotlightMove}>
            <div><p className="section-kicker !text-white/65">[ Growth ]</p><h2>Live fast. <span>Look like you&apos;ve arrived.</span></h2></div>
            <div><p>Send us a few details and we&apos;ll come back with a clear scope, timeline and quote — no long sales process.</p><a href="#get-started" className="mixar-button fill">Get Your Free Quote ↗︎</a></div>
          </motion.div>
        </div>
      </section>

      <section className="pr-section pr-testimonials-section">
        <div className="pr-container">
          <motion.div {...reveal} className="pr-section-head pr-testimonial-head"><div><p className="section-kicker">[ Client feedback ]</p><h2>What real clients say.</h2></div><p>Real feedback from businesses we&apos;ve built websites for.</p></motion.div>
        </div>
        <div className="pr-testimonial-marquee">
          <div className="pr-testimonial-track" ref={testimonialTrackRef}>
            {[0, 1].map(rep => (
              <div className="pr-testimonial-set" key={rep} aria-hidden={rep === 1}>
                {growthClients.map(([name, industry, quote]) => (
                  <div key={name} className="pr-testimonial-card">
                    <span className="pr-testimonial-tag">REAL CLIENT</span>
                    <h3>{name}</h3>
                    <p className="pr-testimonial-industry">{industry}</p>
                    <p className="pr-testimonial-stars">★★★★★</p>
                    <p className="pr-testimonial-quote">&ldquo;{quote}&rdquo;</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pr-section">
        <div className="pr-container">
          <motion.div {...reveal} className="pr-section-head"><div><p className="section-kicker">[ Our commitment ]</p><h2>What working with us actually looks like.</h2></div><p>Here&apos;s what you can count on, whichever track you choose.</p></motion.div>
          <div className="pr-benefit-grid">
            {commitmentBenefits.map(([number, title, copy]) => <motion.article {...reveal} key={number} className="bento-card pr-benefit" onMouseMove={handleSpotlightMove}><span>{number}</span><h3>{title}</h3><p>{copy}</p></motion.article>)}
          </div>
        </div>
      </section>

      <section id="process" className="pr-section">
        <div className="pr-container pr-process-shell">
          <motion.div {...reveal} className="pr-process-title"><p className="section-kicker">[ Our process ]</p><h2>Clear thinking.<br />Fast movement.</h2><p>One accountable team from positioning through launch, on either track.</p></motion.div>
          <div className="pr-process-list">
            {processSteps.map(([n, t, d]) => <motion.div {...reveal} key={n} className="pr-process-row" onMouseMove={handleSpotlightMove}><span>{n}</span><h3>{t}</h3><p>{d}</p><i>↗︎</i></motion.div>)}
          </div>
        </div>
      </section>

      <section id="faq" className="pr-section pr-faq-section">
        <div className="pr-container">
          <motion.div {...reveal} className="pr-section-head"><div><p className="section-kicker">[ Frequently asked ]</p><h2>Before we start.</h2></div><p>Direct answers about scope, investment and how each track works.</p></motion.div>
          <div className="pr-faq-grid">{faqs.map(([q, a], i) => <motion.details {...reveal} key={q} className="pr-faq" open={openFaq === i}><summary onClick={event => { event.preventDefault(); setOpenFaq(current => current === i ? null : i); }}><span className="pr-faq-index">{`0${i + 1}`}</span><span className="pr-faq-q">{q}</span><i /></summary><p>{a}</p></motion.details>)}</div>
        </div>
      </section>

      <section className="pr-section pr-contact-section">
        <div className="pr-container pr-contact-grid">
          <motion.div {...reveal} className="pr-contact-copy">
            <p className="section-kicker">[ Start a project ]</p>
            <h2>Tell us where you&apos;re starting from.</h2>
            <p>Whether you need a fast Growth site or a full Premium platform, tell us about the project and we&apos;ll recommend the right track.</p>
            <div className="pr-contact-card">
              <h3>DevilSales Web</h3>
              <a href="tel:+13155478952" data-track="phone_click" onClick={() => trackEvent("phone_click")}><ContactIcon type="phone" /><span><small>Call us</small>315-547-8952</span></a>
              <a href="mailto:info@devilsales.dev" data-track="email_click" onClick={() => trackEvent("email_click")}><ContactIcon type="mail" /><span><small>Email us</small>info@devilsales.dev</span></a>
              <div><ContactIcon type="location" /><span><small>Service area</small>United States · Nationwide</span></div>
            </div>
          </motion.div>
          <motion.div {...reveal}><PricingLeadForm /></motion.div>
        </div>
      </section>

      <button type="button" className="pr-sticky-call" onClick={() => setQuickFormOpen(true)}><ContactIcon type="phone" /><span>Book a Call</span></button>

      <AnimatePresence>
        {quickFormOpen && <PricingQuickLeadForm onClose={() => setQuickFormOpen(false)} />}
      </AnimatePresence>

      <footer className="pr-footer"><div className="pr-container"><span className="nav-brand"><i>DS</i><span><b>DEVILSALES</b><small>WEB STUDIO · USA</small></span></span><p>© {new Date().getFullYear()} DEVILSALES</p><div><Link href="/privacy" target="_blank">Privacy</Link><Link href="/terms" target="_blank">Terms</Link><Link href="/sms-policy" target="_blank">SMS Terms</Link></div></div></footer>

      <style jsx global>{`
        .pr-page{min-height:100vh;background:#0b0132;color:#fff}
        .pr-container{width:min(1450px,calc(100% - 40px));margin:auto}
        .pr-topbar{position:absolute;z-index:30;left:50%;top:24px;display:flex;width:min(1200px,calc(100% - 32px));height:82px;transform:translateX(-50%);align-items:center;justify-content:space-between;border-radius:20px;background:#51496c;padding:0 28px}
        .pr-top-cta{border-bottom:1px solid #fff;padding-bottom:3px;font-size:15px}
        .pr-hero{position:relative;overflow:hidden;min-height:640px;padding:210px 0 100px}
        .pr-glow-one{left:-12%;top:9%;width:650px;height:650px}
        .pr-glow-two{right:-15%;top:34%;width:720px;height:720px}
        .pr-eyebrow{display:flex;align-items:center;gap:12px;color:rgba(255,255,255,.48);font-size:10px;font-weight:700;letter-spacing:.22em;text-transform:uppercase}
        .pr-eyebrow span{width:8px;height:8px;border-radius:50%;background:#9b5cff;box-shadow:0 0 18px #9b5cff}
        .pr-hero h1{max-width:1150px;margin-top:45px;font-size:clamp(48px,7.5vw,104px);font-weight:500;line-height:.94;letter-spacing:-.05em}
        .pr-hero h1 em{color:#a982ff;font-style:normal}
        .pr-hero-bottom{max-width:820px;margin-top:44px;padding-top:30px;border-top:1px solid rgba(255,255,255,.12)}
        .pr-hero-bottom>p{color:rgba(255,255,255,.6);font-size:19px;line-height:1.55}
        .pr-hero-actions{display:flex;gap:14px;flex-wrap:wrap;margin-top:30px}
        .pr-section{padding:120px 0}
        .pr-section-head{display:grid;grid-template-columns:1.25fr .75fr;gap:80px;align-items:end}
        .pr-section-head h2{max-width:900px;margin-top:22px;font-size:clamp(38px,5.4vw,72px);font-weight:500;line-height:1;letter-spacing:-.05em}
        .pr-section-head>p{color:rgba(255,255,255,.5);font-size:17px;line-height:1.65}
        .pr-growth-section{background:radial-gradient(circle at 90% 10%,rgba(105,32,255,.14),transparent 35%)}
        .pr-intro{background:radial-gradient(circle at 10% 20%,rgba(105,32,255,.16),transparent 30%)}
        .pr-intro-grid{display:grid;grid-template-columns:1.25fr .75fr;gap:80px;align-items:end}
        .pr-intro-grid h2{max-width:900px;margin-top:22px;font-size:clamp(38px,5.4vw,72px);font-weight:500;line-height:1;letter-spacing:-.05em}
        .pr-intro-grid>div:last-child p{color:rgba(255,255,255,.5);font-size:17px;line-height:1.65}
        .pr-benefit-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin-top:80px}
        .pr-benefit{min-height:280px;transition:transform .35s,border-color .35s,background .35s}
        .pr-benefit::before{content:"";position:absolute;inset:0;background:radial-gradient(260px circle at var(--mx,50%) var(--my,50%),rgba(154,99,255,.2),transparent 70%);opacity:0;transition:opacity .35s;pointer-events:none}
        .pr-benefit:hover{transform:translateY(-6px);border-color:rgba(156,99,255,.5)}
        .pr-benefit:hover::before{opacity:1}
        .pr-benefit>*{position:relative}
        .pr-benefit>span{color:#a982ff;font-size:11px;letter-spacing:.18em;transition:color .3s}
        .pr-benefit:hover>span{color:#fff}
        .pr-benefit h3{max-width:460px;margin-top:auto;font-size:32px;font-weight:500;line-height:1.05;letter-spacing:-.03em}
        .pr-benefit p{max-width:480px;margin-top:18px;color:rgba(255,255,255,.48);line-height:1.6}
        .pr-investment{position:relative;display:grid;grid-template-columns:1.2fr .8fr;gap:80px;align-items:end;overflow:hidden;border-radius:42px;background:linear-gradient(135deg,#7424ff,#3d169e);padding:60px;margin-top:70px;transition:box-shadow .4s}
        .pr-investment::before{content:"";position:absolute;inset:0;background:radial-gradient(380px circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.16),transparent 70%);opacity:0;transition:opacity .4s;pointer-events:none}
        .pr-investment:hover::before{opacity:1}
        .pr-investment:hover{box-shadow:0 30px 90px rgba(60,10,160,.45)}
        .pr-investment>div{position:relative}
        .pr-investment h2{margin-top:22px;font-size:clamp(40px,5.6vw,72px);font-weight:500;line-height:1;letter-spacing:-.05em}
        .pr-investment h2 span{color:#c4a7ff}
        .pr-investment>div:last-child p{color:rgba(255,255,255,.7);font-size:17px;line-height:1.6}
        .pr-investment .mixar-button{margin-top:26px}
        .pr-process-shell{display:grid;grid-template-columns:.8fr 1.2fr;gap:70px;border-radius:42px;background:#f0edff;padding:70px;color:#11052f}
        .pr-process-title h2{margin-top:22px;font-size:clamp(42px,5vw,72px);font-weight:500;line-height:.96;letter-spacing:-.05em}
        .pr-process-title>p:last-child{max-width:390px;margin-top:26px;color:rgba(17,5,47,.55);font-size:17px;line-height:1.6}
        .pr-process-row{position:relative;display:grid;grid-template-columns:55px 1fr 1fr 25px;align-items:center;gap:22px;padding:25px 18px;margin:0 -18px;border-bottom:1px solid rgba(17,5,47,.15);border-radius:16px;transition:border-color .3s,transform .3s}
        .pr-process-row::before{content:"";position:absolute;inset:0;border-radius:16px;background:radial-gradient(220px circle at var(--mx,50%) var(--my,50%),rgba(97,0,255,.1),transparent 70%);opacity:0;transition:opacity .35s;pointer-events:none}
        .pr-process-row:hover{border-color:rgba(97,0,255,.3);transform:translateX(6px)}
        .pr-process-row:hover::before{opacity:1}
        .pr-process-row>span{position:relative;font-size:11px;opacity:.5;transition:.3s}
        .pr-process-row:hover>span{color:#6100ff;opacity:1}
        .pr-process-row h3{position:relative;font-size:27px;font-weight:500;transition:color .3s}
        .pr-process-row:hover h3{color:#6100ff}
        .pr-process-row p{position:relative;color:rgba(17,5,47,.55);line-height:1.55}
        .pr-process-row i{position:relative;display:inline-block;font-style:normal;transition:.3s}
        .pr-process-row:hover i{color:#6100ff;transform:translate(4px,-4px) scale(1.2)}
        .pr-sticky-call{position:fixed;right:28px;bottom:28px;z-index:70;display:flex;align-items:center;gap:12px;padding:14px 26px 14px 14px;border:none;border-radius:999px;background:linear-gradient(90deg,#7928ff,#5522f1);color:#fff;font:inherit;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 20px 50px rgba(89,38,245,.45);transition:transform .3s,box-shadow .3s;text-decoration:none}
        .pr-sticky-call:hover{transform:translateY(-3px);box-shadow:0 25px 60px rgba(89,38,245,.55)}
        .pr-sticky-call .pr-contact-icon{width:34px;height:34px;background:rgba(255,255,255,.18)}
        .pr-sticky-call .pr-contact-icon svg{width:16px;height:16px}
        .pr-flagship{display:grid;grid-template-columns:1.4fr .8fr;overflow:hidden;margin-top:70px;border:1px solid rgba(255,255,255,.1);border-radius:32px;background:#17063e;transition:border-color .4s}
        .pr-flagship:hover{border-color:rgba(156,99,255,.4)}
        .pr-flagship-image{position:relative;display:block;min-height:420px;overflow:hidden}
        .pr-flagship-image img{transition:transform 1.4s cubic-bezier(.22,1,.36,1)}
        .pr-flagship:hover .pr-flagship-image img{transform:scale(1.06)}
        .pr-flagship-copy{display:flex;flex-direction:column;justify-content:center;padding:50px;gap:6px}
        .pr-flagship-copy h3{margin-top:10px;font-size:40px;font-weight:500;letter-spacing:-.04em}
        .pr-flagship-copy>p:not(.section-kicker){margin-top:18px;color:rgba(255,255,255,.55);line-height:1.65}
        .pr-flagship-note{display:block;margin-top:12px;color:rgba(255,255,255,.28);font-size:10.5px;letter-spacing:.04em}
        .pr-portfolio-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:50px}
        .pr-portfolio-card{position:relative;display:block;overflow:hidden;border:1px solid rgba(255,255,255,.1);border-radius:22px;background:#17063e;color:inherit;text-decoration:none;transition:.3s}
        .pr-portfolio-card:hover{border-color:rgba(156,99,255,.55)}
        .pr-portfolio-image{position:relative;aspect-ratio:4/3;background:#0b0132}
        .pr-portfolio-meta{padding:18px 20px 22px}
        .pr-portfolio-meta p{color:#a982ff;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase}
        .pr-portfolio-meta h3{margin-top:8px;font-size:19px;font-weight:500;letter-spacing:-.02em}
        .pr-portfolio-meta i{display:block;margin-top:12px;color:rgba(255,255,255,.55);font-size:12px;font-style:normal;text-decoration:underline;text-underline-offset:3px}
        .pr-testimonials-section{background:#fff;color:#11052f;overflow:hidden}
        .pr-testimonial-head h2{color:#11052f}
        .pr-testimonial-head>p{color:rgba(17,5,47,.55)}
        .pr-testimonial-marquee{margin-top:60px;overflow:hidden}
        .pr-testimonial-track{display:flex;width:max-content;animation:pr-testimonial-scroll 42s linear infinite}
        .pr-testimonial-track:hover{animation-play-state:paused}
        .pr-testimonial-set{display:flex;gap:24px;padding:0 12px}
        .pr-testimonial-card{flex:0 0 360px;border:1px solid #e4defb;border-radius:24px;background:#faf9ff;padding:36px 30px;color:#11052f}
        .pr-testimonial-tag{display:inline-flex;border-radius:999px;padding:6px 13px;font-size:9.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:rgba(16,150,90,.1);color:#0a8a52}
        .pr-testimonial-card h3{margin-top:14px;font-size:18px;font-weight:600;letter-spacing:-.01em}
        .pr-testimonial-industry{margin-top:4px;color:#7628ff;font-size:11px;letter-spacing:.08em;text-transform:uppercase}
        .pr-testimonial-stars{margin-top:14px;font-size:19px;letter-spacing:.15em;color:#f5b400}
        .pr-testimonial-quote{margin-top:16px;color:rgba(17,5,47,.72);font-size:14.5px;line-height:1.65}
        @keyframes pr-testimonial-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .pr-faq-grid{display:grid;grid-template-columns:1fr 1fr;align-items:start;gap:16px;margin-top:60px}
        .pr-faq{overflow:hidden;border:1px solid rgba(255,255,255,.1);border-radius:16px;background:#160045;transition:.35s}
        .pr-faq[open],.pr-faq:hover{border-color:rgba(156,99,255,.5);background:radial-gradient(circle at 0 0,rgba(119,62,255,.16),transparent 55%),#1a0752}
        .pr-faq summary{display:flex;cursor:pointer;list-style:none;align-items:center;gap:20px;padding:26px 26px;font-size:17px;font-weight:500;letter-spacing:-.01em}
        .pr-faq summary::-webkit-details-marker{display:none}
        .pr-faq-index{flex:0 0 auto;color:#a982ff;font-size:12px;font-weight:700;font-variant-numeric:tabular-nums;letter-spacing:.08em}
        .pr-faq-q{flex:1}
        .pr-faq summary i{position:relative;flex:0 0 auto;width:34px;height:34px;border:1px solid rgba(255,255,255,.16);border-radius:50%;background:rgba(255,255,255,.04);transition:.3s}
        .pr-faq summary i:before,.pr-faq summary i:after{content:"";position:absolute;top:50%;left:50%;width:11px;height:1.6px;background:#fff;transform:translate(-50%,-50%)}
        .pr-faq summary i:after{transform:translate(-50%,-50%) rotate(90deg);transition:.3s}
        .pr-faq[open] summary i{border-color:rgba(156,99,255,.6);background:#6100ff}
        .pr-faq[open] summary i:after{transform:translate(-50%,-50%) rotate(0deg);opacity:0}
        .pr-faq>p{margin:0 26px 26px;padding-top:18px;padding-left:44px;border-top:1px solid rgba(255,255,255,.09);color:rgba(255,255,255,.6);font-size:14.5px;line-height:1.75}
        .pr-contact-section{padding-bottom:150px}
        .pr-contact-grid{display:grid;grid-template-columns:.75fr 1.25fr;gap:80px;align-items:start}
        .pr-contact-copy{position:sticky;top:120px}
        .pr-contact-copy h2{margin-top:22px;font-size:clamp(38px,5vw,64px);font-weight:500;line-height:1;letter-spacing:-.04em}
        .pr-contact-copy>p:not(.section-kicker){max-width:520px;margin-top:24px;color:rgba(255,255,255,.5);font-size:17px;line-height:1.6}
        .pr-contact-card{margin-top:40px;overflow:hidden;border:1px solid rgba(255,255,255,.14);border-radius:20px;background:linear-gradient(145deg,#6f22ff,#4d0bcc);box-shadow:0 22px 70px rgba(98,31,255,.2)}
        .pr-contact-card h3{border-bottom:1px solid rgba(255,255,255,.2);padding:22px 26px;font-size:22px;font-weight:500}
        .pr-contact-card>a,.pr-contact-card>div{display:flex;align-items:center;gap:16px;margin:0 26px;padding:16px 0;border-bottom:1px solid rgba(255,255,255,.14);color:#fff}
        .pr-contact-card>div:last-child{border-bottom:0}
        .pr-contact-card>a:hover .pr-contact-icon{background:#fff;transform:scale(1.08)}
        .pr-contact-card>a:hover .pr-contact-icon svg{stroke:#641cff}
        .pr-contact-card span:not(.pr-contact-icon){display:flex;min-width:0;flex-direction:column;gap:4px;font-size:15px;word-break:break-word}
        .pr-contact-card small{color:rgba(255,255,255,.6);font-size:10px;font-weight:500;letter-spacing:.14em;text-transform:uppercase}
        .pr-contact-icon{display:grid;flex:0 0 auto;width:40px;height:40px;place-items:center;border-radius:12px;background:rgba(255,255,255,.16);transition:.3s}
        .pr-contact-icon svg{width:19px;height:19px;fill:none;stroke:#fff;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
        .pr-form-wrap{position:relative;padding:0 17px 18px 0}
        .pr-form-offset{position:absolute;z-index:0;inset:17px 0 0 17px;border-radius:26px;background:linear-gradient(145deg,#793cff,#5522f1);box-shadow:0 30px 80px rgba(89,38,245,.28)}
        .pr-form{position:relative;z-index:1;border:1px solid rgba(186,153,255,.24);border-radius:26px;background:radial-gradient(circle at 90% 0,rgba(119,62,255,.15),transparent 30%),#17063f;padding:42px}
        .pr-form-head h2{margin-top:16px;font-size:38px;font-weight:400;letter-spacing:-.04em}
        .pr-form-head>div>p:last-child{margin-top:10px;color:rgba(255,255,255,.4);font-size:11px}
        .pr-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px 17px;margin-top:28px}
        .pr-form-grid label{display:flex;flex-direction:column;gap:9px}
        .pr-form-grid label.wide{grid-column:1/-1}
        .pr-form-grid label>span{color:rgba(232,222,255,.72);font-size:11px}
        .pr-form input,.pr-form select,.pr-form textarea{width:100%;border:1px solid rgba(201,180,255,.22);border-radius:8px;outline:none;background:rgba(255,255,255,.055);color:#fff;font:inherit;font-size:13px;transition:.2s}
        .pr-form input,.pr-form select{height:53px;padding:0 15px}
        .pr-form textarea{resize:vertical;padding:15px;line-height:1.6}
        .pr-form input:focus,.pr-form select:focus,.pr-form textarea:focus{border-color:#9c6aff;box-shadow:0 0 0 3px rgba(145,87,255,.14)}
        .pr-form select{color-scheme:dark}
        .pr-form-primary{display:flex;width:100%;min-height:57px;align-items:center;justify-content:space-between;margin-top:22px;border-radius:999px;padding:0 23px;background:linear-gradient(90deg,#a79fbc,#d0c9df);color:#32127a;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;transition:.25s}
        .pr-form-primary:hover{transform:translateY(-2px);background:#fff}
        .pr-form-primary:disabled{opacity:.6}
        .pr-form-primary b{font-size:16px}
        .pr-consent{display:grid;grid-template-columns:24px 1fr;gap:13px;margin-top:24px;border:1px solid rgba(203,181,255,.2);border-radius:10px;background:rgba(4,0,18,.23);padding:16px;transition:.35s}
        .pr-consent.checked{border-color:#a06bff;background:linear-gradient(135deg,rgba(97,0,255,.22),rgba(255,255,255,.04));box-shadow:0 0 35px rgba(97,0,255,.15)}
        .pr-consent input{appearance:none;width:24px;height:24px;margin-top:1px;border:1px solid rgba(255,255,255,.3);border-radius:6px;background:#0b0132;display:grid;place-content:center}
        .pr-consent input:checked{background:#6100ff;border-color:#9c6aff}
        .pr-consent input:checked:after{content:'✓';color:#fff;font-size:15px}
        .pr-consent span{color:rgba(229,218,253,.65);font-size:10px;line-height:1.65}
        .pr-consent a{color:#fff;text-decoration:underline;text-underline-offset:3px}
        .pr-form-message{margin-top:18px;border-radius:9px;padding:12px 14px;font-size:11px;line-height:1.55}
        .pr-form-message.error{background:rgba(214,48,82,.13);color:#ffb0be}
        .pr-success-overlay{position:fixed;inset:0;z-index:80;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(5,0,20,.82)}
        .pr-success-modal{width:min(420px,100%);border:1px solid rgba(186,153,255,.3);border-radius:26px;background:radial-gradient(circle at 90% 0,rgba(119,62,255,.25),transparent 40%),#17063f;padding:44px 36px;text-align:center;box-shadow:0 40px 100px rgba(0,0,0,.45)}
        .pr-success-check{display:grid;width:64px;height:64px;margin:0 auto;place-items:center;border-radius:50%;background:linear-gradient(145deg,#7928ff,#3e149f)}
        .pr-success-check svg{width:30px;height:30px;fill:none;stroke:#fff;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
        .pr-success-modal h3{margin-top:24px;font-size:26px;font-weight:500;letter-spacing:-.03em}
        .pr-success-modal p{margin-top:12px;color:rgba(255,255,255,.6);font-size:14px;line-height:1.6}
        .pr-success-modal button{display:inline-flex;min-height:50px;align-items:center;justify-content:center;margin-top:26px;padding:0 32px;border-radius:999px;background:linear-gradient(90deg,#a79fbc,#d0c9df);color:#32127a;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;transition:.25s}
        .pr-success-modal button:hover{background:#fff;transform:translateY(-2px)}
        .pr-quick-overlay{position:fixed;inset:0;z-index:90;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(5,0,20,.82)}
        .pr-quick-modal{position:relative;width:min(440px,100%);max-height:90vh;overflow-y:auto;border:1px solid rgba(186,153,255,.3);border-radius:26px;background:radial-gradient(circle at 90% 0,rgba(119,62,255,.2),transparent 40%),#17063f;padding:40px 34px}
        .pr-quick-close{position:absolute;top:18px;right:18px;width:34px;height:34px;border:none;border-radius:50%;background:rgba(255,255,255,.08);color:#fff;font-size:20px;cursor:pointer}
        .pr-quick-modal h3{font-size:26px;font-weight:500;letter-spacing:-.03em}
        .pr-quick-sub{margin-top:8px;color:rgba(255,255,255,.5);font-size:13px}
        .pr-quick-modal form{margin-top:24px;display:flex;flex-direction:column;gap:16px}
        .pr-quick-modal label{display:flex;flex-direction:column;gap:8px;font-size:12px;color:rgba(232,222,255,.72)}
        .pr-quick-modal input,.pr-quick-modal select{height:50px;padding:0 14px;border:1px solid rgba(201,180,255,.22);border-radius:8px;outline:none;background:rgba(255,255,255,.055);color:#fff;font:inherit;font-size:13px}
        .pr-quick-modal select{color-scheme:dark}
        .pr-quick-error{border-radius:9px;background:rgba(214,48,82,.13);padding:10px 12px;color:#ffb0be;font-size:12px}
        .pr-quick-submit{margin-top:6px;min-height:54px;border:none;border-radius:999px;background:linear-gradient(90deg,#a79fbc,#d0c9df);color:#32127a;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;transition:.25s}
        .pr-quick-submit:hover{background:#fff}
        .pr-quick-submit:disabled{opacity:.6;cursor:default}
        .pr-quick-success{padding:20px 0;text-align:center}
        .pr-quick-success h3{margin-top:22px}
        .pr-quick-success p{margin-top:10px;color:rgba(255,255,255,.6);font-size:14px}
        .pr-footer{border-top:1px solid rgba(255,255,255,.1);padding:36px 0 60px}
        .pr-footer>.pr-container{display:flex;align-items:center;justify-content:space-between;gap:30px}
        .pr-footer p,.pr-footer a{color:rgba(255,255,255,.45);font-size:12px}
        .pr-footer>div>div{display:flex;gap:20px}
        .pr-menu-button{display:none;position:relative;width:44px;height:44px;flex-direction:column;align-items:center;justify-content:center;gap:5px}
        .pr-menu-button span{width:20px;height:2px;border-radius:2px;background:#fff}
        .pr-mobile-overlay{position:fixed;inset:0;z-index:60;background:rgba(5,0,20,.82)}
        .pr-mobile-drawer{position:absolute;right:0;top:0;display:flex;height:100%;width:min(340px,86vw);flex-direction:column;background:#150a3b;padding:26px 22px;box-shadow:-30px 0 80px rgba(0,0,0,.4)}
        .pr-drawer-top{display:flex;align-items:center;justify-content:space-between}
        .pr-drawer-top button{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.08);color:#fff;font-size:20px}
        .pr-drawer-links{display:flex;flex-direction:column;gap:4px;margin-top:40px}
        .pr-drawer-links a{padding:16px 4px;border-bottom:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.85);font-size:18px}
        .pr-drawer-cta{display:flex;align-items:center;justify-content:center;min-height:54px;margin-top:auto;border-radius:999px;background:linear-gradient(90deg,#a79fbc,#d0c9df);color:#32127a;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
        @media(max-width:900px){
          .pr-hero{min-height:auto;padding-top:170px}
          .pr-section-head,.pr-contact-grid,.pr-intro-grid,.pr-investment{grid-template-columns:1fr}
          .pr-flagship{grid-template-columns:1fr}
          .pr-flagship-image{min-height:340px}
          .pr-portfolio-grid{grid-template-columns:1fr 1fr}
          .pr-benefit-grid{grid-template-columns:1fr 1fr}
          .pr-faq-grid{grid-template-columns:1fr}
          .pr-contact-copy{position:static}
          .pr-process-shell{grid-template-columns:1fr;padding:48px}
          .pr-investment{gap:36px;padding:48px}
        }
        @media(max-width:767px){
          .pr-container{width:min(100% - 30px,1450px)}
          .pr-topbar{top:14px;height:68px;padding:0 17px}
          .pr-topbar .nav-brand span{display:none}
          .pr-top-cta{display:none}
          .pr-menu-button{display:flex}
          .pr-hero{padding:130px 0 70px}
          .pr-hero h1{margin-top:28px;font-size:46px;line-height:1}
          .pr-hero-bottom{margin-top:30px}
          .pr-hero-bottom>p{font-size:16px}
          .pr-section{padding:80px 0}
          .pr-section-head,.pr-intro-grid{gap:24px}
          .pr-section-head h2,.pr-intro-grid h2{font-size:38px}
          .pr-portfolio-grid,.pr-benefit-grid{grid-template-columns:1fr;margin-top:40px}
          .pr-benefit{min-height:220px}
          .pr-testimonial-marquee{margin-top:40px}
          .pr-testimonial-card{flex:0 0 280px;padding:28px 24px}
          .pr-testimonial-track{animation:pr-testimonial-scroll 55s linear infinite}
          .pr-investment{border-radius:26px;padding:34px 24px;margin-top:45px}
          .pr-investment h2{font-size:38px}
          .pr-process-shell{width:calc(100% - 30px);border-radius:26px;padding:32px 22px}
          .pr-process-title h2{font-size:40px}
          .pr-process-row{grid-template-columns:38px 1fr 20px;gap:12px}
          .pr-process-row p{grid-column:2/4}
          .pr-process-row h3{font-size:22px}
          .pr-form-grid{grid-template-columns:1fr}
          .pr-form-grid label.wide{grid-column:auto}
          .pr-footer>.pr-container{flex-direction:column;align-items:flex-start}
          .pr-page{padding-bottom:96px}
          .pr-sticky-call{left:0;right:0;bottom:0;justify-content:center;gap:10px;height:58px;padding:0;border-radius:0;box-shadow:none}
          .pr-sticky-call:hover{transform:none}
          .pr-sticky-call .pr-contact-icon{width:26px;height:26px}
          .pr-sticky-call .pr-contact-icon svg{width:14px;height:14px}
        }
      `}</style>
    </main>
  );
}

function ContactIcon({ type }: { type: "phone" | "mail" | "location" }) {
  if (type === "phone") return <span className="pr-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7.2 3.5 10 7.8 8.3 10c1.2 2.5 3.2 4.5 5.7 5.7l2.2-1.7 4.3 2.8-.7 3.2c-.2.8-.9 1.4-1.8 1.4C9.5 21.4 2.6 14.5 2.6 6c0-.9.6-1.6 1.4-1.8l3.2-.7Z" /></svg></span>;
  if (type === "mail") return <span className="pr-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg></span>;
  return <span className="pr-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg></span>;
}
