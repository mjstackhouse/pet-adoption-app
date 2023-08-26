import Search from '@/components/search';
import AdoptionTips from '@/components/adoption-tips';
import Image from 'next/image';
import yellowWave from '../../public/yellow-wave-1.svg';
import { Bree_Serif } from 'next/font/google';
import AnimalsNearby from '@/components/animals-nearby';
import fetchData from '../utilities/fetch-data';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default async function Home() {

  const types = await fetchData();

  return (
    <div className='basis-full'>
      {/* <div id='search-bg' className='bg-gray shadow-lg z-10 bg-fixed bg-top bg-no-repeat bg-cover'>
        <div id='search-container' className='flex flex-col items-center h-[90vh] max-w-[900px] mx-auto'>
          <div className='basis-full flex flex-wrap place-content-start'>
            <div className='flex flex-wrap justify-center items-end text-center mb-4 sm:mb-8 sm:mx-auto'>
              <div id='intro-heading-container' className='text-white relative'>
                <h1 id='intro-heading' className={`${bree.className} font-bold text-5xl xs:text-6xl tracking-wider drop-shadow-2xl mb-2 sm:mb-4`}>
                  Welcome to PawfectMatch
                </h1>
                <h2 className='text-base sm:text-2xl leading-relaxed tracking-wide drop-shadow-lg mx-4 sm:mx-auto'>
                  Where loving homes and animals in need find their perfect companionship.
                </h2>
              </div>
            </div>
            <Search />
          </div>
        </div>
      </div> */}
      <Search types={await types} />
      <div className='relative bg-yellow basis-full w-[100vw] mx-auto'>
        <AdoptionTips />
      </div>
      {/* <div className='basis-full bg-[url("../../public/adoption-img-1.jpg")] bg-no-repeat bg-cover bg-center w-[100vw] mx-auto'>
        <AdoptionTips />
      </div> */}
    </div>
  )
}