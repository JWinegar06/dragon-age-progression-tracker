'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/components/AuthProvider';

export default function AuthForm() {
  const { signUp, login, loginWithGoogle } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const formatError = (error) =>
    error.message
      .replace('Firebase: ', '')
      .replace(/\(auth\/.+?\)\.?/g, '')
      .trim();

  const onSubmit = async (values) => {
    setAuthError('');
    setSubmitting(true);

    try {
      if (isSignUp) {
        await signUp(values.email, values.password);
      } else {
        await login(values.email, values.password);
      }
      reset();
    } catch (error) {
      setAuthError(formatError(error));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setAuthError('');
    setGoogleSubmitting(true);

    try {
      await loginWithGoogle();
    } catch (error) {
      setAuthError(formatError(error));
    } finally {
      setGoogleSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-2xl font-bold">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Sign in to track your Dragon Age journey.
      </p>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={googleSubmitting || submitting}
        className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 px-4 py-2 font-semibold transition hover:bg-slate-50 disabled:opacity-60 dark:border-slate-700 dark:hover:bg-slate-800"
      >
        <span className="text-lg">G</span>
        {googleSubmitting ? 'Connecting to Google...' : 'Continue with Google'}
      </button>

      <div className="my-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        <span className="text-xs uppercase tracking-[0.2em] text-slate-500">or</span>
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700"
            placeholder="warden@thedas.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700"
            placeholder="••••••••"
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
        </div>

        {authError && (
          <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/40">
            {authError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting || googleSubmitting}
          className="w-full rounded-xl bg-brand-600 px-4 py-2 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
        >
          {submitting ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Login'}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setIsSignUp((prev) => !prev)}
        className="mt-4 text-sm font-medium text-brand-600 hover:underline"
      >
        {isSignUp ? 'Already have an account? Login' : 'Need an account? Sign up'}
      </button>
    </div>
  );
}
