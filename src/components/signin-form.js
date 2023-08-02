'use client'

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function SigninForm() {
  const [userEmail, setUserEmail] = useState(null);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  console.log('callbackUrl: ', callbackUrl);

  return (
    <div className='max-h-[60%] flex flex-wrap justify-start items-center bg-white text-base max-w-fit mx-4 sm:mx-auto px-4 py-6 sm:px-6 sm:py-6 rounded-3xl border-blue border-solid border-2'>
      <form method='post' className='basis-full flex flex-wrap justify-start items-center border-b-2 mb-8 pb-4'>
        <div className='basis-full flex flex-wrap text-center mb-2'>
          {/* <label htmlFor='email' className='basis-full mb-2'>Email</label> */}
          <input id='email' type='email' name='email' placeholder='Enter your email address...' onInput={(e) => setUserEmail(e.target.value)} className='text-base h-[2.5rem] basis-full max-w-[100%] text-black mb-4 sm:mr-4 px-3 py-1 rounded-3xl border-black border-2' required></input>
        </div>
        <button className='basis-full bg-white border-2 text-black px-4 py-2 rounded-3xl shadow-md mb-4' onClick={() => signIn('email', { email: `${userEmail}` })}>
          Continue with email
        </button>
      </form>
      <div className='basis-full text-center'>
        <button className='bg-blue w-full text-black px-4 py-2 rounded-3xl shadow-md' onClick={() => signIn('google', { callbackUrl })}>
          <FontAwesomeIcon icon={faGoogle} className='h-[1rem] mr-2' />
          Continue with Google
        </button>
      </div>
    </div>
  )
}