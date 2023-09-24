import Search from '@/components/search';
import AdoptionTips from '@/components/adoption-tips';
import { Bree_Serif } from 'next/font/google';
import fetchData from '../utilities/fetch-data';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default async function Home() {

  const types = await fetchData();

  return (
    <div className='basis-full max-w-screen flex flex-wrap'>
      <Search types={await types} />
      {/* <div className='relative bg-darker-blue max-w-full basis-full pb-8'>
        <AdoptionTips />
      </div> */}
    </div>
  )
}