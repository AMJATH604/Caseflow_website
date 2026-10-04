import { useContentEditor } from "../useContentEditor";
import { Field, Toggle } from "../ui";
import { EditorPage, ListEditor } from "./editorKit";
import type { Testimonial } from "@/lib/content";

export default function TestimonialsEditor() {
  const ed = useContentEditor("testimonials");
  return (
    <EditorPage
      title="Testimonials"
      sub="The home page shows a testimonials section only when at least one is published. Use real quotes, with the advocate's permission."
      missing={ed.missing}
      loading={ed.loading}
      bar={{ dirty: ed.dirty, saving: ed.saving, onSave: () => void ed.save(), onReset: ed.reset, savedAt: ed.savedAt }}
    >
      <ListEditor<Testimonial>
        items={ed.draft}
        onChange={ed.setDraft}
        addLabel="Add a testimonial"
        itemLabel={(t) => t.name || "New testimonial"}
        blank={() => ({ quote: "", name: "", role: "", published: false })}
        render={(t, update, i) => (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Quote" htmlFor={`t-q-${i}`}>
                <textarea id={`t-q-${i}`} rows={3} className="field" value={t.quote} onChange={(e) => update({ quote: e.target.value })} />
              </Field>
            </div>
            <Field label="Name" htmlFor={`t-n-${i}`}>
              <input id={`t-n-${i}`} className="field h-10" value={t.name} onChange={(e) => update({ name: e.target.value })} placeholder="Adv. R. Priya" />
            </Field>
            <Field label="Role or court" htmlFor={`t-r-${i}`}>
              <input id={`t-r-${i}`} className="field h-10" value={t.role} onChange={(e) => update({ role: e.target.value })} placeholder="Advocate, Madurai Bench" />
            </Field>
            <Toggle id={`t-p-${i}`} checked={t.published} onChange={(v) => update({ published: v })} label="Show on the website" />
          </div>
        )}
      />
    </EditorPage>
  );
}
