import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <img src="/logo.png" alt="SkillHire" className="h-9 w-9 rounded-xl object-contain" />
            SkillHire
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            The trusted marketplace to hire verified local professionals — fast, safe, and simple.
          </p>
        </div>
        <FooterCol
          title="Company"
          links={[
            ["/about", "About"],
            ["/contact", "Contact"],
            ["/categories", "Categories"],
          ]}
        />
        <FooterCol
          title="For workers"
          links={[
            ["/register", "Join as worker"],
            ["/dashboard/worker", "Worker dashboard"],
          ]}
        />
        <FooterCol
          title="Legal"
          links={[
            ["/privacy", "Privacy Policy"],
            ["/terms", "Terms of Service"],
          ]}
        />
      </div>
      <div className="border-t py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SkillHire. Crafted with care.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold">{title}</h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {links.map(([to, label]) => (
          <li key={to}>
            <Link to={to} className="transition-colors hover:text-foreground">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
