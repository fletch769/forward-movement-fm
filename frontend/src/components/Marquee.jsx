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
    className="border-y border-white/10 py-6 md:py-10 overflow-hidden select-none"
    data-testid="editorial-marquee"
  >
    <Marquee speed={35} gradient={false}>
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span
            className={`font-display uppercase leading-none tracking-tight text-6xl md:text-8xl lg:text-9xl px-5 md:px-10 ${
              inverted ? "text-acid" : "text-outline"
            }`}
          >
            {item}
          </span>
          <Asterisk
            className="w-10 h-10 md:w-14 md:h-14 text-acid shrink-0"
            strokeWidth={1.5}
          />
        </span>
      ))}
    </Marquee>
  </div>
);

export default EditorialMarquee;
