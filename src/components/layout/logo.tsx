import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      aria-label="Liyen — Accueil"
    >
      {/* Icône : deux nœuds reliés — symbolise le lien */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Nœud gauche */}
        <circle cx="10" cy="18" r="6" fill="#E8694A" />
        {/* Nœud droit */}
        <circle cx="26" cy="18" r="6" fill="#5A9E78" />
        {/* Lien */}
        <rect x="14" y="16" width="8" height="4" rx="2" fill="#E8694A" opacity="0.6" />
      </svg>

      <span className="text-xl font-bold tracking-tight text-text">
        Li<span className="text-primary">yen</span>
      </span>
    </Link>
  );
}
