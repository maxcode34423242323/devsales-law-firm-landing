"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const questions = [
  ["What services does DevilSales provide?", "We handle strategy, positioning, UI/UX design, custom website development, integrations and ongoing optimization as one connected engagement."],
  ["Can you show examples relevant to my industry?", "Yes. Our portfolio includes curated US-market references across legal, medical, dental, construction, home services and other high-value industries."],
  ["Which industries do you specialize in?", "We focus on service businesses where trust and lead quality matter: law firms, clinics, contractors, HVAC, roofing, remodeling, luxury builders, restoration and commercial landscaping."],
  ["What is a typical project timeline?", "Most custom website engagements take 6–12 weeks. The final schedule depends on scope, content readiness, integrations and the speed of feedback."],
  ["Do you provide ongoing support after launch?", "Yes. We can support analytics, content updates, technical maintenance, conversion improvements and new landing pages after launch."],
  ["Can you accommodate a tight deadline?", "Sometimes. We first confirm that the scope, approvals and content can support the requested launch date without compromising the result."],
  ["How does the creative process work?", "We move through discovery, positioning, structure, visual design, development, quality assurance and launch—with clear approvals at every major stage."],
  ["What makes DevilSales different?", "One accountable team connects business strategy, premium design and reliable development. Every screen is created for a commercial reason, not decoration alone."],
];

export default function FaqPage(){
  const [open,setOpen]=useState<number|null>(null);
  return <main className="faq-page"><Navbar/>
    <section className="faq-hero"><p className="section-kicker">[ Answers before we begin ]</p><h1>Frequently Asked Questions</h1><p>Clear answers about scope, process, timing and what it&apos;s like to work with DevilSales.</p></section>
    <section className="faq-shell"><div className="faq-heading"><p className="section-kicker">[ The essentials ]</p><h2>The most common questions.</h2></div><div className="faq-grid">{questions.map(([q,a],i)=><article key={q} className={`faq-item ${open===i?"open":""}`}><button className="faq-question" onClick={()=>setOpen(open===i?null:i)} aria-expanded={open===i}><span>{q}</span><i aria-hidden="true" /></button><AnimatePresence initial={false}>{open===i&&<motion.div className="faq-answer" initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.32}}><p>{a}</p></motion.div>}</AnimatePresence></article>)}</div></section>
    <Footer/>
  </main>
}
