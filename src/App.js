import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import LiquidGlass from "./Components/LiquidGlass";
import ContactIpod from "./Components/ContactIpod";
import Monogram from "./Components/Monogram";
import BookPreview from "./Components/BookPreview";
import atomicHabitsCover from "./images/books/atomic-habits.jpg";
import flowersForAlgernonCover from "./images/books/flowers-for-algernon.jpg";
import howToWinFriendsCover from "./images/books/how-to-win-friends.jpg";
import makeSomethingWonderfulCover from "./images/books/make-something-wonderful-official.jpg";
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
    title: "Engineering files, made interactive",
    context: "Leidos · 2D / 3D visualization",
    copy: "Built and deployed full-stack applications that streamlined engineering workflows, enabled interactive visualization of complex data, and integrated AI-powered automation through scalable backend APIs.",
    detail: "The work: displaying technical files and building the interactions used to navigate them.",
  },
  {
    number: "02",
    title: "File conversion inside a private network",
    context: "Infrastructure · APIs & deployment",
    copy: "Streamlined engineering workflows with an API-based conversion service that operates within a restricted network, with CI/CD automation for deployment.",
    detail: "The constraint: file processing and deployment had to work within the network boundary.",
  },
  {
    number: "03",
    title: "An interface for service administration",
    context: "Full stack · Keycloak",
    copy: "Integrated AI-powered automation into an administration platform, developing full-stack frontend and backend functionality and integrating Keycloak authentication and service management.",
    detail: "The work: connecting the administrative interface to authentication and backend services.",
  },
  {
    number: "04",
    title: "Build diagnostics for developers",
    context: "Apple · Engineering internship",
    copy: "Developed a tool to extract Clang compiler warnings and errors and email the code author based on compilation flags and build requirements.",
    detail: "Also packaged a command-line tool with self-contained dependency resolution to simplify its setup.",
  },
];

const experience = [
  {
    place: "Leidos",
    role: "Software Engineer",
    dates: "June 2026–Present",
    copy: "Built and deployed full-stack applications that streamlined engineering workflows, enabled interactive visualization of complex data, and integrated AI-powered automation through scalable backend APIs.",
  },
  {
    place: "Apple",
    role: "Software Engineering Intern",
    dates: "Jan–Jun 2023",
    copy: "Developer infrastructure and automation supporting iOS and visionOS engineering workflows.",
  },
  {
    place: "Apple",
    role: "Quantitative Technical Expert",
    dates: "Aug 2021–Jun 2026",
    copy: "Technical support and troubleshooting in Apple Retail.",
  },
  {
    place: "Georgia Tech",
    role: "M.S. Computer Science",
    dates: "In progress · OMSCS",
    copy: "Graduate study focused on artificial intelligence and machine learning.",
  },
  {
    place: "George Mason",
    role: "B.S. Computational and Data Sciences",
    dates: "Spring 2025",
    copy: "Undergraduate study in computational and data sciences.",
  },
];

