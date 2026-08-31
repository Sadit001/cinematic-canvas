import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import profileImage from "../assets/profile.jpg";
import projectOne from "../assets/project-01.jpg";
import projectTwo from "../assets/project-02.jpg";
import projectThree from "../assets/project-03.jpg";
import showcaseImage from "../assets/showcase.jpg";

const services = [
  ["01", "Web Design", "Editorial layouts and art direction for ambitious brands."],
  ["02", "Creative Dev", "Motion-first frontends with cinematic scroll choreography."],
  ["03", "UI / UX", "Interfaces engineered for precision and effortless flow."],
  ["04", "Branding", "Identity systems and title-sequence typography."],
  ["05", "Digital Strategy", "Clear creative systems from first idea to launch."],
];

const skills = [
  { name: "Frontend", color: "bg-signal", items: ["HTML", "CSS", "JavaScript", "React", "Next.js"] },
  { name: "Design", color: "bg-sun", items: ["Art Direction", "Figma", "Typography", "Motion"] },
  { name: "Animation", color: "bg-electric", items: ["GSAP", "Framer", "WebGL", "Three.js"] },
];

const projects = [
  { number: "01", title: "Meridian", category: "Editorial", year: "2024", description: "A film-catalogue experience for an independent publisher.", tech: "Next.js · GSAP · WebGL", image: projectOne, wide: true },
  { number: "02", title: "Audio Form", category: "Product", year: "2024", description: "A launch site with scroll-linked audio and spatial reveals.", tech: "React · Motion · Three.js", image: projectTwo, wide: false },
  { number: "03", title: "Kessler Type", category: "Identity", year: "2023", description: "A variable-font specimen with kinetic, scroll-driven pages.", tech: "Astro · GSAP · CSS", image: projectThree, wide: true },
];

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
}

