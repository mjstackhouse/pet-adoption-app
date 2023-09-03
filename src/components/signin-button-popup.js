'use client'

import { useEffect } from 'react';
import { signIn } from 'next-auth/react';
import $ from 'jquery';

export default function SignInButtonPopup({ parameters }) {

  useEffect(() => {
    if (parameters.hasOwnProperty('city')) {
      $('.no-session-feedback').addClass('top-[3.5rem] left-[1rem] right-[1rem]');
    }
    else {
      $('.no-session-feedback').addClass('bottom-[85vh] sm:bottom-[70vh] left-[1rem] right-[1rem]');
    }
  }, []);

  return (
    <button onClick={() => signIn()} className='fixed xl:self-start top-[50%] sm:right-[25%] sm:left-[25%] lg:right-[35%] lg:left-[35%] z-20 no-session-feedback font-bold tracking-wider bg-white border-2 border-red text-black px-2 py-2 rounded-md hover:underline underline-offset-4'>Please sign in to favorite animals</button>
  )
}