import { useContentEditor } from "../useContentEditor";
import { Field } from "../ui";
import { EditorPage, ListEditor } from "./editorKit";
import type { Faq } from "@/lib/content";

export default function FaqEditor() {
  const ed = useContentEditor("faqs");
  return (
    <EditorPage
      title="FAQs"
      sub="Questions on the home and Pricing pages, in this order."
      missing={ed.missing}
      loading={ed.loading}
      bar={{ dirty: ed.dirty, saving: ed.saving, onSave: () => void ed.save(), onReset: ed.reset, savedAt: ed.savedAt }}
    >
      <ListEditor<Faq>
        items={ed.draft}
        onChange={ed.setDraft}
        addLabel="Add a question"
        itemLabel={(f) => f.q || "New question"}
        blank={() => ({ q: "", a: "" })}
        render={(f, update, i) => (
          <div className="space-y-4">
            <Field label="Question" htmlFor={`f-q-${i}`}>
              <input id={`f-q-${i}`} className="field h-10" value={f.q} onChange={(e) => update({ q: e.target.value })} />
            </Field>
            <Field label="Answer" htmlFor={`f-a-${i}`}>
              <textarea id={`f-a-${i}`} rows={4} className="field" value={f.a} onChange={(e) => update({ a: e.target.value })} />
            </Field>
          </div>
        )}
      />
    </EditorPage>
  );
}
