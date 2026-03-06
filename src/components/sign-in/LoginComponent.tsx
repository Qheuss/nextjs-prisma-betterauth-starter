'use client';

import { signIn, signUp } from '@/lib/auth-client';
import { redirect } from 'next/dist/client/components/navigation';
import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function LoginComponent() {
  const [error, setError] = useState<string | null>(null);
  const [loginMode, setLoginMode] = useState<'signup' | 'login'>('login');

  async function handleSubmitSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signUp.email({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    if (res.error) {
      setError(res.error.message || 'Something went wrong.');
    } else {
      redirect('/hub');
    }
  }

  async function handleSubmitLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signIn.email({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    if (res.error) {
      setError(res.error.message || 'Something went wrong.');
    } else {
      redirect('/hub');
    }
  }
  return (
    <>
      {error && <p className='text-red-500'>{error}</p>}
      {loginMode === 'signup' ? (
        <SignUp handleSubmitSignup={handleSubmitSignup} />
      ) : (
        <SignIn handleSubmitLogin={handleSubmitLogin} />
      )}
      <button
        onClick={() => setLoginMode(loginMode === 'login' ? 'signup' : 'login')}
        className='mt-4 text-sm text-neutral-400 hover:underline cursor-pointer'
      >
        {loginMode === 'login' ? 'Switch to Sign Up' : 'Switch to Login'}
      </button>
    </>
  );
}
