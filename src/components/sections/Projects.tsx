"use client";

import Link from "next/link";
import { projects, type Project } from "./projectsData";
import "./ProjectsSection.css";

function chunkPairs<T>(items: T[]): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }
  return rows;
}

export function Projects() {
  const rows = chunkPairs(projects);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="projects-section scroll-mt-20"
    >
      <h2 id="projects-heading" className="sr-only">
        Featured work
      </h2>
      <div className="container">
        <div className="projects-section__header">
          <div className="projects-section__title">
            <h1>Featured Work</h1>
          </div>

          <div className="projects-section__arrow" aria-hidden>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M16 26.6665L16 5.33317"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22.6667 19.9999L16 26.6665L9.33337 19.9998"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="projects-section__intro">
            <p>
              From motion to concept, pieces born from quiet sketches, late
              nights, and just the right amount of chaos.
            </p>
          </div>
        </div>

        <div className="projects-grid">
          {rows.map((pair, rowIndex) => (
            <div className="projects-grid__row" key={rowIndex}>
              {pair.map((project: Project) => (
                <article className="project-card" key={project.name}>
                  <Link href={project.href} className="project-card__link">
                    <div className="project-card__media">
                      <div className="project-card__label">
                        <h3>{project.name}</h3>
                      </div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={project.img} alt={project.name} />
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
