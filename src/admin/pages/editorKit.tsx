import type { ReactNode } from "react";
import { ArrowDown, ArrowUp, Loader2, Plus, Trash2 } from "lucide-react";
import { Card, PageTitle, SaveBar, SetupNotice } from "../ui";

/** Shared frame for every content editor: title, setup notice, publish bar. */
export function EditorPage({ title, sub, missing, loading, children, bar }: {
  title: string;
  sub: string;
  missing: boolean;
  loading: boolean;
  children: ReactNode;
  bar: { dirty: boolean; saving: boolean; onSave: () => void; onReset: () => void; savedAt: string | null };
}) {
  return (
    <>
      <PageTitle title={title} sub={sub} />
      {missing && <div className="mb-6"><SetupNotice /></div>}
      {loading ? <Loader2 className="h-5 w-5 animate-spin text-fg-3" /> : children}
      <SaveBar {...bar} />
    </>
  );
}

/** An ordered list of cards with move up / down / remove, and an add button. */
export function ListEditor<T>({ items, onChange, render, blank, addLabel, itemLabel }: {
  items: T[];
  onChange: (items: T[]) => void;
  render: (item: T, update: (patch: Partial<T>) => void, index: number) => ReactNode;
  blank: () => T;
  addLabel: string;
  itemLabel: (item: T, index: number) => string;
}) {
  const move = (i: number, d: -1 | 1) => {
    const next = items.slice();
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <Card key={i} className="p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="truncate text-sm font-medium text-fg-2">
              <span className="mr-2 font-mono text-xs text-fg-3">{i + 1}</span>
              {itemLabel(item, i)}
            </p>
            <div className="flex shrink-0 gap-1">
              <IconBtn label="Move up" disabled={i === 0} onClick={() => move(i, -1)}>
                <ArrowUp className="h-4 w-4" />
              </IconBtn>
              <IconBtn label="Move down" disabled={i === items.length - 1} onClick={() => move(i, 1)}>
                <ArrowDown className="h-4 w-4" />
              </IconBtn>
              <IconBtn label="Remove" danger onClick={() => onChange(items.filter((_, j) => j !== i))}>
                <Trash2 className="h-4 w-4" />
              </IconBtn>
            </div>
          </div>
          {render(item, (patch) => onChange(items.map((x, j) => (j === i ? { ...x, ...patch } : x))), i)}
        </Card>
      ))}
      <button type="button" onClick={() => onChange([...items, blank()])} className="btn-ghost h-10 w-full border-dashed">
        <Plus className="h-4 w-4" /> {addLabel}
      </button>
    </div>
  );
}

function IconBtn({ label, onClick, disabled, danger, children }: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-lg p-1.5 transition-colors disabled:opacity-30 ${danger ? "text-danger hover:bg-danger/10" : "text-fg-2 hover:bg-fg/[0.05]"}`}
    >
      {children}
    </button>
  );
}
