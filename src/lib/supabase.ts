import { createClient } from "@supabase/supabase-js";

// Both values are public by design: the publishable key is protected by
// row-level security, exactly as in the CaseFlow apps. An empty variable is
// treated as absent (a blank CI secret once shipped an app with no key).
const PROD_URL = "https://asrjqsnyezvcakvkokcl.supabase.co";
const PROD_PUBLISHABLE_KEY = "sb_publishable_g8UbCM_UoYqvLn8DbGIBCA_QGG3U9nT";

const nonEmpty = (v: string | undefined) => (v && v.trim() !== "" ? v.trim() : undefined);

export const supabase = createClient(
  nonEmpty(import.meta.env.VITE_SUPABASE_URL) ?? PROD_URL,
  nonEmpty(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) ?? PROD_PUBLISHABLE_KEY,
  {
    auth: {
      // Only the admin panel signs in; keep its session apart from the
      // CaseFlow web app's if both are ever served from one origin.
      storageKey: "caseflow-website-admin",
    },
  },
);

/** True when a query failed because the website tables are not created yet. */
export function isMissingTable(error: { code?: string; message?: string } | null | undefined) {
  if (!error) return false;
  return error.code === "42P01" || error.code === "PGRST205" || /does not exist|schema cache/i.test(error.message ?? "");
}
