'use client'

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  return (
    <div className='flex flex-wrap justify-center items-center'>
      <form className='basis-full flex flex-wrap justify-center items-center border-b-2 mb-4 pb-4'>
        <div className='basis-full text-center mb-2'>
          <label htmlFor='email'>Email: </label>
          <input id='email' type='email' className='rounded-3xl'></input>
        </div>
        <div className='basis-full text-center'>
          <label htmlFor='password'>Password: </label>
          <input id='password' type='password' className='rounded-3xl'></input>
        </div>
      </form>
      <button className='bg-blue text-black px-4 py-2 rounded-3xl' onClick={() => signIn('google', { callbackUrl })}>Continue with Google</button>
    </div>
  )
}