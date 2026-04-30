const AppLogo = ({ className = "", flat = false }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      className="origin-center transition-all duration-300 group-hover:scale-95"
      width="64"
      height="64"
      rx="16"
      fill={flat ? "#047857" : "url(#logo-bg)"}
    />
    <rect
      className="origin-center transition-transform duration-300 group-hover:scale-105"
      x="13"
      y="13"
      width="38"
      height="38"
      rx="12"
      fill="#ECFDF5"
      fillOpacity="0.96"
    />
    <path
      className="transition-all duration-300 group-hover:stroke-[#065F46]"
      d="M24 29.25L29.1 34.35L40.5 22.95"
      stroke="#047857"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
    />
    <path
      className="origin-center transition-transform duration-300 group-hover:translate-y-[-2px]"
      d="M19 43H41"
      stroke="#0F172A"
      strokeLinecap="round"
      strokeOpacity="0.82"
      strokeWidth="3"
    />
    <path
      className="origin-center transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110"
      d="M47 17V10M43.5 13.5H50.5"
      stroke={flat ? "#ECFDF5" : "#67E8F9"}
      strokeLinecap="round"
      strokeWidth="2.8"
    />
    <circle
      className="origin-center transition-transform duration-300 group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]"
      cx="49"
      cy="47"
      r="3.7"
      fill={flat ? "#ECFDF5" : "#67E8F9"}
    />
    <circle
      className="origin-center transition-transform duration-300 group-hover:translate-x-[2px] group-hover:translate-y-[2px]"
      cx="15.5"
      cy="15.5"
      r="2.5"
      fill={flat ? "#ECFDF5" : "#34D399"}
    />
    <path
      d="M17.8 18L24.2 24.5M39.7 39.7L46.2 45.8"
      stroke="#0F172A"
      strokeLinecap="round"
      strokeOpacity="0.3"
      strokeWidth="2"
    />
    {!flat && (
      <defs>
        <linearGradient id="logo-bg" x1="8" x2="57" y1="6" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34D399" />
          <stop offset="0.55" stopColor="#0EA5E9" />
          <stop offset="1" stopColor="#312E81" />
        </linearGradient>
      </defs>
    )}
  </svg>
);

export default AppLogo;
