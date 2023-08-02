import SigninForm from '../../components/signin-form';
import { Bree_Serif } from 'next/font/google';
import Provider from '@/components/provider';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default function SigninPage() {
  return (
    <div className='bg-gray h-[90vh] flex flex-wrap flex-col justify-center items-center'>
      <div className='w-[100vw] h-[10%] self-start flex justify-center'>
        <h1 id='intro-heading' className={`${bree.className} font-bold text-2xl xs:text-3xl leading-loose tracking-wide`}>
          Sign into your account
        </h1>
      </div>
      <SigninForm />
      <div className='basis-[10%] h-[10%] bg-gray'></div>
    </div>
  )
}