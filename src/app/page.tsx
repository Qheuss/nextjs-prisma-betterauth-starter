import sessionwithHeaders from '@/utils/sessionWithHeaders';
import { redirect } from 'next/navigation';

export default async function Home() {
  if (await sessionwithHeaders()) {
    redirect('/flow');
  }

  return (
    <main className='p-8 text-center'>
      <h1>Please login to access the app</h1>
      <a href='/sign-in' className='btn-primary mt-4'>
        Login
      </a>
    </main>
  );
}
