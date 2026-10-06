import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FadeUp, LineReveal } from "@/components/Reveal";

const HousingCommunity = () => (
  <>
    <section className="pt-44 pb-20 md:pt-56 md:pb-24"><div className="max-w-[92rem] mx-auto px-5 md:px-10"><FadeUp><p className="text-acid text-sm font-bold uppercase tracking-[0.3em] mb-8">Housing & Community Support Birmingham</p></FadeUp><h1 className="font-display uppercase leading-[.88] tracking-tight text-[15vw] sm:text-[11vw] lg:text-[10rem]"><LineReveal className="text-white">Stability</LineReveal><LineReveal className="text-acid">Creates</LineReveal><LineReveal className="text-outline">Movement.</LineReveal></h1><FadeUp delay={.2}><p className="mt-12 max-w-3xl text-zinc-400 text-lg md:text-xl leading-relaxed">Forward Movement's charitable objects include relieving need through access to suitable accommodation and housing-related support, while promoting independence, stability and participation in society.</p></FadeUp></div></section>
    <section className="border-t border-white/10 py-24 md:py-32"><div className="max-w-[92rem] mx-auto px-5 md:px-10 grid gap-8 md:grid-cols-3">{["Suitable accommodation","Housing-related support","Community and independence"].map((title,i)=><FadeUp key={title} delay={i*.1}><article className="border-t border-white/10 pt-7"><span className="font-display text-3xl text-acid">0{i+1}</span><h2 className="mt-6 font-display uppercase text-3xl">{title}</h2><p className="mt-4 text-zinc-400 leading-relaxed">Part of a wider approach to relieving need, building stability and helping people participate more fully in their communities.</p></article></FadeUp>)}</div></section>
    <section className="bg-acid text-ink"><div className="max-w-[92rem] mx-auto px-5 md:px-10 py-20 flex flex-col md:flex-row gap-8 justify-between md:items-center"><div><h2 className="font-display uppercase text-5xl md:text-7xl leading-[.9]">Need to<br/>talk?</h2><p className="mt-5 max-w-xl text-lg font-medium">Contact us about housing-related support, community partnerships or other enquiries.</p></div><Link to="/contact" className="inline-flex items-center gap-3 bg-ink text-acid font-bold uppercase tracking-widest px-8 py-5">Contact Forward Movement <ArrowRight /></Link></div></section>
  </>
);
export default HousingCommunity;
