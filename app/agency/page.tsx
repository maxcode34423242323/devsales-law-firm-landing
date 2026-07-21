"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const projects = [
  ["Personal Injury Law", "Omar Ochoa Law", "/images/reference-omar-better.jpg", "https://www.omarochoalaw.com"], ["Plastic Surgery", "Austin-Weston", "/images/reference-austin-plastic.png", "https://www.austin-weston.com"],
  ["Cosmetic Dentistry", "Apa Aesthetic", "/images/reference-apa-aesthetic.png", "https://apaaesthetic.com"], ["Roofing", "Yuras Roofing", "/images/reference-yuras-better.jpg", "https://www.yurasroofing.com"],
  ["HVAC", "Comfort Systems USA", "/images/reference-comfort-better.jpg", "https://comfortsystemsusa.com"], ["Home Remodeling", "Excel Remodeling", "/images/reference-excel-better.jpg", "https://www.excelremodeling.com"],
  ["Luxury Home Builders", "DWELL44", "/images/reference-dwell44-better.jpg", "https://dwell44.com/blogs/portfolio"], ["Medical Spa", "SkinSpirit", "/images/reference-skinspirit.png", "https://www.skinspirit.com"],
  ["Restoration", "FIRST ONSITE", "/images/reference-first-onsite.png", "https://firstonsite.com"], ["Commercial Landscaping", "BrightView", "/images/reference-brightview.png", "https://www.brightview.com"],
];
const capabilities = [
  ["01", "Strategy", "Positioning, audience research and a conversion path built around the way your customers choose."],
  ["02", "UI/UX Design", "Distinct digital identities and interfaces that make established businesses impossible to overlook."],
  ["03", "Development", "Fast, responsive builds with purposeful motion, CMS and technical SEO foundations."],
  ["04", "Growth Systems", "CRM, booking, analytics and ongoing improvements that turn your website into infrastructure."],
];
const reveal = { initial:{opacity:0,y:42}, whileInView:{opacity:1,y:0}, viewport:{once:true,margin:"-80px"}, transition:{duration:.75,ease:[.22,1,.36,1] as const} };

