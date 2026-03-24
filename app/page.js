'use client';

import AuthForm from '@/components/AuthForm';
import Dashboard from '@/components/Dashboard';
import { useAuth } from '@/components/AuthProvider';

export default function HomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          Loading tracker...
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.25),_transparent_45%)] px-4">
        <div className="grid w-full max-w-5xl gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Thedas Archive</p>
            <h1 className="mt-4 text-4xl font-black md:text-5xl">Track every Dragon Age run.</h1>
            <p className="mt-4 max-w-xl text-base text-slate-600 dark:text-slate-400">
              Log your platform, completion percentage, hours played, favorite runs, and story notes with Firebase-powered real-time sync.
            </p>
          </div>
          <AuthForm />
        </div>
      </main>
    );
  }

  return <Dashboard />;
}
