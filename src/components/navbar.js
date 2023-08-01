// 'use client'

import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/petadoptionapp-logo-whitetext.png';
import SignInButton from './signin-button';
import { Inter } from 'next/font/google';
import { Josefin_Sans } from 'next/font/google';
import { Lilita_One } from 'next/font/google';
import { Philosopher } from 'next/font/google';
import Provider from '@/components/provider';

const inter = Inter({ subsets: ['latin'] });
const joesfin = Josefin_Sans({ weight: '600', subsets: ['latin'] });
const lilita = Lilita_One({ weight: '400', subsets: ['latin'] });
const philosopher = Philosopher({ weight: '700', subsets: ['latin'] });

export default function Navbar() {

  return (
    <div className='flex items-center justify-evenly basis-full bg-black text-white'>
      <nav className='flex basis-full'>
        <ul className='basis-full flex items-center justify-evenly h-16 mx-4 md:mx-16'>
          <li className='basis-1/2'>
            <Link href='/' className={`text-xl ${philosopher.className}`}>
              <Image src={logo} />
            </Link>
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