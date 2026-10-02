import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { LineReveal, FadeUp } from "@/components/Reveal";
import EditorialMarquee from "@/components/Marquee";

const WAYS = [
  {
    n: "01",
    title: "Volunteer",
    text: "Give your time, your skills and your energy. From mentoring young people to helping run sessions and events — every hour moves someone forward.",
    cta: "Become a volunteer",
  },
  {
    n: "02",
    title: "Partner With Us",
    text: "Studios, venues, schools, businesses and community organisations — let's build programmes, spaces and opportunities together.",
    cta: "Start a partnership",
  },
  {
    n: "03",
    title: "Join a Programme",
    text: "Are you a young person or someone in need of support? Take part, learn something new and build your confidence with us.",
    cta: "Take part",
  },
];

const GetInvolved = () => (
  <>
    <section className="pt-40 pb-16 md:pt-52 md:pb-20" data-testid="involved-header">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <FadeUp>
          <p className="text-acid text-xs font-bold uppercase tracking-[0.3em] mb-6">
            Get Involved
          </p>
        </FadeUp>
        <h1
          className="font-display uppercase leading-[0.88] tracking-tight text-[14vw] sm:text-[10vw] lg:text-[8rem]"
          data-testid="involved-heading"
        >
          <LineReveal delay={0.2} className="text-white">
            Move
          </LineReveal>
          <LineReveal delay={0.35} className="text-acid">
            With Us
          </LineReveal>
        </h1>
        <FadeUp delay={0.3}>
          <p className="mt-10 max-w-2xl text-zinc-400 text-base md:text-lg leading-relaxed">
            A movement only moves when people do. Three ways to be part of
            Forward Movement — pick yours.
          </p>
        </FadeUp>
      </div>
    </section>

    <section className="pb-24 md:pb-32" data-testid="involved-ways">
      <div className="max-w-7xl mx-auto px-5 md:px-8 border-b border-white/10">
        {WAYS.map((way, i) => (
          <FadeUp key={way.n} delay={i * 0.08}>
            <Link
              to="/contact"
              data-testid={`involved-card-${way.n}`}
              className="group grid gap-4 md:grid-cols-12 md:items-center py-10 md:py-14 border-t border-white/10 px-2 md:px-4 hover:bg-coal transition-colors duration-300"
            >
              <span className="md:col-span-1 font-display text-2xl text-outline-white group-hover:text-acid group-hover:[-webkit-text-stroke:0px] transition-all duration-300">
                {way.n}
              </span>
              <h2 className="md:col-span-4 font-display uppercase text-4xl md:text-5xl leading-[0.9] tracking-tight text-white group-hover:text-acid transition-colors duration-300">
                {way.title}
              </h2>
              <p className="md:col-span-5 text-zinc-400 text-sm md:text-base leading-relaxed">
                {way.text}
              </p>
              <span className="md:col-span-2 flex md:justify-end items-center gap-2 text-acid text-xs font-bold uppercase tracking-widest">
                {way.cta}
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </span>
            </Link>
          </FadeUp>
        ))}
      </div>
    </section>

    <EditorialMarquee inverted />

    <section className="bg-acid text-ink" data-testid="involved-cta">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-24 flex flex-col md:flex-row md:items-center gap-10 justify-between">
        <FadeUp>
          <h2 className="font-display uppercase leading-[0.9] tracking-tight text-4xl sm:text-5xl lg:text-6xl">
            Let&apos;s move.
            <br />
            Together.
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <Link
            to="/contact"
            data-testid="involved-contact-button"
            className="inline-flex items-center gap-3 bg-ink text-acid font-bold uppercase tracking-widest text-sm px-8 py-5 hover:translate-x-1 hover:-translate-y-1 transition-transform duration-300"
          >
            Contact Us
            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
          </Link>
        </FadeUp>
      </div>
    </section>
  </>
);

export default GetInvolved;
