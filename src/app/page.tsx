import { Hero } from "@/components/home/hero";
import { Experience } from "@/components/home/experience";
import { ProjectsPreview } from "@/components/home/projects-preview";
import { Education } from "@/components/home/education";
import { Skills } from "@/components/home/skills";

export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <ProjectsPreview />
      <Education />
      <Skills />
    </>
  );
}
