'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { Bree_Serif } from 'next/font/google';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default function ChangePageButton({ parameters, searchParameters }) {

  const [pageNum, setPageNum] = useState(searchParameters.hasOwnProperty('page') ? Number(searchParameters.page) + 1 : 2);

  function scrollToStart() {
    const petLinksContainer = document.getElementById('pet-links-container');
    petLinksContainer.scrollTo({
      top: 0,
      left: 0
    })
  }

  return (
    <div className='w-[100vw] flex flex-wrap place-items-center text-center'>
      <h1 className={`${bree.className} basis-full font-bold text-3xl sm:text-6xl tracking-wide mb-4`}>Continue looking by clicking below:</h1>
      <Link id='change-page-button' href={{ query: { page: pageNum } }} passHref shallow onClick={() => {setPageNum(pageNum + 1); scrollToStart();}} className='font-bold tracking-wider hover:bg-darker-gray bg-white border-2 text-black px-4 py-2 mx-auto rounded-3xl shadow-md mb-4'>
        Load next page
      </Link>
    </div>
  )
}