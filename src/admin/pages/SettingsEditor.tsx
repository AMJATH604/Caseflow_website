import { useContentEditor } from "../useContentEditor";
import { Card, Field } from "../ui";
import { EditorPage } from "./editorKit";
import type { Settings } from "@/lib/content";

const GROUPS: { title: string; note: string; fields: { key: keyof Settings; label: string; hint?: string; placeholder?: string }[] }[] = [
  {
    title: "App links",
    note: "Until the Play Store link is set, every “Get CaseFlow” button opens the early-access form instead.",
    fields: [
      { key: "playStoreUrl", label: "Google Play link", placeholder: "https://play.google.com/store/apps/details?id=com.caseflow.app" },
      { key: "appStoreUrl", label: "App Store link", hint: "For later — not shown yet" },
      { key: "webAppUrl", label: "Web app link", hint: "For later — not shown yet" },
    ],
  },
  {
    title: "Contact",
    note: "Shown on the Contact page and in the footer. Leave a field empty to hide it.",
    fields: [
      { key: "supportEmail", label: "Support email", placeholder: "support@…" },
      { key: "supportPhone", label: "Phone", placeholder: "+91 …" },
      { key: "whatsapp", label: "WhatsApp number", hint: "With country code, e.g. 919876543210" },
      { key: "address", label: "Address" },
    ],
  },
  {
    title: "Social",
    note: "Shown in the footer.",
    fields: [
      { key: "linkedin", label: "LinkedIn" },
      { key: "instagram", label: "Instagram" },
      { key: "x", label: "X (Twitter)" },
      { key: "youtube", label: "YouTube" },
    ],
  },
];

export default function SettingsEditor() {
  const ed = useContentEditor("settings");
  const s = ed.draft;

  return (
    <EditorPage
      title="Contact & links"
      sub="Where the website's buttons go and how visitors can reach you."
      missing={ed.missing}
      loading={ed.loading}
      bar={{ dirty: ed.dirty, saving: ed.saving, onSave: () => void ed.save(), onReset: ed.reset, savedAt: ed.savedAt }}
    >
      <div className="space-y-6">
        {GROUPS.map((g) => (
          <Card key={g.title} className="p-6">
            <h2 className="font-medium">{g.title}</h2>
            <p className="mt-1 text-sm text-fg-2">{g.note}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {g.fields.map((f) => (
                <Field key={f.key} label={f.label} hint={f.hint} htmlFor={`s-${f.key}`}>
                  <input
                    id={`s-${f.key}`}
                    className="field h-10"
                    value={s[f.key]}
                    placeholder={f.placeholder}
                    onChange={(e) => ed.setDraft({ ...s, [f.key]: e.target.value.trim() === "" ? "" : e.target.value })}
                  />
                </Field>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </EditorPage>
  );
}
