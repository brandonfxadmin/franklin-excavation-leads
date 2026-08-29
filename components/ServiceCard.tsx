import Link from "next/link";
import { Service } from "../data/services";
import { ArrowRightIcon } from "./icons";

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link href={`/services/${service.slug}`} className="service-row">
      <span className="service-row-bg" style={{ backgroundImage: `url(${service.image})` }} />
      <span className="service-row-number">{String(index).padStart(2, "0")}</span>
      <span className="service-row-body">
        <span className="service-row-name">{service.name}</span>
        <p className="service-row-desc">{service.shortDescription}</p>
      </span>
      <ArrowRightIcon className="service-row-arrow" />
    </Link>
  );
}
