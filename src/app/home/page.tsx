import AboutUs, { Stats } from "@/components/home/about-us";
import Contacts from "@/components/home/contacts";
import Hero from "@/components/home/hero";
import Partners from "@/components/home/partners";
import People from "@/components/home/people";
import Services from "@/components/home/services";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <AboutUs />
      <Stats />
      <People />
      <Partners />
      <Contacts />
    </>
  );
}
