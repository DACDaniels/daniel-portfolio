import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Navbar } from "@/components/sections/Navbar";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Testimonial } from "@/components/sections/Testimonial";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <Testimonial />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
