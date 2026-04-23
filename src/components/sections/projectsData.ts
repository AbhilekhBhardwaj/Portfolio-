export type Project = {
  name: string;
  description: string;
  img: string;
  video: string;
  href: string;
};

export const projects: Project[] = [
  {
    name: "Physics Kills",
    description: "A quiet rebellion drawn in digital ink.",
    img: "/images/work-items/work-item-3.png",
    video: "/featured-work/phkills.mp4",
    href: "https://physics-kills.vercel.app/",
  },
  {
    name: "Terabyte",
    description: "A reflective figure sculpted in synthetic light.",
    img: "/images/work-items/work-item-1.png",
    video: "/featured-work/terabyte.mp4",
    href: "https://terabyte-l43d.vercel.app/",
  },
];
