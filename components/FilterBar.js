'use client';

import { GENRE_OPTIONS, PLATFORM_OPTIONS, STATUS_OPTIONS } from '@/lib/constants';

export default function FilterBar({ filters, onChange }) {
  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:grid-cols-4">
      <select value={filters.platform} onChange={(e) => onChange('platform', e.target.value)} className="rounded-xl border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700">
        <option value="All" className="text-slate-900">All Platforms</option>
        {PLATFORM_OPTIONS.map((option) => (
          <option key={option} value={option} className="text-slate-900">{option}</option>
        ))}
      </select>

      <select value={filters.genre} onChange={(e) => onChange('genre', e.target.value)} className="rounded-xl border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700">
        <option value="All" className="text-slate-900">All Genres</option>
        {GENRE_OPTIONS.map((option) => (
          <option key={option} value={option} className="text-slate-900">{option}</option>
        ))}
      </select>

      <select value={filters.status} onChange={(e) => onChange('status', e.target.value)} className="rounded-xl border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700">
        <option value="All" className="text-slate-900">All Statuses</option>
        {STATUS_OPTIONS.map((option) => (
          <option key={option} value={option} className="text-slate-900">{option}</option>
        ))}
      </select>

      <label className="flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium dark:border-slate-700">
        <input type="checkbox" checked={filters.favoriteOnly} onChange={(e) => onChange('favoriteOnly', e.target.checked)} />
        Favorites only
      </label>
    </div>
  );
}
