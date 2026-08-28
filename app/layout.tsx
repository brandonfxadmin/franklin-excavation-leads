import "./globals.css";

export const metadata = {
  title: "Franklin Excavation — Lead Portal",
  description: "Lead intake and ballpark estimate portal for Franklin Excavation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
