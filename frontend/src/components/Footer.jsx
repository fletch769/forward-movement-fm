import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS } from "@/constants";

const Footer = () => (
  <footer className="border-t border-white/10 bg-ink" data-testid="site-footer">
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20 grid gap-12 md:grid-cols-12">
      <div className="md:col-span-5 space-y-6">
        <Logo />
        <p className="text-zinc-400 text-sm md:text-base max-w-sm leading-relaxed">
          Advancing in life and relieving the needs of young people and people
          in need — through arts, media, sport, education, housing support and
          community.
        </p>
      </div>
      <div className="md:col-span-3">
        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-5">
          Explore
        </p>
        <ul className="space-y-3">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm font-semibold uppercase tracking-widest text-zinc-300 hover:text-acid transition-colors duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:col-span-4">
        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-5">
          Contact
        </p>
        <a
          href="https://www.forwardmovement.org.uk"
          data-testid="footer-website-link"
          className="inline-flex items-center gap-2 text-white font-semibold hover:text-acid transition-colors duration-300"
        >
          www.forwardmovement.org.uk
          <ArrowUpRight className="w-4 h-4 shrink-0" />
        </a>
        <br />
        <a
          href="mailto:contact@forwardmovement.org.uk"
          data-testid="footer-email-link"
          className="inline-flex items-center gap-2 mt-3 text-white font-semibold hover:text-acid transition-colors duration-300 break-all"
        >
          contact@forwardmovement.org.uk
          <ArrowUpRight className="w-4 h-4 shrink-0" />
        </a>
        <p className="mt-6 text-zinc-500 text-sm leading-relaxed">
          Registered Charity No. 1191828
          <br />
          England &amp; Wales
        </p>
      </div>
    </div>
    <div className="overflow-hidden border-t border-white/10" aria-hidden="true">
      <p className="font-display uppercase whitespace-nowrap leading-[0.85] tracking-tight text-[13vw] text-outline-white text-center py-6 select-none">
        Forward Movement
      </p>
    </div>
    <div className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-6 flex flex-col sm:flex-row gap-2 justify-between text-xs text-zinc-500 uppercase tracking-widest">
        <span>© 2026 Forward Movement</span>
        <span data-testid="footer-charity-number">
          Registered Charity No. 1191828
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
