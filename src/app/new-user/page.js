import { Bree_Serif } from 'next/font/google';
import Link from 'next/link';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default function NewUserPage() {
  return (
    <div className='h-[90vh] flex flex-wrap mx-4 sm:mx-auto items-center justify-center text-center'>
      <div>
        <h1 className={`${bree.className} basis-full font-bold text-3xl sm:text-6xl mb-8 leading-loose tracking-wide sm:mb-2`}>Your email address has been verified</h1>
        <Link href='/' className='bg-blue text-black px-4 py-2 rounded-3xl shadow-sm'>Start looking for animals to adopt</Link>
      </div>
    </div>
  )
}