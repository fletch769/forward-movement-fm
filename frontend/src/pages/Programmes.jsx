import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { LineReveal, FadeUp } from "@/components/Reveal";
import EditorialMarquee from "@/components/Marquee";
import { IMAGES } from "@/constants";

const CARDS = [
  {
    n: "01",
    title: "Skills & Mentoring",
    tag: "Education & Training",
    text: "Education, training, mentoring and development opportunities that build skills, capabilities, confidence and independence.",
    img: IMAGES.mentoring,
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    n: "02",
    title: "Arts, Media & Entertainment",
    tag: "Create & Perform",
    text: "Opportunities to learn, participate, create and gain practical experience in the performing arts, media and entertainment production.",
    img: IMAGES.arts,
    span: "lg:col-span-2",
  },
  {
    n: "03",
    title: "Sport & Culture",
    tag: "Get Active",
    text: "Sport, culture and creativity — activities that connect people and open doors into related industries.",
    span: "lg:col-span-1",
  },
  {
    n: "04",
    title: "Breaking Barriers",
    tag: "Employability & Enterprise",
    text: "Programmes that promote personal development, employability, enterprise, social inclusion and independent living.",
    span: "lg:col-span-1",
  },
  {
    n: "05",
    title: "Housing & Stability",
    tag: "Accommodation Support",
    text: "Access to suitable accommodation and housing-related support for young people and people in need — relieving need and promoting independence, stability and participation in society.",
    span: "lg:col-span-2",
  },
  {
    n: "06",
    title: "Community Spaces",
    tag: "Facilities & Projects",
    text: "Community facilities, projects and activities that bring people together, create opportunities and strengthen communities.",
    img: IMAGES.community,
    span: "lg:col-span-2",
  },
];

const BentoCard = ({ card, index }) => (
  <FadeUp delay={index * 0.07} className={card.span}>
    <div
      className={`group relative h-full min-h-[300px] border border-white/10 overflow-hidden bg-coal p-7 md:p-9 flex flex-col justify-between ${
        card.img ? "" : "hover:border-acid/60"
      } transition-colors duration-300`}
      data-testid={`programme-card-${card.n}`}
    >
      {card.img && (
        <>
          <img
            src={card.img}
            alt=""
            className="absolute inset-0 w-full h-full object-cover img-grit opacity-35 group-hover:opacity-55 group-hover:scale-105 transition-all duration-700"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(5,5,5,0.95) 8%, rgba(5,5,5,0.3) 65%)",
            }}
          />
        </>
      )}
      <div className="relative flex items-start justify-between gap-4">
        <span className="inline-block border border-acid/50 text-acid text-xs font-bold uppercase tracking-[0.2em] px-4 py-2">
          {card.tag}
        </span>
        <span className="font-display text-4xl md:text-5xl text-outline-white group-hover:text-acid group-hover:[-webkit-text-stroke:0px] transition-all duration-300">
          {card.n}
        </span>
      </div>
      <div className="relative mt-20">
        <h3 className="font-display uppercase text-4xl md:text-5xl leading-[0.95] tracking-tight text-white">
          {card.title}
        </h3>
        <p className="mt-5 text-base md:text-lg text-zinc-400 leading-relaxed max-w-lg">
          {card.text}
        </p>
      </div>
    </div>
  </FadeUp>
);

const Programmes = () => (
  <>
    <section className="pt-44 pb-24 md:pt-56 md:pb-28" data-testid="programmes-header">
      <div className="max-w-[92rem] mx-auto px-5 md:px-10">
        <FadeUp>
          <p className="text-acid text-sm font-bold uppercase tracking-[0.3em] mb-8">
            What We Do
          </p>
        </FadeUp>
        <h1
          className="font-display uppercase leading-[0.88] tracking-tight text-[15vw] sm:text-[11vw] lg:text-[10rem]"
          data-testid="programmes-heading"
        >
          <LineReveal delay={0.2} className="text-white">
            Programmes
          </LineReveal>
          <LineReveal delay={0.35} className="text-outline">
            That Move
          </LineReveal>
        </h1>
        <FadeUp delay={0.3}>
          <p className="mt-12 max-w-3xl text-zinc-400 text-lg md:text-xl leading-relaxed">
            Six ways we help young people and people in need build skills,
            confidence and independence — from the studio to the sports pitch,
            from a first job to a front door of your own.
          </p>
        </FadeUp>
      </div>
    </section>

    <section className="pb-28 md:pb-36" data-testid="programmes-bento">
      <div className="max-w-[92rem] mx-auto px-5 md:px-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(280px,auto)]">
          {CARDS.map((card, i) => (
            <BentoCard key={card.n} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>

    <EditorialMarquee />

    <section className="bg-acid text-ink" data-testid="programmes-cta">
      <div className="max-w-[92rem] mx-auto px-5 md:px-10 py-24 md:py-28 flex flex-col md:flex-row md:items-center gap-12 justify-between">
        <FadeUp>
          <h2 className="font-display uppercase leading-[0.9] tracking-tight text-5xl sm:text-6xl lg:text-7xl">
            Want to take part?
          </h2>
          <p className="mt-6 max-w-lg text-ink/70 text-lg md:text-xl font-medium">
            Tell us who you are and what you need — we will point you at the
            right programme.
          </p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <Link
            to="/contact"
            data-testid="programmes-contact-button"
            className="inline-flex items-center gap-3 bg-ink text-acid font-bold uppercase tracking-widest text-base px-10 py-6 hover:translate-x-1 hover:-translate-y-1 transition-transform duration-300"
          >
            Contact Us
            <ArrowRight className="w-6 h-6" strokeWidth={2.5} />
          </Link>
        </FadeUp>
      </div>
    </section>
  </>
);

export default Programmes;
