import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { LineReveal, FadeUp } from "@/components/Reveal";
import EditorialMarquee from "@/components/Marquee";
import { IMAGES } from "@/constants";

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 50, damping: 20 });
  const py = useSpring(my, { stiffness: 50, damping: 20 });

  const handleMouse = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 28);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 28);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouse}
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      data-testid="hero-section"
    >
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <motion.img
          src={IMAGES.hero}
          alt="Young people from the community standing together"
          className="w-full h-[115%] object-cover img-grit opacity-45 scale-110"
          style={{ x: px, y: py }}
        />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, #050505 6%, rgba(5,5,5,0.5) 45%, rgba(5,5,5,0.72) 100%)",
        }}
      />
      <div className="relative max-w-[92rem] mx-auto px-5 md:px-10 w-full pb-28 md:pb-36 pt-48">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mb-10"
        >
          <span
            className="inline-block border border-acid/50 text-acid text-xs md:text-sm font-bold uppercase tracking-[0.25em] px-5 py-2.5"
            data-testid="hero-charity-badge"
          >
            Registered Charity No. 1191828
          </span>
        </motion.div>
        <h1
          className="font-display uppercase leading-[0.88] tracking-tight text-[19vw] sm:text-[15vw] lg:text-[11.5rem]"
          data-testid="hero-heading"
        >
          <LineReveal delay={0.35} className="text-outline">
            We Move
          </LineReveal>
          <LineReveal delay={0.5} className="text-white">
            People
          </LineReveal>
          <LineReveal delay={0.65} className="text-acid">
            Forward.
          </LineReveal>
        </h1>
        <motion.p
          className="mt-10 max-w-2xl text-zinc-300 text-lg md:text-xl leading-relaxed"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          data-testid="hero-subtext"
        >
          Forward Movement helps young people and people in need build skills,
          confidence and independence — through performing arts, media, sport,
          education, housing support and community.
        </motion.p>
        <motion.div
          className="mt-12 flex flex-wrap gap-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.8 }}
        >
          <Link
            to="/programmes"
            data-testid="hero-programmes-button"
            className="inline-flex items-center gap-3 bg-acid text-ink font-bold uppercase tracking-widest text-base px-9 py-5 hover:bg-acid-hover hover:-translate-y-0.5 transition-all duration-300"
          >
            Our Programmes
            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
          </Link>
          <Link
            to="/get-involved"
            data-testid="hero-involved-button"
            className="inline-flex items-center gap-3 border border-white/30 text-white font-bold uppercase tracking-widest text-base px-9 py-5 hover:border-acid hover:text-acid transition-all duration-300"
          >
            Get Involved
            <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const FACTS = [
  { value: "1191828", label: "Registered charity number" },
  { value: "05", label: "Charitable objects driving everything we do" },
  { value: "100%", label: "Community powered, barrier breaking" },
];

const FactsStrip = () => (
  <section className="border-b border-white/10" data-testid="facts-strip">
    <div className="max-w-[92rem] mx-auto px-5 md:px-10 grid sm:grid-cols-3">
      {FACTS.map((fact, i) => (
        <FadeUp
          key={fact.label}
          delay={i * 0.1}
          className={`py-12 md:py-16 sm:px-10 first:pl-0 ${
            i > 0 ? "sm:border-l border-white/10" : ""
          }`}
        >
          <p className="font-display text-5xl md:text-7xl text-acid leading-none">
            {fact.value}
          </p>
          <p className="mt-4 text-zinc-400 text-base uppercase tracking-widest">
            {fact.label}
          </p>
        </FadeUp>
      ))}
    </div>
  </section>
);

const Mission = () => (
  <section className="py-28 md:py-40" data-testid="mission-section">
    <div className="max-w-[92rem] mx-auto px-5 md:px-10 grid gap-16 md:grid-cols-12 items-center">
      <div className="md:col-span-7">
        <FadeUp>
          <p className="text-acid text-sm font-bold uppercase tracking-[0.3em] mb-8">
            The Mission
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display uppercase leading-[0.95] tracking-tight text-5xl sm:text-6xl lg:text-7xl">
            Built in the community.
            <br />
            <span className="text-outline">Run for the community.</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="mt-10 text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl">
            We exist to advance in life and relieve the needs of young people
            and people in need. That means real education, training and
            mentoring. Real opportunities in the performing arts, media,
            entertainment, sport and culture. Real support with housing,
            employability and independent living — and real community spaces
            that bring people together.
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <Link
            to="/about"
            data-testid="mission-about-link"
            className="mt-12 inline-flex items-center gap-3 text-acid font-bold uppercase tracking-widest text-base group"
          >
            <span className="border-b border-acid pb-1">Read our objects</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </FadeUp>
      </div>
      <div className="md:col-span-5">
        <FadeUp delay={0.15}>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full border border-acid/40" />
            <img
              src={IMAGES.portrait}
              alt="Street art portrait on an urban wall"
              className="relative w-full aspect-[4/5] object-cover img-grit"
              data-testid="mission-image"
            />
          </div>
        </FadeUp>
      </div>
    </div>
  </section>
);

