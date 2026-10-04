import { useCallback, useEffect, useState } from "react";
import { supabase, isMissingTable } from "@/lib/supabase";
import { DEFAULTS, type ContentKey, type SiteContent } from "@/lib/content";
import { useToast } from "./ui";

/**
 * Loads one website_content key into an editable draft and publishes it
 * back. With no saved row yet, the draft starts from the website's defaults.
 */
export function useContentEditor<K extends ContentKey>(key: K) {
  const toast = useToast();
  const [saved, setSaved] = useState<SiteContent[K]>(DEFAULTS[key]);
  const [draft, setDraft] = useState<SiteContent[K]>(DEFAULTS[key]);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    supabase
      .from("website_content")
      .select("value, updated_at")
      .eq("key", key)
      .maybeSingle()
      .then(({ data, error }) => {
        if (isMissingTable(error)) setMissing(true);
        if (data?.value != null) {
          const base = DEFAULTS[key];
          const value = (Array.isArray(base) ? data.value : { ...base, ...data.value }) as SiteContent[K];
          setSaved(value);
          setDraft(value);
          setSavedAt(data.updated_at);
        }
        setLoading(false);
      });
  }, [key]);

  const save = useCallback(async () => {
    setSaving(true);
    const { data: u } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("website_content")
      .upsert({ key, value: draft, updated_by: u.user?.id ?? null }, { onConflict: "key" })
      .select("updated_at")
      .single();
    setSaving(false);
    if (error) {
      toast(isMissingTable(error) ? "The website tables aren't set up yet." : `Couldn't publish: ${error.message}`, "error");
      return;
    }
    setSaved(draft);
    setSavedAt(data.updated_at);
    toast("Published to the website");
  }, [draft, key, toast]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);

  return { draft, setDraft, save, reset: () => setDraft(saved), dirty, saving, loading, savedAt, missing };
}
