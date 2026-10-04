import { useContentEditor } from "../useContentEditor";
import { Field, Toggle } from "../ui";
import { EditorPage, ListEditor } from "./editorKit";
import type { Plan } from "@/lib/content";

export default function PricingEditor() {
  const ed = useContentEditor("pricing");
  return (
    <EditorPage
      title="Pricing"
      sub="The plans on the home page and the Pricing page. Keep the ids free, pro, business and bar — other pages look those up."
      missing={ed.missing}
      loading={ed.loading}
      bar={{ dirty: ed.dirty, saving: ed.saving, onSave: () => void ed.save(), onReset: ed.reset, savedAt: ed.savedAt }}
    >
      <ListEditor<Plan>
        items={ed.draft}
        onChange={ed.setDraft}
        addLabel="Add a plan"
        itemLabel={(p) => p.name || "New plan"}
        blank={() => ({ id: `plan-${Date.now()}`, name: "", price: 0, period: "/month", tagline: "", features: [], cta: "Choose", highlighted: false })}
        render={(p, update, i) => (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Name" htmlFor={`p-name-${i}`}>
              <input id={`p-name-${i}`} className="field h-10" value={p.name} onChange={(e) => update({ name: e.target.value })} />
            </Field>
            <Field label="Price (₹)" htmlFor={`p-price-${i}`} hint="0 shows as free">
              <input
                id={`p-price-${i}`}
                type="number"
                min={0}
                className="field h-10 tabular-nums"
                value={p.price}
                onChange={(e) => update({ price: Math.max(0, Number(e.target.value) || 0) })}
              />
            </Field>
            <Field label="Period" htmlFor={`p-period-${i}`}>
              <input id={`p-period-${i}`} className="field h-10" value={p.period} onChange={(e) => update({ period: e.target.value })} />
            </Field>
            <Field label="Id" htmlFor={`p-id-${i}`}>
              <input id={`p-id-${i}`} className="field h-10 font-mono text-sm" value={p.id} onChange={(e) => update({ id: e.target.value.trim() })} />
            </Field>
            <div className="sm:col-span-2 lg:col-span-4">
              <Field label="One-line description" htmlFor={`p-tag-${i}`}>
                <input id={`p-tag-${i}`} className="field h-10" value={p.tagline} onChange={(e) => update({ tagline: e.target.value })} />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Features" htmlFor={`p-feat-${i}`} hint="One per line">
                <textarea
                  id={`p-feat-${i}`}
                  rows={6}
                  className="field"
                  value={p.features.join("\n")}
                  onChange={(e) => update({ features: e.target.value.split("\n") })}
                  onBlur={(e) => update({ features: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
                />
              </Field>
            </div>
            <div className="space-y-4 sm:col-span-2">
              <Field label="Button text" htmlFor={`p-cta-${i}`}>
                <input id={`p-cta-${i}`} className="field h-10" value={p.cta} onChange={(e) => update({ cta: e.target.value })} />
              </Field>
              <Field label="Badge" htmlFor={`p-badge-${i}`} hint="Optional, e.g. Recommended">
                <input id={`p-badge-${i}`} className="field h-10" value={p.badge ?? ""} onChange={(e) => update({ badge: e.target.value || undefined })} />
              </Field>
              <Toggle id={`p-hl-${i}`} checked={p.highlighted} onChange={(v) => update({ highlighted: v })} label="Highlight this plan" />
            </div>
          </div>
        )}
      />
    </EditorPage>
  );
}
