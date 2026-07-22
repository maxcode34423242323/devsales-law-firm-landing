"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { trackEvent } from "../lib/track";
import LeadForm from "./LeadForm";
import QuickLeadForm from "./QuickLeadForm";

const reveal = {
  initial: { opacity: 0, y: 42 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: .75, ease: [.22, 1, .36, 1] as const },
};

const benefits = [
  ["01", "Authority before the first call", "A premium digital presence that makes the firm feel established, focused and ready for serious cases."],
  ["02", "Built around consultation intent", "Clear practice-area paths, focused calls to action and forms designed around how prospects choose counsel."],
  ["03", "Fast where it matters", "Responsive development, technical SEO foundations and performance decisions made for paid traffic."],
  ["04", "Tracking you can trust", "GCLID, UTM capture and conversion events prepared for Google Ads, GA4 and offline lead qualification."],
];

const portfolioCases: { category: string; title: string; image?: string; url?: string }[] = [
  { category: "Personal Injury Law", title: "Omar Ochoa Law", image: "/images/reference-omar-better.jpg", url: "https://www.omarochoalaw.com" },
  { category: "Personal Injury Law", title: "PARRIS Law Firm", image: "https://parris.com/opengraph-image.png", url: "https://www.parris.com" },
  { category: "Personal Injury Law", title: "Ben Crump Law", image: "https://bencrump.com/wp-content/uploads/2021/08/bencrump3.jpg", url: "https://www.bencrump.com" },
  { category: "Personal Injury Law", title: "Friedman Levy", image: "https://friedmanlevy.com/wp-content/uploads/2018/06/friedman-levy-injury-lawyers-team.jpg", url: "https://www.friedmanlevy.com" },
  { category: "Personal Injury Law", title: "Kherkher Garcia", image: "https://www.kherkhergarcia.com/wp-content/uploads/2025/03/kherkher-latest-banner.png", url: "https://www.kherkhergarcia.com" },
  { category: "Personal Injury Law", title: "Weitz & Luxenberg", image: "https://www.weitzlux.com/wp-content/uploads/2024/01/WeitzLux_featured.jpg", url: "https://www.weitzlux.com" },
];

const faqs = [
  ["How much does a custom law firm website cost?", "Custom website projects start at $10,000. Final investment depends on scope, number of practice areas, content requirements, integrations and the complexity of the build."],
  ["Do you work specifically with personal injury law firms?", "This landing page and its conversion system are focused on personal injury firms, where trust, urgency, local relevance and high-value lead quality matter most."],
  ["How long does a project take?", "A focused custom website typically takes 6–10 weeks. Larger content structures, custom integrations or extensive migration can require more time."],
  ["Can you redesign our existing website?", "Yes. We can preserve useful content and SEO equity while rebuilding the strategy, visual system, user experience and technical foundation."],
  ["Will the website be ready for Google Ads?", "Yes. We structure the page around one clear conversion path and prepare form, phone-click, UTM and qualified-lead events for measurement."],
  ["Do you provide SEO?", "Every build includes technical SEO foundations. Ongoing content and search growth can be scoped separately based on the firm’s market and goals."],
];

