import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FadeUp, LineReveal } from "@/components/Reveal";

const YouthSupport = () => (
  <>
    <section className="pt-44 pb-20 md:pt-56 md:pb-24">
      <div className="max-w-[92rem] mx-auto px-5 md:px-10">
        <FadeUp><p className="text-acid text-sm font-bold uppercase tracking-[0.3em] mb-8">Birmingham Youth Support</p></FadeUp>
        <h1 className="font-display uppercase leading-[0.88] tracking-tight text-[15vw] sm:text-[11vw] lg:text-[10rem]">
          <LineReveal className="text-white">Move</LineReveal>
          <LineReveal className="text-acid">Young People</LineReveal>
          <LineReveal className="text-outline">Forward.</LineReveal>
        </h1>
        <FadeUp delay={0.2}><p className="mt-12 max-w-3xl text-zinc-400 text-lg md:text-xl leading-relaxed">Forward Movement is a registered Birmingham charity supporting young people and people in need through education, training, mentoring, creative opportunities, sport, housing-related support and community programmes.</p></FadeUp>
      </div>
    </section>
    <section className="border-t border-white/10 py-24 md:py-32">
      <div className="max-w-[92rem] mx-auto px-5 md:px-10 grid gap-12 md:grid-cols-2">
        {[
          ["Education & skills","We promote education, training and practical development that can build confidence, capability and independence."],
          ["Arts, media & sport","Our charitable work includes opportunities connected with performing arts, media, entertainment, sport and culture."],
          ["Employability & independence","We support personal development, employability, enterprise and independent living as part of a wider pathway forward."],
          ["Community & housing","Our objects include community projects and facilities, alongside access to suitable accommodation and housing-related support."]
        ].map(([title,text],i)=><FadeUp key={title} delay={i*.08}><article className="border-t border-white/10 pt-7"><h2 className="font-display uppercase text-3xl md:text-4xl text-white">{title}</h2><p className="mt-5 text-zinc-400 text-lg leading-relaxed">{text}</p></article></FadeUp>)}
      </div>
    </section>
    <section className="bg-acid text-ink">
      <div className="max-w-[92rem] mx-auto px-5 md:px-10 py-20 md:py-28 flex flex-col md:flex-row gap-10 justify-between md:items-center">
        <div><h2 className="font-display uppercase text-5xl md:text-7xl leading-[.9]">Find your<br/>next move.</h2><p className="mt-6 max-w-xl text-lg font-medium">Explore our programmes or contact Forward Movement about opportunities, partnerships and support.</p></div>
        <Link to="/programmes" className="inline-flex items-center gap-3 bg-ink text-acid font-bold uppercase tracking-widest px-8 py-5">Explore programmes <ArrowRight /></Link>
      </div>
    </section>
  </>
);
export default YouthSupport;
