import { Link } from "react-router-dom";
import { usePageTitle } from "@/components/SiteLayout";

export default function NotFound() {
  usePageTitle("Page not found");
  return (
    <section className="container grid min-h-[80vh] place-items-center pt-24 text-center">
      <div>
        <p className="font-mono text-sm text-gold">404 · No such page</p>
        <h1 className="display mt-4 text-[clamp(2.6rem,7vw,5rem)]">
          This matter <span className="accent-serif text-fg-2">isn't listed.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-fg-2">The page you followed doesn't exist or has moved.</p>
        <Link to="/" className="btn-primary mt-8">
          Back to the home page
        </Link>
      </div>
    </section>
  );
}
