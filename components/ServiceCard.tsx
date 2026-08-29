import Link from "next/link";
import { Service } from "../data/services";
import { SERVICE_ICONS, ArrowRightIcon } from "./icons";

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = SERVICE_ICONS[service.slug];
  return (
    <Link href={`/services/${service.slug}`} className="service-card">
      <div className="service-card-icon">{Icon ? <Icon /> : null}</div>
      <h3>{service.name}</h3>
      <p>{service.shortDescription}</p>
      <span className="service-card-link">
        Learn More
        <ArrowRightIcon className="btn-icon" />
      </span>
    </Link>
  );
}
