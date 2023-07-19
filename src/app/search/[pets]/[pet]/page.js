import fetchData from '../../fetch-data';

export default async function DogPage({ params }) {
  console.log('params', params);

  const data = await fetchData(params.pet);

  console.log('dog data', await data);

  return (
    <div>
      {data.animal.id}
    </div>
  )
}