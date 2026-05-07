import { Hero } from "@/components/sections/Hero";
import { Navbar } from "@/components/sections/Navbar";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
    </>
  );
}
