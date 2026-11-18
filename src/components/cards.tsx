import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { ArrowIcon, Stars } from "@/components/ui";
import { business } from "@/lib/business";

type PhotoCardProps = {
  href: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  /** Larger type for the main services. */
  large?: boolean;
};

/** Photo on top, title, one line and an arrow. Used for services and sectors. */
export function PhotoCard({ href, title, text, image, imageAlt, large = false }: PhotoCardProps) {
  return (
    <Link
      href={href}
      className="card group flex h-full flex-col overflow-hidden transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgb(10_27_46/0.45)]"
    >
      <span className={`relative block overflow-hidden ${large ? "aspect-[16/10]" : "aspect-[16/9]"}`}>
        <SmartImage
          src={image}
          alt={imageAlt}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </span>
      <span className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
        <span className={`font-display ${large ? "text-[1.6rem]" : "text-[1.3rem]"}`}>{title}</span>
        <span className="flex-1 text-ink-2">{text}</span>
        <span className="mt-2 inline-flex items-center gap-2 font-semibold text-brand">
          Ver más
          <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </span>
    </Link>
  );
}

export function GoogleIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M22.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.3-4.8 3.3-7.9z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.7c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.8A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.8 14.2a6.6 6.6 0 0 1 0-4.3V7.1H2.1a11 11 0 0 0 0 9.9l3.7-2.8z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7.1l3.7 2.8C6.7 7.3 9.1 5.4 12 5.4z" />
    </svg>
  );
}

/** The real Google rating, with a link to the reviews. */
export function GoogleRatingCard() {
  return (
    <div className="card flex h-full flex-col gap-4 rounded-[1.75rem] p-7 sm:p-8">
      <p className="flex items-center gap-2 text-[0.95rem] font-semibold text-ink-2">
        <GoogleIcon />
        Opiniones en Google
      </p>
      <p className="flex items-end gap-4">
        <span className="font-display text-[5.5rem] leading-[0.82]">{business.googleRating}</span>
        <span className="flex flex-col gap-1 pb-1">
          <Stars className="text-[1.4rem]" />
          <span className="text-ink-2">{business.googleReviewCount} opiniones</span>
        </span>
      </p>
      <a
        href={business.googleReviewsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost mt-auto self-start"
      >
        Ver opiniones en Google
      </a>
    </div>
  );
}
