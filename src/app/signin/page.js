import SigninForm from '../../components/signin-form';
import { Bree_Serif } from 'next/font/google';
import Provider from '@/components/provider';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default function SigninPage({ params }) {

  console.log('SigninPage params: ', params);

  return (
    <div className='bg-gray mx-auto h-[calc(100svh-80px)] h-[calc(100vh-80px)] sm:h-[calc(100svh-90px)] sm:h-[calc(100vh-90px)] flex flex-wrap flex-col justify-center items-center'>
      <div className='flex justify-center'>
        <h1 id='intro-heading' className={`${bree.className} mx-auto font-bold text-3xl sm:text-4xl leading-loose tracking-wide mb-8`}>
          Sign in to your account
        </h1>
      </div>
      <SigninForm parameters={params} />
      <div className='basis-[10%] h-[10%] bg-gray'></div>
    </div>
  )
}