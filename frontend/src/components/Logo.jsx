import { Link } from "react-router-dom";

export const LogoMark = ({ size = 40 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect width="64" height="64" fill="#E0FF00" />
    <path
      d="M12 16l20 16-20 16"
      fill="none"
      stroke="#050505"
      strokeWidth="9"
      strokeLinecap="square"
    />
    <path
      d="M34 16l20 16-20 16"
      fill="none"
      stroke="#050505"
      strokeWidth="9"
      strokeLinecap="square"
    />
  </svg>
);

const Logo = () => (
  <Link
    to="/"
    className="flex items-center gap-3 group"
    data-testid="logo-link"
  >
    <LogoMark />
    <span className="font-display uppercase leading-[0.9] tracking-tight text-xl text-white group-hover:text-acid transition-colors duration-300">
      Forward
      <br />
      Movement
    </span>
  </Link>
);

export default Logo;
