import { Quote } from "lucide-react";
import { LineReveal, FadeUp } from "@/components/Reveal";
import EditorialMarquee from "@/components/Marquee";

const OBJECTS = [
  {
    n: "01",
    title: "Education, Training & Mentoring",
    text: "Providing education, training, mentoring, support and development opportunities to help people develop their skills, capabilities, confidence and independence.",
  },
  {
    n: "02",
    title: "Arts, Media, Sport & Culture",
    text: "Providing and facilitating activities and opportunities in the performing arts, media, entertainment, sport, culture, creativity and related industries — including opportunities to learn, participate, create and gain practical experience.",
  },
  {
    n: "03",
    title: "Breaking Barriers",
    text: "Supporting people to overcome barriers to participation in society, including through programmes that promote personal development, employability, enterprise, social inclusion and independent living.",
  },
  {
    n: "04",
    title: "Housing & Stability",
    text: "Providing, facilitating or supporting access to suitable accommodation and housing-related support for young people and people in need, where this helps to relieve their needs, promote independence, stability and participation in society.",
  },
  {
    n: "05",
    title: "Community & Connection",
    text: "Developing and supporting community facilities, projects and activities that bring people together, create opportunities and strengthen communities.",
  },
];

const About = () => (
  <>
    <section className="pt-40 pb-20 md:pt-52 md:pb-28" data-testid="about-header">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <FadeUp>
          <p className="text-acid text-xs font-bold uppercase tracking-[0.3em] mb-6">
            About Us
          </p>
        </FadeUp>
        <h1
          className="font-display uppercase leading-[0.88] tracking-tight text-[15vw] sm:text-[11vw] lg:text-[8.5rem]"
          data-testid="about-heading"
        >
          <LineReveal delay={0.2} className="text-white">
            The
          </LineReveal>
          <LineReveal delay={0.35} className="text-outline">
            Movement
          </LineReveal>
        </h1>
        <FadeUp delay={0.3}>
          <p className="mt-10 max-w-2xl text-zinc-400 text-base md:text-lg leading-relaxed">
            Forward Movement is a registered charity (No. 1191828) working to
            advance in life and relieve the needs of young people and people in
            need. We started in the performing arts, media and entertainment —
            and we are growing into something bigger: education, employability,
            housing support and community.
          </p>
        </FadeUp>
      </div>
    </section>

    <EditorialMarquee />

    <section className="py-24 md:py-32" data-testid="about-origin">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <FadeUp>
            <h2 className="font-display uppercase text-4xl md:text-5xl leading-[0.95] tracking-tight">
              Where we
              <br />
              <span className="text-acid">started</span>
            </h2>
          </FadeUp>
        </div>
        <div className="md:col-span-8">
          <FadeUp delay={0.1}>
            <div className="border border-white/10 bg-coal p-8 md:p-12 relative">
              <Quote className="w-10 h-10 text-acid mb-6" strokeWidth={1.5} />
              <p className="text-lg md:text-2xl text-zinc-200 leading-relaxed font-medium">
                To advance in life and relieve the needs of young people by
                providing support and activities focused on the performing arts,
                media and entertainment production — to help develop their
                skills, capabilities and to enable them to participate in
                society as mature and responsible individuals.
              </p>
              <p className="mt-6 text-xs uppercase tracking-widest text-zinc-500">
                Our current charitable object
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32 border-t border-white/10" data-testid="objects-section">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <FadeUp>
          <p className="text-acid text-xs font-bold uppercase tracking-[0.3em] mb-4">
            For Public Benefit
          </p>
          <h2 className="font-display uppercase leading-[0.95] tracking-tight text-4xl sm:text-5xl lg:text-6xl mb-6">
            Our updated objects
          </h2>
          <p className="max-w-2xl text-zinc-400 text-base md:text-lg leading-relaxed mb-16">
            To advance in life and relieve the needs of young people and people
            in need by:
          </p>
        </FadeUp>
        <div>
          {OBJECTS.map((obj, i) => (
            <FadeUp key={obj.n} delay={i * 0.06}>
              <div
                className="grid gap-4 md:grid-cols-12 md:items-baseline py-8 md:py-10 border-t border-white/10 group hover:bg-coal transition-colors duration-300 px-2 md:px-4"
                data-testid={`object-item-${obj.n}`}
              >
                <span className="md:col-span-2 font-display text-4xl md:text-5xl text-outline group-hover:text-acid group-hover:[-webkit-text-stroke:0px] transition-all duration-300">
                  {obj.n}
                </span>
                <h3 className="md:col-span-4 font-display uppercase text-2xl md:text-3xl tracking-tight text-white">
                  {obj.title}
                </h3>
                <p className="md:col-span-6 text-zinc-400 text-sm md:text-base leading-relaxed">
                  {obj.text}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>

    <section className="border-t border-white/10 bg-coal" data-testid="charity-facts">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20 grid gap-10 sm:grid-cols-3">
        <FadeUp>
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">
            Registered Charity
          </p>
          <p className="font-display text-3xl md:text-4xl text-acid">1191828</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">
            Regulator
          </p>
          <p className="font-display text-3xl md:text-4xl text-white leading-tight">
            Charity Commission
          </p>
          <p className="text-zinc-500 text-sm mt-1">for England &amp; Wales</p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">
            Get In Touch
          </p>
          <a
            href="mailto:contact@forwardmovement.org.uk"
            data-testid="about-email-link"
            className="text-acid font-semibold hover:text-white transition-colors duration-300 break-all"
          >
            contact@forwardmovement.org.uk
          </a>
        </FadeUp>
      </div>
    </section>
  </>
);

export default About;
