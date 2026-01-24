import sessionwithHeaders from '@/utils/sessionWithHeaders';
import { redirect } from 'next/navigation';
import LoginComponent from '@/components/sign-in/LoginComponent';

export default async function signIn() {
  if (await sessionwithHeaders()) {
    redirect('/flow');
  }

  return (
    <div className='max-w-md mx-auto p-6 space-y-4 text-white'>
      <LoginComponent />
    </div>
  );
}
