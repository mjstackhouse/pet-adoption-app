import { Bree_Serif } from 'next/font/google';
import Link from 'next/link';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default function NewUserPage() {
  return (
    <div className='h-[90vh] flex flex-wrap mx-4 sm:mx-auto items-center justify-center text-center'>
      <div>
        <h1 className={`${bree.className} basis-full font-bold text-3xl sm:text-4xl mb-8 leading-snug tracking-wide mb-2 sm:mb-4`}>Your account has been created</h1>
        <Link href='/' className='font-bold tracking-wider bg-blue hover:bg-darker-blue hover:underline underline-offset-4 text-black px-4 py-2 rounded-3xl shadow-md'>Start looking for animals to adopt</Link>
      </div>
    </div>
  )
}