'use client'

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import $ from 'jquery';
import { Bree_Serif } from 'next/font/google';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default function SearchFiltersButton({ parameters, breeds, searchParameters }) {

  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [size, setSize] = useState('');

  const [queryParams, setQueryParams] = useState(searchParameters);

  useEffect(() => {
    // console.log('useEffect');

    // && Object.keys(searchParameters).includes('page') !== true
    if (Object.keys(searchParameters).length > 0
    && (Object.keys(searchParameters).includes('breed') || Object.keys(searchParameters).includes('age') || Object.keys(searchParameters).includes('size'))) {

      console.log('search-filters-button - if (Object.keys(searchParameters).length > 0)');

      // setAge(prevState => prevState);
      // setBreed(prevState => prevState);
      // setSize(prevState => prevState);

      const searchParamKeys = Object.keys(searchParameters);

      for (let i = 0; i < searchParamKeys.length; i++) {
        console.log('filters useEffect() for loop count: ', i);

        if (searchParamKeys[i] === 'age') {
          setAge(searchParameters.age);
        }
        else if (searchParamKeys[i] === 'breed') {
          console.log('else if (searchParamKeys[i] === breed)');

          setBreed(searchParameters.breed);
        }
        else if (searchParamKeys[i] === 'size') {
          setSize(searchParameters.size);
        }
      }
    }
    else {
      console.log('else');

      document.getElementById('breed').value = '';
      document.getElementById('age').value = '';
      document.getElementById('size').value = '';
    }
  }, [searchParameters])

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
    if (window.innerWidth < 1280) $('#filters-container').css('display', 'none');
  }

  function addToQueryParams(propName, propValue) {
    let updatedQueryParams = queryParams;

    console.log('queryParams before: ', updatedQueryParams);

    if (propName === 'breed') {
      if (propValue === '') delete updatedQueryParams.breed;
      else updatedQueryParams.breed = propValue;
    }
    else if (propName === 'age') {
      if (propValue === '') delete updatedQueryParams.age;
      else updatedQueryParams.age = propValue;
    }
    else if (propName === 'size') {
      if (propValue === '') delete updatedQueryParams.size;
      else updatedQueryParams.size = propValue;
    }
    else if (propName === 'page') {
      delete updatedQueryParams.page;
    }

    setQueryParams(updatedQueryParams);
  }

  // Additional Filters
  //    Distance
  //    Gender/sex
  //    Color

  return (
    <div className='fixed xl:sticky xl:self-start top-[80px] sm:top-[90px] left-0 p-2 sm:p-8 sm:p-4 xl:p-0 z-20'>
      <div id='filters-container' className='xl:pt-8 absolute xl:static top-0 xl:top-[90px] bottom-0 left-0 right-0 mx-auto bg-gray h-[100vh] xl:h-auto w-[100vw] xl:w-[315px] hidden xl:block'>
        <button className='mt-4 ml-4 mb-4 xl:hidden' onClick={() => closeFilters()}>
          <FontAwesomeIcon icon={faXmark} className='h-[2rem] text-black hover:text-darker-gray' />
        </button>
        <form className='flex flex-wrap'>
          <label htmlFor='breed' className={`${bree.className} basis-full text-center text-black font-bold tracking-wider mx-auto mb-2`}>Breed</label>
          <select id='breed' className='basis-full text-base h-[2.5rem] max-w-[90%] bg-white basis-full text-black mx-4 mb-4 sm:mx-auto px-3 py-1 rounded-3xl border-black border-2' value={breed} onChange={e => {setBreed(e.target.value); addToQueryParams('breed', e.target.value);}} required>
            <option value=''>Any breed</option>
            { breeds.breeds.map((element) => {
              return <option value={`${element.name.toLowerCase()}`}>{element.name}</option>
            })}
          </select>
          <label htmlFor='age' className={`${bree.className} basis-full text-center text-black font-bold tracking-wider mx-auto mb-2`}>Age</label>
          <select id='age' className='basis-full text-base h-[2.5rem] max-w-[90%] bg-white basis-full text-black mx-4 mb-4 sm:mx-auto px-3 py-1 rounded-3xl border-black border-2' value={age} onChange={e => {setAge(e.target.value); addToQueryParams('age', e.target.value);}} required>
            <option value=''>Any age</option>
            <option value='baby'>Baby</option>
            <option value='young'>Young</option>
            <option value='adult'>Adult</option>
            <option value='senior'>Senior</option>
          </select>
          <label htmlFor='size' className={`${bree.className} basis-full text-center text-black font-bold tracking-wider mx-auto mb-2`}>Size</label>
          <select id='size' className='basis-full text-base h-[2.5rem] max-w-[90%] bg-white basis-full text-black mx-4 mb-8 sm:mx-auto px-3 py-1 rounded-3xl border-black border-2' value={size} onChange={e => {setSize(e.target.value); addToQueryParams('size', e.target.value);}} required>
            <option value=''>Any size</option>
            <option value='small'>Small</option>
            <option value='medium'>Medium</option>
            <option value='large'>Large</option>
            <option value='xlarge'>Xlarge</option>
          </select>
          <Link id='update-filters-btn' href={ Object.keys(queryParams).length !== 0 ? { query: queryParams } : `/search/${parameters.pets}/${parameters.state}/${parameters.city}` } passHref shallow onClick={() => { addToQueryParams('page', searchParameters?.page); closeFilters(); scrollToStart(); }} className='font-bold tracking-wider hover:underline underline-offset-4 bg-blue hover:bg-darker-blue text-black px-4 py-2 mx-auto rounded-3xl hover:shadow-md mb-4'>
            Update filters
          </Link>
        </form>
      </div>
      <button onClick={() => openFilters()} className='flex xl:hidden xl:pointer-events-none items-center bg-blue hover:bg-darker-blue p-2 rounded-lg font-bold tracking-wider hover:underline underline-offset-4 text-black px-4 py-2 mx-auto shadow-md'>
        <span className='hidden sm:inline'>Filters</span>
        <FontAwesomeIcon icon={faSliders} className='sm:ml-2 h-[2rem] text-black'/>
      </button>
    </div>
  )
}