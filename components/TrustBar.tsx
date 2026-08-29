const STATS = [
  { value: "Licensed & Insured", label: "Full coverage on every job" },
  { value: "Free Estimates", label: "No cost, no obligation" },
  { value: "Locally Owned", label: "Serving Middle Tennessee" },
  { value: "Clear Communication", label: "You'll know the plan and the cost" },
];

export default function TrustBar() {
  return (
    <section className="trust-bar">
      <div className="trust-bar-inner">
        {STATS.map((stat) => (
          <div className="trust-bar-item" key={stat.value}>
            <span className="trust-bar-value">{stat.value}</span>
            <span className="trust-bar-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
