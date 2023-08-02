import Search from '@/components/search';
import Image from 'next/image';
import { Bree_Serif } from 'next/font/google';
import Provider from '@/components/provider';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default function Home() {

  return (
    <div id='search-container' className='flex flex-col items-center h-[90vh] bg-gray max-w-[900px]'>
      <div className='basis-1/3 sm:basis-[40%] sm: flex items-center text-center mb-4 sm:mb-8 mx-4 sm:mx-auto'>
        <h1 id='intro-heading' className={`${bree.className} self-end font-bold text-2xl xs:text-3xl leading-loose tracking-wide`}>
          Welcome to PawfectMatch, where loving homes and animals in need find their perfect companionship.
        </h1>
      </div>
      <div className='basis-1/3 sm:basis-[20%] flex flex-wrap max-w-fit flex-col mx-4 sm:mx-auto px-2 py-4 sm:px-6 sm:py-6 items-center justify-center bg-white rounded-3xl border-blue border-solid border-2'>
        <h1 className='mb-4 font-bold tracking-wider'>Search for adoptable pets:</h1>
        <Search />
      </div>
      <div id='intro-bottom' className='basis-1/3 sm:basis-[40%] w-[100vw] mt-4'></div>
    </div>
  )
}