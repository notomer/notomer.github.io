import React, { useEffect, useState } from "react";
import "./App.css";

const areas = [
  {
    title: "AI Systems",
    copy:
      "Designing systems that can reason over messy context, preserve intent, and turn model output into decisions people can trust.",
  },
  {
    title: "Developer Tooling",
    copy:
      "Building tools for the moments where engineers need less surface area, clearer feedback, and faster paths from failure to action.",
  },
  {
    title: "Product Design in Software",
    copy:
      "Treating interface, workflow, and system behavior as one product problem instead of separate layers of polish.",
  },
  {
    title: "Automation and Workflow Systems",
    copy:
      "Creating automation that removes repetitive work without hiding the reasoning, control, or context that teams still need.",
  },
  {
    title: "Systems-Focused Engineering",
    copy:
      "Working close to the boundaries between infrastructure, product requirements, and the human expectations around reliability.",
  },
];

const principles = [
  "Clarity over noise.",
  "Taste matters.",
  "Useful tools earn trust.",
  "Good software should feel inevitable.",
  "Systems should serve people, not overwhelm them.",
];

const experience = [
  {
    label: "Apple CI",
    image: "/images/apple.png",
    title: "Apple software engineering internship",
    copy:
      "Engineering work shaped by CI, platform quality, and an environment where implementation detail and product reliability are held to the same standard.",
  },
  {
    label: "Genius Bar",
    image: "/images/gb.png",
    title: "Apple Genius Bar and retail perspective",
    copy:
      "A close view of how people explain technical problems, build trust, compare products, and decide whether technology feels useful.",
  },
  {
    label: "Georgia Tech",
    image: "/images/gt.png",
    title: "Graduate technical study",
    copy:
      "Graduate-level work centered on computing, AI, and the deeper technical questions behind ambitious products.",
  },
  {
    label: "George Mason",
    image: "/images/gmu.png",
    title: "Computing foundation",
    copy:
      "An undergraduate path that built the engineering base for systems thinking, product judgment, and technical depth.",
  },
];

const adjacentWork = [
  "AI systems",
  "Developer tools",
  "Workflow automation",
  "Infrastructure-aware products",
];

const garageItems = [
  {
    title: "Model Y Long Range",
    status: "Current",
    statusDetail: "Owned",
    image: "/images/model-y.avif",
    imageClass: "flip-x model-y",
    description:
      "My daily driver. Quiet, minimal, and fast in the way good design usually is. Practical enough for real life, refined enough to still feel special.",
    tags: ["Daily Driver", "Long Range", "Electric", "Minimal Utility"],
    note: "Electric daily utility, stripped down to what matters.",
  },
  {
    title: "Canyon Endurace CF 7 AXS",
    status: "Owned",
    statusDetail: "Road Bike",
    image: "/images/canyon-endurace.png",
    imageClass: "canyon",
    description:
      "A machine built around efficiency and feel. Fast without being harsh, clean without trying too hard, and engineered in a way that makes every detail feel intentional.",
    tags: ["Road Bike", "Carbon Frame", "AXS", "Endurance Geometry"],
    note: "Precision, speed, and clean mechanical intent.",
  },
  {
    title: "911 GT2 RS",
    status: "Dream",
    statusDetail: "Aspirational",
    image: "/images/porsche-911-gt2-rs.avif",
    imageClass: "porsche",
    description:
      "The dream. Extreme, disciplined, and unapologetically engineered. Less of a car, more of a statement about what happens when performance is pushed to its edge.",
    tags: ["Dream Machine", "Rear Engine", "Track Focused", "Icon"],
    note: "The dream machine. Sharp, excessive, inevitable.",
  },
];

const BeachBall = ({ className = "" }) => (
  <div className={`beach-ball ${className}`} aria-hidden="true">
    <div className="wheel">
      <ul className="colors">
        {Array.from({ length: 12 }).map((_, index) => (
          <li className="color" key={index} />
        ))}
      </ul>
    </div>
  </div>
);

