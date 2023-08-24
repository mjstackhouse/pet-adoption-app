'use client'

import fetchData from '@/utilities/fetch-data';

export default async function AnimalsNearby({ type, state, city }) {

  const data = await fetchData(type, state, city, 1);

  // console.log('data: ', await data);

  return (
    <div>
      {await data.animals.map((element) => {
        return <p>{element.name}</p>
      })}
    </div>
  )
}