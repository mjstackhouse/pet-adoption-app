'use client'

import { useEffect, useState, useRef } from 'react';
import loadAuto from '@/utilities/google-api';

export default function Search() {

  const [animalType, setAnimalType] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  // const [location, setLocation] = useState('');
  // const animalType = useRef('');

  useEffect(() => {
    if (document.getElementsByClassName('pac-container') !== undefined) loadAuto();
  }, []);

  function handleSubmit() {
    const locationInput = document.getElementById('autocomplete');
    const locationSplit = locationInput.value.split(', ');
    
    setCity(locationSplit[0].toLowerCase());
    setState(locationSplit[1].toLowerCase());
    // setLocation(locationInput.value);
  }
  
  return (
    <form method='get' action={`/search/${animalType}/${state}/${city}`} className='flex flex-wrap items-center justify-center max-w-[100%]'>
      <select id='select' className='basis-full text-black mx-4 mb-4 sm:mr-4 px-3 py-1 rounded-3xl border-black border-2' value={animalType} onChange={e => setAnimalType(e.target.value)} required>
        <option value=''>Select an animal type</option>
        <option value='dog'>Dogs</option>
        <option value='cat'>Cats</option>
      </select>
      <input id='autocomplete' className='basis-full max-w-[90%] text-black mx-4 mb-4 sm:mr-4 px-3 py-1 rounded-3xl border-black border-2' required></input>
      <button className='bg-blue text-black px-4 py-2 rounded-3xl' type='submit' onClick={handleSubmit}>Search</button>
    </form>
  )
}