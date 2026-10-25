import React, { useEffect, useRef, useState } from "react";

export default function ContactIpod() {
  const ipod = useRef(null);
  const [backlit, setBacklit] = useState(false);

  useEffect(() => {
    // While the widget initializes it calls menuRow.scrollIntoView({block:"nearest"})
    // before its screen list becomes a scrollable ancestor, so the browser
    // escalates to scrolling the whole page down to the widget — which is what
    // flung every fresh visit to the library/iPod area. Suppressed while the
    // page is still at the top (nothing inside the widget needs scrolling
    // there); once the visitor has scrolled, real behavior resumes.
    const original = Element.prototype.scrollIntoView;
    const fromIpod = (el) => {
      const owner = el.closest && el.closest("web-music-ipod");
      if (owner && owner !== el) return true;
      const root = typeof el.getRootNode === "function" && el.getRootNode();
      return Boolean(root && root.host && root.host !== el && root.host.tagName === "WEB-MUSIC-IPOD");
    };
    Element.prototype.scrollIntoView = function (...args) {
      if (window.scrollY === 0 && fromIpod(this)) return undefined;
      return original.apply(this, args);
    };
    return () => {
      Element.prototype.scrollIntoView = original;
    };
  }, []);

  useEffect(() => {
    const element = ipod.current;
    let idleTimer;
    const wake = () => {
      setBacklit(true);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setBacklit(false), 5000);
    };
    // Native listeners also receive composed events from the iPod's shadow DOM.
    // Its automatic startup focus should not turn on the light.
    const events = ["pointerenter", "pointermove", "pointerdown", "keydown", "wheel"];
    events.forEach((event) => element.addEventListener(event, wake, { passive: true }));
    return () => {
      clearTimeout(idleTimer);
      events.forEach((event) => element.removeEventListener(event, wake));
    };
  }, []);

  return <web-music-ipod ref={ipod} backlit={String(backlit)} aria-label="Contact and links on iOmer" />;
}
