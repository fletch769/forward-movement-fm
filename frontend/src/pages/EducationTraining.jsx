import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FadeUp, LineReveal } from "@/components/Reveal";

const EducationTraining = () => (
  <>
    <section className="pt-44 pb-20 md:pt-56 md:pb-24">
      <div className="max-w-[92rem] mx-auto px-5 md:px-10">
        <FadeUp><p className="text-acid text-sm font-bold uppercase tracking-[0.3em] mb-8">Education & Training in Birmingham</p></FadeUp>
        <h1 className="font-display uppercase leading-[0.88] tracking-tight text-[15vw] sm:text-[11vw] lg:text-[10rem]"><LineReveal className="text-white">Skills</LineReveal><LineReveal className="text-acid">Confidence</LineReveal><LineReveal className="text-outline">Opportunity.</LineReveal></h1>
        <FadeUp delay={0.2}><p className="mt-12 max-w-3xl text-zinc-400 text-lg md:text-xl leading-relaxed">Forward Movement promotes education, training, mentoring and development opportunities for young people and people in need, with a focus on building skills, capability, confidence and independence.</p></FadeUp>
      </div>
    </section>
    <section className="border-t border-white/10 py-24 md:py-32">
      <div className="max-w-[92rem] mx-auto px-5 md:px-10">
        <div className="grid gap-8 md:grid-cols-3">
          {["Education and lifelong learning","Practical training and development","Employability, enterprise and independence"].map((title,i)=><FadeUp key={title} delay={i*.1}><article className="border border-white/10 bg-coal p-8 min-h-56"><span className="font-display text-3xl text-acid">0{i+1}</span><h2 className="mt-8 font-display uppercase text-3xl leading-none">{title}</h2><p className="mt-5 text-zinc-400 leading-relaxed">Opportunities designed around our charitable objects and the needs of the people and communities we aim to serve.</p></article></FadeUp>)}
        </div>
      </div>
    </section>
    <section className="bg-acid text-ink"><div className="max-w-[92rem] mx-auto px-5 md:px-10 py-20 flex flex-col md:flex-row gap-8 justify-between md:items-center"><h2 className="font-display uppercase text-5xl md:text-7xl leading-[.9]">Learn.<br/>Create.<br/>Progress.</h2><Link to="/contact" className="inline-flex items-center gap-3 bg-ink text-acid font-bold uppercase tracking-widest px-8 py-5">Talk to us <ArrowRight /></Link></div></section>
  </>
);
export default EducationTraining;
