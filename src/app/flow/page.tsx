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
    <div>
      <p>Welcome, {user.name || 'User'}!</p>
      <p>Email: {user.email}</p>
      <button
        onClick={() => signOut()}
        className='w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200'
      >
        Sign Out
      </button>
    </div>
  );
}
