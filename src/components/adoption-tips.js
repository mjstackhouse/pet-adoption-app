import { Bree_Serif } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import adoptionImg from '../../public/adoption-img-1.jpg';
import pinkBgShape from '../../public/pink-bg-shape-1.svg';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default function AdoptionTips() {
  return (
    // <div className='basis-full bg-yellow w-[100vw] mx-auto'>
      <div id='adoption-tips-container' className='relative flex flex-wrap text-center justify-center items-center my-auto h-[100vh] sm:h-[50vh]  sm:max-w-[600px] md:max-w-[700px] lg:max-w-[900px] mx-auto'>
        <div className='flex flex-wrap sm:flex-nowrap relative z-10 mx-4 sm:mx-auto mx-4 px-4 py-8 sm:px-8 rounded-3xl border-black shadow-lg bg-white'>
          <div className='sm:basis-1/2 flex flex-wrap items-center text-center sm:text-left mb-4 sm:mb-0'>
            <div>
              <p className={`${bree.className} font-bold text-4xl xs:text-5xl tracking-wide mb-2 sm:mb-4`}>
                First time adopting?
              </p>
              <p className='text-base sm:text-xl md:text-2xl leading-relaxed tracking-wide sm:mb-8'>
                We're here to help you through this process with tips and advice.
              </p>
              <Link href='/adoption-tips' className='hidden sm:inline relative font-bold tracking-wider bg-blue hover:bg-darker-blue hover:underline underline-offset-4 text-black px-4 py-2 rounded-3xl z-10'>Learn more</Link>
            </div>
          </div>
          <div className='relative sm:basis-1/2 mb-4 sm:mb-0'>
            <Image src={adoptionImg} className='relative mx-auto w-auto z-10 border-pink border-2' />
            {/* <Image src={pinkBgShape} className='absolute top-0 bottom-1.5 left-0 right-0 z-0 ' /> */}
          </div>
          <Link href='/adoption-tips' className='block sm:hidden mx-auto font-bold tracking-wider bg-blue hover:bg-darker-blue hover:underline underline-offset-4 text-black px-4 py-2 rounded-3xl z-10'>Learn more</Link>
        </div>
        {/* <Image id='pink-bg-shape' src={pinkBgShape} className='absolute top-0 bottom-0 left-0 right-0 z-0 my-auto h-[100%] rotate-90 sm:rotate-0' /> */}
      </div>
    // </div>
  )
}