// Fallback palettes follow the installed cover editions; only sourced spines use photographs.
const spineStyles = [
  ["#18054c", "#d4ab55", 208], ["#e5dfd0", "#252525", 226],
  ["#c32f70", "#ffffff", 196], ["#272f4a", "#e9c881", 218],
  ["#24201f", "#c99b55", 212], ["#7595b4", "#101b28", 202],
  ["#8d9daa", "#ffffff", 222], ["#eeeade", "#293d30", 210],
  ["#eee5d1", "#835427", 216], ["#090909", "#f5f0e6", 200],
  ["#fff9eb", "#111111", 206],
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
    coverFrame: "244 253 1044 1655",
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

const BookCover = ({ book, className }) => book.coverFrame ? (
  <svg className={className} viewBox={book.coverFrame} preserveAspectRatio="none" aria-hidden="true">
    <image href={book.image} width="1539" height="2153" />
  </svg>
) : <img className={className} src={book.image} alt="" loading="lazy" />;

const BookSpine = ({ book }) => {
  if (book.spineImage) return <img className="shelf-spine-image" src={book.spineImage} alt="" loading="lazy" />;
  return <><span className="shelf-spine-title">{book.title}</span><span className="shelf-spine-author">{book.author}</span></>;
};

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
  const [activeBook, setActiveBook] = useState(null);
  const [bookClosing, setBookClosing] = useState(false);
  const [revealedBook, setRevealedBook] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  // Keeps the goo split-off layer mounted while the shape is still morphing,
  // so closing reverses the liquid neck instead of popping it away.
  const [splitting, setSplitting] = useState(false);
  // The initial menuOpen value is not a morph: skip it so the goo layer never
  // flickers onto the closed dot at page load.
  const firstEffect = useRef(true);
  useEffect(() => {
    if (firstEffect.current) {
      firstEffect.current = false;
      return undefined;
    }
    setSplitting(true);
    const timer = setTimeout(() => setSplitting(false), 740);
    return () => clearTimeout(timer);
  }, [menuOpen]);
  const [activeSection, setActiveSection] = useState("top");
  const dialogRef = useRef(null);
  const bookTrigger = useRef(null);
  const pointerType = useRef("");

  const openBook = (book, event) => {
    bookTrigger.current = event.currentTarget;
    const rect = event.currentTarget.getBoundingClientRect();
    setActiveBook({ ...book, originX: rect.x + rect.width / 2 - window.innerWidth / 2,
      originY: rect.y + rect.height / 2 - window.innerHeight / 2 });
  };

  const closeBook = () => setActiveBook(null);

  // Animating the book back into its shelf slot takes a beat; keep the dialog
  // mounted and ignore repeat close requests until the return flight lands.
  const closeBookAnimated = () => {
    if (bookClosing) return;
    setBookClosing(true);
    setTimeout(() => {
      closeBook();
      setBookClosing(false);
    }, 340);
  };

  const handleBookClick = (book, event) => {
    openBook(book, event);
    pointerType.current = "";
  };

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onPointerDown = (event) => {
      if (!event.target.closest(".topbar")) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const sections = document.querySelectorAll("main > section[id], footer[id]");
    if (!("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: "-20% 0px -65% 0px" });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!revealedBook) return undefined;
    const reset = (event) => {
      if (!event.target.closest(".shelf-book")) setRevealedBook(null);
    };
    document.addEventListener("pointerdown", reset);
    return () => document.removeEventListener("pointerdown", reset);
  }, [revealedBook]);

  useEffect(() => {
    if (!activeBook) return undefined;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      bookTrigger.current?.focus({ preventScroll: true });
    };
  }, [activeBook]);

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

  return (
    <div className="identity-site">
      <header className={`topbar${menuOpen ? " is-open" : ""}${splitting ? " is-splitting" : ""}`} aria-label="Site navigation">
        <LiquidGlass expanded={menuOpen} />
        {(menuOpen || splitting) && (
          <span className="goo-layer" aria-hidden="true">
            <span className="goo-ball" />
            <span className="goo-capsule" />
          </span>
        )}
        <button className="brand-chip" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}>
          <span className="brand-monogram" aria-hidden="true"><Monogram /></span>
          <span className="brand-name">Omer</span>
          <span className="brand-menu-indicator" aria-hidden="true">{menuOpen ? "×" : "＋"}</span>
        </button>
        <nav className="nav-links" id="primary-navigation" aria-label="Primary" aria-hidden={!menuOpen} inert={menuOpen ? undefined : ""}>
          {[["work", "Selected Work"], ["about", "About"], ["experience", "Experience"], ["reading", "On my shelf"], ["contact", "Contact"]].map(([id, label]) => (
            <a key={id} className={activeSection === id ? "is-active" : ""} aria-current={activeSection === id ? "location" : undefined} href={`#${id}`} onClick={() => setMenuOpen(false)}><span className="nav-link-surface">{label}</span></a>
          ))}
        </nav>
      </header>

      <svg className="goo-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <filter id="topbar-goo" x="0" y="0" width="100%" height="100%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6.5" result="fuzz" />
          <feColorMatrix in="fuzz" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 30 -8.5" result="core" />
          <feMorphology in="core" operator="erode" radius="2.5" result="core-in" />
          <feComposite in="core" in2="core-in" operator="arithmetic" k1="0" k2="1" k3="-1" k4="0" result="edge" />
          <feComponentTransfer in="core" result="fill"><feFuncA type="linear" slope="0.16" intercept="0.03" /></feComponentTransfer>
          <feComponentTransfer in="edge" result="rim"><feFuncA type="linear" slope="0.62" intercept="0" /></feComponentTransfer>
          <feMerge><feMergeNode in="fill" /><feMergeNode in="rim" /></feMerge>
        </filter>
      </svg>
      <main>
        <section className="hero section-shell" id="top">
          <div className="hero-copy" data-reveal>
            <div className="hero-title-row">
              <h1>Omer</h1>
              <BeachBall className="hero-beachball-inline" />
            </div>
            <p className="hero-text hero-lede">
              Software Engineer at Leidos. Previously an engineering intern at Apple.
            </p>
            <p className="hero-text">
              I build AI systems, developer tools, and software that makes complex work feel simple.
            </p>
          </div>
        </section>

        <section className="areas band section-shell era-leopard" id="work">
          <div className="section-heading" data-reveal>
            <p className="section-kicker">Selected Work</p>
            <h2>Selected engineering work.</h2>
          </div>
          <div className="area-list">
            {work.map((item) => (
              <article className="area-item" key={item.title} data-reveal>
                <span>{item.number}</span>
                <div><p className="work-context">{item.context}</p><h3>{item.title}</h3></div>
                <div className="work-description"><p>{item.copy}</p><p className="work-detail">{item.detail}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="about band section-shell era-aqua-about" id="about">
          <div className="editorial-grid" data-reveal>
            <div>
              <p className="section-kicker">About</p>
              <h2>Complex problems. Simple experiences.</h2>
            </div>
            <div className="editorial-copy">
              <p>
                I'm a software engineer interested in the intersection of
                artificial intelligence, infrastructure, and product design.
              </p>
              <p>
                At Leidos, I work on applied AI systems and engineering tools.
                Previously, at Apple, I contributed to developer infrastructure
                and automation supporting engineering workflows.
              </p>
              <p>
                I care as much about how software feels to use as how it works
                underneath.
              </p>
            </div>
          </div>
        </section>

        <section className="experience section-shell era-flat" id="experience">
          <div className="section-heading" data-reveal>
            <p className="section-kicker">Background</p>
            <h2>Experience</h2>
          </div>
          <ol className="career-timeline">
            {experience.slice(0, 3).map((item) => (
              <li key={`${item.place}-${item.role}`}>
                <p className="career-dates">{item.dates}</p>
                <div><h3>{item.role}</h3><p className="career-place">{item.place}</p><p>{item.copy}</p></div>
              </li>
            ))}
          </ol>
          <h3 className="education-heading">Education</h3>
          <div className="education-grid">
            {experience.slice(3).map((item) => (
              <article key={item.place}>
                <h4>{item.role}</h4><p className="career-place">{item.place}</p><p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="experience section-shell era-ios7" id="reading">
          <div className="section-heading" data-reveal>
            <p className="section-kicker">Library</p>
            <h2>On my shelf.</h2>
            <p>A small selection from the shelf. Select a book to look inside.</p>
          </div>
          <div className="bookshelf">
            <div className="bookshelf-track">
              {readingList.map((book, index) => (
                <button
                  className={`book shelf-book${revealedBook === book.title ? " is-revealed" : ""}`}
                  style={{ "--spine-color": spineStyles[index][0], "--spine-ink": spineStyles[index][1], "--book-height": `${spineStyles[index][2]}px` }}
                  key={book.title}
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded={revealedBook === book.title}
                  aria-label={`More about ${book.title} by ${book.author}`}
                  onPointerDown={(event) => { pointerType.current = event.pointerType; }}
                  onClick={(event) => handleBookClick(book, event)}
                >
                  <span className="shelf-book-object" aria-hidden="true">
                    <span className="shelf-book-pages" />
                    <span className="shelf-book-cover"><BookCover book={book} /></span>
                    <span className={`shelf-book-spine${book.spineKind ? " has-source-image" : ""}`} data-spine-source={book.spineKind || "cover-inspired"}>
                      <BookSpine book={book} />
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
          {activeBook && (
            <dialog
              ref={dialogRef}
              className="book-popover-backdrop"
              aria-labelledby="book-popover-title"
              className={bookClosing ? "book-popover-backdrop is-closing" : "book-popover-backdrop"}
              onCancel={(event) => { event.preventDefault(); closeBookAnimated(); }}
              onClick={(event) => { if (event.target === event.currentTarget) closeBookAnimated(); }}
            >
              <div
                className="book-popover book-viewer"
                style={{
                  "--cover": `url(${activeBook.image})`,
                  "--open-x": `${activeBook.originX}px`,
                  "--open-y": `${activeBook.originY}px`,
                }}
                onClick={(event) => event.stopPropagation()}
              >
                <BookPreview book={activeBook} onClose={closeBookAnimated} />

                </div>
              </dialog>
          )}
        </section>

      </main>
      <footer className="ipod-footer" id="contact" aria-label="Contact">
        <ContactIpod />
      </footer>
    </div>
  );
}

export default App;
