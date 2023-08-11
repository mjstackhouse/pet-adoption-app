'use client'

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import $ from 'jquery';
import { Bree_Serif } from 'next/font/google';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default function SearchFiltersButton({ breeds }) {

  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [size, setSize] = useState('');

  const [queryParams, setQueryParams] = useState({});

  function scrollToStart() {
    const petLinksContainer = document.getElementById('pet-links-container');
    petLinksContainer.scrollTo({
      top: 0,
      left: 0
    })
  }

  function openFilters() {
    $('#filters-container').css('display', 'block');
  }

  function closeFilters() {
    $('#filters-container').css('display', 'none');
  }

  function addToQueryParams(propName, propValue) {
    let updatedQueryParams = queryParams;

    if (propName === 'breed') {
      updatedQueryParams.breed = propValue;
      setQueryParams(updatedQueryParams);
    }
    else if (propName === 'age') {
      updatedQueryParams.age = propValue;
      setQueryParams(updatedQueryParams);
    }
    else {
      updatedQueryParams.size = propValue;
      setQueryParams(updatedQueryParams);
    }
  }

  // Additional Filters
  //    Distance
  //    Gender/sex
  //    Color

  return (
    <div className='absolute top-0 left-0 p-4 z-20'>
      <div id='filters-container' className='absolute top-0 bottom-0 left-0 right-0 mx-auto bg-black h-[100vh] w-[100vw] hidden'>
        <button className='ml-4 mb-4' onClick={() => closeFilters()}>
          <FontAwesomeIcon icon={faXmark} className='h-[2rem] text-white hover:text-darker-gray' />
        </button>
        <form className='flex flex-wrap'>
          <label htmlFor='breed' className={`${bree.className} text-white font-bold tracking-wider mx-auto mb-2`}>Breed</label>
          <select id='breed' className='basis-full text-base h-[2.5rem] max-w-[90%] bg-white basis-full text-black mx-4 mb-4 sm:mr-4 px-3 py-1 rounded-3xl border-black border-2' value={breed} onChange={e => {setBreed(e.target.value); addToQueryParams('breed', e.target.value);}} required>
            <option value=''>Select a breed</option>
            { breeds.breeds.map((element) => {
              return <option value={`${element.name.toLowerCase()}`}>{element.name}</option>
            })}
          </select>
          <label htmlFor='age' className={`${bree.className} text-white font-bold tracking-wider mx-auto mb-2`}>Age</label>
          <select id='age' className='basis-full text-base h-[2.5rem] max-w-[90%] bg-white basis-full text-black mx-4 mb-4 sm:mr-4 px-3 py-1 rounded-3xl border-black border-2' value={age} onChange={e => {setAge(e.target.value); addToQueryParams('age', e.target.value);}} required>
            <option value=''>Select an age</option>
            <option value='baby'>Baby</option>
            <option value='young'>Young</option>
            <option value='adult'>Adult</option>
            <option value='senior'>Senior</option>
          </select>
          <label htmlFor='size' className={`${bree.className} text-white font-bold tracking-wider mx-auto mb-2`}>Size</label>
          <select id='size' className='basis-full text-base h-[2.5rem] max-w-[90%] bg-white basis-full text-black mx-4 mb-8 sm:mr-4 px-3 py-1 rounded-3xl border-black border-2' value={size} onChange={e => {setSize(e.target.value); addToQueryParams('size', e.target.value);}} required>
            <option value=''>Select a size</option>
            <option value='small'>Small</option>
            <option value='medium'>Medium</option>
            <option value='large'>Large</option>
            <option value='xlarge'>Xlarge</option>
          </select>
          <Link href={{ query: queryParams }} passHref shallow onClick={() => {closeFilters(); scrollToStart();}} className='font-bold tracking-wider hover:bg-darker-gray bg-white border-2 text-black px-4 py-2 mx-auto sm:mt-8 sm:mb-8 rounded-3xl shadow-md mb-4'>
            Update filters
          </Link>
        </form>
      </div>
      <button onClick={() => openFilters()} className='bg-white hover:bg-gray p-2 rounded-lg'>
        <FontAwesomeIcon icon={faSliders} className='h-[2rem] text-blue hover:text-darker-blue'/>
      </button>
    </div>
  )
}