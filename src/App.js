import React, { useEffect, useState } from "react";
import "./App.css";
import atomicHabitsCover from "./images/books/atomic-habits.jpg";
import flowersForAlgernonCover from "./images/books/flowers-for-algernon.jpg";
import howToWinFriendsCover from "./images/books/how-to-win-friends.jpg";
import makeSomethingWonderfulCover from "./images/books/make-something-wonderful.jpg";
import shoeDogCover from "./images/books/shoe-dog.jpg";
import steveJobsCover from "./images/books/steve-jobs.jpg";
import surroundedByIdiotsCover from "./images/books/surrounded-by-idiots.jpg";
import theMomTestCover from "./images/books/the-mom-test.jpg";
import theMountainIsYouCover from "./images/books/the-mountain-is-you.jpg";
import thePsychologyOfMoneyCover from "./images/books/the-psychology-of-money.jpg";
import zeroToOneCover from "./images/books/zero-to-one.jpg";

const work = [
  {
    number: "01",
    title: "AI Systems",
    copy:
      "Reasoning over messy context and turning model output into decisions people can trust.",
  },
  {
    number: "02",
    title: "Developer Tooling",
    copy:
      "Tools that make failure clearer, feedback faster, and engineering work easier to move.",
  },
  {
    number: "03",
    title: "Product Design in Software",
    copy: "Interface, workflow, and system behavior treated as one product surface.",
  },
  {
    number: "04",
    title: "Automation & Workflow Systems",
    copy: "Automation that removes repeat work while preserving context and control.",
  },
  {
    number: "05",
    title: "Systems-Focused Engineering",
    copy:
      "Engineering close to infrastructure, product requirements, and reliability expectations.",
  },
];

const experience = [
  {
    place: "Leidos",
    role: "AI Engineer",
    copy: "Applied AI systems, engineering systems, backend and infrastructure.",
  },
  {
    place: "Apple",
    role: "Software Engineering / Technical",
    copy:
      "Engineering experience shaped by platform quality, CI, tooling, and customer-facing systems.",
  },
  {
    place: "Georgia Tech",
    role: "M.S. Computer Science",
    copy: "Artificial intelligence and computing.",
  },
  {
    place: "George Mason",
    role: "Computational & Data Sciences",
    copy: "Undergraduate computing foundation.",
  },
];

