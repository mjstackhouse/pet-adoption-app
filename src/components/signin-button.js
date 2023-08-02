'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';
import $ from 'jquery';

export default function SignInButton() {
  const [navState, setNavState] = useState('closed');
  const { data: session } = useSession();

  if (session) console.log('session: ', session);

  function openOrCloseAccountNav() {
    if (navState === 'closed') {
      // $('#account-nav-container').animate({ width: 'fit-content'}, 750);
      $('#nav-button').animate({ transform: 'rotate(90deg)'}, 750);
      $('#account-nav-container').animate({ right: '0', opacity: '1.0'}, 750);
      $('body').css('touch-action', 'none');
      setNavState('open');
    }
    else {
      // $('#account-nav-container').animate({ width: '0'}, 750);
      $('#account-nav-container').animate({ right: '-50vw', opacity: '0'}, 750);
      $('body').css('touch-action', 'auto');
      setNavState('closed');
    }
  }

  return(
    <div>
      {session ? (
        <div>
          <button id='nav-button' className='text-4xl' onClick={() => openOrCloseAccountNav()}>
          { session.user.image ? <img className='h-[2rem] rounded-3xl' src={session.user.image} /> : <FontAwesomeIcon icon={faCircleUser} className='h-[2rem] text-blue' />}
          </button>
          <div id='account-nav-container' className='flex text-right shadow-md z-20 pb-2'>
            <div className='basis-full mx-4 md:mx-16 leading-loose'>
              <Link href='/account/favorites'>Favorites</Link>
              <div>
                <button onClick={() => signOut({callbackUrl: `${process.env.NEXT_PUBLIC_URL}`})}>Sign Out</button>
              </div>
            </div>
          </div>
        </div>
        ) : (
        <button onClick={() => signIn()}>Sign In</button>
        )}
    </div>
  )
}