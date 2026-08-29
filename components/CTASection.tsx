import Link from "next/link";
import { BUSINESS } from "../data/services";
import { PhoneIcon } from "./icons";

type CTASectionProps = {
  title: React.ReactNode;
  body?: string;
};

export default function CTASection({ title, body }: CTASectionProps) {
  return (
    <section className="cta-band">
      <div className="cta-band-inner">
        <div className="cta-text">
          <h2 className="cta-title">{title}</h2>
          {body ? <p className="cta-sub">{body}</p> : null}
        </div>
        <div className="cta-actions">
          <Link href="/contact" className="btn-primary">
            Get a Free Quote
          </Link>
          <a href={BUSINESS.phoneHref} className="header-phone">
            <PhoneIcon className="header-phone-icon" />
            {BUSINESS.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
