import TextReveal from "@/components/ui/TextReveal";
import Reveal from "@/components/ui/Reveal";

const tenets = [
  {
    n: "01",
    title: "Built to outlast",
    body: "Heavyweight fabrics, reinforced seams, and patterns cut to be worn for a decade — not a season.",
  },
  {
    n: "02",
    title: "Culture, not logos",
    body: "We borrow from subculture, folklore, and the street. The meaning lives in the garment, not a label.",
  },
  {
    n: "03",
    title: "Made with intent",
    body: "Small runs, named makers, honest materials. Nothing arbitrary, nothing wasted, nothing loud for its own sake.",
  },
];

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative overflow-hidden bg-ink px-5 py-24 text-bone md:px-10 md:py-36"
    >
      <span className="label text-bone/50">Manifesto — 03</span>

      <div className="mt-10 max-w-[18ch]">
        <TextReveal
          as="p"
          text="We don't make clothes."
          className="font-display block whitespace-nowrap text-[clamp(2.2rem,8vw,7rem)] leading-[0.92]"
        />
        <TextReveal
          as="p"
          text="We make arguments"
          className="font-display block whitespace-nowrap text-[clamp(2.2rem,8vw,7rem)] leading-[0.92]"
        />
        <TextReveal
          as="p"
          text="you can wear."
          className="font-display block whitespace-nowrap text-[clamp(2.2rem,8vw,7rem)] leading-[0.92] text-accent"
        />
      </div>

      <div className="mt-20 grid grid-cols-1 gap-10 border-t border-bone/15 pt-10 md:grid-cols-3">
        {tenets.map((t, i) => (
          <Reveal key={t.n} delay={i * 0.1}>
            <div className="flex flex-col gap-3">
              <span className="font-display text-3xl text-accent">{t.n}</span>
              <h3 className="text-xl">{t.title}</h3>
              <p className="text-sm leading-relaxed text-bone/60">{t.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
