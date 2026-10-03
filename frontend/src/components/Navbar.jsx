import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS } from "@/constants";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[70] transition-colors duration-300 ${
          scrolled || open
            ? "bg-ink/95 backdrop-blur-md border-b border-white/10"
            : "bg-transparent border-b border-transparent"
        }`}
        data-testid="site-header"
      >
        <div className="max-w-[92rem] mx-auto px-5 md:px-10 h-24 flex items-center justify-between">
          <Logo />
          <nav
            className="hidden lg:flex items-center gap-10"
            data-testid="desktop-nav"
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={({ isActive }) =>
                  `text-base font-bold uppercase tracking-widest transition-colors duration-300 ${
                    isActive ? "text-acid" : "text-zinc-400 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              data-testid="nav-cta-button"
              className="flex items-center gap-2 bg-acid text-ink font-bold uppercase tracking-widest text-base px-7 py-3.5 hover:bg-acid-hover hover:-translate-y-0.5 transition-all duration-300"
            >
              Talk To Us
              <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
            </Link>
          </nav>
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            data-testid="mobile-menu-toggle"
          >
            {open ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-ink flex flex-col justify-center px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            data-testid="mobile-menu"
          >
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={link.to}
                    data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className={({ isActive }) =>
                      `font-display uppercase text-6xl sm:text-7xl leading-tight tracking-tight transition-colors duration-300 ${
                        isActive ? "text-acid" : "text-white hover:text-acid"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <motion.p
              className="mt-12 text-zinc-500 text-sm uppercase tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Registered Charity No. 1191828
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
