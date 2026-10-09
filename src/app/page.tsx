import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Navbar } from "@/components/sections/Navbar";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";

const SITE_URL = "https://dev.danielchadambuka.com";

// Tells Google this page is the profile page of the Person described in
// the root layout (same @id), which is what ranks for name searches.
const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: "Daniel Chadambuka · Software Engineer | IT Solutions Specialist | Technology Innovator",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: { "@id": `${SITE_URL}/#person` },
  inLanguage: "en",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <Projects />
        <Achievements />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
