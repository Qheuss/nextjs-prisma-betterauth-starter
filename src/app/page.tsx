import sessionwithHeaders from '@/utils/sessionWithHeaders';
import { redirect } from 'next/navigation';

export default async function Home() {
  if (await sessionwithHeaders()) {
    redirect('/hub');
  }

  return (
    <main className='text-center flex flex-col items-center justify-center h-screen'>
      <h1>Please login to access the app</h1>
      <a
        href='/sign-in'
        className='mt-5 bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200'
      >
        Login
      </a>
    </main>
  );
}
