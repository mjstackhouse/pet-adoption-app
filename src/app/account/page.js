// 'use client'

import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { Bree_Serif } from 'next/font/google';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default async function AccountPage() {
  // const { data: session } = useSession({
  //   required: true,
  //   // onUnauthenticated() {
  //   //   redirect('/signin?callbackUrl=/account')
  //   // }
  // });

  const session = await getServerSession(authOptions);

  if (!session) redirect('/signin?callbackUrl=/account');

  return (
    <div>
      <h1 className={`${bree.className} basis-full font-bold text-2xl xs:text-3xl leading-loose tracking-wide sm:mb-2`}>My Account</h1>
      <p>{session?.user?.name}</p>
    </div>
  )
}