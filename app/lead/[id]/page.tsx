import { Metadata } from "next";
import { headers } from "next/headers";
import LeadClient from "./LeadClient";

export async function generateMetadata(): Promise<Metadata> {
  const host = headers().get("host") || "franklin-excavation-leads.vercel.app";
  const origin = `https://${host}`;
  const ogImage = `${origin}/fx-ballpark-og.png`;
  const title = "FX Ballpark Estimate";
  const description = "Your ballpark estimate from Franklin Excavation.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, width: 1024, height: 1024 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Page() {
  return <LeadClient />;
}
