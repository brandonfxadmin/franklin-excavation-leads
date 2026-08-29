import Link from "next/link";
import { BUSINESS } from "../data/services";
import { PhoneIcon, ArrowRightIcon } from "./icons";

type CTASectionProps = {
  title: string;
  body?: string;
};

export default function CTASection({ title, body }: CTASectionProps) {
  return (
    <section className="cta-section">
      <div className="cta-section-inner">
        <div className="cta-section-text">
          <h2>{title}</h2>
          {body ? <p>{body}</p> : null}
        </div>
        <div className="cta-section-actions">
          <Link href="/contact" className="btn btn-orange">
            Get a Free Quote
            <ArrowRightIcon className="btn-icon" />
          </Link>
          <a href={BUSINESS.phoneHref} className="btn btn-outline-light">
            <PhoneIcon className="btn-icon" />
            {BUSINESS.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
