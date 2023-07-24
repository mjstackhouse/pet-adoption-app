// 'use client'

import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

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
      <h1>You are logged in as:</h1>
      <p>{session?.user?.name}</p>
    </div>
  )
}