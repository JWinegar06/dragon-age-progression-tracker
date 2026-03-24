'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-10 w-24 rounded-xl bg-slate-200 dark:bg-slate-800" />;
  }

  const activeTheme = theme === 'system' ? resolvedTheme : theme;

  return (
    <button
      type="button"
      onClick={() => setTheme(activeTheme === 'dark' ? 'light' : 'dark')}
      className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:scale-[1.02] dark:border-slate-700 dark:bg-slate-900"
    >
      {activeTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
