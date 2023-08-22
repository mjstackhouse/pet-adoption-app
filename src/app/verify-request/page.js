import { Bree_Serif } from 'next/font/google';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default function VerifyRequestPage() {
  return (
    <div className='h-[90vh] flex flex-wrap items-center mx-4 sm:mx-auto justify-center text-center'>
      <div>
        <h1 className={`${bree.className} basis-full font-bold text-3xl sm:text-4xl leading-loose tracking-wide sm:mb-2`}>Check your email</h1>
        <p className='basis-full text-base sm:text-lg'>A sign-in link has been sent to your email address.</p>
      </div>
    </div>
  )
}