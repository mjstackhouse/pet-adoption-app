import { Bree_Serif } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import adoptionImg from '../../public/adoption-img-1.jpg'

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default function AdoptionTips() {
  return (
    // <div className='basis-full bg-yellow w-[100vw] mx-auto'>
      <div id='adoption-tips-container' className='flex flex-wrap text-center justify-center items-center h-[100vh] max-w-[900px] mx-auto'>
        <div className='mx-4 sm:mx-auto mx-4 px-4 py-8 sm:px-8 rounded-3xl border-black shadow-lg bg-white'>
          <div className='mb-8'>
            <p className={`${bree.className} font-bold text-4xl xs:text-6xl tracking-wide mb-2 sm:mb-4`}>
              First time adopting?
            </p>
            <p className='text-base sm:text-2xl leading-relaxed tracking-wide'>
              We're here to help you through this process with tips and advice.
            </p>
          </div>
          <Image src={adoptionImg} className='mb-8 mx-auto w-auto rounded-3xl' />
          <Link href='/adoption-tips' className='font-bold tracking-wider bg-blue hover:bg-darker-blue text-black px-4 py-2 rounded-3xl shadow-sm'>Learn more</Link>
        </div>
      </div>
    // </div>
  )
}