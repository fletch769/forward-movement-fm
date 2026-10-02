import Marquee from "react-fast-marquee";
import { Asterisk } from "lucide-react";

const ITEMS = [
  "Forward Movement",
  "Performing Arts",
  "Media & Entertainment",
  "Sport & Culture",
  "Education & Mentoring",
  "Housing Support",
  "Community",
];

const EditorialMarquee = ({ inverted = false }) => (
  <div
    className="border-y border-white/10 py-5 md:py-8 overflow-hidden select-none"
    data-testid="editorial-marquee"
  >
    <Marquee speed={35} gradient={false}>
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span
            className={`font-display uppercase leading-none tracking-tight text-5xl md:text-7xl lg:text-8xl px-4 md:px-8 ${
              inverted ? "text-acid" : "text-outline"
            }`}
          >
            {item}
          </span>
          <Asterisk
            className="w-8 h-8 md:w-12 md:h-12 text-acid shrink-0"
            strokeWidth={1.5}
          />
        </span>
      ))}
    </Marquee>
  </div>
);

export default EditorialMarquee;
