import { useContentEditor } from "../useContentEditor";
import { Card, Field, Toggle } from "../ui";
import { EditorPage } from "./editorKit";

export default function AnnouncementEditor() {
  const ed = useContentEditor("announcement");
  const a = ed.draft;
  const set = (patch: Partial<typeof a>) => ed.setDraft({ ...a, ...patch });

  return (
    <EditorPage
      title="Announcement bar"
      sub="A thin bar above the menu on every page — for a launch, an offer or a new feature."
      missing={ed.missing}
      loading={ed.loading}
      bar={{ dirty: ed.dirty, saving: ed.saving, onSave: () => void ed.save(), onReset: ed.reset, savedAt: ed.savedAt }}
    >
      <Card className="space-y-5 p-6">
        <Toggle id="an-active" checked={a.active} onChange={(v) => set({ active: v })} label="Show the bar" />
        <Field label="Text" htmlFor="an-text" hint="Keep it to one short sentence.">
          <input id="an-text" className="field h-10" maxLength={140} value={a.text} onChange={(e) => set({ text: e.target.value })} placeholder="CaseFlow for iPhone is here." />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Link text" htmlFor="an-ll">
            <input id="an-ll" className="field h-10" value={a.linkLabel} onChange={(e) => set({ linkLabel: e.target.value })} placeholder="Learn more" />
          </Field>
          <Field label="Link address" htmlFor="an-lu" hint="A page like /pricing, or a full https:// address">
            <input id="an-lu" className="field h-10" value={a.linkUrl} onChange={(e) => set({ linkUrl: e.target.value })} />
          </Field>
        </div>
        {a.text && (
          <div>
            <p className="label">Preview</p>
            <div className="flex h-9 items-center justify-center gap-2 rounded-lg bg-royal px-4 text-[13px] text-white">
              <span className="truncate">{a.text}</span>
              {a.linkUrl && <span className="shrink-0 font-medium underline underline-offset-4">{a.linkLabel || "Learn more"}</span>}
            </div>
          </div>
        )}
      </Card>
    </EditorPage>
  );
}
