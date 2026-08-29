type TestimonialCardProps = {
  quote: string;
  name: string;
  location: string;
};

export default function TestimonialCard({ quote, name, location }: TestimonialCardProps) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-stars" aria-hidden="true">
        ★★★★★
      </div>
      <p className="testimonial-quote">&ldquo;{quote}&rdquo;</p>
      <div className="testimonial-author">
        <span className="testimonial-name">{name}</span>
        <span className="testimonial-location">{location}</span>
      </div>
    </div>
  );
}
