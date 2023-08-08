import fetchData from '../../../utilities/fetch-data';

export default async function PetPage({ params }) {
  console.log('params', params);

  const data = await fetchData(params.pet);

  // console.log('dog data', await data);

  return (
    <div className=''>
      {data.animal.id}
    </div>
  )
}