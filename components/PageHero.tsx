type PageHeroProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
  image: string;
  size?: "default" | "tall";
};

export default function PageHero({ kicker, title, subtitle, image, size = "default" }: PageHeroProps) {
  return (
    <section
      className={`page-hero ${size === "tall" ? "page-hero-tall" : ""}`}
      style={{ backgroundImage: `linear-gradient(rgba(21,21,21,0.62), rgba(21,21,21,0.62)), url(${image})` }}
    >
      <div className="page-hero-inner">
        {kicker ? <span className="page-hero-kicker">{kicker}</span> : null}
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
    </section>
  );
}
