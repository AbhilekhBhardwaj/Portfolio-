"use client";

import "./Spotlight.css";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const SpotlightContent = dynamic(
  () => import("./Spotlight").then((mod) => mod.Spotlight),
  { ssr: false }
);

/** Reserve layout space so the page doesn't jump when Spotlight mounts. */
function SpotlightPlaceholder() {
  return (
    <section
      id="spotlight"
      className="spotlight spotlight--placeholder scroll-mt-20"
      aria-hidden
    >
      <div className="marquees" />
    </section>
  );
}

export function Spotlight() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px", threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  if (!shouldMount) {
    return (
      <div ref={sentinelRef}>
        <SpotlightPlaceholder />
      </div>
    );
  }

  return <SpotlightContent />;
}
