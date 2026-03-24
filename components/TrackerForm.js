'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { GENRE_OPTIONS, PLATFORM_OPTIONS, STATUS_OPTIONS } from '@/lib/constants';

const defaultValues = {
  title: '',
  platform: 'PC',
  genre: 'RPG',
  status: 'Not Started',
  hoursPlayed: 0,
  completion: 0,
  favorite: false,
  notes: '',
};

export default function TrackerForm({ onSave, editingEntry, onCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues });

  useEffect(() => {
    if (editingEntry) {
      reset({
        ...editingEntry,
        hoursPlayed: editingEntry.hoursPlayed ?? 0,
        completion: editingEntry.completion ?? 0,
        favorite: editingEntry.favorite ?? false,
      });
    } else {
      reset(defaultValues);
    }
  }, [editingEntry, reset]);

  const submitHandler = async (values) => {
    await onSave({
      ...values,
      hoursPlayed: Number(values.hoursPlayed),
      completion: Number(values.completion),
    });

    if (!editingEntry) {
      reset(defaultValues);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold">{editingEntry ? 'Edit Entry' : 'Add Progress Entry'}</h2>
        {editingEntry && (
          <button type="button" onClick={onCancel} className="text-sm font-medium text-slate-500 hover:underline">
            Cancel
          </button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Game Title</label>
          <input
            {...register('title', { required: 'Game title is required' })}
            className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700"
            placeholder="Which Dragon Age are you working on?"
          />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Platform</label>
          <select {...register('platform')} className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700">
            {PLATFORM_OPTIONS.map((option) => (
              <option key={option} value={option} className="text-slate-900">
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Genre</label>
          <select {...register('genre')} className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700">
            {GENRE_OPTIONS.map((option) => (
              <option key={option} value={option} className="text-slate-900">
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Status</label>
          <select {...register('status')} className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700">
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option} className="text-slate-900">
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Hours Played</label>
          <input type="number" min="0" step="1" {...register('hoursPlayed')} className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Completion %</label>
          <input type="number" min="0" max="100" step="1" {...register('completion')} className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700" />
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700">
          <input id="favorite" type="checkbox" {...register('favorite')} className="h-4 w-4" />
          <label htmlFor="favorite" className="text-sm font-medium">Favorite</label>
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Notes</label>
          <textarea
            rows="4"
            {...register('notes')}
            className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700"
            placeholder="Companion build, quest notes, favorite romance path, or trophy reminders..."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 rounded-xl bg-brand-600 px-4 py-2 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
      >
        {isSubmitting ? 'Saving...' : editingEntry ? 'Update Entry' : 'Save Entry'}
      </button>
    </form>
  );
}
