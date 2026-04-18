import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer id="footer" className={styles.footer}>
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
            <p>
              <Link href="#hero">Home</Link>
            </p>
            <p>
              <Link href="#projects">Projects</Link>
            </p>
            <p>
              <Link href="#spotlight">Spotlight</Link>
            </p>
          </div>
          <div className={styles.footerCol}>
            <p>Profiles</p>
            <p>
              <a href="https://github.com/AbhilekhBhardwaj" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </p>
            <p>
              <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </p>
            <p>
              <a href="mailto:bhardwaj.abhilekh@gmail.com">Email</a>
            </p>
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
      </div>
    </footer>
  );
}
