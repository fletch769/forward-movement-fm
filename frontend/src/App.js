import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Programmes from "@/pages/Programmes";
import GetInvolved from "@/pages/GetInvolved";
import Contact from "@/pages/Contact";


const SITE_URL = "https://www.forwardmovement.org.uk";

const SEO = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const pages = {
      "/": {
        title: "Forward Movement | Birmingham Youth & Community Charity",
        description: "Forward Movement is a Birmingham charity supporting young people and communities through education, arts, sport, housing support and community programmes.",
      },
      "/about": {
        title: "About Forward Movement | Birmingham Charity",
        description: "Learn about Forward Movement, a registered Birmingham charity supporting young people and people in need through education, arts, sport, housing support and community work.",
      },
      "/programmes": {
        title: "Programmes | Forward Movement Birmingham",
        description: "Explore Forward Movement programmes supporting young people and communities through education, performing arts, media, sport, wellbeing, housing support and skills development.",
      },
      "/get-involved": {
        title: "Get Involved | Forward Movement",
        description: "Support Forward Movement through volunteering, partnerships, programme involvement and community action across Birmingham and beyond.",
      },
      "/contact": {
        title: "Contact Forward Movement | Birmingham Charity",
        description: "Contact Forward Movement about programmes, partnerships, volunteering, community support and opportunities to work together.",
      },
    };
    const page = pages[pathname] || pages["/"];
    document.title = page.title;
    const setMeta = (name, content) => {
      let el = document.querySelector('meta[name="' + name + '"]');
      if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    const setProperty = (property, content) => {
      let el = document.querySelector('meta[property="' + property + '"]');
      if (!el) { el = document.createElement("meta"); el.setAttribute("property", property); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", page.description);
    setMeta("robots", "index,follow,max-image-preview:large");
    setProperty("og:title", page.title);
    setProperty("og:description", page.description);
    setProperty("og:type", pathname === "/" ? "website" : "article");
    setProperty("og:url", SITE_URL + (pathname === "/" ? "/" : pathname));
    setProperty("og:site_name", "Forward Movement");
    setProperty("og:image", SITE_URL + "/favicon.svg");
    setMeta("twitter:card", "summary");
    setMeta("twitter:title", page.title);
    setMeta("twitter:description", page.description);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = SITE_URL + (pathname === "/" ? "/" : pathname);
  }, [pathname]);
  return null;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const GrainOverlay = () => (
  <div aria-hidden="true" className="grain-overlay" data-testid="grain-overlay" />
);

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App bg-ink text-white font-body">
      <BrowserRouter>
        <SEO />
        <ScrollToTop />
        <GrainOverlay />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programmes" element={<Programmes />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-right" theme="dark" />
      </BrowserRouter>
    </div>
  );
}

export default App;
