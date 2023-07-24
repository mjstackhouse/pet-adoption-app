'use client'

import { useSession, signIn, signOut } from 'next-auth/react';

export default function SignInButton() {
  const { data: session } = useSession();

  return(
    <div>
      {session ? (
        <button onClick={() => signOut({callbackUrl: `${process.env.NEXT_PUBLIC_URL}`})}>Sign Out</button>
        ) : (
        <button onClick={() => signIn()}>Sign In</button>
        )}
    </div>
  )
}