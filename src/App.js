import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const areas = [
  {
    title: "AI Systems",
    copy:
      "Reasoning over messy context and turning model output into decisions people can trust.",
  },
  {
    title: "Developer Tooling",
    copy:
      "Tools that make failure clearer, feedback faster, and engineering work easier to move.",
  },
  {
    title: "Product Design in Software",
    copy:
      "Interface, workflow, and system behavior treated as one product surface.",
  },
  {
    title: "Automation and Workflow Systems",
    copy:
      "Automation that removes repeat work while preserving context and control.",
  },
  {
    title: "Systems-Focused Engineering",
    copy:
      "Engineering close to infrastructure, product requirements, and reliability expectations.",
  },
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
    shortTitle: "Model Y",
    status: "Owned",
    statusDetail: "Owned",
    image: "/images/model-y.avif",
    imageClass: "flip-x model-y",
    description:
      "My daily driver. Quiet, minimal, and practical, but still sharp in the way good engineering always is.",
    tags: ["Electric", "Long Range", "Daily Driver", "Minimal Utility"],
    note: "Electric daily utility, stripped down to what matters.",
  },
  {
    title: "Canyon Endurace CF 7 AXS",
    shortTitle: "Endurace",
    status: "Owned",
    statusDetail: "Owned",
    image: "/images/canyon-endurace.png",
    imageClass: "canyon",
    description:
      "A road bike built around precision and feel. Fast, clean, and intentional, without ever feeling overdone.",
    tags: ["Carbon Frame", "AXS", "Road Bike", "Endurance"],
    note: "Precision, speed, and clean mechanical intent.",
  },
  {
    title: "911 GT2 RS",
    shortTitle: "GT2 RS",
    status: "Dream",
    statusDetail: "Dream",
    image: "/images/porsche-911-gt2-rs.avif",
    imageClass: "porsche",
    description:
      "The dream machine. Extreme, disciplined, and beautifully excessive, with performance pushed all the way to the edge.",
    tags: ["Dream Car", "Track Focused", "Rear Engine", "Icon"],
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

const faviconColors = [
  "#9ED110",
  "#50B517",
  "#179067",
  "#476EAF",
  "#9f49ac",
  "#CC42A2",
  "#FF3BA7",
  "#FF5800",
  "#FF8100",
  "#FEAC00",
  "#FFCC00",
  "#EDE604",
];

const faviconSectorPaths = [
  "M32 32 L32.00 4.00 A28 28 0 0 1 46.00 7.75 Z",
  "M32 32 L46.00 7.75 A28 28 0 0 1 56.25 18.00 Z",
  "M32 32 L56.25 18.00 A28 28 0 0 1 60.00 32.00 Z",
  "M32 32 L60.00 32.00 A28 28 0 0 1 56.25 46.00 Z",
  "M32 32 L56.25 46.00 A28 28 0 0 1 46.00 56.25 Z",
  "M32 32 L46.00 56.25 A28 28 0 0 1 32.00 60.00 Z",
  "M32 32 L32.00 60.00 A28 28 0 0 1 18.00 56.25 Z",
  "M32 32 L18.00 56.25 A28 28 0 0 1 7.75 46.00 Z",
  "M32 32 L7.75 46.00 A28 28 0 0 1 4.00 32.00 Z",
  "M32 32 L4.00 32.00 A28 28 0 0 1 7.75 18.00 Z",
  "M32 32 L7.75 18.00 A28 28 0 0 1 18.00 7.75 Z",
  "M32 32 L18.00 7.75 A28 28 0 0 1 32.00 4.00 Z",
];

const createBeachballFavicon = (angle = 0) => {
  const slices = faviconSectorPaths
    .map(
      (path, index) =>
        `<path d="${path}" fill="${faviconColors[index]}" />`
    )
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <filter id="soft" x="-12%" y="-12%" width="124%" height="124%">
      <feGaussianBlur stdDeviation="0.45" />
    </filter>
    <radialGradient id="shade" cx="34%" cy="26%" r="72%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.7" />
      <stop offset="40%" stop-color="#ffffff" stop-opacity="0.06" />
      <stop offset="100%" stop-color="#111318" stop-opacity="0.34" />
    </radialGradient>
  </defs>
  <circle cx="32" cy="32" r="30" fill="#f4f6f8" />
  <g transform="rotate(${angle} 32 32)" filter="url(#soft)">${slices}</g>
  <circle cx="32" cy="32" r="30" fill="url(#shade)" />
  <ellipse cx="25" cy="18" rx="14" ry="8" fill="#ffffff" opacity="0.26" />
  <circle cx="32" cy="32" r="30" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.72" />
  <circle cx="32" cy="32" r="5.2" fill="#f8fafc" opacity="0.88" />
</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const useAnimatedBeachballFavicon = () => {
  useEffect(() => {
    const favicon = document.querySelector('link[rel~="icon"]');

    if (!favicon) {
      return undefined;
    }

    const originalHref = favicon.getAttribute("href");
    const originalType = favicon.getAttribute("type");
    const supportsMotionPreference = typeof window.matchMedia === "function";
    const reducedMotion = supportsMotionPreference
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;
    let angle = 0;

    const updateFavicon = () => {
      favicon.setAttribute("href", createBeachballFavicon(angle));
      favicon.setAttribute("type", "image/svg+xml");
      angle = (angle + 24) % 360;
    };

    updateFavicon();

    if (!supportsMotionPreference || reducedMotion.matches) {
      return () => {
        if (originalHref) {
          favicon.setAttribute("href", originalHref);
        }
        if (originalType) {
          favicon.setAttribute("type", originalType);
        }
      };
    }

    const timer = window.setInterval(updateFavicon, 90);

    return () => {
      window.clearInterval(timer);
      if (originalHref) {
        favicon.setAttribute("href", originalHref);
      }
      if (originalType) {
        favicon.setAttribute("type", originalType);
      }
    };
  }, []);
};

function App() {
  const [isGarageOpen, setIsGarageOpen] = useState(false);
  const [activeGarageIndex, setActiveGarageIndex] = useState(0);
  const garageTouchStart = useRef(null);

  useAnimatedBeachballFavicon();

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

  const showPreviousGarageItem = () => {
    setActiveGarageIndex(
      (current) => (current - 1 + garageItems.length) % garageItems.length
    );
  };

  const showNextGarageItem = () => {
    setActiveGarageIndex((current) => (current + 1) % garageItems.length);
  };

  const handleGarageTouchStart = (event) => {
    garageTouchStart.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  };

  const handleGarageTouchEnd = (event) => {
    if (garageTouchStart.current === null) {
      return;
    }

    const deltaX = event.changedTouches[0].clientX - garageTouchStart.current.x;
    const deltaY = event.changedTouches[0].clientY - garageTouchStart.current.y;
    garageTouchStart.current = null;

    if (deltaY > 92 && Math.abs(deltaY) > Math.abs(deltaX) * 1.25) {
      closeGarage();
      return;
    }

    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) {
      showNextGarageItem();
      return;
    }

    showPreviousGarageItem();
  };

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
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#garage">Garage</a>
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
              <span className="taste-line">
                with{" "}
                <span className="taste-word" aria-label="taste">
                  <span aria-hidden="true">taste</span>
                </span>
                .
              </span>
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
              <div className="console-pill-row" aria-label="Work themes">
                {adjacentWork.map((item) => (
                  <span className="console-pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="areas band section-shell" id="work">
          <div className="section-heading" data-reveal>
            <p className="section-kicker">Areas of Work</p>
            <h2>Clearer systems and tools.</h2>
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
              A personal collection of design, engineering, and obsession.
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
          <button
            className="garage-open-cta"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              openGarage(0);
            }}
          >
            <span>Open Garage</span>
          </button>
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
          onTouchStart={handleGarageTouchStart}
          onTouchEnd={handleGarageTouchEnd}
        >
          <div className="garage-modal" onClick={(event) => event.stopPropagation()}>
            <div className="garage-mobile-topbar">
              <span>Garage</span>
              <button
                className="garage-close"
                type="button"
                aria-label="Close garage"
                onClick={closeGarage}
              >
                ×
              </button>
            </div>
            <div className="garage-mobile-segmented" role="tablist" aria-label="Garage items">
              {garageItems.map((item, index) => (
                <button
                  className={index === activeGarageIndex ? "active" : ""}
                  key={item.title}
                  type="button"
                  role="tab"
                  aria-selected={index === activeGarageIndex}
                  onClick={() => setActiveGarageIndex(index)}
                >
                  {item.shortTitle}
                </button>
              ))}
            </div>
            <div className="garage-modal-stage">
              <div className="garage-product-visual">
                <img
                  className={activeGarageItem.imageClass}
                  src={activeGarageItem.image}
                  alt={activeGarageItem.title}
                />
              </div>
              <div className="garage-product-copy">
                <p className="garage-status-pill">{activeGarageItem.status}</p>
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
                onClick={showPreviousGarageItem}
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
                onClick={showNextGarageItem}
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
