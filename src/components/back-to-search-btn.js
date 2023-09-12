'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

export default function BackToSearchBtn() {

  const router = useRouter();

  return (
    <div className='basis-full flex'>
      <button onClick={() => router.back()} className='text-sm sm:text-base hover:underline underline-offset-4 text-darker-purple mb-4 group'>
        <FontAwesomeIcon icon={faChevronLeft} className='h-[0.875rem] mr-2 group-hover:scale-125 transition-all' />
        Back to search
      </button>
    </div>
  )
}