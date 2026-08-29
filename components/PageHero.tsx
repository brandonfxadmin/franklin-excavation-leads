type PageHeroProps = {
  kicker?: string;
  title: React.ReactNode;
  subtitle?: string;
  image: string;
  size?: "default" | "tall";
  index?: string;
};

export default function PageHero({ kicker, title, subtitle, image, size = "default", index }: PageHeroProps) {
  return (
    <section className={`page-hero ${size === "tall" ? "page-hero-tall" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="page-hero-media photo-treated" src={image} alt="" />
      <div className="page-hero-overlay" />
      <div className="page-hero-content">
        <div className="page-hero-top">
          {kicker ? <span className="page-hero-kicker">{kicker}</span> : <span />}
          {index ? <span className="page-hero-index">{index}</span> : null}
        </div>
        <h1 className="page-hero-title">{title}</h1>
        {subtitle ? <p className="page-hero-sub">{subtitle}</p> : null}
      </div>
    </section>
  );
}