const PREVIEW = [
  {
    n: "01",
    title: "Arts, Media & Entertainment",
    text: "Learn, participate, create and gain real practical experience in the performing arts, media and entertainment production.",
    img: IMAGES.arts,
  },
  {
    n: "02",
    title: "Skills & Mentoring",
    text: "Education, training and mentoring that builds skills, capabilities, confidence and independence.",
    img: IMAGES.mentoring,
  },
  {
    n: "03",
    title: "Community & Housing",
    text: "Community projects, facilities and housing-related support that create stability and bring people together.",
    img: IMAGES.community,
  },
];

const ProgrammesPreview = () => (
  <section className="py-28 md:py-36 border-t border-white/10" data-testid="programmes-preview">
    <div className="max-w-[92rem] mx-auto px-5 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-8 mb-16">
        <FadeUp>
          <p className="text-acid text-sm font-bold uppercase tracking-[0.3em] mb-5">
            What We Do
          </p>
          <h2 className="font-display uppercase leading-[0.95] tracking-tight text-5xl sm:text-6xl lg:text-7xl">
            Programmes that
            <br />
            open doors
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <Link
            to="/programmes"
            data-testid="preview-all-programmes-link"
            className="inline-flex items-center gap-2 border border-white/30 text-white font-bold uppercase tracking-widest text-base px-7 py-4 hover:border-acid hover:text-acid transition-all duration-300"
          >
            All Programmes
            <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
          </Link>
        </FadeUp>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {PREVIEW.map((card, i) => (
          <FadeUp key={card.n} delay={i * 0.12}>
            <Link
              to="/programmes"
              data-testid={`preview-card-${card.n}`}
              className="group relative block h-[28rem] border border-white/10 overflow-hidden bg-coal"
            >
              <img
                src={card.img}
                alt={`${card.title} programme image`}
                className="absolute inset-0 w-full h-full object-cover img-grit opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(5,5,5,0.95) 10%, rgba(5,5,5,0.25) 60%)",
                }}
              />
              <div className="relative h-full flex flex-col justify-between p-7">
                <span className="font-display text-3xl text-acid">{card.n}</span>
                <div>
                  <h3 className="font-display uppercase text-3xl md:text-4xl leading-none tracking-tight text-white">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-base text-zinc-400 leading-relaxed">
                    {card.text}
                  </p>
                </div>
              </div>
            </Link>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

const InvolvedBand = () => (
  <section className="bg-acid text-ink" data-testid="involved-band">
    <div className="max-w-[92rem] mx-auto px-5 md:px-10 py-24 md:py-32 flex flex-col md:flex-row md:items-center gap-12 justify-between">
      <FadeUp>
        <h2 className="font-display uppercase leading-[0.9] tracking-tight text-6xl sm:text-7xl lg:text-8xl">
          Ready to
          <br />
          move?
        </h2>
        <p className="mt-8 max-w-lg text-ink/70 text-lg md:text-xl font-medium leading-relaxed">
          Volunteer, partner with us, or join a programme. However you show up —
          show up. The movement needs you.
        </p>
      </FadeUp>
      <FadeUp delay={0.15}>
        <Link
          to="/get-involved"
          data-testid="band-involved-button"
          className="inline-flex items-center gap-3 bg-ink text-acid font-bold uppercase tracking-widest text-base px-10 py-6 hover:translate-x-1 hover:-translate-y-1 transition-transform duration-300"
        >
          Get Involved
          <ArrowRight className="w-6 h-6" strokeWidth={2.5} />
        </Link>
      </FadeUp>
    </div>
  </section>
);

const Home = () => (
  <>
    <Hero />
    <EditorialMarquee />
    <FactsStrip />
    <Mission />
    <ProgrammesPreview />
    <EditorialMarquee inverted />
    <InvolvedBand />
  </>
);

export default Home;
