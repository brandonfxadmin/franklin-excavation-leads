import "./globals.css";

export const metadata = {
  title: "Franklin Excavation | Excavation, Grading & Site Prep",
  description:
    "Franklin Excavation provides excavation, grading, land clearing, and site preparation for homeowners and contractors. Licensed, insured, and locally owned — request a free estimate.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
