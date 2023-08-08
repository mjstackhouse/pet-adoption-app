'use client'

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function SigninForm() {
  const [userEmail, setUserEmail] = useState(null);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  console.log('callbackUrl: ', callbackUrl);

  return (
    <div className='max-h-[60%] flex flex-wrap justify-start items-center bg-white text-base max-w-fit mx-4 sm:mx-auto px-4 py-6 sm:px-6 sm:py-6 rounded-3xl border-blue border-solid border-2'>
      <div className='basis-full text-center mb-6'>
        <button className='font-bold tracking-wider bg-blue hover:bg-darker-blue text-black px-4 py-2 rounded-3xl shadow-md mb-4' onClick={() => signIn('google', { callbackUrl })}>
          <FontAwesomeIcon icon={faGoogle} className='h-[1rem] mr-2' />
          Continue with Google
        </button>
        <button className='font-bold tracking-wider bg-blue hover:bg-darker-blue text-black px-4 py-2 rounded-3xl shadow-md' onClick={() => signIn('facebook', { callbackUrl })}>
          <FontAwesomeIcon icon={faFacebook} className='h-[1rem] mr-2' />
          Continue with Facebook
        </button>
      </div>
      <div className='basis-full flex justify-center items-center text-center mb-6'>
        <span className='grow border-b-2 border-pink'></span>
        <span className='mx-4'>or</span>
        <span className='grow border-b-2 border-pink'></span>
      </div>
      <form method='post' className='basis-full flex flex-wrap justify-start items-center'>
        <div className='basis-full flex flex items-center text-center mb-6'>
          {/* <label htmlFor='email' className='mr-2'>Email:</label> */}
          <input id='email' type='email' name='email' placeholder='Enter your email address...' onInput={(e) => setUserEmail(e.target.value)} className='text-base h-[2.5rem] basis-full max-w-[100%] text-black px-3 py-1 rounded-3xl border-black border-2' required></input>
        </div>
        <button className='font-bold tracking-wider hover:bg-darker-gray bg-white border-2 text-black px-4 py-2 mx-auto rounded-3xl shadow-md mb-4' onClick={() => signIn('email', { email: `${userEmail}` })}>
          <FontAwesomeIcon icon={faEnvelope} className='h-[1rem] mr-2' />
          Continue with email
        </button>
      </form>
    </div>
  )
}