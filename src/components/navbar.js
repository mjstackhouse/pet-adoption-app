// 'use client'

import Link from 'next/link';
import SignInButton from './signin-button';

export default function Navbar() {
  return (
    <div className='flex items-center justify-evenly basis-full bg-black text-white'>
      <nav className='flex basis-full'>
        <ul className='basis-full flex items-center justify-evenly h-16 mx-4 md:mx-16'>
          <li className='basis-1/2'>
            <Link href='/'>Home</Link>
          </li>
          {/* <li>
            <Link href='/search/dog'>Dogs</Link>
          </li>
          <li>
            <Link href='/search/cat'>Cats</Link>
          </li>
          <li>
            <Link href='/search/other-pets'>Other Pets</Link>
          </li> */}
          <li className='basis-1/2 justify-end flex'>
            <SignInButton />
          </li>
        </ul>
      </nav>
    </div>
  )
};