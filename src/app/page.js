import Search from '@/components/search';
import Image from 'next/image';
import Provider from '@/components/provider';
import AdoptionTips from '@/components/adoption-tips';
import { Bree_Serif } from 'next/font/google';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default function Home() {

  return (
    <div className='basis-full'>
      <div className='bg-gray shadow-lg z-10'>
        <div id='search-container' className='flex flex-col items-center h-[90vh] bg-gray max-w-[900px] mx-auto'>
          <div className='basis-1/3 sm:basis-[40%] flex flex-wrap justify-center items-end text-center mb-4 sm:mb-8 mx-4 sm:mx-auto'>
            <div>
              <h1 id='intro-heading' className={`${bree.className} font-bold text-4xl xs:text-6xl tracking-wide mb-2 sm:mb-4`}>
                Welcome to PawfectMatch
              </h1>
              <h2 className='text-base sm:text-2xl leading-relaxed tracking-wide'>
                Where loving homes and animals in need find their perfect companionship.
              </h2>
            </div>
          </div>
          <div className='basis-1/3 sm:basis-[20%] flex flex-wrap max-w-fit flex-col mx-4 sm:mx-auto px-2 py-4 sm:px-6 sm:py-6 items-center justify-center bg-white rounded-3xl border-blue border-solid shadow-lg'>
            <h1 className='font-bold mb-4 tracking-wider'>Search for adoptable animals:</h1>
            <Search />
          </div>
          <div id='intro-bottom' className='basis-1/3 sm:basis-[40%] w-[100vw] mt-4'></div>
        </div>
      </div>
      <div className='basis-full bg-yellow w-[100vw] mx-auto'>
        <AdoptionTips />
      </div>
    </div>
  )
}