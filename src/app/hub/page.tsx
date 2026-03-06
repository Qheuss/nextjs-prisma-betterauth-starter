'use client';

import { signOut, useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function WorkspacePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/sign-in');
    }
  }, [isPending, session, router]);

  if (isPending)
    return <p className='text-center mt-8 text-white'>Loading...</p>;
  if (!session?.user)
    return <p className='text-center mt-8 text-white'>Redirecting...</p>;

  const { user } = session;

  return (
    <div className='p-8 text-center flex flex-col items-center justify-center h-screen'>
      <p>Welcome, {user.name || 'User'}!</p>
      <p>Email: {user.email}</p>
      <button
        onClick={() => signOut()}
        className='mt-5 bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200 cursor-pointer'
      >
        Sign Out
      </button>
    </div>
  );
}
