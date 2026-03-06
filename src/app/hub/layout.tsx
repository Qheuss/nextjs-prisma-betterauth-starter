import sessionwithHeaders from '@/utils/sessionWithHeaders';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function WorkspaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (!(await sessionwithHeaders())) {
    redirect('/login');
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <main className='flex-1 p-4'>{children}</main>
    </div>
  );
}
