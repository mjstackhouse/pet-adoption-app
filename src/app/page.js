import Search from '@/components/search';
import Image from 'next/image';
import petsImg from '../../public/pets-1.jpg';
import { Bree_Serif } from 'next/font/google';
import Provider from '@/components/provider';

const oswald = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default function Home() {

  return (
    <div id='search-container' className='flex flex-col items-center h-[90vh] bg-gray'>
      <div className='basis-1/3 flex items-center text-center mb-4 mx-4 sm:mx-auto'>
        {/* <Image src={petsImg} className='h-[30vh] w-[auto]' /> */}
        <h1 id='intro-heading' className={`${oswald.className} font-bold text-2xl xs:text-3xl leading-loose tracking-wide`}>
          Welcome to PawfectMatch, where loving homes and animals in need find their perfect companionship.
        </h1>
      </div>
      <div className='basis-1/3 flex flex-wrap max-w-fit flex-col mx-4 sm:mx-auto px-2 py-4 sm:px-6 sm:py-6 items-center justify-center bg-white rounded-3xl border-blue border-solid border-2'>
        <h1 className='mb-4 font-bold tracking-wider'>Search for adoptable pets:</h1>
        <Search />
      </div>
      <div id='intro-bottom' className='basis-1/3 w-[100vw] mt-4'></div>
    </div>
  )
}