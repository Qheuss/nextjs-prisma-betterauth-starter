import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function sessionwithHeaders() {
  const headersList = await headers();
  const headersObj = new Headers();

  for (const [key, value] of headersList.entries()) {
    headersObj.append(key, value);
  }
  return await auth.api.getSession({
    headers: headersObj,
  });
}
