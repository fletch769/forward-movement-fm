import { Link } from "react-router-dom";

const NotFound = () => (
  <section className="pt-44 pb-32 md:pt-56 md:pb-40">
    <div className="max-w-[92rem] mx-auto px-5 md:px-10">
      <p className="text-acid text-sm font-bold uppercase tracking-[0.3em] mb-8">404 — Page not found</p>
      <h1 className="font-display uppercase leading-[0.88] tracking-tight text-[18vw] sm:text-[12vw] lg:text-[10rem]">
        <span className="text-white">Wrong</span><br />
        <span className="text-outline">Turn.</span>
      </h1>
      <p className="mt-10 max-w-2xl text-zinc-400 text-lg md:text-xl leading-relaxed">
        The page you are looking for does not exist. Use the links below to find your way around Forward Movement.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link to="/" className="bg-acid text-ink font-bold uppercase tracking-widest px-8 py-5">Back home</Link>
        <Link to="/programmes" className="border border-white/30 text-white font-bold uppercase tracking-widest px-8 py-5">Our programmes</Link>
        <Link to="/contact" className="border border-white/30 text-white font-bold uppercase tracking-widest px-8 py-5">Contact us</Link>
      </div>
    </div>
  </section>
);

export default NotFound;
