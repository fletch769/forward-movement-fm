import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FadeUp, LineReveal } from "@/components/Reveal";

const ArtsMedia = () => (
  <>
    <section className="pt-44 pb-20 md:pt-56 md:pb-24"><div className="max-w-[92rem] mx-auto px-5 md:px-10"><FadeUp><p className="text-acid text-sm font-bold uppercase tracking-[0.3em] mb-8">Performing Arts & Media Birmingham</p></FadeUp><h1 className="font-display uppercase leading-[.88] tracking-tight text-[15vw] sm:text-[11vw] lg:text-[10rem]"><LineReveal className="text-white">Make</LineReveal><LineReveal className="text-acid">Something</LineReveal><LineReveal className="text-outline">Move.</LineReveal></h1><FadeUp delay={.2}><p className="mt-12 max-w-3xl text-zinc-400 text-lg md:text-xl leading-relaxed">Forward Movement's charitable objects include opportunities in the performing arts, media and entertainment production, alongside sport and culture. We believe creative participation can open doors to skills, confidence and practical experience.</p></FadeUp></div></section>
    <section className="border-t border-white/10 py-24 md:py-32"><div className="max-w-[92rem] mx-auto px-5 md:px-10 grid gap-10 md:grid-cols-2"><FadeUp><h2 className="font-display uppercase text-5xl md:text-7xl leading-[.9]">Creative<br/><span className="text-outline">pathways.</span></h2></FadeUp><FadeUp delay={.15}><div className="space-y-7 text-zinc-400 text-lg leading-relaxed"><p>Our work can connect people with performing arts, media, entertainment, sport and culture.</p><p>We aim to help participants learn, create, take part and develop practical skills that can contribute to wider personal and employment goals.</p><p>We also welcome conversations with venues, studios, schools, businesses and community organisations interested in building opportunities together.</p></div></FadeUp></div></section>
    <section className="bg-acid text-ink"><div className="max-w-[92rem] mx-auto px-5 md:px-10 py-20 flex flex-col md:flex-row gap-8 justify-between md:items-center"><h2 className="font-display uppercase text-5xl md:text-7xl leading-[.9]">Create<br/>your<br/>next move.</h2><Link to="/get-involved" className="inline-flex items-center gap-3 bg-ink text-acid font-bold uppercase tracking-widest px-8 py-5">Get involved <ArrowRight /></Link></div></section>
  </>
);
export default ArtsMedia;