function App() {
  const [isGarageOpen, setIsGarageOpen] = useState(false);
  const [activeGarageIndex, setActiveGarageIndex] = useState(0);

  useEffect(() => {
    document.title = "Omer Khan | Software, AI, and Product Systems";

    const revealItems = document.querySelectorAll("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isGarageOpen) {
      document.body.classList.remove("garage-open");
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsGarageOpen(false);
      }
      if (event.key === "ArrowRight") {
        setActiveGarageIndex((current) => (current + 1) % garageItems.length);
      }
      if (event.key === "ArrowLeft") {
        setActiveGarageIndex(
          (current) => (current - 1 + garageItems.length) % garageItems.length
        );
      }
    };

    document.body.classList.add("garage-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("garage-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGarageOpen]);

  const openGarage = (index = 0) => {
    setActiveGarageIndex(index);
    setIsGarageOpen(true);
  };

  const closeGarage = () => setIsGarageOpen(false);

  const activeGarageItem = garageItems[activeGarageIndex];

  return (
    <div className="identity-site">
      <header className="topbar" aria-label="Site navigation">
        <a className="brand-chip" href="#top" aria-label="Omer Khan home">
          <img src="/images/login.png" alt="" />
          <span>Omer Khan</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#building">ProxKey</a>
          <a href="#garage">Garage</a>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero section-shell" id="top">
          <div className="hero-copy" data-reveal>
            <div className="hero-eyebrow-row">
              <p className="eyebrow">Omer Khan</p>
            </div>
            <h1>
              Building software, systems, and products{" "}
              <span>with taste.</span>
            </h1>
            <p className="hero-text">
              I am focused on software engineering, AI systems, developer
              tooling, and products that turn complexity into clarity.
            </p>
            <div className="hero-actions" aria-label="Primary links">
              <a href="#building" className="aqua-button primary">
                <span>View ProxKey</span>
              </a>
              <a href="#contact" className="aqua-button">
                <span>Contact</span>
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-label="Animated product stage">
            <div className="reflection-plane" />
            <div className="product-window" data-reveal>
              <div className="window-bar">
                <span />
                <span />
                <span />
                <strong>ProxKey signal view</strong>
              </div>
              <div className="signal-stage">
                <div className="portrait-ring">
                  <img src="/images/login.png" alt="Omer Khan" />
                </div>
                <BeachBall className="hero-beachball" />
                <div className="signal-card glass-card">
                  <p>Incident context</p>
                  <strong>13 noisy inputs</strong>
                  <span>logs, CI output, support notes</span>
                </div>
                <div className="signal-card glass-card offset">
                  <p>Recovered signal</p>
                  <strong>3 next actions</strong>
                  <span>owner, cause, confidence</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about band section-shell" id="about">
          <div className="section-kicker" data-reveal>
            About
          </div>
          <div className="editorial-grid" data-reveal>
            <h2>
              Software should make difficult work feel clearer, quieter, and
              more deliberate.
            </h2>
            <div className="editorial-copy">
              <p>
                My work sits at the intersection of engineering, product
                thinking, and systems design. I am drawn to software that
                reduces noise, sharpens decisions, and feels intentional in how
                it works.
              </p>
              <p>
                An Apple background shaped how I think about polish,
                communication, CI discipline, and the distance between a
                technical system and the person relying on it. That perspective
                now informs the AI tools, product systems, and automation I am
                building.
              </p>
            </div>
          </div>
        </section>

        <section className="building section-shell" id="building">
          <div className="section-heading centered" data-reveal>
            <p className="section-kicker">What I am Building</p>
            <h2>ProxKey</h2>
            <p>
              An AI-powered engineering intelligence platform built to turn
              logs, incidents, CI failures, support context, and operational
              noise into actionable signal.
            </p>
          </div>

          <div className="proxkey-panel" data-reveal>
            <div className="proxkey-copy">
              <span className="mini-label">Engineering intelligence</span>
              <h3>More than a summarizer. A system for extracting signal from chaos.</h3>
              <p>
                ProxKey is being designed for modern engineering teams that
                spend too much time stitching together fragments: failed builds,
                logs, alerts, support reports, and incident notes. The goal is
                to convert that scattered context into useful action without
                flattening the details that matter.
              </p>
            </div>
            <div className="proxkey-console" aria-label="ProxKey interface preview">
              <div className="console-row top">
                <span>noise</span>
                <strong>build failed</strong>
                <em>42 traces</em>
              </div>
              <div className="console-row">
                <span>context</span>
                <strong>support spike tied to auth callback</strong>
                <em>high confidence</em>
              </div>
              <div className="console-row action">
                <span>action</span>
                <strong>route owner, likely cause, next check</strong>
                <em>ready</em>
              </div>
            </div>
          </div>

          <div className="adjacent-grid" data-reveal>
            {adjacentWork.map((item) => (
              <article className="small-panel" key={item}>
                <span>{item}</span>
              </article>
            ))}
          </div>
        </section>

        <section
          className="garage section-shell"
          id="garage"
          data-reveal
          onClick={() => openGarage(0)}
        >
          <div className="garage-intro">
            <p className="section-kicker">Garage</p>
            <h2>Machines I use, ride, and admire.</h2>
            <p>
              A small collection of engineering, design, and obsession. Part
              utility, part motion, part private product wall.
            </p>
          </div>
          <div className="garage-preview-grid">
            {garageItems.map((item, index) => (
              <button
                className="garage-card"
                key={item.title}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  openGarage(index);
                }}
              >
                <span className="garage-card-status">{item.status}</span>
                <span className="garage-card-image-wrap">
                  <img
                    className={item.imageClass}
                    src={item.image}
                    alt={item.title}
                  />
                </span>
                <strong>{item.title}</strong>
                <span>{item.note}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="areas band section-shell" id="work">
          <div className="section-heading" data-reveal>
            <p className="section-kicker">Areas of Work</p>
            <h2>Systems, tools, and products built for clearer technical work.</h2>
          </div>
          <div className="area-list">
            {areas.map((area) => (
              <article className="area-item" key={area.title} data-reveal>
                <h3>{area.title}</h3>
                <p>{area.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="experience section-shell" id="experience">
          <div className="section-heading" data-reveal>
            <p className="section-kicker">Experience</p>
            <h2>Environments that shaped how I think and build.</h2>
          </div>
          <div className="experience-stack">
            {experience.map((item) => (
              <article className="experience-row" key={item.title} data-reveal>
                <div className="experience-meta">
                  <span className="institution-mark">
                    <img
                      className={`institution-logo ${item.label
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      src={item.image}
                      alt=""
                    />
                  </span>
                  <span>{item.label}</span>
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="principles band section-shell" id="principles">
          <div className="section-heading centered" data-reveal>
            <p className="section-kicker">Principles</p>
            <h2>Quiet rules for serious work.</h2>
          </div>
          <div className="principle-grid" data-reveal>
            {principles.map((principle) => (
              <p key={principle}>{principle}</p>
            ))}
          </div>
        </section>

        <section className="contact section-shell" id="contact">
          <div className="contact-panel" data-reveal>
            <div>
              <p className="section-kicker">Contact</p>
              <h2>For meaningful software, thoughtful products, and ambitious technical work.</h2>
            </div>
            <div className="contact-links">
              <a href="https://github.com/notomer" target="_blank" rel="noreferrer">
                <img src="/images/dev.png" alt="" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/notomer/"
                target="_blank"
                rel="noreferrer"
              >
                <img className="tilt-left" src="/images/SetUpAssistant.png" alt="" />
                <span>LinkedIn</span>
              </a>
              <a href="mailto:notomerkhan@gmail.com">
                <img src="/images/mail.png" alt="" />
                <span>Email</span>
              </a>
              <a href="/resume.pdf" target="_blank" rel="noreferrer">
                <img src="/images/pages.webp" alt="" />
                <span>Resume</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {isGarageOpen && (
        <div
          className="garage-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="garage-modal-title"
          onClick={closeGarage}
        >
          <div className="garage-modal" onClick={(event) => event.stopPropagation()}>
            <button
              className="garage-close"
              type="button"
              aria-label="Close garage"
              onClick={closeGarage}
            >
              ×
            </button>
            <div className="garage-modal-stage">
              <div className="garage-product-visual">
                <img
                  className={activeGarageItem.imageClass}
                  src={activeGarageItem.image}
                  alt={activeGarageItem.title}
                />
              </div>
              <div className="garage-product-copy">
                <p className="section-kicker">{activeGarageItem.statusDetail}</p>
                <h2 id="garage-modal-title">{activeGarageItem.title}</h2>
                <p>{activeGarageItem.description}</p>
                <div className="garage-tags" aria-label="Highlights">
                  {activeGarageItem.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <p className="garage-owned-line">
                  Owned: Model Y Long Range, Canyon Endurace CF 7 AXS. Dreaming
                  of: 911 GT2 RS.
                </p>
              </div>
            </div>
            <div className="garage-modal-controls">
              <button
                className="garage-arrow"
                type="button"
                aria-label="Previous garage item"
                onClick={() =>
                  setActiveGarageIndex(
                    (current) =>
                      (current - 1 + garageItems.length) % garageItems.length
                  )
                }
              >
                ‹
              </button>
              <div className="garage-tabs" role="tablist" aria-label="Garage items">
                {garageItems.map((item, index) => (
                  <button
                    className={index === activeGarageIndex ? "active" : ""}
                    key={item.title}
                    type="button"
                    role="tab"
                    aria-selected={index === activeGarageIndex}
                    onClick={() => setActiveGarageIndex(index)}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
              <button
                className="garage-arrow"
                type="button"
                aria-label="Next garage item"
                onClick={() =>
                  setActiveGarageIndex(
                    (current) => (current + 1) % garageItems.length
                  )
                }
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