const readingList = [
  {
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    image: howToWinFriendsCover,
    summary:
      "A practical guide to earning trust, listening well, and making people feel respected.",
  },
  {
    title: "Steve Jobs",
    author: "Walter Isaacson",
    image: steveJobsCover,
    summary:
      "A biography of Jobs's intensity, taste, contradictions, and product-building obsession.",
  },
  {
    title: "The Mom Test",
    author: "Rob Fitzpatrick",
    image: theMomTestCover,
    summary:
      "A short manual for asking customer questions that reveal truth instead of polite encouragement.",
  },
  {
    title: "Flowers for Algernon",
    author: "Daniel Keyes",
    image: flowersForAlgernonCover,
    summary:
      "A moving novel about intelligence, dignity, loneliness, and what progress can cost.",
  },
  {
    title: "Shoe Dog",
    author: "Phil Knight",
    image: shoeDogCover,
    summary:
      "Nike's origin story told as a messy, stubborn, high-risk founder memoir.",
  },
  {
    title: "Zero to One",
    author: "Peter Thiel with Blake Masters",
    image: zeroToOneCover,
    summary:
      "A startup book about building monopolistic, non-obvious companies instead of copying what exists.",
  },
  {
    title: "Make Something Wonderful",
    author: "Steve Jobs Archive",
    image: makeSomethingWonderfulCover,
    summary:
      "A curated collection of Steve Jobs's words on craft, ambition, creativity, and building.",
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    image: thePsychologyOfMoneyCover,
    summary:
      "Short lessons on how behavior, patience, luck, and ego shape financial outcomes.",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    image: atomicHabitsCover,
    summary:
      "A system for making tiny behavior changes compound into durable personal results.",
  },
  {
    title: "The Mountain Is You",
    author: "Brianna Wiest",
    image: theMountainIsYouCover,
    summary:
      "A self-reflection book about turning self-sabotage into emotional ownership and change.",
  },
  {
    title: "Surrounded by Idiots",
    author: "Thomas Erikson",
    image: surroundedByIdiotsCover,
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
  const [activeBook, setActiveBook] = useState(null);
  const [isBookClosing, setIsBookClosing] = useState(false);
  const [experienceIndex, setExperienceIndex] = useState(0);

  const openBook = (book, event) => {
    const sectionBox = event.currentTarget
      .closest("section")
      .getBoundingClientRect();
    const bookBox = event.currentTarget.getBoundingClientRect();

    setIsBookClosing(false);
    setActiveBook({
      ...book,
      x:
        bookBox.left +
        bookBox.width / 2 -
        (sectionBox.left + sectionBox.width / 2),
      y:
        bookBox.top +
        bookBox.height / 2 -
        (sectionBox.top + sectionBox.height / 2),
    });
  };

  const closeBook = () => {
    setIsBookClosing(true);
    window.setTimeout(() => {
      setActiveBook(null);
      setIsBookClosing(false);
    }, 900);
  };

  useAnimatedBeachballFavicon();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setExperienceIndex((current) => (current + 1) % experience.length);
    }, 4300);

    return () => window.clearInterval(timer);
  }, []);

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
      { rootMargin: "0px 0px -4% 0px", threshold: 0.08 }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activeBook) {
      return undefined;
    }

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        closeBook();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [activeBook]);

  return (
    <div className="identity-site">
      <header className="topbar" aria-label="Site navigation">
        <a className="brand-chip" href="#top" aria-label="Omer Khan home">
          <img src="/images/login.png" alt="" />
          <span>Omer Khan</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#reading">Library</a>
          <a href="#contact">Elsewhere</a>
        </nav>
      </header>

      <main>
        <section className="hero section-shell" id="top">
          <div className="hero-copy" data-reveal>
            <div className="hero-title-row">
              <h1>Omer Khan</h1>
              <BeachBall className="hero-beachball-inline" />
            </div>
            <p className="hero-text hero-lede">
              AI Engineer at Leidos. Previously Apple.
            </p>
            <p className="hero-text">
              I build software and spend a lot of time thinking about AI,
              systems, and how technology can be made more useful.<span className="hero-cursor" aria-hidden="true" />
            </p>
          </div>
        </section>

        <section className="about band section-shell era-aqua-about" id="about">
          <div className="editorial-grid" data-reveal>
            <div>
              <p className="section-kicker">About</p>
              <h2>Software should make difficult work feel clearer, quieter, and more deliberate.</h2>
            </div>
            <div className="editorial-copy">
              <p>
                I'm an AI Engineer at Leidos, working on applied AI systems and
                the infrastructure behind them.
              </p>
              <p>
                Before Leidos, I spent several years at Apple across technical
                and software engineering roles, including work on developer
                infrastructure and automation.
              </p>
            </div>
          </div>
        </section>


        <section className="areas band section-shell era-leopard" id="work">
          <div className="section-heading" data-reveal>
            <p className="section-kicker">Areas of Work</p>
            <h2>Clearer systems and tools.</h2>
          </div>
          <div className="area-list">
            {work.map((item) => (
              <article className="area-item" key={item.title} data-reveal>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="experience section-shell era-flat" id="experience">
          <div className="section-heading centered" data-reveal>
            <h2>Experience</h2>
          </div>
          <div className="experience-carousel" data-reveal>
            {experience.map((item, index) => {
              const offset = (index - experienceIndex + experience.length) % experience.length;
              const state = offset === 0 ? "active" : offset === 1 ? "next" : offset === experience.length - 1 ? "prev" : "hidden";

              return (
                <article className={`experience-card experience-card-${index} is-${state}`} key={item.place}>
                  <p className="experience-role">{item.role}</p>
                  <h3>{item.place}</h3>
                  <p>{item.copy}</p>
                </article>
              );
            })}
          </div>
          <div className="experience-dots" aria-label="Choose experience item">
            {experience.map((item, index) => (
              <button
                aria-label={`Show ${item.place}`}
                aria-current={index === experienceIndex}
                className={index === experienceIndex ? "is-active" : ""}
                key={item.place}
                onClick={() => setExperienceIndex(index)}
                type="button"
              />
            ))}
          </div>
        </section>

        <section className="experience section-shell era-ios7" id="reading">
          <div className="section-heading" data-reveal>
            <p className="section-kicker">Library</p>
            <h2>Books worth keeping around.</h2>
            <p>What I'm reading and what I've finished.</p>
          </div>
          <div className="bookshelf">
            <div className="bookshelf-track">
              {readingList.map((book) => (
                <button
                  className="book"
                  key={book.title}
                  type="button"
                  data-reveal
                  data-title={book.title}
                  onClick={(event) => openBook(book, event)}
                >
                  <span className="book-spine">
                    <img src={book.image} alt="" loading="lazy" />
                  </span>
                </button>
              ))}
              {readingList.map((book) => (
                <span className="book" key={`${book.title}-loop`} aria-hidden="true">
                  <span className="book-spine">
                    <img src={book.image} alt="" loading="lazy" />
                  </span>
                </span>
              ))}
            </div>
          </div>
          {activeBook && (
            <div
              className={`book-popover-backdrop${isBookClosing ? " is-closing" : ""}`}
              onClick={closeBook}
            >
              <div
                className="book-popover"
                style={{
                  "--cover": `url(${activeBook.image})`,
                  "--open-x": `${activeBook.x}px`,
                  "--open-y": `${activeBook.y}px`,
                }}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  className="book-popover-close"
                  type="button"
                  aria-label="Close book details"
                  onClick={closeBook}
                >
                  ×
                </button>
                <img
                  className="book-cover-flip"
                  src={activeBook.image}
                  alt=""
                  loading="lazy"
                />
                <div className="book-page-left">
                  <h3>{activeBook.title}</h3>
                  <p className="book-author">{activeBook.author}</p>
                </div>
                <div className="book-page-right">
                  <p>{activeBook.summary}</p>
                </div>
              </div>
            </div>
          )}
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
