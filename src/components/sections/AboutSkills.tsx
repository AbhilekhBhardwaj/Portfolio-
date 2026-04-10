export function AboutSkills() {
  return (
    <div className="flex flex-col gap-16 py-16">
      <section
        id="about"
        aria-labelledby="about-heading"
        className="scroll-mt-20"
      >
        <h2 id="about-heading" className="sr-only">
          About me
        </h2>
        {/* Paste about UI here */}
        <div className="border border-dashed border-foreground/20 rounded-lg p-8 flex items-center justify-center text-foreground/50 min-h-[160px]">
          About me — replace with your content
        </div>
      </section>

      <section
        id="skills"
        aria-labelledby="skills-heading"
        className="scroll-mt-20"
      >
        <h2 id="skills-heading" className="sr-only">
          Skills
        </h2>
        {/* Paste skills UI here */}
        <div className="border border-dashed border-foreground/20 rounded-lg p-8 flex items-center justify-center text-foreground/50 min-h-[160px]">
          Skills — replace with your content
        </div>
      </section>
    </div>
  );
}
