import React, { useEffect, useRef, useState } from "react";

export default function ContactIpod() {
  const ipod = useRef(null);
  const [backlit, setBacklit] = useState(false);

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
