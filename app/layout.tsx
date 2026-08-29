import { Yantramanav } from "next/font/google";
import "./globals.css";

const yantramanav = Yantramanav({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-yantramanav",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Franklin Excavation | Excavation, Grading & Drainage in Franklin, TN",
    template: "%s | Franklin Excavation",
  },
  description:
    "Franklin Excavation provides excavation, grading, drainage, driveways, retaining walls, and land clearing for homeowners, builders, and developers across Middle Tennessee. Licensed, insured, and locally owned — request a free estimate.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={yantramanav.variable}>
      <body>{children}</body>
    </html>
  );
}
