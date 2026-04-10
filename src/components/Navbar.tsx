"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#spotlight", label: "Spotlight" },
  { href: "#contact", label: "Contact" },
  { href: "#footer", label: "Footer" },
];

export function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <p className={styles.mn}>
          <Link href="#hero">Abhilekh</Link>
        </p>
      </div>

      <div className={styles.navLinks}>
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className={`${styles.navLink} ${styles.mn}`}>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
