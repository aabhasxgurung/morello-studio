import Marquee from "@/components/ui/Marquee";

export default function Ticker() {
  return (
    <section className="relative bg-accent py-5 text-bone">
      <Marquee
        items={[
          "MADE TO BE WORN",
          "MADE TO MEAN SOMETHING",
          "VOL. 03 OUT NOW",
          "NO LOGOS, JUST LANGUAGE",
        ]}
        duration={30}
        separator="●"
      />
    </section>
  );
}
