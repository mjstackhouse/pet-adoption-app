'use client'

import { signIn } from 'next-auth/react';

export default function SignInButtonPopup() {
  return (
    <button onClick={() => signIn()} className='no-session-feedback bg-black text-white absolute top-[1rem] left-[1rem] right-[1rem] z-10 ml-4 mr-2 px-4 py-2 rounded-3xl shadow-md'>Please sign in to favorite animals</button>
  )
}