export default function Home(){
  return <main className="mixar-page overflow-hidden"><Navbar/>
    <section className="relative min-h-[980px] px-5 pb-24 pt-36 md:px-10 md:pt-44">
      <div className="purple-glow glow-one"/><div className="purple-glow glow-two"/>
      <div className="relative mx-auto max-w-[1450px]">
        <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:.7}} className="mb-12 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.24em] text-white/45"><span className="h-2 w-2 rounded-full bg-[#9b5cff] shadow-[0_0_18px_#9b5cff]"/>US-focused digital studio · Serving businesses nationwide</motion.div>
        <motion.h1 initial={{opacity:0,y:65}} animate={{opacity:1,y:0}} transition={{duration:1,ease:[.22,1,.36,1]}} className="max-w-[1320px] text-[16vw] font-medium leading-[.85] tracking-[-.07em] text-white md:text-[132px] lg:text-[170px]">Digital experiences for <span className="gradient-word">serious growth.</span></motion.h1>
        <div className="mt-14 grid gap-10 border-t border-white/12 pt-8 md:grid-cols-[1.25fr_.75fr] md:items-end">
          <motion.p {...reveal} className="max-w-2xl text-xl leading-8 text-white/55 md:text-2xl">Strategy, design and development for service businesses ready to become the obvious choice in their market.</motion.p>
          <motion.div {...reveal} className="flex gap-3 md:justify-end"><Link className="mixar-button fill" href="/contact">Start a project ↗</Link><a className="mixar-button hidden sm:inline-flex" href="#work">View work</a></motion.div>
        </div>
        <div className="relative mt-20 h-[440px] md:h-[660px]">
          <motion.div initial={{opacity:0,x:-80,rotate:-3}} animate={{opacity:1,x:0,rotate:-3}} transition={{delay:.35,duration:1}} className="browser-card absolute left-[-12%] top-16 w-[58%]"><BrowserTop/><Image src="/images/apex-legal.webp" alt="Law firm website interface" width={1200} height={772} sizes="(max-width: 767px) 70vw, 58vw" quality={68}/></motion.div>
          <motion.div initial={{opacity:0,y:100}} animate={{opacity:1,y:0}} transition={{delay:.18,duration:1}} className="browser-card absolute left-[22%] top-0 z-10 w-[58%]"><BrowserTop/><Image src="/images/devilsales-home.webp" alt="Premium digital platform" width={1200} height={772} sizes="(max-width: 767px) 70vw, 58vw" quality={68}/></motion.div>
          <motion.div initial={{opacity:0,x:80,rotate:3}} animate={{opacity:1,x:0,rotate:3}} transition={{delay:.45,duration:1}} className="browser-card absolute right-[-12%] top-20 w-[55%]"><BrowserTop/><Image src="/images/elite-estates.webp" alt="Luxury builder website interface" width={1200} height={772} sizes="(max-width: 767px) 70vw, 55vw" quality={68}/></motion.div>
        </div>
      </div>
    </section>

    <div className="ticker"><div>DESIGN THAT EARNS ATTENTION&nbsp; ✦ &nbsp;DEVELOPMENT THAT PERFORMS&nbsp; ✦ &nbsp;SYSTEMS THAT CREATE PIPELINE&nbsp; ✦ &nbsp;DESIGN THAT EARNS ATTENTION&nbsp; ✦ &nbsp;DEVELOPMENT THAT PERFORMS&nbsp; ✦ &nbsp;</div></div>

    <section className="mixar-intro px-5 py-28 md:px-10 md:py-36"><div className="mx-auto max-w-[1450px]">
      <motion.div {...reveal} className="agency-stage">
        <div className="agency-flow" aria-hidden="true"><i/><i/><i/></div>
        <div className="agency-copy">
          <p className="section-kicker !text-white/65">[ US digital studio ]</p>
          <h2>High-converting websites for ambitious service businesses.</h2>
        </div>
        <div className="agency-summary"><p>We combine sharp positioning, premium design and reliable development to turn your website into a serious growth channel.</p><Link href="/contact" className="agency-button">Start a project</Link></div>
        <div className="agency-stats">
          <div><strong>10</strong><span>High-value industries</span></div>
          <div><strong>01</strong><span>Accountable team</span></div>
          <div><strong>USA</strong><span>Nationwide focus</span></div>
        </div>
      </motion.div>
      <div className="agency-services">
        {[
          ["Strategy & UX","01","Positioning, conversion paths and interfaces built around how your customers choose."],
          ["Custom Development","02","Fast, responsive websites engineered for credibility, performance and growth."],
          ["Growth Systems","03","CRM, analytics, booking and ongoing improvements connected into one system."],
        ].map(([title,n,copy],i)=><motion.article {...reveal} key={title} className={i===0?"featured":""}><div><h3>{title}</h3><span>{n}</span></div><p>{copy}</p><a href="#services">Learn more</a></motion.article>)}
      </div>
    </div></section>

    <section id="services" className="px-5 py-28 md:px-10 md:py-40"><div className="mx-auto max-w-[1450px]">
      <motion.div {...reveal} className="flex flex-col justify-between gap-8 border-b border-white/15 pb-12 md:flex-row md:items-end"><div><p className="section-kicker">[ Capabilities ]</p><h2 className="mt-6 text-6xl font-medium tracking-[-.055em] text-white md:text-8xl">Built as one system.</h2></div><p className="max-w-md text-lg leading-7 text-white/45">Creative ambition and technical discipline, working together from day one.</p></motion.div>
      <div>{capabilities.map(([n,t,d])=><motion.div {...reveal} key={n} className="cap-row group grid gap-5 border-b border-white/12 py-9 md:grid-cols-[90px_1fr_1fr]"><span>{n}</span><h3 className="text-4xl font-medium tracking-[-.04em] text-white md:text-5xl">{t}</h3><p className="max-w-xl leading-7 text-white/42">{d}</p></motion.div>)}</div>
    </div></section>

    <section id="work" className="px-5 py-28 md:px-10 md:py-40"><div className="mx-auto max-w-[1450px]">
      <motion.div {...reveal} className="mb-16"><p className="section-kicker">[ Selected concepts ]</p><h2 className="mt-6 max-w-5xl text-6xl font-medium leading-none tracking-[-.055em] text-white md:text-8xl lg:text-[110px]">Different industries.<br/><span className="text-white/28">One standard.</span></h2></motion.div>
      <div className="grid gap-5 md:grid-cols-2">{projects.map(([cat,title,img,url],i)=><motion.article {...reveal} key={title} className="work-card group">
        <a href={url} target="_blank" rel="noreferrer" aria-label={`Visit ${title} website`} className="portfolio-frame relative block overflow-hidden"><Image src={img} alt={`${title} industry website reference`} fill sizes="(max-width: 767px) calc(100vw - 40px), 50vw" quality={65} className="object-cover object-top transition duration-[1100ms] group-hover:scale-[1.025]"/><div className="work-shade"/><span className="concept-pill">Reference 0{i+1}</span></a>
        <div className="flex items-end justify-between gap-5 p-6 md:p-8"><div><p className="section-kicker">Industry reference</p><h3 className="mt-3 text-4xl font-medium tracking-[-.04em] text-white md:text-5xl">{title}</h3><p className="mt-2 text-sm text-white/40">{cat}</p></div><a href={url} target="_blank" rel="noreferrer" className="project-arrow">↗</a></div>
      </motion.article>)}</div>
    </div></section>

    <section id="process" className="px-5 py-28 md:px-10 md:py-40"><div className="mx-auto max-w-[1450px] rounded-[42px] bg-[#f0edff] p-7 text-[#11052f] md:p-16">
      <motion.div {...reveal} className="grid gap-12 md:grid-cols-2"><div><p className="section-kicker !text-[#6d35dc]">[ Our process ]</p><h2 className="mt-6 text-6xl font-medium leading-none tracking-[-.055em] md:text-8xl">Clear thinking.<br/>Fast movement.</h2></div><div>{[["01","Discover"],["02","Position"],["03","Design"],["04","Develop"],["05","Launch & grow"]].map(([n,t])=><div key={n} className="flex items-center justify-between border-b border-[#11052f]/15 py-5"><span className="text-xs opacity-50">{n}</span><span className="text-2xl font-medium md:text-3xl">{t}</span><span>↗</span></div>)}</div></motion.div>
    </div></section>

    <section className="relative px-5 py-36 text-center md:px-10 md:py-52"><div className="purple-glow cta-glow"/><motion.div {...reveal} className="relative mx-auto max-w-6xl"><p className="section-kicker">[ Projects from $10,000 ]</p><h2 className="mt-7 text-6xl font-medium leading-[.9] tracking-[-.065em] text-white md:text-8xl lg:text-[132px]">Ready to become impossible to ignore?</h2><Link className="mixar-button fill mt-12" href="/contact">Let&apos;s talk ↗</Link></motion.div></section>
    <Footer/>
  </main>;
}

function BrowserTop(){return <div className="flex h-8 items-center gap-1.5 border-b border-white/10 px-3"><i/><i/><i/><span>devilsales.web</span></div>}
