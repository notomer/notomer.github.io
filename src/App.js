import React, { useEffect } from "react";
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

const readingList = [
  {
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    image: "https://covers.openlibrary.org/b/isbn/0671027034-L.jpg",
    summary:
      "A practical guide to earning trust, listening well, and making people feel respected.",
  },
  {
    title: "Steve Jobs",
    author: "Walter Isaacson",
    image: "https://covers.openlibrary.org/b/isbn/1451648537-L.jpg",
    summary:
      "A biography of Jobs's intensity, taste, contradictions, and product-building obsession.",
  },
  {
    title: "The Mom Test",
    author: "Rob Fitzpatrick",
    image: "https://covers.openlibrary.org/b/isbn/1492180742-L.jpg",
    summary:
      "A short manual for asking customer questions that reveal truth instead of polite encouragement.",
  },
  {
    title: "Flowers for Algernon",
    author: "Daniel Keyes",
    image: "https://covers.openlibrary.org/b/isbn/015603008X-L.jpg",
    summary:
      "A moving novel about intelligence, dignity, loneliness, and what progress can cost.",
  },
  {
    title: "Shoe Dog",
    author: "Phil Knight",
    image: "https://covers.openlibrary.org/b/isbn/1501135929-L.jpg",
    summary:
      "Nike's origin story told as a messy, stubborn, high-risk founder memoir.",
  },
  {
    title: "Zero to One",
    author: "Peter Thiel with Blake Masters",
    image: "https://covers.openlibrary.org/b/isbn/0804139296-L.jpg",
    summary:
      "A startup book about building monopolistic, non-obvious companies instead of copying what exists.",
  },
  {
    title: "Make Something Wonderful",
    author: "Steve Jobs Archive",
    image: "https://book.stevejobsarchive.com/og-image.jpg",
    summary:
      "A curated collection of Steve Jobs's words on craft, ambition, creativity, and building.",
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    image: "https://covers.openlibrary.org/b/isbn/0857197681-L.jpg",
    summary:
      "Short lessons on how behavior, patience, luck, and ego shape financial outcomes.",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    image: "https://covers.openlibrary.org/b/isbn/0735211299-L.jpg",
    summary:
      "A system for making tiny behavior changes compound into durable personal results.",
  },
  {
    title: "The Mountain Is You",
    author: "Brianna Wiest",
    image: "https://covers.openlibrary.org/b/isbn/1949759229-L.jpg",
    summary:
      "A self-reflection book about turning self-sabotage into emotional ownership and change.",
  },
  {
    title: "Surrounded by Idiots",
    author: "Thomas Erikson",
    image: "https://covers.openlibrary.org/b/isbn/1250179947-L.jpg",
    summary:
      "A pop-psychology framework for understanding communication styles and avoiding needless conflict.",
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
    let favicon = document.querySelector('link[rel~="icon"]');

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
    let rafId = 0;
    let lastTimestamp = 0;

    const createFaviconLink = (href) => {
      const link = document.createElement("link");
      link.setAttribute("rel", "icon");
      link.setAttribute("type", "image/svg+xml");
      link.setAttribute("sizes", "any");
      link.setAttribute("href", href);
      return link;
    };

    const setFavicon = (href) => {
      const newFavicon = createFaviconLink(href);
      if (favicon && favicon.parentNode) {
        favicon.parentNode.removeChild(favicon);
      }
      document.head.appendChild(newFavicon);
      favicon = newFavicon;
    };

    const updateFavicon = () => {
      setFavicon(createBeachballFavicon(angle));
      angle = (angle + 8) % 360;
    };

    const animate = (timestamp) => {
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
      }

      if (timestamp - lastTimestamp >= 45) {
        updateFavicon();
        lastTimestamp = timestamp;
      }

      rafId = window.requestAnimationFrame(animate);
    };

    updateFavicon();

    if (!supportsMotionPreference || reducedMotion.matches) {
      return () => {
        if (favicon && originalHref) {
          favicon.setAttribute("href", originalHref);
        }
        if (favicon && originalType) {
          favicon.setAttribute("type", originalType);
        }
      };
    }

    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
      if (favicon && originalHref) {
        favicon.setAttribute("href", originalHref);
      }
      if (favicon && originalType) {
        favicon.setAttribute("type", originalType);
      }
    };
  }, []);
};

function App() {
  useAnimatedBeachballFavicon();

  useEffect(() => {
    document.title = "From, Omer";

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

  return (
    <div className="identity-site">
      <header className="topbar" aria-label="Site navigation">
        <a className="brand-chip" href="#top" aria-label="Omer Khan home">
          <img src="/images/login.png" alt="" />
          <span>Omer Khan</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#work">Work</a>
          <a href="#reading">Reading</a>
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
              <a href="#contact" className="aqua-button primary">
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
                <strong>Signal view</strong>
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

        <section className="about band section-shell era-platinum" id="about">
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


        <section className="areas band section-shell era-aqua" id="work">
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

        <section className="experience section-shell era-ios7" id="reading">
          <div className="section-heading" data-reveal>
            <p className="section-kicker">Reading List</p>
            <h2>My reading list.</h2>
          </div>
          <div className="experience-stack">
            {readingList.map((book) => (
              <article className="experience-row book-row" key={book.title} data-reveal>
                <img src={book.image} alt={`${book.title} cover`} loading="lazy" />
                <div>
                  <h3>{book.title}</h3>
                  <p className="book-author">{book.author}</p>
                  <p>{book.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact section-shell era-bigsur" id="contact">
          <div className="contact-panel" data-reveal>
            <div>
              <p className="section-kicker">Contact</p>
              <h2>For meaningful software, thoughtful products, and ambitious technical work.</h2>
            </div>
            <div className="contact-links">
              <a href="https://github.com/notomer" target="_blank" rel="noreferrer">
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/notomer/"
                target="_blank"
                rel="noreferrer"
              >
                <span>LinkedIn</span>
              </a>
              <a href="mailto:notomerkhan@gmail.com">
                <span>Email</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
