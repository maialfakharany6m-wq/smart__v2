import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ================= CURSOR ================= */
function Cursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(followerRef.current, { x: e.clientX, y: e.clientY, duration: 0.6 });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed w-2.5 h-2.5 bg-[#1E3A8A] rounded-full z-[9999] pointer-events-none mix-blend-difference" />
      <div ref={followerRef} className="fixed w-8 h-8 border border-[#1E3A8A]/30 rounded-full z-[9998] pointer-events-none" />
    </>
  );
}

/* ================= CINEMATIC LOGO (INTRO + FLOAT) ================= */
function CinematicLogo() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;

    // INTRO ANIMATION (important: visible entrance)
    gsap.fromTo(
      el,
      { y: 120, scale: 0.6, opacity: 0 },
      { y: 0, scale: 1.15, opacity: 1, duration: 2, ease: "power3.out" }
    );

    // FLOAT LOOP
    gsap.to(el, {
      y: -8,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      <img
        ref={ref}
        src="/logo.png"
        className="w-[460px] object-contain z-10"
        style={{ filter: "drop-shadow(0 0 25px rgba(30,58,138,0.25))" }}
      />
    </div>
  );
}

/* ================= NAVBAR (FIXED NOT MOVING) ================= */
function Navbar() {
  const links = ["home", "vision", "capability", "proof", "leadership", "contact"];

  return (
    <div className="fixed top-0 left-0 w-full z-[9999] bg-[#0B1B3A] border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-4">

        {/* LOGO LEFT */}
        <div className="flex items-center gap-3">
         
          <div className="text-white text-[11px] tracking-[0.25em]">
            SMART SMILE WAY
          </div>
        </div>

        {/* MENU */}
        <div className="hidden md:flex gap-8 text-[11px] tracking-[0.25em]">
          {links.map((l) => (
            <button
              key={l}
              onClick={() =>
                document.getElementById(l)?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-white/60 hover:text-white transition"
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ================= HERO ================= */
function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.5 });
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-white pt-24">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        <CinematicLogo />

        <div ref={ref}>
          <p className="text-blue-400 tracking-[0.4em] text-xs mb-6">
            EDUCATIONAL INVESTMENT GROUP
          </p>

          <h1 className="text-[#0B1B3A] text-5xl font-[Playfair_Display] leading-tight">
            Smart Smile Way
            <br />
            <span className="text-blue-500 text-3xl">
              for A Brighter Future
            </span>
          </h1>

          <div className="w-24 h-[1px] bg-blue-200 my-8" />

          <p className="text-blue-500/70 max-w-md">
            We build, operate & transform educational institutions into global systems.
          </p>
        </div>

      </div>
    </section>
  );
}

/* ================= SECTION ================= */
function Section({ id, title, subtitle, children, dark }) {
  return (
    <section
      id={id}
      className={`py-40 px-6 md:px-24 ${
        dark ? "bg-[#0B1B3A] text-white" : "bg-white text-[#0B1B3A]"
      }`}
    >
      <div className="max-w-6xl mx-auto">

        <p className="text-[11px] tracking-[0.35em] text-blue-400 mb-4">
          {subtitle}
        </p>

        <h2 className="text-4xl font-[Playfair_Display] mb-16">
          {title}
        </h2>

        {children}

      </div>
    </section>
  );
}

/* ================= FOOTER (NEW PREMIUM WEBSITE STYLE) ================= */
function Footer() {
  const links = ["home", "vision", "capability", "proof", "leadership", "contact"];

  return (
    <footer className="bg-[#06122B] text-white pt-20 pb-10 px-6">

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

        {/* WHO WE ARE */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" className="w-40 h-40 rounded-full" />
            <span className="tracking-[0.25em] text-sm">SMART SMILE WAY</span>
          </div>
          <p className="text-white/60 text-sm">
            Educational Investment Group building future-ready institutions.
          </p>
        </div>

        {/* MENU */}
        <div>
          <h3 className="mb-4 tracking-[0.2em] text-sm">NAVIGATION</h3>
          <div className="space-y-2 text-white/60 text-sm">
            {links.map((l) => (
              <p key={l} className="hover:text-white cursor-pointer">
                {l.toUpperCase()}
              </p>
            ))}
          </div>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="mb-4 tracking-[0.2em] text-sm">SOCIAL</h3>
          <p className="text-white/60 text-sm">
            Instagram · LinkedIn · Facebook
          </p>
        </div>

      </div>

      <div className="border-t border-white/10 mt-12 pt-6 text-center text-white/40 text-xs">
        جميع الحقوق محفوظة © Smart Smile Way 2026
      </div>

    </footer>
  );
}

/* ================= CONTACT (UPGRADED MESSAGE US) ================= */
function Contact() {
  return (
    <Section id="contact" title="Contact" subtitle="START · CONNECT">
      <div className="max-w-2xl space-y-6">

        <h3 className="text-blue-400 tracking-[0.2em]">MESSAGE US</h3>

        <input className="w-full border border-blue-100 p-3" placeholder="Your Name" />
        <input className="w-full border border-blue-100 p-3" placeholder="Email" />
        <textarea className="w-full border border-blue-100 p-3 h-32" placeholder="Your Message" />

        <button className="bg-[#0B1B3A] text-white px-6 py-3">
          Send Message
        </button>

      </div>
    </Section>
  );
}

/* ================= MAIN ================= */
export default function HomePage() {
  return (
    <div>

      <Cursor />
      <Navbar />

      <Hero />

      {/* VISION */}
      <Section id="vision" title="About Us" subtitle="VISION · MISSION">
        <div className="space-y-10">
          <div>
            <h3 className="text-blue-400 mb-3">VISION</h3>
            <p>
              To become a leading force in educational investment and management,
              transforming schools and nurseries into globally recognized, high-performance institutions.
            </p>
          </div>

          <div>
            <h3 className="text-blue-400 mb-3">MISSION</h3>
            <p>
              We design, develop, and operate international schools by integrating academic excellence,
              institutional governance, and financial efficiency.
            </p>
          </div>
        </div>
      </Section>

      {/* SERVICES */}
      <Section id="capability" title="Our Services" subtitle="SYSTEMS · STRUCTURE" dark>
        <div className="space-y-4 text-white/80">
          <p>• Establishing and operating international schools</p>
          <p>• Cambridge, Edexcel, Oxford, Cognia accreditation</p>
          <p>• British, American & IB systems</p>
          <p>• Licensing under Egyptian Education Authority</p>
          <p>• Educational strategy & structure development</p>
          <p>• Teacher training & curriculum preparation</p>
          <p>• Workforce development & job placement</p>
        </div>
      </Section>

      {/* ACHIEVEMENTS */}
      <Section id="proof" title="Achievements" subtitle="IMPACT · SCALE">
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div><h3 className="text-5xl">4</h3><p>Schools</p></div>
          <div><h3 className="text-5xl">5</h3><p>Nurseries</p></div>
          <div><h3 className="text-5xl">25</h3><p>Accreditations</p></div>
        </div>
      </Section>

      {/* LEADERSHIP */}
      <Section id="leadership" title="Executive Team" subtitle="PEOPLE · LEADERSHIP" dark>
        <div className="grid md:grid-cols-2 gap-10">
          {[
            ["Eng. Sameer Abdullah", "Founder & CEO"],
            ["Eng. Ibrahim", "Co-Founder"],
            ["Dr. Heba Sultan", "General Manager"],
            ["Eng. Mai Ashraf", "Tech Director"],
            ["Dr. Norhan Khaled", "American Education Manager"],
            ["Mrs. Samar Mansour", "British Education Manager"],
          ].map(([name, role], i) => (
            <div key={i} className="border border-white/10 p-8 rounded-xl">
              <h3>{name}</h3>
              <p className="text-white/60 mt-3">{role}</p>
            </div>
          ))}
        </div>
      </Section>

      <Contact />

      <Footer />

    </div>
  );
}