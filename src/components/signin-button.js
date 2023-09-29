'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';
import $ from 'jquery';

export default function SignInButton() {
  const [navState, setNavState] = useState('closed');
  const { data: session } = useSession();

  function openOrCloseAccountNav() {

    if (navState === 'closed') {
      $('#nav-button').animate({ transform: 'rotate(90deg)'}, 750);
      $('#account-nav-container').css('display', 'flex');
      $('#account-nav-container').animate({ height: '83px', opacity: '1.0'}, 350);
      $('body').css('touch-action', 'none');
      setNavState('open');
    }
    else {
      $('#account-nav-container').animate({ height: '0px', opacity: '0'}, 350);
      $('#account-nav-container').css('display', 'none');
      $('body').css('touch-action', 'auto');
      setNavState('closed');
    }
  }

  return(
    <div>
      {session ? (
        <div className='relative isolate'>
          <button id='nav-button' className='text-4xl' onClick={() => openOrCloseAccountNav()}>
            <FontAwesomeIcon icon={faCircleUser} className='h-[2rem] text-blue hover:text-darker-blue' />
          </button>
          <div id='account-nav-container' className='absolute bg-blue w-[140px] text-white top-[60px] sm:top-[65px] right-0 hidden text-right shadow-lg -z-10 px-4 rounded-b-3xl'>
            <div className='basis-full leading-loose mt-2'>
              <Link href='/account/favorites' className='flex justify-between items-center hover:text-darker-gray hover:underline underline-offset-4 group' onClick={() => openOrCloseAccountNav()}>
                <FontAwesomeIcon icon={faHeart} className='h-[1.25rem] mr-2 group-hover:scale-125 transition-transform' />
                Favorites
              </Link>
              <button className='group w-full text-right flex justify-between items-center  hover:text-darker-gray hover:underline underline-offset-4' onClick={() => { openOrCloseAccountNav(); signOut({callbackUrl: `${process.env.NEXT_PUBLIC_URL}`})} }>
                <FontAwesomeIcon icon={faArrowRightFromBracket} className='h-[1.25rem] mr-2 group-hover:scale-125 transition-transform' />
                Sign Out
              </button>
            </div>
          </div>
        </div>
        ) : (
        <button className='font-bold tracking-wider border-2 border-black hover:bg-gray hover:underline underline-offset-4 text-black px-4 py-2 rounded-3xl' onClick={() => signIn()}>Sign In</button>
        )}
    </div>
  )
}