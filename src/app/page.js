import Search from '@/components/search';
import Image from 'next/image';
import blueBgShape from '../../public/blue-bg-shape-1.png';
import Provider from '@/components/provider';
import AdoptionTips from '@/components/adoption-tips';
import { Bree_Serif } from 'next/font/google';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default function Home() {

  return (
    <div className='basis-full'>
      <div id='search-bg' className='bg-gray shadow-lg z-10 bg-fixed bg-top bg-no-repeat bg-cover'>
        <div id='search-container' className='flex flex-col items-center h-[90vh] max-w-[900px] mx-auto'>
          <div className='basis-full flex flex-wrap justify-center content-center'>
            <div className='flex flex-wrap justify-center items-end text-center mb-4 sm:mb-8 sm:mx-auto'>
              <div id='intro-heading-container' className='text-white relative'>
                {/* <Image src={blueBgShape} className='absolute top-0 bottom-1.5 left-0 right-0 rotate-6' /> */}
                <h1 id='intro-heading' className={`${bree.className} font-bold text-5xl xs:text-6xl tracking-wider drop-shadow-2xl mb-2 sm:mb-4`}>
                  Welcome to PawfectMatch
                </h1>
                <h2 className='text-base sm:text-2xl leading-relaxed tracking-wide drop-shadow-lg'>
                  Where loving homes and animals in need find their perfect companionship.
                </h2>
              </div>
            </div>
            <div className='flex flex-wrap max-w-fit flex-col mx-4 sm:mx-auto px-2 py-4 sm:px-6 sm:py-6 items-center justify-center bg-white rounded-3xl border-blue border-solid shadow-lg'>
              <h1 className='font-bold mb-4 tracking-wider'>Search for adoptable animals:</h1>
              <Search />
            </div>
          </div>
          <div id='intro-bottom' className='block sm:hidden basis-1/3 sm:basis-[40%] w-[100vw] mt-4'></div>
        </div>
      </div>
      <div className='basis-full bg-gray w-[100vw] mx-auto'>
        <AdoptionTips />
      </div>
    </div>
  )
}