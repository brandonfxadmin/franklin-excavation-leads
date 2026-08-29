// Simple, dependency-free line icons (24x24, stroke-based) matching a clean,
// modern minimal style. Kept as inline SVG so the app doesn't need an icon
// library dependency.

type IconProps = { className?: string };
const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function GradingIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2 18h20" />
      <path d="M4 18l5-9 4 5 3-4 4 8" />
      <path d="M2 21h20" />
    </svg>
  );
}

export function DrainageIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 3c0 4-4 6-4 10a4 4 0 0 0 8 0c0-4-4-6-4-10Z" />
      <path d="M15 10c0 3-3 4.5-3 7.5a3 3 0 0 0 6 0c0-3-3-4.5-3-7.5Z" />
    </svg>
  );
}

export function DrivewayIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 21l3-16h10l3 16" />
      <path d="M9.5 5 8 21" />
      <path d="M14.5 5 16 21" />
      <path d="M8.5 12h7" />
    </svg>
  );
}

export function RetainingWallIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="14" width="6" height="4" />
      <rect x="9" y="14" width="6" height="4" />
      <rect x="15" y="14" width="6" height="4" />
      <rect x="6" y="10" width="6" height="4" />
      <rect x="12" y="10" width="6" height="4" />
      <rect x="9" y="6" width="6" height="4" />
    </svg>
  );
}

export function LandClearingIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 2 8 9h3l-3 6h3l-2 5h6l-2-5h3l-3-6h3Z" />
    </svg>
  );
}

export function DemolitionIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m14.5 6.5-9 9a2.1 2.1 0 0 0 3 3l9-9Z" />
      <path d="m13 4 3 3" />
      <path d="M4 20h5" />
      <path d="m17.5 3.5 3 3-2 2-3-3Z" />
    </svg>
  );
}

export function UtilityTrenchingIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 12h4l2-4 3 8 2-6 2 3h5" />
      <path d="M3 18h18" />
    </svg>
  );
}

export function CommercialIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 21V8l6-4 6 4v13" />
      <path d="M14 21V11l6 3v7" />
      <path d="M8 10h0M8 13h0M8 16h0M11 10h0M11 13h0M11 16h0" strokeWidth="2.4" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export const SERVICE_ICONS: Record<string, (p: IconProps) => JSX.Element> = {
  grading: GradingIcon,
  "drainage-solutions": DrainageIcon,
  driveways: DrivewayIcon,
  "retaining-walls": RetainingWallIcon,
  "land-clearing": LandClearingIcon,
  demolition: DemolitionIcon,
  "utility-trenching": UtilityTrenchingIcon,
};
