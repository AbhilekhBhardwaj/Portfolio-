"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const imgRef = useRef<HTMLImageElement>(null);
  const holderRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroImg = imgRef.current;
    const holder = holderRef.current;
    const imgWrap = imgWrapRef.current;
    if (!heroImg || !holder || !imgWrap) return;

    let currentImageIndex = 1;
    const totalImages = 10;

    const intervalId = setInterval(() => {
      currentImageIndex =
        currentImageIndex >= totalImages ? 1 : currentImageIndex + 1;
      heroImg.src = `/images/work-items/work-item-${currentImageIndex}.jpg`;
    }, 250);

    let scrollTriggerInstance: ScrollTrigger | null = null;

    const initAnimations = () => {
      scrollTriggerInstance?.kill();
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: holder,
        start: "top bottom",
        end: "top top",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(imgWrap, {
            y: `${-110 + 110 * progress}%`,
            scale: 0.25 + 0.75 * progress,
            rotation: 0,
          });
        },
      });
    };

    initAnimations();

    const onResize = () => {
      initAnimations();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", onResize);

    return () => {
      clearInterval(intervalId);
      scrollTriggerInstance?.kill();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div id="hero" className="scroll-mt-20">
      <section className={styles.hero}>
        <div className={styles.heroHeaderWrapper}>
          <div className={`${styles.heroHeader} ${styles.heroHeader1}`}>
            <h1>Abhilekh</h1>
          </div>
          <div className={`${styles.heroHeader} ${styles.heroHeader2}`}>
            <h1>Bhardwaj</h1>
          </div>
        </div>
        <div className={styles.heroFooter}>
          <div className={styles.heroFooterSymbols}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/global/symbols.png" alt="" />
          </div>
          <div className={styles.heroFooterScrollDown}>
            <p className={styles.mn}>Pixels by Abhilekh / 2026</p>
          </div>
          <div className={styles.heroFooterTags}>
            <p className={styles.mn}>Portfolio Mode: ON</p>
          </div>
        </div>
      </section>

      <section ref={holderRef} className={styles.heroImgHolder}>
        <div ref={imgWrapRef} className={styles.heroImg}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={imgRef} src="/images/hero/img1.jpg" alt="" />
        </div>
      </section>
    </div>
  );
}
