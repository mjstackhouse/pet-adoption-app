import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Bree_Serif } from 'next/font/google';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default function Loading() {
  return (
    <div className='h-[calc(100svh-80px)] h-[calc(100vh-80px)] sm:h-[calc(100svh-90px)] sm:h-[calc(100vh-90px)] flex flex-wrap mx-4 sm:mx-auto items-center justify-center text-center'>
      <div>
        <h1 className={`${bree.className} basis-full font-bold text-3xl xs:text-4xl leading-snug tracking-wide mb-2 sm:mb-4`}>Getting your favorited animals</h1>
        <FontAwesomeIcon icon={faCircleNotch} className='h-[2rem] text-blue animate-spin mx-auto' />
      </div>
    </div>
  )
}