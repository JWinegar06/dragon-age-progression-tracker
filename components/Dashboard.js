'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/components/AuthProvider';
import ThemeToggle from '@/components/ThemeToggle';
import TrackerForm from '@/components/TrackerForm';
import FilterBar from '@/components/FilterBar';
import EntryCard from '@/components/EntryCard';

const initialFilters = {
  platform: 'All',
  genre: 'All',
  status: 'All',
  favoriteOnly: false,
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    if (!user) return;

    const entriesRef = collection(db, 'users', user.uid, 'entries');
    const q = query(entriesRef, orderBy('updatedAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setEntries(data);
    });

    return () => unsubscribe();
  }, [user]);

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const platformMatch = filters.platform === 'All' || entry.platform === filters.platform;
      const genreMatch = filters.genre === 'All' || entry.genre === filters.genre;
      const statusMatch = filters.status === 'All' || entry.status === filters.status;
      const favoriteMatch = !filters.favoriteOnly || entry.favorite;
      return platformMatch && genreMatch && statusMatch && favoriteMatch;
    });
  }, [entries, filters]);

  const stats = useMemo(() => {
    const total = entries.length;
    const completed = entries.filter((entry) => entry.status === 'Completed').length;
    const favorites = entries.filter((entry) => entry.favorite).length;
    const totalHours = entries.reduce((sum, entry) => sum + (Number(entry.hoursPlayed) || 0), 0);

    return { total, completed, favorites, totalHours };
  }, [entries]);

  const handleSave = async (values) => {
    if (!user) return;

    if (editingEntry) {
      const entryRef = doc(db, 'users', user.uid, 'entries', editingEntry.id);
      await updateDoc(entryRef, {
        ...values,
        updatedAt: serverTimestamp(),
      });
      setEditingEntry(null);
      return;
    }

    await addDoc(collection(db, 'users', user.uid, 'entries'), {
      ...values,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  };

  const handleDelete = async (id) => {
    if (!user) return;
    await deleteDoc(doc(db, 'users', user.uid, 'entries', id));
    if (editingEntry?.id === id) {
      setEditingEntry(null);
    }
  };

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-brand-700 to-slate-900 p-6 text-white shadow-2xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-brand-100">Thedas Archive</p>
            <h1 className="mt-2 text-3xl font-black md:text-4xl">Dragon Age Progression Tracker</h1>
            <p className="mt-2 text-sm text-slate-200">Track every campaign, favorite world state, and completion goal in one place.</p>
            <p className="mt-3 text-sm text-brand-100">Signed in as {user?.email}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <ThemeToggle />
            <button onClick={logout} className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/20">
              Logout
            </button>
          </div>
        </div>

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          {[
            { label: 'Entries', value: stats.total },
            { label: 'Completed', value: stats.completed },
            { label: 'Favorites', value: stats.favorites },
            { label: 'Hours Logged', value: stats.totalHours },
          ].map((card) => (
            <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
              <p className="mt-2 text-3xl font-black">{card.value}</p>
            </div>
          ))}
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr,1.4fr]">
          <div className="space-y-6">
            <TrackerForm onSave={handleSave} editingEntry={editingEntry} onCancel={() => setEditingEntry(null)} />
            <FilterBar filters={filters} onChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))} />
          </div>

          <section className="space-y-4">
            {filteredEntries.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                No entries found yet. Add your first Dragon Age journey.
              </div>
            ) : (
              filteredEntries.map((entry) => (
                <EntryCard key={entry.id} entry={entry} onEdit={setEditingEntry} onDelete={handleDelete} />
              ))
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
