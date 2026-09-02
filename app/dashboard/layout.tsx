import type { Metadata, Viewport } from "next";

// Scoped to /dashboard only — the public marketing pages keep the root layout's
// metadata and favicon untouched. This is what makes the portal installable to
// the iPhone home screen with the FX icon.
export const metadata: Metadata = {
  title: "FX Lead Portal",
  manifest: "/fx/portal.webmanifest",
  appleWebApp: {
    capable: true,
    title: "FX Portal",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/fx/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/fx/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/fx/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#1c1a17",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
