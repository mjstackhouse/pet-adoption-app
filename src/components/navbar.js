// 'use client'

import Link from 'next/link';

export default function Navbar() {
  return (
    <div className='flex items-center justify-evenly basis-full'>
      <nav className='flex basis-full'>
        <ul className='basis-full flex items-center justify-evenly h-16'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/search/dog'>Dogs</Link>
          </li>
          <li>
            <Link href='/search/cat'>Cats</Link>
          </li>
          <li>
            <Link href='/search/other-pets'>Other Pets</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
};