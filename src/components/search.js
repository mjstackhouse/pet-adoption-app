'use client'

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import loadAuto from '@/utilities/google-api';
import { useRouter } from 'next/navigation';

export default function Search() {

  const [animalType, setAnimalType] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  // const animalType = useRef('');
  // const city = useRef('');
  // const state = useRef('');

  const router = useRouter();

  useEffect(() => {
    if (document.getElementsByClassName('pac-container') !== undefined) loadAuto();
  }, []);

  function handleSubmit() {
    const locationInput = document.getElementById('autocomplete');
    const locationSplit = locationInput.value.split(', ');
    
    setCity(locationSplit[0].toLowerCase());
    setState(locationSplit[1].toLowerCase());

    // city.current = locationSplit[0].toLowerCase();
    // state.current = locationSplit[1].toLowerCase();

    // router.push(`/search/${animalType}/${state.current}/${city.current}?page=1`);
  }
  
  return (
    <form method='get' action={`/search/${animalType}/${state}/${city}`} className='flex flex-wrap items-center justify-center max-w-[100%]'>
      <select id='select' className='text-base h-[2.5rem] max-w-[90%] bg-white basis-full text-black mx-4 mb-4 sm:mr-4 px-3 py-1 rounded-3xl border-black border-2' value={animalType} onChange={e => setAnimalType(e.target.value)} required>
        <option value=''>Select an animal type</option>
        <option value='dog'>Dogs</option>
        <option value='cat'>Cats</option>
      </select>
      <input id='autocomplete' className='text-base h-[2.5rem] basis-full max-w-[90%] text-black mx-4 mb-4 sm:mr-4 px-3 py-1 rounded-3xl border-black border-2' required></input>
      {/* <Link href={`/search/${animalType}/${state.current}/${city.current}?page=1`} onClick={handleSubmit} className='font-bold tracking-wider bg-blue hover:bg-darker-blue text-black px-4 py-2 rounded-3xl shadow-sm' >Search</Link> */}
      <button type='submit' className='font-bold tracking-wider bg-blue hover:bg-darker-blue text-black px-4 py-2 rounded-3xl' onClick={handleSubmit}>Search</button>
    </form>
  )
}