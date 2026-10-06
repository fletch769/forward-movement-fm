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
import YouthSupport from "@/pages/YouthSupport";
import EducationTraining from "@/pages/EducationTraining";
import ArtsMedia from "@/pages/ArtsMedia";
import HousingCommunity from "@/pages/HousingCommunity";
import NotFound from "@/pages/NotFound";


const SITE_URL = "https://www.forwardmovement.org.uk";

const SEO = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const pages = {
      "/": {
        title: "Forward Movement | Birmingham Youth & Community Charity",
        description: "Birmingham charity supporting young people and communities through education, training, arts, sport, housing and community programmes.",
      },
      "/about": {
        title: "About Forward Movement | Birmingham Charity",
        description: "Learn about Forward Movement, a Birmingham charity supporting young people and people in need through education, training, arts, sport and housing support.",
      },
      "/programmes": {
        title: "Programmes | Forward Movement Birmingham",
        description: "Explore Forward Movement programmes for education, training, performing arts, media, sport, housing support, employability and community development.",
      },
      "/get-involved": {
        title: "Get Involved | Forward Movement",
        description: "Volunteer, partner or join Forward Movement programmes supporting young people and communities across Birmingham.",
      },
      "/contact": {
        title: "Contact Forward Movement | Birmingham Charity",
        description: "Contact Forward Movement about programmes, partnerships, volunteering, housing support and community opportunities in Birmingham.",
      },
      "/youth-support-birmingham": {
        title: "Youth Support Birmingham | Forward Movement",
        description: "Youth support in Birmingham through education, training, mentoring, arts, sport, housing-related support and community programmes.",
      },
      "/education-training-birmingham": {
        title: "Education & Training Birmingham | Forward Movement",
        description: "Education and training in Birmingham supporting skills, confidence, employability and independence for young people and people in need.",
      },
      "/performing-arts-media-birmingham": {
        title: "Performing Arts & Media Birmingham | Forward Movement",
        description: "Performing arts and media opportunities in Birmingham, alongside sport and culture, helping people build skills and practical experience.",
      },
      "/housing-community-support-birmingham": {
        title: "Housing & Community Support Birmingham | Forward Movement",
        description: "Housing and community support in Birmingham focused on suitable accommodation, stability, independence and participation.",
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
    setProperty("og:type", "website");
    setProperty("og:url", SITE_URL + (pathname === "/" ? "/" : pathname));
    setProperty("og:site_name", "Forward Movement");
    setProperty("og:image", SITE_URL + "/favicon.svg");
    setMeta("twitter:card", "summary");
    setMeta("twitter:title", page.title);
    setMeta("twitter:description", page.description);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = SITE_URL + (pathname === "/" ? "/" : pathname);

    const pageType = pathname === "/about" ? "AboutPage" : pathname === "/contact" ? "ContactPage" : "WebPage";
    const existingLd = document.getElementById("dynamic-seo-ld");
    if (existingLd) existingLd.remove();
    const ld = document.createElement("script");
    ld.id = "dynamic-seo-ld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": pageType,
      name: page.title,
      url: SITE_URL + (pathname === "/" ? "/" : pathname),
      description: page.description,
      isPartOf: { "@type": "WebSite", name: "Forward Movement", url: SITE_URL + "/" },
      publisher: { "@type": "NGO", name: "Forward Movement", url: SITE_URL + "/", identifier: "1191828" }
    });
    document.head.appendChild(ld);
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
            <Route path="/youth-support-birmingham" element={<YouthSupport />} />
            <Route path="/education-training-birmingham" element={<EducationTraining />} />
            <Route path="/performing-arts-media-birmingham" element={<ArtsMedia />} />
            <Route path="/housing-community-support-birmingham" element={<HousingCommunity />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-right" theme="dark" />
      </BrowserRouter>
    </div>
  );
}

export default App;
