# CaseFlow website

The marketing website for CaseFlow, plus its own admin panel at `/admin`.

- **Site:** React 18 + Vite + TypeScript + Tailwind. Scroll animation with GSAP ScrollTrigger and Lenis smooth scrolling. Everything still reads correctly when a visitor has "reduce motion" turned on.
- **Admin (`/admin`):** handles website enquiries (leads), and lets you edit pricing, FAQs, testimonials, the announcement bar, and the contact and app links without a redeploy. Sign in with a CaseFlow administrator account (`profiles.is_admin`, checked by `public.is_platform_admin()`).
- **Backend:** the same Supabase project as the CaseFlow apps. There are two tables: `website_leads` and `website_content`. Their migration lives in the main repo, `Caseflow_Final/supabase/migrations/20261006_website_tables.sql`. Until it is applied, the site shows its built-in content and the forms can't send.

## Run

```bash
npm install
npm run dev        # http://localhost:5180
npm run build      # type-check + production build into dist/
```

Optional `.env` (see `.env.example`): `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`. Without these, the site uses the production project. Its URL and publishable key are public by design and protected by row-level security.

## App screenshots

`public/app/*.webp` are built from the raw phone screenshots in `Caseflow_Final/phone_screenshots`. The script blurs private details (party and client names, case numbers, emails, phone numbers, GPS points) and crops off the Android navigation bar:

```bash
npm run screenshots   # python scripts/prepare_screenshots.py ../CASEFLOW/phone_screenshots
```

The blur boxes live in `scripts/prepare_screenshots.py`. When you replace these with clean screenshots from a demo account, remove their boxes and run it again.

## Where things are

| Path | What |
|---|---|
| `src/pages/` | Home, Features, Pricing, Bar Associations, Contact, Privacy |
| `src/sections/` | Home page sections (hero, the "day with CaseFlow" story, tools rail, AI, commissioner kit, team, pricing, FAQ…) |
| `src/data/features.ts` | The feature catalogue, written from the app's own screens |
| `src/lib/content.tsx` | Admin-editable content: types, built-in defaults, loading |
| `src/admin/` | The admin panel |

## Hosting

The site builds to static files in `dist/`. Because it is a single-page app, every path must serve `index.html`:
- `vercel.json` handles this on Vercel.
- `public/_redirects` handles it on Netlify.

`robots.txt` keeps `/admin` out of search engines.
