'use client';

export default function EntryCard({ entry, onEdit, onDelete }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold">{entry.title}</h3>
            {entry.favorite && <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-400/10 dark:text-amber-300">Favorite</span>}
          </div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {entry.platform} • {entry.genre} • {entry.status}
          </p>
        </div>

        <div className="flex gap-2">
          <button onClick={() => onEdit(entry)} className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium dark:border-slate-700">
            Edit
          </button>
          <button onClick={() => onDelete(entry.id)} className="rounded-xl bg-red-600 px-3 py-2 text-sm font-medium text-white">
            Delete
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-sm font-medium">Hours Played</p>
          <p className="mt-1 text-2xl font-bold">{entry.hoursPlayed}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Completion</p>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div className="h-full rounded-full bg-brand-600" style={{ width: `${Math.min(entry.completion || 0, 100)}%` }} />
          </div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{entry.completion}% complete</p>
        </div>
      </div>

      {entry.notes && (
        <div className="mt-4 rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800/80">
          {entry.notes}
        </div>
      )}
    </div>
  );
}
