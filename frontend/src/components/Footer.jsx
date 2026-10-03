import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS } from "@/constants";

const Footer = () => (
  <footer className="border-t border-white/10 bg-ink" data-testid="site-footer">
    <div className="max-w-[92rem] mx-auto px-5 md:px-10 py-20 md:py-24 grid gap-12 md:grid-cols-12">
      <div className="md:col-span-5 space-y-6">
        <Logo />
        <p className="text-zinc-400 text-base md:text-lg max-w-md leading-relaxed">
          Advancing in life and relieving the needs of young people and people
          in need — through arts, media, sport, education, housing support and
          community.
        </p>
      </div>
      <div className="md:col-span-3">
        <p className="text-sm uppercase tracking-widest text-zinc-500 mb-6">
          Explore
        </p>
        <ul className="space-y-4">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-base font-bold uppercase tracking-widest text-zinc-300 hover:text-acid transition-colors duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:col-span-4">
        <p className="text-sm uppercase tracking-widest text-zinc-500 mb-6">
          Contact
        </p>
        <a
          href="mailto:contact@forwardmovement.org.uk"
          data-testid="footer-email-link"
          className="inline-flex items-center gap-2 mt-3 text-lg text-white font-semibold hover:text-acid transition-colors duration-300 break-all"
        >
          contact@forwardmovement.org.uk
          <ArrowUpRight className="w-5 h-5 shrink-0" />
        </a>
        <p className="mt-8 text-zinc-500 text-base leading-relaxed">
          Registered Charity No. 1191828
          <br />
          England &amp; Wales
        </p>
      </div>
    </div>
    <div className="overflow-hidden border-t border-white/10" aria-hidden="true">
      <p className="font-display uppercase whitespace-nowrap leading-[0.85] tracking-tight text-[14vw] text-outline-white text-center py-8 select-none">
        Forward Movement
      </p>
    </div>
    <div className="border-t border-white/10">
      <div className="max-w-[92rem] mx-auto px-5 md:px-10 py-7 flex flex-col sm:flex-row gap-2 justify-between text-sm text-zinc-500 uppercase tracking-widest">
        <span>© 2026 Forward Movement</span>
        <span data-testid="footer-charity-number">
          Registered Charity No. 1191828
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
