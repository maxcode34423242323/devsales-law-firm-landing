"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const groups = [
  { label: "Services", links: [["Custom Websites", "/agency#services"], ["Website Redesign", "/agency#services"], ["Landing Pages", "/agency#services"], ["Development", "/agency#services"]] },
  { label: "Work", links: [["All Portfolio", "/work"], ["Automotive Case Study", "/work/devilsales-auto"]] },
  { label: "Process", links: [["Discovery", "/agency#process"], ["Strategy", "/agency#process"], ["Design", "/agency#process"], ["Development", "/agency#process"]] },
  { label: "All Pages", links: [["Home", "/agency"], ["Portfolio", "/work"], ["FAQ", "/faq"], ["Contact Us", "/contact"], ["Privacy", "/privacy"], ["Terms", "/terms"]] },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [desktopActive, setDesktopActive] = useState<string | null>(null);

  return <>
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-6">
      <div className="navbar-shell mx-auto flex h-[82px] max-w-[1200px] items-center justify-between rounded-[20px] bg-[#51496c]/90 px-5 text-white backdrop-blur-xl md:px-7">
        <nav className="desktop-nav hidden md:flex" onMouseLeave={() => setDesktopActive(null)}>
          {groups.map(group => <div className="desktop-nav-group" key={group.label} onMouseEnter={() => setDesktopActive(group.label)}>
            <button type="button" aria-expanded={desktopActive === group.label}>{group.label}</button>
            <AnimatePresence>{desktopActive === group.label && <motion.div className={`desktop-dropdown ${group.label === "All Pages" ? "wide" : ""}`} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: .2 }}>
              {group.links.map(([label, href], index) => <Link href={href} key={`${group.label}-${label}`}><i className={index === 0 ? "visible" : ""} /><span>{label}</span></Link>)}
            </motion.div>}</AnimatePresence>
          </div>)}
        </nav>

        <Link href="/agency" className="nav-brand"><i>DS</i><span><b>DEVILSALES</b><small>WEB STUDIO · USA</small></span></Link>
        <Link href="/contact" className="hidden border-b border-white text-[16px] md:block">LET&apos;S TALK</Link>
        <button onClick={() => setOpen(true)} aria-label="Open menu" className="mobile-menu-button md:hidden"><span /><span /><span /></button>
      </div>
    </header>

    <AnimatePresence>{open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mobile-overlay" onClick={() => setOpen(false)}>
      <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ duration: .42, ease: [.22, 1, .36, 1] }} className="mobile-drawer" onClick={event => event.stopPropagation()}>
        <div className="drawer-top"><Link href="/agency" className="drawer-logo">DS</Link><button onClick={() => setOpen(false)}>×</button></div>
        <div className="drawer-groups">{groups.map(group => <div key={group.label} className={`drawer-group ${active === group.label ? "open" : ""}`}>
          <button onClick={() => setActive(active === group.label ? null : group.label)}><span>{group.label}</span><i aria-hidden="true" /></button>
          <AnimatePresence>{active === group.label && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            {group.links.map(([label, href]) => <Link onClick={() => setOpen(false)} href={href} key={`${group.label}-${label}`}>{label}</Link>)}
          </motion.div>}</AnimatePresence>
        </div>)}</div>
        <Link onClick={() => setOpen(false)} href="/contact" className="drawer-talk">LET&apos;S TALK</Link>
      </motion.aside>
    </motion.div>}</AnimatePresence>
  </>;
}
