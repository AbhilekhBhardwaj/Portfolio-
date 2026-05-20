"use client";

import Link from "next/link";
import { useRef } from "react";
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
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const ensureProjectVideoLoaded = (video: HTMLVideoElement, src: string) => {
    if (video.dataset.loaded === "true") {
      return Promise.resolve();
    }

    video.src = src;
    video.load();
    video.dataset.loaded = "true";

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
      video.addEventListener("loadeddata", () => resolve(), { once: true });
    });
  };

  const handleMouseEnter = (projectName: string, videoSrc: string) => {
    const video = videoRefs.current[projectName];
    if (!video) return;

    void ensureProjectVideoLoaded(video, videoSrc).then(() => {
      video.currentTime = 0;
      return video.play();
    }).catch((error: unknown) => {
      // Hover in/out can interrupt playback; suppress expected AbortError noise.
      if (error instanceof DOMException && error.name === "AbortError") return;
      console.error(error);
    });
  };

  const handleMouseLeave = (projectName: string) => {
    const video = videoRefs.current[projectName];
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="projects-section scroll-mt-20"
    >
      <h2 id="projects-heading" className="sr-only">
        Projects
      </h2>
      <div className="container">
        <div className="projects-section__header">
          <div className="projects-section__title">
            <h1 className="featured-title">Projects</h1>
          </div>
        </div>

        <div className="projects-grid">
          {rows.map((pair, rowIndex) => (
            <div className="projects-grid__row" key={rowIndex}>
              {pair.map((project: Project) => (
                <article className="project-card" key={project.name}>
                  <Link
                    href={project.href}
                    className="project-card__link"
                    onMouseEnter={() => handleMouseEnter(project.name, project.video)}
                    onMouseLeave={() => handleMouseLeave(project.name)}
                  >
                    <div className="project-card__media">
                      <div className="project-card__label">
                        <h3>{project.name}</h3>
                      </div>
                      <video
                        ref={(el) => {
                          videoRefs.current[project.name] = el;
                        }}
                        className="project-card__video"
                        muted
                        loop
                        playsInline
                        preload="none"
                        aria-hidden
                      />
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
