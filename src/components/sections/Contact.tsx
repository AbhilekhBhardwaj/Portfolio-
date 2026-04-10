import "./ContactSection.css";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="contact-section scroll-mt-20">
      <div className="contact-section__header">
        <h2 id="contact-heading" className="contact-section__title">
          Let&apos;s Build Something Great
        </h2>
        <p className="contact-section__intro">
          Open to full-stack roles, freelance work, and collaboration. Reach out and I will get
          back to you soon.
        </p>
      </div>

      <div className="contact-section__grid">
        <a className="contact-card" href="mailto:bhardwaj.abhilekh@gmail.com">
          <p className="contact-card__label">Email</p>
          <p className="contact-card__value">bhardwaj.abhilekh@gmail.com</p>
        </a>
        <a
          className="contact-card"
          href="https://www.linkedin.com/in/yourprofile"
          target="_blank"
          rel="noreferrer"
        >
          <p className="contact-card__label">LinkedIn</p>
          <p className="contact-card__value">linkedin.com/in/yourprofile</p>
        </a>
        <a className="contact-card" href="https://github.com/AbhilekhBhardwaj" target="_blank" rel="noreferrer">
          <p className="contact-card__label">GitHub</p>
          <p className="contact-card__value">github.com/AbhilekhBhardwaj</p>
        </a>
      </div>
    </section>
  );
}
