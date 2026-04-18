import { Footer, Hero, Projects, Spotlight } from "@/components/sections";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />
      <main className="flex-1 w-full flex flex-col">
        <Hero />
        <Projects />
        <Spotlight />
        <Footer />
      </main>
    </div>
  );
}