export function PortfolioHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const flipSectionRef = useRef<HTMLElement>(null);
  const flipCardRef = useRef<HTMLDivElement>(null);
  const videoLayerRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      if (reduceMotion) return;

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(element, { y: 48, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });

      gsap.to("[data-hero-title]", {
        yPercent: 16,
        ease: "none",
        scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: 0.6 },
      });
      gsap.to("[data-hero-portrait]", {
        yPercent: -12,
        rotate: 1,
        ease: "none",
        scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: 0.6 },
      });

      if (flipSectionRef.current && flipCardRef.current && videoLayerRef.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: flipSectionRef.current,
            start: "top top",
            end: "+=170%",
            scrub: 1,
            pin: "[data-flip-stage]",
            anticipatePin: 1,
          },
        })
          .to(flipCardRef.current, { rotateY: -78, scale: 0.78, xPercent: -52, ease: "power2.inOut" }, 0)
          .to(flipCardRef.current, { opacity: 0, duration: 0.24 }, 0.7)
          .fromTo(videoLayerRef.current, { scale: 0.82, opacity: 0.35 }, { scale: 1, opacity: 1, ease: "power2.out" }, 0.2)
          .to("[data-reel-label]", { y: -24, opacity: 1 }, 0.55);
      }
    }, rootRef);

    return () => {
      context.revert();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navigate = (id: string) => {
    setMenuOpen(false);
    window.setTimeout(() => scrollTo(id), 80);
  };

  return (
    <div ref={rootRef} className="min-h-screen overflow-x-clip bg-paper font-grotesk text-ink selection:bg-signal selection:text-paper">
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${scrolled || menuOpen ? "border-ink/15 bg-paper/95 shadow-nav backdrop-blur-md" : "border-transparent bg-transparent"}`}>
        <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-5 lg:px-10">
          <a href="#top" className="flex items-baseline gap-2" aria-label="Mara Voss, home">
            <span className="inline-block size-2.5 bg-signal" />
            <span className="font-display text-xl uppercase">Mara Voss</span>
            <span className="hidden font-mono text-[10px] text-ink-muted sm:inline">(creative developer)</span>
          </a>
          <nav className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.15em] md:flex" aria-label="Primary navigation">
            {["work", "services", "skills", "contact"].map((item) => <a key={item} href={`#${item}`} className="nav-link">{item}</a>)}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden bg-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-paper transition-colors hover:bg-signal sm:inline-block">Let&apos;s talk</a>
            <button className="grid size-10 place-items-center md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        <div className={`fixed inset-x-0 top-[68px] z-50 overflow-hidden bg-ink text-paper transition-[height,opacity] duration-500 md:hidden ${menuOpen ? "h-[calc(100svh-68px)] opacity-100" : "pointer-events-none h-0 opacity-0"}`}>
          <nav className="flex h-full flex-col justify-between px-6 py-10" aria-label="Mobile navigation">
            <div className="flex flex-col">
              {["work", "services", "skills", "contact"].map((item, index) => (
                <button key={item} className="flex items-center justify-between border-b border-paper/20 py-5 text-left font-display text-5xl uppercase" onClick={() => navigate(`#${item}`)}>
                  {item}<span className="font-mono text-xs text-paper/50">0{index + 1}</span>
                </button>
              ))}
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50">Berlin · Available worldwide</p>
          </nav>
        </div>
      </header>

      <main>
        <section id="top" data-hero className="relative mx-auto max-w-[1400px] px-5 pb-16 pt-28 md:min-h-[calc(100svh-68px)] lg:px-10 lg:pb-24 lg:pt-32">
          <div className="relative md:min-h-[calc(100svh-12rem)]">
            <div className="absolute right-8 top-2 hidden size-28 rounded-full bg-signal md:block motion-safe:animate-slow-spin" />
            <div className="absolute left-2 top-40 hidden size-16 bg-electric md:block animate-pop" />
            <div className="absolute bottom-6 right-[36%] hidden size-14 bg-sun md:block animate-pop-delayed" />
            <p className="animate-rise font-mono text-[11px] uppercase tracking-[0.25em] text-ink-muted">Creative Developer / Berlin — 2026</p>
            <h1 data-hero-title className="relative z-10 mt-5 max-w-[8ch] animate-rise-delayed font-display text-[clamp(4.5rem,15vw,13rem)] uppercase leading-[0.78] md:max-w-none">
              Mara <span className="text-ink/20">Voss</span>
            </h1>
            <figure data-hero-portrait className="relative z-20 ml-auto mt-8 w-[78%] max-w-[440px] animate-rise-late md:absolute md:right-10 md:top-[18%] md:mt-0 md:w-[39%] lg:right-16">
              <div className="-rotate-1 bg-signal p-1">
                <img src={profileImage} alt="Portrait placeholder for Mara Voss" width={1024} height={1280} fetchPriority="high" className="aspect-[4/5] w-full object-cover" />
              </div>
              <figcaption className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
                <span>Fig. 01 — Portrait</span><span>Available Q4</span>
              </figcaption>
            </figure>
            <div className="relative z-30 mt-10 max-w-[42ch] animate-rise-latest md:mt-16">
              <p className="text-lg leading-relaxed text-ink-muted">I build cinematic, motion-driven websites and interactive brand systems — precise, tactile, and never template-like.</p>
              <div className="mt-8 flex items-center gap-4">
                <a href="#work" className="inline-flex items-center gap-3 bg-ink px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-paper transition-colors hover:bg-signal">Selected work <ArrowDown size={14} /></a>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">Scroll</span>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="bg-ink text-paper">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 lg:grid-cols-12 lg:px-10 lg:py-28">
            <div className="lg:col-span-8" data-reveal>
              <p className="section-label text-paper/45">(a) — Introduction</p>
              <h2 className="mt-6 max-w-[24ch] text-3xl font-medium leading-snug sm:text-4xl">A decade turning ambitious brand ideas into precise, <span className="text-signal">motion-first</span> digital experiences.</h2>
            </div>
            <div className="grid grid-cols-3 gap-6 self-end lg:col-span-4" data-reveal>
              {[['10+', 'Years'], ['60', 'Projects'], ['12', 'Awards']].map(([value, label]) => <div key={label}><p className="font-display text-4xl">{value}</p><p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-paper/45">{label}</p></div>)}
            </div>
            <div className="lg:col-span-12" data-reveal><div className="h-px bg-paper/15" /><p className="mt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-paper/45">Based in Berlin — working worldwide · Currently booking select projects</p></div>
          </div>
        </section>

        <section ref={flipSectionRef} className="relative h-[270vh] bg-paper">
          <div data-flip-stage className="flex h-svh items-center">
            <div className="mx-auto w-full max-w-[1400px] px-5 lg:px-10">
              <div className="mb-7 flex items-end justify-between"><p className="section-label">(b) — In Motion</p><p className="hidden font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted sm:block">Scroll to flip · motion reveals</p></div>
              <div className="flip-stage relative h-[62vh] min-h-[390px] overflow-hidden bg-ink">
                <div ref={videoLayerRef} className="absolute inset-0 opacity-40">
                  <img src={showcaseImage} alt="Abstract motion graphics video placeholder" width={1920} height={1080} loading="lazy" className="h-full w-full object-cover motion-safe:animate-showcase-pulse" />
                  <div className="absolute inset-0 bg-ink/25" />
                </div>
                <div ref={flipCardRef} className="absolute inset-4 origin-center sm:inset-8" style={{ transformStyle: "preserve-3d" }}>
                  <img src={showcaseImage} alt="Motion reel cover placeholder" width={1920} height={1080} loading="lazy" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 grid place-items-center bg-ink/10"><span className="border border-paper/60 bg-ink/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper backdrop-blur-sm">Image / Video reveal</span></div>
                </div>
                <div data-reel-label className="absolute bottom-5 left-6 opacity-30"><p className="font-display text-4xl uppercase text-paper sm:text-6xl">Reel &apos;26</p><p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60">Replace with /assets/showcase-video.mp4</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-paper">
          <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
            <p className="section-label mb-8" data-reveal>(c) — Services</p>
            <div className="border-t border-ink/20">
              {services.map(([number, title, description]) => (
                <a href="#contact" key={number} data-reveal className="service-row group grid grid-cols-12 items-baseline gap-4 border-b border-ink/20 py-6 lg:py-8">
                  <span className="col-span-2 font-mono text-xs text-ink-muted lg:col-span-1">{number}</span>
                  <span className="col-span-9 font-display text-3xl uppercase transition-transform duration-300 group-hover:translate-x-3 lg:col-span-5 lg:text-5xl">{title}</span>
                  <span className="hidden max-w-[38ch] text-sm text-ink-muted lg:col-span-5 lg:block">{description}</span>
                  <ArrowUpRight className="col-span-1 justify-self-end text-ink-muted transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal" size={18} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="bg-ink text-paper">
          <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
            <p className="section-label mb-10 text-paper/45" data-reveal>(d) — Capabilities</p>
            <div className="grid gap-px bg-paper/15 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
              {skills.map((group) => <div key={group.name} className="group bg-ink p-7 transition-colors hover:bg-paper/[0.04] lg:p-9"><div className="mb-7 flex items-center gap-3"><span className={`size-3 ${group.color}`} /><h3 className="text-lg font-semibold">{group.name}</h3></div><div className="flex flex-wrap gap-2">{group.items.map((item) => <span key={item} className="border border-paper/20 px-3 py-1.5 font-mono text-xs transition-all hover:-translate-y-1 hover:border-paper hover:bg-paper hover:text-ink">{item}</span>)}</div></div>)}
            </div>
          </div>
        </section>

        <section id="work" className="bg-paper">
          <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
            <p className="section-label mb-12" data-reveal>(e) — Selected Work</p>
            {projects.map((project, index) => (
              <a href="#contact" key={project.title} data-reveal className="project group mb-20 block last:mb-0 lg:mb-28">
                <div className="grid items-end gap-6 lg:grid-cols-12">
                  <div className={`overflow-hidden bg-secondary ${project.wide ? "lg:order-2 lg:col-span-8" : "lg:col-span-5"}`}><img src={project.image} alt={`${project.title} project placeholder`} width={1600} height={1000} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-cine group-hover:scale-[1.035]" /></div>
                  <div className={project.wide ? "lg:order-1 lg:col-span-4" : "lg:col-span-7 lg:pb-8"}><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">{project.number} · {project.category} · {project.year}</p><h3 className="mt-2 font-display text-5xl uppercase transition-colors group-hover:text-signal lg:text-7xl">{project.title}</h3><p className="mt-4 max-w-[34ch] text-sm text-ink-muted">{project.description}</p><p className="mt-4 font-mono text-[10px] text-ink-muted">{project.tech}</p></div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="contact" className="bg-ink text-paper">
          <div className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
            <p className="section-label mb-8 text-paper/45" data-reveal>(f) — Contact</p>
            <a href="mailto:hello@maravoss.studio" data-reveal className="block max-w-[15ch] text-balance text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.92] transition-colors hover:text-signal">Let&apos;s create something great together.</a>
            <div className="mt-14 flex flex-col justify-between gap-8 sm:flex-row sm:items-center"><a href="mailto:hello@maravoss.studio" className="font-mono text-sm transition-colors hover:text-signal">hello@maravoss.studio</a><div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.15em] text-paper/60"><a href="#top" className="hover:text-signal">Instagram</a><a href="#top" className="hover:text-signal">X</a><a href="#top" className="hover:text-signal">LinkedIn</a></div></div>
            <footer className="mt-16 flex flex-col justify-between gap-4 border-t border-paper/15 pt-8 font-mono text-[10px] uppercase tracking-[0.15em] text-paper/45 sm:flex-row"><span>© 2026 Mara Voss</span><span>Berlin, DE — <span className="text-signal">●</span> Available</span><a href="#top" className="transition-colors hover:text-paper">Back to top ↑</a></footer>
          </div>
        </section>
      </main>
    </div>
  );
}