import fetchData from '../fetch-data';
import Link from 'next/link';

export default async function Dogs({ params }) {
  const data = await fetchData(params.pets);

  console.log('data.animals: ', await data.animals);

  return (
    <div>
      { await data.animals.map((element) => {
        return <Link href={`/search/dogs/${element.id}`} 
        className='basis-full'>
        <h2 className='text-2xl sm:text-3xl font-bold text-left mt-2 sm:mt-4'>{element.name}</h2>
        </Link>;
      })}
    </div>
  )
}