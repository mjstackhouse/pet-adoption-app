import { Bree_Serif } from 'next/font/google';
import Provider from '@/components/provider';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default function VerifyRequestPage() {
  return (
    <div className='flex flex-wrap mx-4 sm:mx-auto justify-center text-center'>
      <h1 className={`${bree.className} basis-full font-bold text-2xl xs:text-3xl leading-loose tracking-wide sm:mb-2`}>Check your email</h1>
      <p className='basis-full text-base sm:text-lg'>A sign-in link has been sent to your email address.</p>
    </div>
  )
}