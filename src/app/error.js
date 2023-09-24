'use client'

import { Bree_Serif } from 'next/font/google';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default function ErrorPage() {
  return (
    <div className='h-[calc(100svh-80px)] h-[calc(100vh-80px)] sm:h-[calc(100svh-90px)] sm:h-[calc(100vh-90px)] mx-4 sm:mx-auto flex justify-center items-center text-center'>
      <div className='basis-full'>
        <h1 className={`${bree.className} basis-full font-bold text-3xl sm:text-4xl leading-snug tracking-wide mb-2 sm:mb-4`}>Something went wrong!</h1>
        <p className='basis-full text-base sm:text-lg'>Try refreshing the page.</p>
      </div>
    </div>
  )
}