import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center  text-white flex-col'>
      <h1 className='text-4xl font-bold'>404 - Page Not Found</h1>
      <Link href='/' className='mt-4 text-lg underline'>
        Go back to Home
      </Link>
    </div>
  );
}
