'use client'

import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';
import $ from 'jquery';

export default function SignInButton() {
  const [navState, setNavState] = useState('closed');
  const { data: session } = useSession();

  function openOrCloseAccountNav() {
    if (navState === 'closed') {
      $('#account-nav-container').css('display', 'block');
      setNavState('open');
    }
    else {
      $('#account-nav-container').css('display', 'none');
      setNavState('closed');
    }
  }

  return(
    <div>
      {session ? (
        <div>
          <button className='text-4xl' onClick={() => openOrCloseAccountNav()}>☰</button>
          <div id='account-nav-container' className='hidden'>
            <Link href='/account/favorites'>Favorites</Link>
            <button onClick={() => signOut({callbackUrl: `${process.env.NEXT_PUBLIC_URL}`})}>Sign Out</button>
          </div>
        </div>
        ) : (
        <button onClick={() => signIn()}>Sign In</button>
        )}
    </div>
  )
}