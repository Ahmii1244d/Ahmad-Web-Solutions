import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";
import { FaWordpress, FaReact, FaNodeJs, FaGithub, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { FaEnvelope } from "react-icons/fa";
/* ══════════════════════════════════════════
   REAL DATA — AHMAD WEB SOLUTIONS
══════════════════════════════════════════ */
const ICONS = {
  email: <FaEnvelope color="#EA4335"    />,
  whatsapp: <FaWhatsapp color="#25D366" />,
  linkedin: <FaLinkedin color="#0A66C2" />,
  github: <FaGithub color="#ffffff"     />,
};
const SKILLS = [
  {
    icon: <FaWordpress color="#21759B" />,
    label: "WordPress Development",
    desc: "Full custom WordPress sites — from landing pages to complex multi-page business platforms with blazing-fast performance.",
    tech: ["WordPress", "Elementor", "WPBakery", "ACF"],
  },
  {
    icon: <FaReact />,
    label: "Frontend Development",
    desc: "Pixel-perfect, animated, conversion-optimised UIs.",
    tech: ["React", "HTML5", "CSS3", "JavaScript", "Tailwind"],
  },
  {
    icon: <FaNodeJs color="#3C873A"/>,
    label: "MERN Stack",
    desc: "Scalable full-stack applications.",
    tech: ["MongoDB", "Express.js", "React", "Node.js"],
    
  },
];

const PROJECTS = [
  {
    title: "Real Tech Blog",
    tag: "Blogging Platform · BlogSpot",
    color: "#00f5d4",
    url: "https://techrealblogs.blogspot.com",
    desc: "A full-featured tech blogging platform covering web development, gadgets and software. Custom design, SEO optimised, with a consistent and growing readership.",
  },
  {
    title: "TechPP — Tech Publishing Platform",
    tag: "WordPress · Tech Media",
    color: "#7b2fff",
    url: "https://techpp.pro/",
    desc: "Professional tech publishing platform built on WordPress with a custom theme, fast CDN delivery and an editorial workflow built for a growing writing team.",
  }

];

const WORDS = ["Developer.", "Builder.", "Problem Solver.", "Your Partner."];

const EJS_SVC = "service_6rfzu98";
const EJS_TPL = "template_q3k6tef";
const EJS_KEY = "PuyBrOlcxSIkna1oW";

/* ══════════════════════════════════════════
   APP COMPONENT
══════════════════════════════════════════ */
export default function App() {
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [wi, setWi] = useState(0);
  const [word, setWord] = useState("");
  const [del, setDel] = useState(false);
  const [ci, setCi] = useState(0);
  const [navVis, setNavVis] = useState(false);
  const [sec, setSec] = useState("home");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState(false);
  const [openProj, setOpenProj] = useState(null);

  /* cursor */
  useEffect(() => {
    const fn = (e) => {
      cursorRef.current && (cursorRef.current.style.transform = `translate(${e.clientX-20}px,${e.clientY-20}px)`);
      cursorDotRef.current && (cursorDotRef.current.style.transform = `translate(${e.clientX-4}px,${e.clientY-4}px)`);
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  /* parallax */
  useEffect(() => {
    if (!heroRef.current) return;
    heroRef.current.querySelectorAll("[data-depth]").forEach((el) => {
      const d = parseFloat(el.dataset.depth);
      el.style.transform = `translate(${(mouse.x-.5)*d*55}px,${(mouse.y-.5)*d*55}px)`;
    });
  }, [mouse]);

  /* typewriter */
  useEffect(() => {
    const w = WORDS[wi];
    const t = setTimeout(() => {
      if (!del) {
        setWord(w.slice(0, ci+1));
        if (ci+1 === w.length) setTimeout(() => setDel(true), 1900);
        else setCi(c=>c+1);
      } else {
        setWord(w.slice(0, ci-1));
        if (ci-1 === 0) { setDel(false); setWi(v=>(v+1)%WORDS.length); setCi(0); }
        else setCi(c=>c-1);
      }
    }, del ? 55 : 105);
    return () => clearTimeout(t);
  }, [ci, del, wi]);

  /* particles */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    class P {
      constructor() { this.r(); }
      r() {
        this.x = Math.random()*canvas.width; this.y = Math.random()*canvas.height;
        this.s = Math.random()*1.3+.3; this.vx = (Math.random()-.5)*.35; this.vy = (Math.random()-.5)*.35;
        this.o = Math.random()*.4+.1; this.c = Math.random()>.55?"#00f5d4":"#7b2fff";
      }
      u() { this.x+=this.vx; this.y+=this.vy; if(this.x<0||this.x>canvas.width||this.y<0||this.y>canvas.height) this.r(); }
      d() { ctx.save(); ctx.globalAlpha=this.o; ctx.fillStyle=this.c; ctx.beginPath(); ctx.arc(this.x,this.y,this.s,0,Math.PI*2); ctx.fill(); ctx.restore(); }
    }
    particlesRef.current = Array.from({length:130},()=>new P());
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particlesRef.current.forEach(p=>{p.u();p.d();});
      for(let i=0;i<particlesRef.current.length;i++) {
        for(let j=i+1;j<particlesRef.current.length;j++) {
          const a=particlesRef.current[i],b=particlesRef.current[j];
          const dist=Math.hypot(a.x-b.x,a.y-b.y);
          if(dist<90){ctx.save();ctx.globalAlpha=(1-dist/90)*.1;ctx.strokeStyle="#00f5d4";ctx.lineWidth=.4;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();ctx.restore();}
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize",resize); };
  }, []);

  /* scroll */
  useEffect(() => {
    const fn = () => {
      setNavVis(window.scrollY>60);
      for(const id of ["home","skills","projects","contact"]) {
        const el=document.getElementById(id);
        if(el){ const r=el.getBoundingClientRect(); if(r.top<=120&&r.bottom>120){setSec(id);break;} }
      }
    };
    window.addEventListener("scroll",fn);
    return ()=>window.removeEventListener("scroll",fn);
  }, []);

  /* reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries=>entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add("revealed"); }),
      {threshold:.12}
    );
    document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));
    return ()=>obs.disconnect();
  }, []);

  const go = id => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  /* submit */
  const submit = (e) => {
    e.preventDefault();
    setSending(true); setSent(false); setErr(false);
    emailjs.sendForm(EJS_SVC, EJS_TPL, formRef.current, EJS_KEY)
      .then(()=>{ setSending(false); setSent(true); formRef.current.reset(); })
      .catch((error) => {
  console.log("EmailJS Error:", error);
  setSending(false);
  setErr(true);
});
  };

  return (
    <div className="app">
      <div className="cursor-ring" ref={cursorRef}/>
      <div className="cursor-dot" ref={cursorDotRef}/>
      <canvas ref={canvasRef} className="particle-canvas"/>

      {/* ── NAV ── */}
      <nav className={`nav ${navVis?"nav--on":""}`}>
        <div className="nav__logo" onClick={()=>go("home")}>
          <span className="cx">&lt;</span>Ahmad Web Solutions<span className="cx">/&gt;</span>
        </div>
        <ul className="nav__links">
          {["home","skills","projects","contact"].map(s=>(
            <li key={s}>
              <button className={`nl ${sec===s?"nl--a":""}`} onClick={()=>go(s)}>
                {s[0].toUpperCase()+s.slice(1)}
              </button>
            </li>
          ))}
        </ul>
        <a href="https://wa.me/923216854193" target="_blank" rel="noreferrer" className="btn btn--glow">
          💬 Hire Me
        </a>
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="hero" ref={heroRef}>
        <div className="hblob hb1" data-depth="0.8"/>
        <div className="hblob hb2" data-depth="0.5"/>
        <div className="hblob hb3" data-depth="1.1"/>
        <div className="hgrid" data-depth="0.3"/>

        <div className="hero__left">
          <div className="hero__badge reveal">
            <span className="pdot"/>&nbsp; Available for New Projects
          </div>
          <h1 className="hero__h1 reveal">
            <span className="h1-hi">Hi, I'm</span>
            <span className="h1-name">Ahmad</span>
            <span className="h1-dyn">
              A&nbsp;<span className="typed">{word}<span className="bcursor">|</span></span>
            </span>
          </h1>
          <p className="hero__p reveal">
            Full-stack web developer specialising in WordPress, custom plugins and MERN stack applications.
            I build fast, scalable digital products that help businesses grow online.
          </p>
          <div className="hero__btns reveal">
            <button className="btn btn--primary" onClick={()=>go("projects")}>
              View My Work
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M2 7.5h11M8.5 3l4.5 4.5L8.5 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a href="https://wa.me/923216854193" target="_blank" rel="noreferrer" className="btn btn--outline">
              💬 WhatsApp Me
            </a>
          </div>
          <div className="hero__stats reveal">
            {[["4+","Years Experience"],["20+","Projects Delivered"],["100%","Client Satisfaction"]].map(([n,l])=>(
              <div className="hstat" key={l}>
                <span className="hstat__n">{n}</span>
                <span className="hstat__l">{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__right">
          <div className="orb-wrap" data-depth="0.6">
            <div className="orb">
              <div className="orb__r r1"/>
              <div className="orb__r r2"/>
              <div className="orb__r r3"/>
              <div className="orb__core">
                <img src="src/pic1.png" alt="Ahmad" className="orb__img"/>
              </div>
            </div>
            <div className="ob ob1">WordPress</div>
            <div className="ob ob2">React</div>
            <div className="ob ob3">Node.js</div>
          </div>
        </div>

        <div className="hscroll">
          <span>Scroll</span>
          <div className="hscroll__line"/>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="sec skills-sec">
        <div className="sec__hd reveal">
          <span className="stag">What I Do</span>
          <h2 className="sec__title">Skills &amp; Services</h2>
          <p className="sec__desc">End-to-end web development that delivers real business results — from design to deployment.</p>
        </div>
        <div className="skills-grid">
          {SKILLS.map((sk,i)=>(
            <div className="skcard reveal" key={sk.label} style={{"--d":`${i*.1}s`}}>
              <div className="skcard__top">
                <span className="skcard__ico">{sk.icon}</span>
                <h3 className="skcard__title">{sk.label}</h3>
              </div>
              <p className="skcard__desc">{sk.desc}</p>
              <div className="skcard__tech">
                {sk.tech.map(t=><span className="tpill" key={t}>{t}</span>)}
              </div>
              <div className="card__shine"/>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="sec projects-sec">
        <div className="sec__hd reveal">
          <span className="stag">Portfolio</span>
          <h2 className="sec__title">Selected Work</h2>
          <p className="sec__desc">Real projects, real results. Every build delivered on time and beyond expectation.</p>
        </div>
        <div className="proj-grid">
          {PROJECTS.map((p,i)=>(
          <div
  className={`pcard ${openProj===i?"pcard--open":""}`}
  key={p.title}
  style={{"--d":`${i*.08}s`,"--ac":p.color}}
>
  <div className="pcard__bar"/>

  <div
    className="pcard__head"
    onClick={()=>setOpenProj(openProj===i?null:i)}
  >
                <div>
                  <span className="pcard__tag">{p.tag}</span>
                  <h3 className="pcard__title">{p.title}</h3>
                </div>
                <div className="pcard__num">0{i+1}</div>
              </div>
              <div className="pcard__body">
                <p className="pcard__desc">{p.desc}</p>
                <a
                  className="btn btn--sm"
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={e=>e.stopPropagation()}
                >
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="sec contact-sec">
        <div className="cglow"/>
        <div className="contact-wrap">
          <div className="sec__hd reveal">
            <span className="stag">Let's Work Together</span>
            <h2 className="sec__title">Start Your Project</h2>
            <p className="sec__desc">Tell me about your project and I'll get back within 24 hours.</p>
          </div>
          <div className="contact-layout">
            <form ref={formRef} className="cform reveal" onSubmit={submit}>
              <div className="cform__row">
                <div className="cform__f">
                  <label>Your Name *</label>
<input name="name" type="text" placeholder="e.g. John Smith" required />                </div>
                <div className="cform__f">
                  <label>Your Email *</label>
<input name="email" type="email" placeholder="john@company.com" required />                </div>
              </div>
              <div className="cform__f">
                <label>Project Type</label>
                <select name="project_type">
                  <option value="">— Select a service —</option>
                  <option>WordPress Website</option>
                  <option>Custom WordPress Plugin</option>
                  <option>Frontend Development</option>
                  <option>MERN Stack Application</option>
                  <option>Full-Stack Project</option>
                  <option>Other / Not Sure</option>
                </select>
              </div>
              <div className="cform__f">
                <label>Budget Range</label>
                <select name="budget">
                  <option value="">— Select budget —</option>
                  <option>$50 – $200</option>
                  <option>$300 – $800</option>
                  <option>$800 – $2,000</option>
                  <option>$2,000 – $5,000</option>
                  <option>$5,000+</option>
                  <option>Custom</option>
                </select>
              </div>
              <div className="cform__f">
                <label>Project Details *</label>
                <textarea name="message" rows={5} placeholder="Describe what you need, your goals, timeline..." required/>
              </div>
              <button className="btn btn--primary btn--full" type="submit" disabled={sending}>
                {sending
                  ? <><span className="spin"/>Sending...</>
                  : <>Send Message <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 7.5h11M8.5 3l4.5 4.5L8.5 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></>
                }
              </button>
              {sent && <div className="fmsg fmsg--ok">✅ Message sent! I'll reply within 24 hours.</div>}
              {err  && <div className="fmsg fmsg--err">❌ Something went wrong. Please reach me on WhatsApp.</div>}
            </form>

            <div className="cinfo reveal">
              <div className="cinfo__card">
                <h3>Prefer a quick chat?</h3>
                <p>Reach me directly on any platform below.</p>
                <div className="clinks">
                  {[
  ["email", "Email", "muhammadahmad290318@gmail.com", "mailto:muhammadahmad290318@gmail.com"],
  ["whatsapp", "WhatsApp", "+92 321 685 4193", "https://wa.me/923216854193"],
  ["linkedin", "LinkedIn", "ahmad-mughal290318", "https://www.linkedin.com/in/ahmad-mughal290318"],
  ["github", "GitHub", "Ahmii1244d", "https://github.com/Ahmii1244d"],
].map(([key, lbl, val, href]) => (
  <a href={href} target="_blank" rel="noreferrer" className="clink" key={lbl}>
    
    <span className="clink__ico">
      {{
        email: <FaEnvelope color="#EA4335"     />,
        whatsapp: <FaWhatsapp color="#25D366"  />,
        linkedin: <FaLinkedin color="#0A66C2"  />,
        github: <FaGithub color="#ffffff"/>,
      }[key]}
    </span>

    <div>
      <span className="clink__lbl">{lbl}</span>
      <span className="clink__val">{val}</span>
    </div>

  </a>
))}
                </div>
              </div>
              <div className="avail-badge">
                <span className="pdot"/>&nbsp; Currently available — new projects welcome
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="cx">&lt;</span>Ahmad<span className="cx">/&gt;</span>
            </div>
            <p className="footer__tag">
              Ahmad Web Solutions — Building the web, one project at a time.
            </p>
            <div className="footer__socs">
  <a href="mailto:muhammadahmad290318@gmail.com" target="_blank" rel="noreferrer" className="fsoc">
    <FaEnvelope color="#EA4335" />
  </a>

  <a href="https://wa.me/923216854193" target="_blank" rel="noreferrer" className="fsoc">
    <FaWhatsapp color="#25D366" />
  </a>

  <a href="https://www.linkedin.com/in/ahmad-mughal290318" target="_blank" rel="noreferrer" className="fsoc">
    <FaLinkedin color="#0A66C2" />
  </a>

  <a href="https://github.com/Ahmii1244d" target="_blank" rel="noreferrer" className="fsoc">
    <FaGithub color="#ffffff" />
  </a>
</div>
          </div>

          <div className="footer__col">
            <h4>Services</h4>
            <ul>
              {["WordPress Development","Custom WP Plugins","Frontend Development","MERN Stack Apps","API Integration"].map(s=><li key={s}>{s}</li>)}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Navigation</h4>
            <ul>
              {["home","skills","projects","contact"].map(s=>(
                <li key={s}><button onClick={()=>go(s)}>{s[0].toUpperCase()+s.slice(1)}</button></li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Contact</h4>
            <ul>
              <li>muhammadahmad290318@gmail.com</li>
              <li>+92 321 685 4193</li>
              <li>Available Mon – Sat</li>
              <li>Response within 24 hrs</li>
              <li>Pakistan 🇵🇰</li>
            </ul>
          </div>
        </div>
        <div className="footer__btm">
          <span>© 2026 <strong>Ahmad Web Solutions</strong>. All rights reserved.</span>
          <span>Crafted with ❤️ by Ahmad · Pakistan</span>
        </div>
      </footer>
    </div>
  );
}