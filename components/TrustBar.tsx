const CREDENTIALS = ["Licensed & Insured", "Free Estimates", "Locally Owned", "Clear Communication"];

export default function TrustBar() {
  return (
    <section className="credentials-band">
      <div className="credentials-inner">
        <p className="credentials-statement">
          Grading, drainage, and site work shouldn&apos;t be a gamble — we plan every job
          around how water and soil actually behave on your property, not just what&apos;s
          fastest to dig.
        </p>
        <div className="credentials-list">
          {CREDENTIALS.map((item) => (
            <span className="credentials-item" key={item}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
