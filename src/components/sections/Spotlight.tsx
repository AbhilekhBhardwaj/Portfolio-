"use client";

import "./Spotlight.css";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type SpotlightItem = {
  video: string;
  href?: string;
  alt: string;
};

const spotlightItems: SpotlightItem[] = [
  { video: "/spotlight/spotlight-1.mp4", alt: "Spotlight item 1" },
  { video: "/spotlight/spotlight-2.mp4", alt: "Spotlight item 2" },
  { video: "/spotlight/spotlight-3.mp4", alt: "Spotlight item 3" },
  { video: "/spotlight/spotlight-4.mp4", alt: "Spotlight item 4" },
  { video: "/spotlight/spotlight-5.mp4", alt: "Spotlight item 5" },
  { video: "/spotlight/spotlight-6.mp4", alt: "Spotlight item 6" },
  { video: "/spotlight/spotlight-7.mp4", alt: "Spotlight item 7" },
];

const marqueeRows = [
  { id: "marquee-1", text: "Hyperreal", textIndex: 1 },
  { id: "marquee-2", text: "Fragmented", textIndex: 3 },
  { id: "marquee-3", text: "Softcore", textIndex: 1 },
  { id: "marquee-4", text: "Motion", textIndex: 3 },
];

function createSeededRandom(seed: number): () => number {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function getRowSpotlightItems(rowIndex: number, count: number): SpotlightItem[] {
  const random = createSeededRandom((rowIndex + 1) * 97);
  const shuffled = [...spotlightItems];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function applyRowVideoSwap(rowIndex: number, item: SpotlightItem): SpotlightItem {
  if (rowIndex === 0 && item.video === "/spotlight/spotlight-4.mp4") {
    return { ...item, video: "/spotlight/spotlight-5.mp4", alt: "Spotlight item 5" };
  }

  if (rowIndex === 1 && item.video === "/spotlight/spotlight-5.mp4") {
    return { ...item, video: "/spotlight/spotlight-4.mp4", alt: "Spotlight item 4" };
  }

  return item;
}

export function Spotlight() {
  const spotlightRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const scrollTriggerInstances: ScrollTrigger[] = [];

      const initSpotlight = () => {
        new SplitType(".marquee-text-item h1", { types: "chars" });

        document.querySelectorAll(".marquee-container").forEach((container, index) => {
          const marquee = container.querySelector(".marquee");
          const chars = container.querySelectorAll(".char");

          const marqueeTrigger = gsap.to(marquee, {
            x: index % 2 === 0 ? "5%" : "-15%",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "150% top",
              scrub: true,
            },
            force3D: true,
          });

          const charsTrigger = gsap.fromTo(
            chars,
            { fontWeight: 100 },
            {
              fontWeight: 900,
              duration: 1,
              ease: "none",
              stagger: {
                each: 0.35,
                from: index % 2 === 0 ? "end" : "start",
                ease: "linear",
              },
              scrollTrigger: {
                trigger: container,
                start: "50% bottom",
                end: "top top",
                scrub: true,
              },
            }
          );

          if (marqueeTrigger.scrollTrigger) {
            scrollTriggerInstances.push(marqueeTrigger.scrollTrigger);
          }
          if (charsTrigger.scrollTrigger) {
            scrollTriggerInstances.push(charsTrigger.scrollTrigger);
          }
        });

        ScrollTrigger.refresh();
      };

      const waitForOtherTriggers = () => {
        const existingTriggers = ScrollTrigger.getAll();
        const hasPinnedTrigger = existingTriggers.some(
          (trigger) => trigger.vars && trigger.vars.pin
        );

        if (hasPinnedTrigger || existingTriggers.length > 0) {
          setTimeout(initSpotlight, 300);
        } else {
          initSpotlight();
        }
      };

      setTimeout(waitForOtherTriggers, 100);

      return () => {
        scrollTriggerInstances.forEach((trigger) => trigger.kill());
      };
    },
    { scope: spotlightRef }
  );

  return (
    <section id="spotlight" className="spotlight scroll-mt-20" ref={spotlightRef}>
      <div className="marquees">
        {marqueeRows.map((row, rowIndex) => {
          const rowItems = getRowSpotlightItems(rowIndex, 4);
          let imageSlotIndex = 0;

          return (
            <div className="marquee-container" id={row.id} key={row.id}>
              <div className="marquee">
                {Array.from({ length: 5 }).map((_, slotIndex) => {
                  if (slotIndex === row.textIndex) {
                    return (
                      <div className="marquee-img-item marquee-text-item" key={`${row.id}-text`}>
                        <h1>{row.text}</h1>
                      </div>
                    );
                  }

                  const item = applyRowVideoSwap(
                    rowIndex,
                    rowItems[imageSlotIndex % rowItems.length]
                  );
                  imageSlotIndex += 1;

                  if (!item.href) {
                    return (
                      <div
                        className="marquee-img-item"
                        key={`${row.id}-img-${slotIndex}-${item.video}`}
                        aria-label={item.alt}
                      >
                        <video
                          src={item.video}
                          muted
                          loop
                          autoPlay
                          playsInline
                          preload="metadata"
                          aria-hidden
                        />
                      </div>
                    );
                  }

                  return (
                    <a
                      className="marquee-img-item marquee-link-item"
                      key={`${row.id}-img-${slotIndex}-${item.video}`}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.alt}
                    >
                      <video
                        src={item.video}
                        muted
                        loop
                        autoPlay
                        playsInline
                        preload="metadata"
                        aria-hidden
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
