'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faXmark } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import { Bree_Serif } from 'next/font/google';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default function SigninForm({ parameters }) {

  const [userEmail, setUserEmail] = useState(null);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  useEffect(() => {
    
    if (callbackUrl !== null) {
      $('#close-signin-btn').css('display', 'none');
      $('.signin-form-container').eq(0).addClass('fixed h-[100vh] w-screen md:h-auto md:w-auto md:inset-x-[5%] lg:inset-x-[15%] md:inset-y-[25%] z-30 hidden rounded-none md:rounded-3xl');
      
      $('.signin-form-container').eq(1).removeClass('hidden');
      $('.signin-form-container').eq(1).addClass('mx-4 sm:mx-8 rounded-3xl');
    }
    else {
      $('.signin-form-container').eq(1).removeClass('mx-4 sm:mx-8 rounded-3xl');
      $('.signin-form-container').addClass('fixed h-[100vh] w-screen md:h-auto md:w-auto md:inset-x-[5%] lg:inset-x-[15%] md:inset-y-[25%] z-30 hidden rounded-none md:rounded-3xl');
    }

    // if (document.getElementById('inner-body-container') !== null) {
    //   document.getElementById('inner-body-container').addEventListener('click', () => {
    //     closeFilters();
    //     document.getElementById('inner-body-container').removeEventListener('click', () => {
    //       closeFilters();
    //     })
    //   })
    // }
  }, []);

  function closeFilters() {
    $('.signin-form-container').eq(0).css('display', 'none');
    $('#inner-body-container').css('filter', 'brightness(1)');
    $('#inner-body-container *').css('pointer-events', 'auto');
    $('#inner-body-container *').css('touch-action', 'auto');
    $('html').css('overflow-y', 'visible');
  }

  return (
    <div className='signin-form-container md:max-w-[700px] lg:max-w-[850px] md:mx-auto flex flex-wrap place-content-center bg-white text-base max-w-fit px-4 py-6 sm:px-6 sm:py-8 shadow-lg hidden'>
      <button id='close-signin-btn' className='close-signin-btn absolute top-[1rem] left-[1rem] mb-4' onClick={() => closeFilters()}>
        <FontAwesomeIcon icon={faXmark} className='h-[2rem] text-black hover:text-darker-gray' />
      </button>
      <h1 id='signin-to-favorite' className={`${bree.className} signin-to-favorite text-center mx-auto font-bold text-3xl sm:text-4xl leading-loose tracking-wide mb-8 hidden leading-snug`}>
          Sign in to favorite animals
      </h1>
      <div className='basis-full text-center mb-6'>
        <button id='google-signin-btn' className='sm:mr-2 block sm:inline font-bold tracking-wider bg-blue hover:bg-darker-blue hover:shadow-md hover:underline underline-offset-4 text-black px-4 py-2 rounded-3xl mb-4 mx-auto' onClick={() => { callbackUrl !== null ? signIn('google', { callbackUrl }) : signIn('google') } }>
          <FontAwesomeIcon icon={faGoogle} className='h-[1rem] mr-2' />
          Continue with Google
        </button>
        <button id='facebook-signin-btn' className='sm:ml-2 block sm:inline font-bold tracking-wider bg-blue hover:bg-darker-blue hover:shadow-md hover:underline underline-offset-4 text-black px-4 py-2 rounded-3xl mx-auto' onClick={() => { callbackUrl !== null ? signIn('facebook', { callbackUrl }) : signIn('facebook') }}>
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
          <input id='email' type='email' name='email' placeholder='Enter your email address...' onInput={(e) => setUserEmail(e.target.value)} className='text-base h-[2.5rem] basis-full max-w-[100%] sm:mx-auto text-black px-3 py-1 rounded-3xl border-black border-2' required></input>
        </div>
        <button className='font-bold tracking-wider hover:bg-darker-gray hover:underline underline-offset-4 hover:shadow-md bg-white border-2 text-black px-4 py-2 mx-auto rounded-3xl' onClick={() => signIn('email', { email: `${userEmail}` })}>
          <FontAwesomeIcon icon={faEnvelope} className='h-[1rem] mr-2' />
          Continue with email
        </button>
      </form>
    </div>
  )
}