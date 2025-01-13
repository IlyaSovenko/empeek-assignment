"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  console.log(pathname);
  return <div
    className='absolute top-0 flex flex-row items-center justify-center gap-10 bg-neutral-800 font-bold p-7 w-full text-lg'
  >
    <Link href='/' className={pathname === '/' ? 'underline' : ''}>Onboarding</Link>
    <Link href='/admin' className={pathname === '/admin' ? 'underline' : ''}>Admin</Link>
    <Link href='/data' className={pathname === '/data' ? 'underline' : ''}>Results</Link>
  </div>
}
