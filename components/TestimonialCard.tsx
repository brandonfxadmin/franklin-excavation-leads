type TestimonialCardProps = {
  quote: string;
  name: string;
  location: string;
};

export default function TestimonialCard({ quote, name, location }: TestimonialCardProps) {
  return (
    <div className="quote-slab">
      <span className="quote-mark" aria-hidden="true">
        &ldquo;
      </span>
      <p className="quote-text">{quote}</p>
      <div className="quote-attribution">
        <span className="quote-attribution-name">{name}</span>
        <span>{location}</span>
      </div>
    </div>
  );
}