export default function LawFirmWebDesignPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [quickFormOpen, setQuickFormOpen] = useState(false);

  function handleSpotlightMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    event.currentTarget.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  }
  return (
    <main className="law-page">
      <header className="law-topbar">
        <span className="nav-brand"><i>DS</i><span><b>DEVILSALES</b><small>WEB STUDIO · USA</small></span></span>
        <a href="#project-brief" className="law-top-cta">Start a project ↗︎</a>
        <button type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu" className="law-menu-button"><span /><span /><span /></button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="law-mobile-overlay" onClick={() => setMenuOpen(false)}>
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: .4, ease: [.22, 1, .36, 1] }} className="law-mobile-drawer" onClick={event => event.stopPropagation()}>
              <div className="law-drawer-top">
                <span className="nav-brand"><i>DS</i><span><b>DEVILSALES</b><small>WEB STUDIO · USA</small></span></span>
                <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">×</button>
              </div>
              <nav className="law-drawer-links">
                <a onClick={() => setMenuOpen(false)} href="#approach">Approach</a>
                <a onClick={() => setMenuOpen(false)} href="#portfolio">Selected work</a>
                <a onClick={() => setMenuOpen(false)} href="#process">Process</a>
                <a onClick={() => setMenuOpen(false)} href="#investment">Investment</a>
                <a onClick={() => setMenuOpen(false)} href="#faq">FAQ</a>
              </nav>
              <a onClick={() => setMenuOpen(false)} href="#project-brief" className="law-drawer-cta">Start a project ↗︎</a>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="law-hero">
        <div className="purple-glow law-glow-one" /><div className="purple-glow law-glow-two" />
        <div className="law-container relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="law-eyebrow"><span />Custom web design for personal injury law firms</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [.22, 1, .36, 1] }}>
            Turn more searches into <em>serious consultations.</em>
          </motion.h1>
          <div className="law-hero-bottom">
            <motion.p {...reveal}>Premium strategy, design and development for personal injury firms that need stronger trust, clearer positioning and better-qualified leads.</motion.p>
            <motion.div {...reveal} className="law-hero-actions"><a className="mixar-button fill" href="#project-brief">Start a project ↗︎</a></motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .22, duration: 1 }} className="law-browser-stage">
            <div className="browser-card law-browser-main"><BrowserTop /><Image src="/images/reference-omar-better.jpg" alt="Real personal injury law firm website design" width={1348} height={926} priority quality={72} /></div>
            <div className="law-result-card"><span>[ Starting investment ]</span><strong>$10K+</strong><p>Strategy, UX, custom development and conversion tracking in one accountable project.</p></div>
          </motion.div>
        </div>
      </section>

      <div className="ticker"><div>AUTHORITY THAT EARNS TRUST&nbsp; ✦ &nbsp;DESIGN BUILT FOR CONSULTATIONS&nbsp; ✦ &nbsp;TRACKING BUILT FOR GROWTH&nbsp; ✦ &nbsp;AUTHORITY THAT EARNS TRUST&nbsp; ✦ &nbsp;DESIGN BUILT FOR CONSULTATIONS&nbsp; ✦ &nbsp;</div></div>

      <section id="approach" className="law-section law-intro">
        <div className="law-container">
          <motion.div {...reveal} className="law-intro-grid">
            <div><p className="section-kicker">[ The opportunity ]</p><h2>Your website should make the decision feel easier.</h2></div>
            <div><p>In personal injury, prospects compare credibility in seconds. The strongest website does not merely look professional—it reduces uncertainty, explains the next step and gives every ad click a clear path to action.</p><a href="#project-brief" className="agency-button">Start a project ↗︎</a></div>
          </motion.div>

          <div className="law-benefit-grid">
            {benefits.map(([number, title, copy]) => <motion.article {...reveal} key={number} className="bento-card law-benefit" onMouseMove={handleSpotlightMove}><span>{number}</span><h3>{title}</h3><p>{copy}</p></motion.article>)}
          </div>
        </div>
      </section>

      <section className="law-section">
        <div className="law-container">
          <motion.div {...reveal} className="law-section-head"><div><p className="section-kicker">[ Digital direction ]</p><h2>A premium experience, built around legal trust.</h2></div><p>Clear hierarchy, focused messaging and visual authority—without the generic law-firm template feeling.</p></motion.div>
          <motion.div {...reveal} className="law-showcase">
            <div className="law-showcase-image"><Image src="/images/apex-legal.webp" alt="Law firm website interface" fill sizes="(max-width: 767px) 100vw, 70vw" quality={74} className="object-cover object-top" /></div>
            <div className="law-showcase-copy"><p className="section-kicker">[ Conversion system ]</p><h3>One clear story from search to consultation.</h3><p>We structure the page around the prospect’s real questions: Can this firm handle my case? Do I trust them? What happens next? Every section should move the visitor toward a confident action.</p><ul><li>Practice-area information architecture</li><li>Trust and proof placement</li><li>Mobile-first consultation paths</li><li>Google Ads attribution and lead events</li></ul></div>
          </motion.div>
        </div>
      </section>

      <section id="portfolio" className="law-section">
        <div className="law-container">
          <motion.div {...reveal} className="law-section-head"><div><p className="section-kicker">[ Industry references — not our clients ]</p><h2>What we study, before we build.</h2></div><p>These are real personal injury firm websites we analyze for design quality and conversion structure — not projects we built or firms we&apos;ve worked with. Our own case studies will replace these as projects launch.</p></motion.div>
          <div className="law-portfolio-grid">
            {portfolioCases.map((item, i) => item.image && item.url ? (
              <motion.a {...reveal} key={item.title} href={item.url} target="_blank" rel="noreferrer" aria-label={`Visit ${item.title} website`} className="law-portfolio-card has-image">
                <div className="law-portfolio-image"><Image src={item.image} alt={`${item.title} website design`} fill sizes="(max-width: 767px) 100vw, 460px" quality={70} className="object-cover object-top" /></div>
                <span className="law-portfolio-tag">NOT OUR CLIENT — REFERENCE 0{i + 1}</span>
                <div className="law-portfolio-meta"><p>{item.category}</p><h3>{item.title}</h3><i>Visit real website ↗︎</i></div>
              </motion.a>
            ) : (
              <motion.div {...reveal} key={`${item.title}-${i}`} className="law-portfolio-card is-placeholder">
                <div className="law-portfolio-placeholder"><span>0{i + 1}</span></div>
                <div className="law-portfolio-meta"><p>{item.category}</p><h3>{item.title}</h3></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="law-section">
        <div className="law-container">
          <motion.div {...reveal} className="law-section-head"><div><p className="section-kicker">[ Our commitment ]</p><h2>What working with us actually looks like.</h2></div><p>Here&apos;s what you can count on when you work with DevilSales.</p></motion.div>
          <div className="law-benefit-grid">
            {[
              ["01", "Direct access, no account managers", "You work directly with the person building your site from the first call to launch — not a rotating team."],
              ["02", "Fixed scope before work begins", "Your investment and deliverables are locked in writing before development starts. No surprise invoices."],
              ["03", "Built only for personal injury firms", "Every layout, form and tracking decision on this page is made for how injury clients actually search and choose counsel."],
              ["04", "Your project becomes our next reference", "The first firms we build for get featured in the portfolio section above — real work, real credit, real case study."],
            ].map(([number, title, copy]) => <motion.article {...reveal} key={number} className="bento-card law-benefit" onMouseMove={handleSpotlightMove}><span>{number}</span><h3>{title}</h3><p>{copy}</p></motion.article>)}
          </div>
        </div>
      </section>

      <section className="law-section">
        <div className="law-container">
          <motion.div {...reveal} className="law-section-head law-testimonial-head"><div><p className="section-kicker">[ Client feedback ]</p><h2>What clients say after launch.</h2></div><p>Real feedback from clients we&apos;ve built websites for.</p></motion.div>
          <div className="law-testimonial-grid">
            {[
              ["Motocenter Srl", "DevilSales delivered exactly what we needed — a clean, professional website that makes it easier for customers to browse our inventory and reach us. Great communication from start to finish."],
              ["Eurocar Viadana", "The whole process was smooth and fast. Our new site looks premium and works great on mobile — exactly what we were hoping for."],
              ["Autosalone Mia Car", "Very happy with the final result. The website is fast, easy to navigate, and gives our dealership a much stronger online presence."],
              ["Castello Car Volkswagen Service", "Professional from the first call to launch. The new website reflects the quality of our service and has made things easier for our customers."],
              ["Cisauto Group", "DevilSales understood exactly what our dealership needed. The site is polished, loads fast, and customers have already commented on how much easier it is to use."],
            ].map(([name, quote]) => (
              <motion.div {...reveal} key={name} className="law-testimonial-card">
                <h3>{name}</h3>
                <p className="law-testimonial-stars">★★★★★</p>
                <p className="law-testimonial-quote">&ldquo;{quote}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="law-section">
        <div className="law-container law-process-shell">
          <motion.div {...reveal} className="law-process-title"><p className="section-kicker">[ Our process ]</p><h2>Clear thinking.<br />Fast movement.</h2><p>One accountable team from positioning through launch.</p></motion.div>
          <div className="law-process-list">
            {[["01", "Discover", "Market, audience, competitors and lead quality."], ["02", "Position", "A sharper offer and a clear conversion path."], ["03", "Design", "A distinct visual system built around trust."], ["04", "Develop", "Responsive build, integrations and tracking."], ["05", "Launch & improve", "QA, measurement and growth-ready handoff."]].map(([n,t,d]) => <motion.div {...reveal} key={n} className="law-process-row" onMouseMove={handleSpotlightMove}><span>{n}</span><h3>{t}</h3><p>{d}</p><i>↗︎</i></motion.div>)}
          </div>
        </div>
      </section>

      <section id="investment" className="law-section">
        <div className="law-container">
          <motion.div {...reveal} className="law-investment" onMouseMove={handleSpotlightMove}>
            <div><p className="section-kicker !text-white/65">[ Investment ]</p><h2>Custom law firm websites start at <span>$10,000.</span></h2></div>
            <div><p>This is for firms that need more than a template: sharper positioning, premium UX, custom development and a measurement foundation built for serious paid traffic.</p><a href="#project-brief" className="mixar-button fill">Start a project ↗︎</a></div>
          </motion.div>
        </div>
      </section>

      <section id="faq" className="law-section law-faq-section">
        <div className="law-container">
          <motion.div {...reveal} className="law-section-head"><div><p className="section-kicker">[ Frequently asked ]</p><h2>Before we start.</h2></div><p>Direct answers about scope, investment and how the project works.</p></motion.div>
          <div className="law-faq-grid">{faqs.map(([q,a], i) => <motion.details {...reveal} key={q} className="law-faq" open={openFaq === i}><summary onClick={event => { event.preventDefault(); setOpenFaq(current => current === i ? null : i); }}><span className="law-faq-index">{`0${i + 1}`}</span><span className="law-faq-q">{q}</span><i /></summary><p>{a}</p></motion.details>)}</div>
        </div>
      </section>

      <section className="law-section law-contact-section">
        <div className="law-container law-contact-grid">
          <motion.div {...reveal} className="law-contact-copy"><p className="section-kicker">[ Start a project ]</p><h2>Let’s make your firm the obvious choice.</h2><p>Tell us where the current website is falling short. We will review the opportunity and contact you about the strongest next step.</p><div className="law-contact-card"><h3>DevilSales Web</h3><a href="tel:+13155478952" onClick={() => trackEvent("phone_click")}><ContactIcon type="phone" /><span><small>Call us</small>315-547-8952</span></a><a href="mailto:info@devilsales.dev" onClick={() => trackEvent("email_click")}><ContactIcon type="mail" /><span><small>Email us</small>info@devilsales.dev</span></a><div><ContactIcon type="location" /><span><small>Service area</small>United States · Nationwide</span></div></div></motion.div>
          <motion.div {...reveal}><LeadForm /></motion.div>
        </div>
      </section>

      <footer className="law-footer"><div className="law-container"><span className="nav-brand"><i>DS</i><span><b>DEVILSALES</b><small>WEB STUDIO · USA</small></span></span><p>© {new Date().getFullYear()} DEVILSALES</p><div><Link href="/privacy" target="_blank">Privacy</Link><Link href="/terms" target="_blank">Terms</Link><Link href="/sms-policy" target="_blank">SMS Terms</Link></div></div></footer>

      <button type="button" className="law-sticky-call" onClick={() => setQuickFormOpen(true)}><ContactIcon type="phone" /><span>Book a Meeting</span></button>

      <AnimatePresence>
        {quickFormOpen && <QuickLeadForm onClose={() => setQuickFormOpen(false)} />}
      </AnimatePresence>

      <style jsx global>{`
        .law-page{min-height:100vh;background:#0b0132;color:#fff}.law-container{width:min(1450px,calc(100% - 40px));margin:auto}.law-topbar{position:absolute;z-index:30;left:50%;top:24px;display:flex;width:min(1200px,calc(100% - 32px));height:82px;transform:translateX(-50%);align-items:center;justify-content:space-between;border-radius:20px;background:#51496c;padding:0 28px}.law-top-cta{border-bottom:1px solid #fff;padding-bottom:3px;font-size:15px}.law-hero{position:relative;overflow:hidden;min-height:1080px;padding:170px 0 100px}.law-glow-one{left:-12%;top:9%;width:650px;height:650px}.law-glow-two{right:-15%;top:34%;width:720px;height:720px}.law-eyebrow{display:flex;align-items:center;gap:12px;color:rgba(255,255,255,.48);font-size:10px;font-weight:700;letter-spacing:.22em;text-transform:uppercase}.law-eyebrow span{width:8px;height:8px;border-radius:50%;background:#9b5cff;box-shadow:0 0 18px #9b5cff}.law-hero h1{max-width:1320px;margin-top:45px;font-size:clamp(72px,10vw,150px);font-weight:500;line-height:.87;letter-spacing:-.07em}.law-hero h1 em{display:block;color:#a982ff;font-style:normal}.law-hero-bottom{display:grid;grid-template-columns:1.2fr .8fr;align-items:end;gap:50px;margin-top:52px;padding-top:30px;border-top:1px solid rgba(255,255,255,.12)}.law-hero-bottom>p{max-width:720px;color:rgba(255,255,255,.57);font-size:22px;line-height:1.45}.law-hero-actions{display:flex;justify-content:flex-end;gap:12px}.law-browser-stage{position:relative;margin-top:82px}.law-browser-main{width:78%}.law-browser-main img{display:block;width:100%;height:auto}.law-result-card{position:absolute;right:0;bottom:10px;width:34%;border:1px solid rgba(255,255,255,.14);border-radius:30px;background:linear-gradient(145deg,#7928ff,#3e149f);padding:40px;box-shadow:0 30px 90px rgba(0,0,0,.38)}.law-result-card span{font-size:9px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.62)}.law-result-card strong{display:block;margin:20px 0 15px;font-size:74px;font-weight:400;letter-spacing:-.07em}.law-result-card p{color:rgba(255,255,255,.7);line-height:1.65}.law-section{padding:140px 0}.law-intro{background:radial-gradient(circle at 10% 20%,rgba(105,32,255,.16),transparent 30%)}.law-intro-grid,.law-section-head{display:grid;grid-template-columns:1.25fr .75fr;gap:80px;align-items:end}.law-intro-grid h2,.law-section-head h2{max-width:950px;margin-top:22px;font-size:clamp(54px,7vw,100px);font-weight:500;line-height:.95;letter-spacing:-.06em}.law-intro-grid>div:last-child p,.law-section-head>p{color:rgba(255,255,255,.5);font-size:18px;line-height:1.65}.law-intro-grid .agency-button{display:inline-block;margin-top:28px}.law-benefit-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin-top:90px}.law-benefit{min-height:330px;transition:transform .35s,border-color .35s,background .35s}.law-benefit::before{content:"";position:absolute;inset:0;background:radial-gradient(260px circle at var(--mx,50%) var(--my,50%),rgba(154,99,255,.2),transparent 70%);opacity:0;transition:opacity .35s;pointer-events:none}.law-benefit:hover{transform:translateY(-6px);border-color:rgba(156,99,255,.5)}.law-benefit:hover::before{opacity:1}.law-benefit>*{position:relative}.law-benefit>span{color:#a982ff;font-size:11px;letter-spacing:.18em;transition:color .3s}.law-benefit:hover>span{color:#fff}.law-benefit h3{max-width:500px;margin-top:auto;font-size:40px;font-weight:500;line-height:1;letter-spacing:-.045em}.law-benefit p{max-width:560px;margin-top:22px;color:rgba(255,255,255,.48);line-height:1.65}.law-testimonial-head h2{font-weight:800;letter-spacing:-.03em}.law-testimonial-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:70px}.law-testimonial-card{border-radius:24px;background:#fff;padding:32px;color:#11052f}.law-testimonial-card h3{font-size:18px;font-weight:700;letter-spacing:-.01em}.law-testimonial-stars{margin-top:8px;letter-spacing:.2em;color:#f5b400}.law-testimonial-quote{margin-top:16px;color:rgba(17,5,47,.7);font-size:14.5px;font-weight:400;line-height:1.65}.law-showcase{display:grid;grid-template-columns:1.5fr .7fr;overflow:hidden;margin-top:70px;border:1px solid rgba(255,255,255,.1);border-radius:32px;background:#17063e}.law-showcase-image{position:relative;min-height:720px}.law-showcase-copy{display:flex;flex-direction:column;justify-content:center;padding:55px}.law-showcase-copy h3{margin-top:24px;font-size:48px;font-weight:500;line-height:1;letter-spacing:-.05em}.law-showcase-copy>p:not(.section-kicker){margin-top:24px;color:rgba(255,255,255,.5);line-height:1.7}.law-showcase-copy ul{margin-top:30px;border-top:1px solid rgba(255,255,255,.12)}.law-showcase-copy li{padding:16px 0;border-bottom:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.75)}.law-process-shell{display:grid;grid-template-columns:.8fr 1.2fr;gap:70px;border-radius:42px;background:#f0edff;padding:70px;color:#11052f}.law-process-title h2{margin-top:24px;font-size:clamp(58px,6vw,90px);font-weight:500;line-height:.94;letter-spacing:-.06em}.law-process-title>p:last-child{max-width:390px;margin-top:28px;color:rgba(17,5,47,.55);font-size:18px;line-height:1.6}.law-process-row{position:relative;display:grid;grid-template-columns:55px 1fr 1fr 25px;align-items:center;gap:22px;padding:25px 18px;margin:0 -18px;border-bottom:1px solid rgba(17,5,47,.15);border-radius:16px;transition:border-color .3s,transform .3s}.law-process-row::before{content:"";position:absolute;inset:0;border-radius:16px;background:radial-gradient(220px circle at var(--mx,50%) var(--my,50%),rgba(97,0,255,.1),transparent 70%);opacity:0;transition:opacity .35s;pointer-events:none}.law-process-row:hover{border-color:rgba(97,0,255,.3);transform:translateX(6px)}.law-process-row:hover::before{opacity:1}.law-process-row>span{position:relative;font-size:11px;opacity:.5;transition:.3s}.law-process-row:hover>span{color:#6100ff;opacity:1}.law-process-row h3{position:relative;font-size:30px;font-weight:500;transition:color .3s}.law-process-row:hover h3{color:#6100ff}.law-process-row p{position:relative;color:rgba(17,5,47,.55);line-height:1.55}.law-process-row i{position:relative;display:inline-block;font-style:normal;transition:.3s}.law-process-row:hover i{color:#6100ff;transform:translate(4px,-4px) scale(1.2)}.law-investment{position:relative;display:grid;grid-template-columns:1.2fr .8fr;gap:80px;align-items:end;overflow:hidden;border-radius:42px;background:linear-gradient(135deg,#7424ff,#3d169e);padding:70px;transition:box-shadow .4s}.law-investment::before{content:"";position:absolute;inset:0;background:radial-gradient(380px circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.16),transparent 70%);opacity:0;transition:opacity .4s;pointer-events:none}.law-investment:hover::before{opacity:1}.law-investment:hover{box-shadow:0 30px 90px rgba(60,10,160,.45)}.law-investment>div{position:relative}.law-investment h2{margin-top:24px;font-size:clamp(56px,7vw,100px);font-weight:500;line-height:.94;letter-spacing:-.06em}.law-investment h2 span{color:#c4a7ff}.law-investment>div:last-child p{color:rgba(255,255,255,.7);font-size:18px;line-height:1.65}.law-investment .mixar-button{margin-top:30px}.law-faq-grid{display:grid;grid-template-columns:1fr 1fr;align-items:start;gap:16px;margin-top:65px}.law-faq{overflow:hidden;border:1px solid rgba(255,255,255,.1);border-radius:16px;background:#160045;transition:.35s}.law-faq[open],.law-faq:hover{border-color:rgba(156,99,255,.5);background:radial-gradient(circle at 0 0,rgba(119,62,255,.16),transparent 55%),#1a0752}.law-faq[open]{box-shadow:0 20px 50px rgba(60,10,160,.22)}.law-faq summary{display:flex;cursor:pointer;list-style:none;align-items:center;gap:20px;padding:27px 28px;font-size:18px;font-weight:500;letter-spacing:-.01em}.law-faq summary::-webkit-details-marker{display:none}.law-faq-index{flex:0 0 auto;color:#a982ff;font-size:12px;font-weight:700;font-variant-numeric:tabular-nums;letter-spacing:.08em}.law-faq-q{flex:1}.law-faq summary i{position:relative;flex:0 0 auto;width:34px;height:34px;border:1px solid rgba(255,255,255,.16);border-radius:50%;background:rgba(255,255,255,.04);transition:.3s}.law-faq summary i:before,.law-faq summary i:after{content:"";position:absolute;top:50%;left:50%;width:11px;height:1.6px;background:#fff;transform:translate(-50%,-50%)}.law-faq summary i:after{transform:translate(-50%,-50%) rotate(90deg);transition:.3s}.law-faq[open] summary i{border-color:rgba(156,99,255,.6);background:#6100ff}.law-faq[open] summary i:after{transform:translate(-50%,-50%) rotate(0deg);opacity:0}.law-faq:hover summary i{border-color:rgba(156,99,255,.5)}.law-faq>p{margin:0 28px 28px;padding-top:20px;padding-left:44px;border-top:1px solid rgba(255,255,255,.09);color:rgba(255,255,255,.6);font-size:15px;line-height:1.75}.law-contact-section{padding-bottom:150px}.law-contact-grid{display:grid;grid-template-columns:.75fr 1.25fr;gap:80px;align-items:start}.law-contact-copy{position:sticky;top:120px}.law-contact-copy h2{margin-top:24px;font-size:clamp(58px,6vw,90px);font-weight:500;line-height:.94;letter-spacing:-.06em}.law-contact-copy>p:not(.section-kicker){max-width:560px;margin-top:28px;color:rgba(255,255,255,.5);font-size:18px;line-height:1.65}.law-contact-card{margin-top:45px;overflow:hidden;border:1px solid rgba(255,255,255,.14);border-radius:20px;background:linear-gradient(145deg,#6f22ff,#4d0bcc);box-shadow:0 22px 70px rgba(98,31,255,.2)}.law-contact-card h3{border-bottom:1px solid rgba(255,255,255,.2);padding:24px 28px;font-size:24px;font-weight:500}.law-contact-card>a,.law-contact-card>div{display:flex;align-items:center;gap:16px;margin:0 28px;padding:17px 0;border-bottom:1px solid rgba(255,255,255,.14);color:#fff}.law-contact-card>div:last-child{border-bottom:0}.law-contact-card>a:hover .law-contact-icon{background:#fff;transform:scale(1.08)}.law-contact-card>a:hover .law-contact-icon svg{stroke:#641cff}.law-contact-card span:not(.law-contact-icon){display:flex;min-width:0;flex-direction:column;gap:4px;font-size:16px;word-break:break-word}.law-contact-card small{color:rgba(255,255,255,.6);font-size:10px;font-weight:500;letter-spacing:.14em;text-transform:uppercase}.law-contact-icon{display:grid;flex:0 0 auto;width:42px;height:42px;place-items:center;border-radius:12px;background:rgba(255,255,255,.16);transition:.3s}.law-contact-icon svg{width:20px;height:20px;fill:none;stroke:#fff;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}.law-form-wrap{position:relative;padding:0 17px 18px 0}.law-form-offset{position:absolute;z-index:0;inset:17px 0 0 17px;border-radius:26px;background:linear-gradient(145deg,#793cff,#5522f1);box-shadow:0 30px 80px rgba(89,38,245,.28)}.law-form{position:relative;z-index:1;min-height:650px;border:1px solid rgba(186,153,255,.24);border-radius:26px;background:radial-gradient(circle at 90% 0,rgba(119,62,255,.15),transparent 30%),#17063f;padding:42px}.law-form-head{display:flex;justify-content:space-between;gap:25px}.law-form-head h2{margin-top:16px;font-size:42px;font-weight:400;letter-spacing:-.05em}.law-form-head>div>p:last-child{margin-top:10px;color:rgba(255,255,255,.4);font-size:11px}.law-form-head>span{color:#b998ff;font-size:10px;letter-spacing:.13em}.law-form-progress{height:3px;margin:28px 0;background:rgba(255,255,255,.09);border-radius:99px}.law-form-progress i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#945bff,#c4a4ff);transition:.4s}.law-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px 17px}.law-form-grid label{display:flex;flex-direction:column;gap:9px}.law-form-grid label.wide{grid-column:1/-1}.law-form-grid label>span{color:rgba(232,222,255,.72);font-size:11px}.law-form input,.law-form select,.law-form textarea{width:100%;border:1px solid rgba(201,180,255,.22);border-radius:8px;outline:none;background:rgba(255,255,255,.055);color:#fff;font:inherit;font-size:13px;transition:.2s}.law-form input,.law-form select{height:53px;padding:0 15px}.law-form textarea{resize:vertical;padding:15px;line-height:1.6}.law-form input:focus,.law-form select:focus,.law-form textarea:focus{border-color:#9c6aff;box-shadow:0 0 0 3px rgba(145,87,255,.14)}.law-form select{color-scheme:dark}.law-form-primary{display:flex;width:100%;min-height:57px;align-items:center;justify-content:space-between;margin-top:28px;border-radius:999px;padding:0 23px;background:linear-gradient(90deg,#a79fbc,#d0c9df);color:#32127a;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;transition:.25s}.law-form-primary:hover{transform:translateY(-2px);background:#fff}.law-form-primary:disabled{opacity:.6}.law-form-primary b{font-size:16px}.law-form-actions{display:grid;grid-template-columns:auto 1fr;gap:13px;margin-top:26px}.law-form-actions .law-form-primary{margin-top:0}.law-form-back{min-height:57px;border:1px solid rgba(205,184,255,.25);border-radius:999px;padding:0 22px;color:rgba(255,255,255,.8)}.law-consent{display:grid;grid-template-columns:24px 1fr;gap:13px;margin-top:20px;border:1px solid rgba(203,181,255,.2);border-radius:10px;background:rgba(4,0,18,.23);padding:16px;transition:.35s}.law-consent.checked{border-color:#a06bff;background:linear-gradient(135deg,rgba(97,0,255,.22),rgba(255,255,255,.04));box-shadow:0 0 35px rgba(97,0,255,.15)}.law-consent input{appearance:none;width:24px;height:24px;margin-top:1px;border:1px solid rgba(255,255,255,.3);border-radius:6px;background:#0b0132;display:grid;place-content:center}.law-consent input:checked{background:#6100ff;border-color:#9c6aff}.law-consent input:checked:after{content:'✓';color:#fff;font-size:15px}.law-consent span{color:rgba(229,218,253,.65);font-size:10px;line-height:1.65}.law-consent a{color:#fff;text-decoration:underline;text-underline-offset:3px}.law-form-message{margin-top:18px;border-radius:9px;padding:12px 14px;font-size:11px;line-height:1.55}.law-form-message.success{background:rgba(42,177,104,.13);color:#a9f5ca}.law-form-message.error{background:rgba(214,48,82,.13);color:#ffb0be}
        .law-success-overlay{position:fixed;inset:0;z-index:80;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(5,0,20,.82);-webkit-transform:translateZ(0);transform:translateZ(0)}.law-success-modal{width:min(420px,100%);border:1px solid rgba(186,153,255,.3);border-radius:26px;background:radial-gradient(circle at 90% 0,rgba(119,62,255,.25),transparent 40%),#17063f;padding:44px 36px;text-align:center;box-shadow:0 40px 100px rgba(0,0,0,.45)}.law-success-check{display:grid;width:64px;height:64px;margin:0 auto;place-items:center;border-radius:50%;background:linear-gradient(145deg,#7928ff,#3e149f)}.law-success-check svg{width:30px;height:30px;fill:none;stroke:#fff;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}.law-success-modal h3{margin-top:24px;font-size:26px;font-weight:500;letter-spacing:-.03em}.law-success-modal p{margin-top:12px;color:rgba(255,255,255,.6);font-size:14px;line-height:1.6}.law-success-modal button{display:inline-flex;min-height:50px;align-items:center;justify-content:center;margin-top:26px;padding:0 32px;border-radius:999px;background:linear-gradient(90deg,#a79fbc,#d0c9df);color:#32127a;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;transition:.25s}.law-success-modal button:hover{background:#fff;transform:translateY(-2px)}.law-footer{border-top:1px solid rgba(255,255,255,.1);padding:36px 0 110px}.law-footer>.law-container{display:flex;align-items:center;justify-content:space-between;gap:30px}.law-footer p,.law-footer a{color:rgba(255,255,255,.45);font-size:12px}.law-footer>div>div{display:flex;gap:20px}.law-sticky-call{position:fixed;right:28px;bottom:28px;z-index:70;display:flex;align-items:center;gap:12px;padding:14px 26px 14px 14px;border:none;border-radius:999px;background:linear-gradient(90deg,#7928ff,#5522f1);color:#fff;font:inherit;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 20px 50px rgba(89,38,245,.45);transition:transform .3s,box-shadow .3s;-webkit-transform:translateZ(0);transform:translateZ(0)}.law-sticky-call:hover{transform:translateY(-3px);box-shadow:0 25px 60px rgba(89,38,245,.55)}.law-sticky-call .law-contact-icon{width:34px;height:34px;background:rgba(255,255,255,.18)}.law-sticky-call .law-contact-icon svg{width:16px;height:16px}
        .law-quick-overlay{position:fixed;inset:0;z-index:90;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(5,0,20,.82)}.law-quick-modal{position:relative;width:min(440px,100%);max-height:90vh;overflow-y:auto;border:1px solid rgba(186,153,255,.3);border-radius:26px;background:radial-gradient(circle at 90% 0,rgba(119,62,255,.2),transparent 40%),#17063f;padding:40px 34px}.law-quick-close{position:absolute;top:18px;right:18px;width:34px;height:34px;border:none;border-radius:50%;background:rgba(255,255,255,.08);color:#fff;font-size:20px;cursor:pointer}.law-quick-modal h3{font-size:26px;font-weight:500;letter-spacing:-.03em}.law-quick-sub{margin-top:8px;color:rgba(255,255,255,.5);font-size:13px}.law-quick-modal form{margin-top:24px;display:flex;flex-direction:column;gap:16px}.law-quick-modal label{display:flex;flex-direction:column;gap:8px;font-size:12px;color:rgba(232,222,255,.72)}.law-quick-modal input,.law-quick-modal select{height:50px;padding:0 14px;border:1px solid rgba(201,180,255,.22);border-radius:8px;outline:none;background:rgba(255,255,255,.055);color:#fff;font:inherit;font-size:13px}.law-quick-modal select{color-scheme:dark}.law-quick-error{border-radius:9px;background:rgba(214,48,82,.13);padding:10px 12px;color:#ffb0be;font-size:12px}.law-quick-submit{margin-top:6px;min-height:54px;border:none;border-radius:999px;background:linear-gradient(90deg,#a79fbc,#d0c9df);color:#32127a;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;transition:.25s}.law-quick-submit:hover{background:#fff}.law-quick-submit:disabled{opacity:.6;cursor:default}.law-quick-success{padding:20px 0;text-align:center}.law-quick-success h3{margin-top:22px}.law-quick-success p{margin-top:10px;color:rgba(255,255,255,.6);font-size:14px}
        .law-menu-button{display:none;position:relative;width:44px;height:44px;flex-direction:column;align-items:center;justify-content:center;gap:5px}.law-menu-button span{width:20px;height:2px;border-radius:2px;background:#fff}
        .law-portfolio-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:70px}.law-portfolio-card{position:relative;display:block;overflow:hidden;border:1px solid rgba(255,255,255,.1);border-radius:22px;background:#17063e;color:inherit;text-decoration:none;transition:.3s}.law-portfolio-card.has-image:hover{border-color:rgba(156,99,255,.55)}.law-portfolio-image{position:relative;aspect-ratio:4/3;background:#0b0132}.law-portfolio-tag{position:absolute;left:16px;top:16px;z-index:2;border-radius:999px;background:rgba(11,1,50,.65);padding:6px 12px;color:rgba(255,255,255,.8);font-size:9px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}.law-portfolio-meta{padding:22px 24px 26px}.law-portfolio-meta p{color:#a982ff;font-size:11px;letter-spacing:.1em;text-transform:uppercase}.law-portfolio-meta h3{margin-top:10px;font-size:22px;font-weight:500;letter-spacing:-.03em}.law-portfolio-meta i{display:block;margin-top:14px;color:rgba(255,255,255,.55);font-size:12px;font-style:normal;text-decoration:underline;text-underline-offset:3px}.law-portfolio-card.is-placeholder{border-style:dashed;border-color:rgba(255,255,255,.16);background:rgba(255,255,255,.02)}.law-portfolio-placeholder{display:flex;align-items:center;justify-content:center;aspect-ratio:4/3;color:rgba(255,255,255,.22);font-size:34px;font-weight:500}
        .law-mobile-overlay{position:fixed;inset:0;z-index:60;background:rgba(5,0,20,.82);-webkit-transform:translateZ(0);transform:translateZ(0)}.law-mobile-drawer{position:absolute;right:0;top:0;display:flex;height:100%;width:min(340px,86vw);flex-direction:column;background:#150a3b;padding:26px 22px;box-shadow:-30px 0 80px rgba(0,0,0,.4);-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.law-drawer-top{display:flex;align-items:center;justify-content:space-between}.law-drawer-top button{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.08);color:#fff;font-size:20px}.law-drawer-links{display:flex;flex-direction:column;gap:4px;margin-top:40px}.law-drawer-links a{padding:16px 4px;border-bottom:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.85);font-size:18px}.law-drawer-cta{display:flex;align-items:center;justify-content:center;min-height:54px;margin-top:auto;border-radius:999px;background:linear-gradient(90deg,#a79fbc,#d0c9df);color:#32127a;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
        @media(max-width:900px){.law-hero{min-height:auto;padding-top:150px}.law-hero-bottom,.law-intro-grid,.law-section-head,.law-investment,.law-contact-grid{grid-template-columns:1fr}.law-hero-actions{justify-content:flex-start}.law-browser-main{width:92%}.law-result-card{width:45%;padding:28px}.law-result-card strong{font-size:54px}.law-showcase{grid-template-columns:1fr}.law-showcase-image{min-height:560px}.law-process-shell{grid-template-columns:1fr;padding:48px}.law-contact-copy{position:static}.law-benefit-grid{grid-template-columns:1fr 1fr}.law-faq-grid{grid-template-columns:1fr}.law-portfolio-grid{grid-template-columns:1fr 1fr}.law-testimonial-grid{grid-template-columns:1fr 1fr}}
        @media(max-width:767px){.law-container{width:min(100% - 30px,1450px)}.law-topbar{top:14px;height:68px;padding:0 17px}.law-topbar .nav-brand span{display:none}.law-top-cta{display:none}.law-menu-button{display:flex}.law-hero{padding:125px 0 75px}.law-hero h1{margin-top:30px;font-size:58px;line-height:.92}.law-hero-bottom{gap:25px;margin-top:32px}.law-hero-bottom>p{font-size:17px}.law-hero-actions{flex-wrap:wrap}.law-browser-stage{margin-top:55px}.law-browser-main{width:100%}.law-result-card{position:static;width:auto;margin-top:18px;border-radius:20px;padding:22px}.law-result-card strong{display:block;margin:12px 0 8px;font-size:42px}.law-result-card p{font-size:13px}.law-section{padding:85px 0}.law-intro-grid,.law-section-head{gap:28px}.law-intro-grid h2,.law-section-head h2{font-size:48px}.law-benefit-grid{grid-template-columns:1fr;margin-top:55px}.law-benefit{min-height:270px}.law-benefit h3{font-size:34px}.law-testimonial-grid{grid-template-columns:1fr;margin-top:45px}.law-showcase{margin-top:45px;border-radius:22px}.law-showcase-image{min-height:360px}.law-showcase-copy{padding:30px 24px}.law-showcase-copy h3{font-size:38px}.law-portfolio-grid{grid-template-columns:1fr;margin-top:45px}.law-process-shell{width:calc(100% - 30px);border-radius:26px;padding:32px 22px}.law-process-title h2{font-size:50px}.law-process-row{grid-template-columns:38px 1fr 20px;gap:12px}.law-process-row p{grid-column:2/4}.law-process-row h3{font-size:25px}.law-investment{border-radius:26px;padding:34px 24px}.law-investment h2{font-size:49px}.law-faq summary{padding:21px 20px;font-size:15px;gap:14px}.law-faq-index{font-size:10px}.law-faq summary i{width:28px;height:28px}.law-faq>p{margin:0 20px 21px;padding-left:0;font-size:14px}.law-contact-grid{gap:45px}.law-contact-copy h2{font-size:49px}.law-contact-card>a,.law-contact-card>div{margin:0 20px}.law-form-wrap{padding:0 9px 11px 0}.law-form-offset{inset:10px 0 0 9px;border-radius:19px}.law-form{min-height:650px;border-radius:19px;padding:25px 18px}.law-form-head h2{font-size:31px}.law-form-grid{grid-template-columns:1fr;gap:17px}.law-form-grid label.wide{grid-column:auto}.law-form-actions{grid-template-columns:1fr}.law-form-back{order:2}.law-footer>.law-container{flex-direction:column;align-items:flex-start}.law-footer p{order:3}.law-page{padding-bottom:64px}.law-sticky-call{left:0;right:0;bottom:0;justify-content:center;gap:10px;height:58px;padding:0;border-radius:0;box-shadow:none}.law-sticky-call:hover{transform:none}.law-sticky-call .law-contact-icon{width:26px;height:26px;background:rgba(255,255,255,.18)}.law-sticky-call .law-contact-icon svg{width:14px;height:14px}.law-footer{padding-bottom:36px}}
      `}</style>
    </main>
  );
}

function BrowserTop() { return <div className="browser-top"><span /><span /><span /><b>devilsales.dev</b></div>; }

function ContactIcon({ type }: { type: "phone" | "mail" | "location" }) {
  if (type === "phone") return <span className="law-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7.2 3.5 10 7.8 8.3 10c1.2 2.5 3.2 4.5 5.7 5.7l2.2-1.7 4.3 2.8-.7 3.2c-.2.8-.9 1.4-1.8 1.4C9.5 21.4 2.6 14.5 2.6 6c0-.9.6-1.6 1.4-1.8l3.2-.7Z" /></svg></span>;
  if (type === "mail") return <span className="law-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg></span>;
  return <span className="law-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg></span>;
}
