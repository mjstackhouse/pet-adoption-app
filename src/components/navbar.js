// 'use client'

import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/petadoptionapp-logo-2d.png';
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
    <div className='basis-full flex items-center justify-evenly bg-white text-white z-20 shadow-md'>
      <nav className='flex basis-full sm:max-w-[600px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1100px]'>
        <ul className='basis-full flex items-center justify-evenly h-16 mx-4 sm:mx-8 md:mx-0'>
          <li className='basis-1/2 flex'>
            <Link href='/' className={`${philosopher.className}`}>
              <Image src={logo} className='h-[1.5rem] sm:h-[2.25rem] w-auto' />
            </Link>
          </li>
          <li className='basis-1/2 justify-end flex'>
            <SignInButton />
          </li>
        </ul>
      </nav>
    </div>
  )
};