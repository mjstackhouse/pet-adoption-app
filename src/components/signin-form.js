'use client'

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  return (
    <div className='max-h-[60%] flex flex-wrap justify-start items-center bg-white text-base max-w-fit mx-4 sm:mx-auto px-4 py-6 sm:px-6 sm:py-6 rounded-3xl border-blue border-solid border-2'>
      <form className='basis-full flex flex-wrap justify-start items-center border-b-2 mb-8 pb-4'>
        <div className='basis-full flex flex-wrap text-center mb-2'>
          <label htmlFor='email' className='basis-full'>Email</label>
          <input id='email' type='email' className='text-base h-[2.5rem] basis-full max-w-[100%] text-black mx-4 mb-4 sm:mr-4 px-3 py-1 rounded-3xl border-black border-2'></input>
        </div>
        <div className='basis-full flex flex-wrap text-center'>
          <label htmlFor='password' className='basis-full'>Password</label>
          <input id='password' type='password' className='text-base h-[2.5rem] basis-full max-w-[100%] text-black mx-4 mb-4 sm:mr-4 px-3 py-1 rounded-3xl border-black border-2'></input>
        </div>
      </form>
      <div className='basis-full text-center'>
        <button className='bg-blue text-black px-4 py-2 rounded-3xl' onClick={() => signIn('google', { callbackUrl })}>Continue with Google</button>
      </div>
    </div>
  )
}