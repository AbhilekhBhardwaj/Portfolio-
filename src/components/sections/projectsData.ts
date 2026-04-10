export type Project = {
  name: string;
  description: string;
  img: string;
  href: string;
};

export const projects: Project[] = [
  {
    name: "Citychild",
    description: "A quiet rebellion drawn in digital ink.",
    img: "/featured-work/work-1.jpg",
    href: "/sample-project",
  },
  {
    name: "Chrome Saint",
    description: "A reflective figure sculpted in synthetic light.",
    img: "/featured-work/work-2.jpg",
    href: "/sample-project",
  },
  {
    name: "Gunmetal Dream",
    description: "Tension, style, and a hint of cinematic noir.",
    img: "/featured-work/work-3.jpg",
    href: "/sample-project",
  },
  {
    name: "Stoneface",
    description: "Fragments of memory cast in mineral form.",
    img: "/featured-work/work-4.jpg",
    href: "/sample-project",
  },
];
