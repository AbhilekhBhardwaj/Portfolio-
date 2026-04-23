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
  {
    video: "/spotlight/spotlight-1.mp4",
    href: "https://prompt-hero-section.vercel.app/",
    alt: "Spotlight item 1",
  },
  {
    video: "/spotlight/spotlight-2.mp4",
    href: "https://airline-hero-section.vercel.app/",
    alt: "Spotlight item 2",
  },
  {
    video: "/spotlight/spotlight-3.mp4",
    href: "https://image-hover-blush.vercel.app/",
    alt: "Spotlight item 3",
  },
  {
    video: "/spotlight/spotlight-4.mp4",
    href: "https://hero-section-reveal.vercel.app/",
    alt: "Spotlight item 4",
  },
  {
    video: "/spotlight/spotlight-5.mp4",
    href: "https://securify-93q9.vercel.app/",
    alt: "Spotlight item 5",
  },
  {
    video: "/spotlight/spotlight-6.mp4",
    href: "https://scroll-animation-hero-section.vercel.app/",
    alt: "Spotlight item 6",
  },
];

const marqueeRows = [
  { id: "marquee-1", text: "Click", textIndex: 1 },
  { id: "marquee-2", text: "on video", textIndex: 3 },
  { id: "marquee-3", text: "to", textIndex: 1 },
  { id: "marquee-4", text: "view", textIndex: 3 },
];

function createSeededRandom(seed: number): () => number {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function getSpotlightItemByVideo(video: string): SpotlightItem {
  return spotlightItems.find((item) => item.video === video) ?? { video, alt: "Spotlight item" };
}

function applyRowVideoSwap(rowIndex: number, video: string): SpotlightItem {
  if (rowIndex === 0 && video === "/spotlight/spotlight-4.mp4") {
    return getSpotlightItemByVideo("/spotlight/spotlight-5.mp4");
  }

  if (rowIndex === 1 && video === "/spotlight/spotlight-5.mp4") {
    return getSpotlightItemByVideo("/spotlight/spotlight-4.mp4");
  }

  return getSpotlightItemByVideo(video);
}

function getRowsSpotlightItems(rowCount: number, countPerRow: number): SpotlightItem[][] {
  const random = createSeededRandom(97);
  const shuffled = [...spotlightItems];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const totalSlots = rowCount * countPerRow;
  const flatItems: SpotlightItem[] = [];

  for (let i = 0; i < totalSlots; i += 1) {
    let baseItem = shuffled[i % shuffled.length];
    let chosen = getSpotlightItemByVideo(baseItem.video);

    if (flatItems.length > 0 && chosen.video === flatItems[flatItems.length - 1].video) {
      for (let offset = 1; offset < shuffled.length; offset += 1) {
        baseItem = shuffled[(i + offset) % shuffled.length];
        const candidate = getSpotlightItemByVideo(baseItem.video);
        if (candidate.video !== flatItems[flatItems.length - 1].video) {
          chosen = candidate;
          break;
        }
      }
    }

    flatItems.push(chosen);
  }

  const rows: SpotlightItem[][] = [];
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    const start = rowIndex * countPerRow;
    const rowItems = flatItems
      .slice(start, start + countPerRow)
      .map((item) => applyRowVideoSwap(rowIndex, item.video));

    for (let i = 1; i < rowItems.length; i += 1) {
      if (rowItems[i].video === rowItems[i - 1].video) {
        for (let offset = 1; offset < shuffled.length; offset += 1) {
          const candidate = applyRowVideoSwap(
            rowIndex,
            shuffled[(start + i + offset) % shuffled.length].video
          );
          if (candidate.video !== rowItems[i - 1].video) {
            rowItems[i] = candidate;
            break;
          }
        }
      }
    }

    rows.push(rowItems);
  }

  return rows;
}

export function Spotlight() {
  const spotlightRef = useRef<HTMLElement | null>(null);
  const rowsSpotlightItems = getRowsSpotlightItems(marqueeRows.length, 4);

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
          const rowItems = rowsSpotlightItems[rowIndex];
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

                  const item = rowItems[imageSlotIndex % rowItems.length];
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
                          disablePictureInPicture
                          disableRemotePlayback
                          controlsList="nodownload noplaybackrate noremoteplayback"
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
                        disablePictureInPicture
                        disableRemotePlayback
                        controlsList="nodownload noplaybackrate noremoteplayback"
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
