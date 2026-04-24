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

/* ================= NAVBAR ================= */
function Navbar() {
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScroll.current) {
        setHidden(true); // scroll down
      } else {
        setHidden(false); // scroll up
      }
      lastScroll.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["home", "vision", "capability", "proof", "leadership", "contact"];

  return (
    <div
      className={`fixed top-0 left-0 w-full z-[9999] transition-transform duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } bg-[#0B1B3A]/95 backdrop-blur-xl border-b border-white/10`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-4">

        <div className="text-white text-[11px] tracking-[0.25em]">
          SMART SMILE WAY
        </div>

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

/* ================= LOGO ================= */
function CinematicLogo() {
  const ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ref.current,
      { y: 120, scale: 0.6, opacity: 0 },
      { y: 0, scale: 1.05, opacity: 1, duration: 2, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      <img
        ref={ref}
        src="/logo.png"
        className="w-[460px] object-contain"
        style={{ filter: "drop-shadow(0 0 25px rgba(30,58,138,0.25))" }}
      />
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

/* ================= FOOTER ================= */
function Footer() {
  const links = ["home", "vision", "capability", "proof", "leadership", "contact"];

  return (
    <footer className="bg-[#06122B] text-white pt-20 pb-10 px-6">

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" className="w-30 h-30 rounded-full" />
            <span className="tracking-[0.25em] text-sm"></span>
          </div>
          <p className="text-white/60 text-sm">
            Educational Investment Group building future-ready institutions.
          </p>
        </div>

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

/* ================= MAIN ================= */
export default function HomePage() {
  return (
    <div>

      <Cursor />
      <Navbar />
      <Hero />

      {/* VISION */}
      <Section id="vision" title="About Us" subtitle="VISION · MISSION">
        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-gradient-to-br from-blue-50 to-white p-10 rounded-2xl border border-blue-100 shadow-sm">
            <h3 className="text-blue-500 mb-6">VISION</h3>
            <p className="text-[#0B1B3A]/80 leading-relaxed">
              To become a leading force in educational investment and management, transforming schools and nurseries into globally recognized, high-performance institutions through innovation and international standards.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#0B1B3A] to-[#102A5C] p-10 rounded-2xl border border-white/10 shadow-sm text-white">
            <h3 className="text-blue-300 mb-6">MISSION</h3>
            <p className="text-white/80 leading-relaxed">
              We design, develop, and operate international schools by integrating academic excellence, institutional governance, and financial efficiency, delivering scalable education models that meet global accreditation standards and workforce demands.
            </p>
          </div>
        </div>
      </Section>

      {/* SERVICES */}
      <Section id="capability" title="Our Services" subtitle="SYSTEMS · STRUCTURE" dark>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            "Establishing and operating international schools",
            "Cambridge, Edexcel, Oxford, Cognia accreditation",
            "British, American & IB systems",
            "Licensing under Egyptian Education Authority",
            "Educational strategy & structure development",
            "Teacher training & curriculum preparation",
            "Workforce development & job placement",
          ].map((item, i) => (
            <div key={i} className="bg-white/5 p-6 rounded-2xl hover:bg-white/10 transition">
              {item}
            </div>
          ))}
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

      <Footer />

    </div>
  );
}
