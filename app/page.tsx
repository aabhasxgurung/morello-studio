import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import Featured from "@/components/sections/Featured";
import Categories from "@/components/sections/Categories";
import MansionDrop from "@/components/sections/MansionDrop";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Featured />
      <Categories />
      <MansionDrop />
      <CTA />
    </>
  );
}
