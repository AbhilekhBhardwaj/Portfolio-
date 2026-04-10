"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

type ParticleState = {
  el: HTMLImageElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
};

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const explosionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const explosionContainer = explosionRef.current;
    if (!footer || !explosionContainer) return;

    let hasExploded = false;
    let checkTimeout: ReturnType<typeof setTimeout> | null = null;

    const imagePaths = Array.from(
      { length: 6 },
      (_, i) => `/images/work-items/work-item-${i + 1}.jpg`
    );

    const createParticles = () => {
      explosionContainer.innerHTML = "";
      imagePaths.forEach((path) => {
        const particle = document.createElement("img");
        particle.src = path;
        particle.classList.add(styles.explosionParticleImg);
        explosionContainer.appendChild(particle);
      });
    };

    class Particle {
      state: ParticleState;
      constructor(el: HTMLImageElement) {
        this.state = {
          el,
          x: 0,
          y: 0,
          vx: (Math.random() - 0.5) * 14,
          vy: -9 - Math.random() * 8,
          rotation: 0,
          rotationSpeed: (Math.random() - 0.5) * 7,
        };
      }
      update() {
        const s = this.state;
        s.vy += 0.25;
        s.vx *= 0.99;
        s.vy *= 0.99;
        s.rotationSpeed *= 0.99;
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.rotationSpeed;
        s.el.style.transform = `translate(${s.x}px, ${s.y}px) rotate(${s.rotation}deg)`;
      }
    }

    const explode = () => {
      if (hasExploded) return;
      hasExploded = true;
      createParticles();

      const particles = Array.from(
        explosionContainer.querySelectorAll<HTMLImageElement>(`.${styles.explosionParticleImg}`)
      ).map((el) => new Particle(el));

      let animationId = 0;
      const animate = () => {
        particles.forEach((p) => p.update());
        animationId = requestAnimationFrame(animate);
        if (particles.every((p) => p.state.y > explosionContainer.offsetHeight / 2)) {
          cancelAnimationFrame(animationId);
        }
      };
      animate();
    };

    const checkFooterPosition = () => {
      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (footerRect.top > viewportHeight + 120) hasExploded = false;
      if (!hasExploded && footerRect.top <= viewportHeight + 220) explode();
    };

    const onScroll = () => {
      if (checkTimeout) clearTimeout(checkTimeout);
      checkTimeout = setTimeout(checkFooterPosition, 8);
    };

    createParticles();
    const initialCheck = setTimeout(checkFooterPosition, 350);

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (checkTimeout) clearTimeout(checkTimeout);
      clearTimeout(initialCheck);
    };
  }, []);

  return (
    <footer id="footer" ref={footerRef} className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={`${styles.footerSymbols} ${styles.footerSymbolsTop}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/global/s6.png" alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/global/s6.png" alt="" />
        </div>

        <div className={styles.footerHeader}>
          <h2>Let&apos;s Connect</h2>
        </div>

        <div className={styles.footerRow}>
          <div className={styles.footerCol}>
            <p>Quick Links</p>
            <p><Link href="#hero">Home</Link></p>
            <p><Link href="#projects">Projects</Link></p>
            <p><Link href="#contact">Contact</Link></p>
          </div>
          <div className={styles.footerCol}>
            <p>Profiles</p>
            <p><a href="https://github.com/yourusername" target="_blank" rel="noreferrer">GitHub</a></p>
            <p><a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noreferrer">LinkedIn</a></p>
            <p><a href="mailto:youremail@example.com">Email</a></p>
          </div>
          <div className={styles.footerCol}>
            <p>Availability</p>
            <p>Open to full-stack roles</p>
            <p>Freelance: Available</p>
            <p>Remote / Hybrid</p>
          </div>
        </div>

        <div className={styles.copyrightInfo}>
          <p className={styles.mn}>{new Date().getFullYear()} Portfolio</p>
          <p className={styles.mn}>//</p>
          <p className={styles.mn}>Built with Next.js + GSAP</p>
        </div>

        <div className={`${styles.footerSymbols} ${styles.footerSymbolsBottom}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/global/s6.png" alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/global/s6.png" alt="" />
        </div>

        <div ref={explosionRef} className={styles.explosionContainer} />
      </div>
    </footer>
  );
}
