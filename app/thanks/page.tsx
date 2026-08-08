"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";

const steps = [
  { label: "Step 1: Check your inbox.", copy: "You will receive an immediate confirmation email from Calendly with the Zoom link and calendar invite." },
  { label: "Step 2: Add to your calendar.", copy: "Please make sure to accept the invite so it's locked into your Google Calendar or Outlook." },
  { label: "Step 3: Our preparation.", copy: "We will review your current website and competitors beforehand to bring real, actionable value to our meeting." },
];

export default function ThanksPage() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "appointment_booked" });
  }, []);

  return (
    <main className="ty-page">
      <div className="purple-glow ty-glow-one" />
      <div className="purple-glow ty-glow-two" />

      <div className="ty-shell">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          className="ty-badge"
        >
          <i /> Booking Confirmed
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7, delay: .1 }}
        >
          Your Premium Strategy Session is Locked In.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7, delay: .2 }}
          className="ty-sub"
        >
          Thank you for scheduling a call. We have received your booking through Calendly. A calendar invitation with the Zoom link has been sent to your email.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7, delay: .3 }}
          className="ty-next"
        >
          <h3>What Happens Next?</h3>
          <ul>
            {steps.map((step) => (
              <li key={step.label}>
                <strong>{step.label}</strong> {step.copy}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7, delay: .4 }}
        >
          <Link href="/" className="mixar-button fill ty-home-button">Return to Home Page</Link>
        </motion.div>
      </div>

      <style jsx global>{`
        .ty-page{position:relative;min-height:100vh;overflow:hidden;background:#0a0220;display:flex;align-items:center;justify-content:center;padding:100px 24px}
        .ty-glow-one{width:520px;height:520px;right:-160px;top:-120px}
        .ty-glow-two{width:380px;height:380px;left:-140px;bottom:-100px;background:#2d55ff}
        .ty-shell{position:relative;z-index:1;width:100%;max-width:680px;text-align:center}
        .ty-badge{display:inline-flex;align-items:center;gap:10px;border:1px solid rgba(255,255,255,.14);border-radius:999px;background:rgba(255,255,255,.03);padding:9px 20px;color:rgba(255,255,255,.85);font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
        .ty-badge i{position:relative;width:8px;height:8px;border-radius:50%;background:#3ddc73;animation:ty-pulse 2s infinite}
        @keyframes ty-pulse{0%{box-shadow:0 0 0 0 rgba(61,220,115,.55)}70%{box-shadow:0 0 0 9px rgba(61,220,115,0)}100%{box-shadow:0 0 0 0 rgba(61,220,115,0)}}
        .ty-shell h1{margin-top:28px;font-size:clamp(34px,5.6vw,58px);font-weight:500;line-height:1.05;letter-spacing:-.04em;color:#fff}
        .ty-sub{margin:24px auto 0;max-width:520px;color:rgba(255,255,255,.6);font-size:16px;line-height:1.65}
        .ty-next{margin-top:60px;border:1px solid rgba(255,255,255,.1);border-radius:28px;background:linear-gradient(145deg,rgba(255,255,255,.05),rgba(255,255,255,.015));padding:44px 40px;text-align:left}
        .ty-next h3{font-size:20px;font-weight:600;letter-spacing:-.01em;color:#fff}
        .ty-next ul{display:flex;flex-direction:column;gap:20px;margin-top:24px}
        .ty-next li{color:rgba(255,255,255,.65);font-size:14.5px;line-height:1.65}
        .ty-next li strong{display:block;margin-bottom:4px;color:#fff;font-weight:600}
        .ty-home-button{margin-top:48px}
        @media(max-width:600px){
          .ty-page{padding:70px 20px}
          .ty-next{padding:32px 26px}
        }
      `}</style>
    </main>
  );
}
