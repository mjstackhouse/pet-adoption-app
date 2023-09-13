'use client'

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import $ from 'jquery';
import { Bree_Serif } from 'next/font/google';
import { useSearchParams } from 'next/navigation';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default function SearchFiltersButton({ parameters, breeds, searchParameters }) {
  
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [size, setSize] = useState('');
  const [houseTrained, setHouseTrained] = useState('false');

  const [queryParams, setQueryParams] = useState({});

  const searchParams = useSearchParams();

  useEffect(() => {

    let newQueryParams = {};

    if (searchParams.has('age')) {
      newQueryParams.age = searchParams.get('age');
      setAge(searchParams.get('age'));
    }
    else {
      setAge('');
    }
    
    if (searchParams.has('breed')) {
      newQueryParams.breed = searchParams.get('breed');
      setBreed(searchParams.get('breed'));
    }
    else {
      setBreed('');
    }

    if (searchParams.has('size')) {
      newQueryParams.size = searchParams.get('size');
      setSize(searchParams.get('size'));
    }
    else {
      setSize('');
    }

    if (searchParams.has('house_trained')) {
      newQueryParams.house_trained = searchParams.get('house_trained');
      $('#house_trained').prop('checked', 'true');
      setHouseTrained(searchParams.get('house_trained'));
    }
    else {
      setHouseTrained('false');
    }

    setQueryParams(newQueryParams);

    $('html').css('overflow-y', 'visible');
  }, [searchParameters, parameters]);

  function scrollToStart() {
    const petLinksContainer = document.getElementById('pet-links-container');
    petLinksContainer.scrollTo({
      top: 0,
      left: 0
    })
  }

  function openFilters() {
    $('#filters-container').css('display', 'block');
    $('html').css('overflow', 'hidden');
  }

  function closeFilters() {
    if (window.innerWidth < 1280) $('#filters-container').css('display', 'none');

    $('html').css('overflow-y', 'visible');
  }

  function addToQueryParams(propName, propValue) {
    console.log('addToQueryParams(propName, propValue) - searchParameters: ', searchParameters);

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
    else if (propName === 'house_trained') {
      if (propValue === 'false') delete updatedQueryParams.house_trained;
      else updatedQueryParams.house_trained = propValue;
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
    <div className='xl:bg-gray fixed xl:sticky xl:self-start xl:min-h-screen top-[0] sm:top-[90px] xl:top-0 left-0 p-2 sm:p-8 sm:p-4 xl:p-0 z-20 xl:z-10'>
      <div id='filters-container' className='bg-gray xl:pt-8 absolute xl:static top-0 bottom-0 left-0 right-0 mx-auto h-[100vh] xl:h-auto w-[100vw] xl:w-[315px] hidden xl:block z-10'>
        <button className='mt-4 ml-4 mb-4 xl:hidden' onClick={() => closeFilters()}>
          <FontAwesomeIcon icon={faXmark} className='h-[2rem] text-black hover:text-darker-gray' />
        </button>
        <form className='flex flex-wrap'>
          <label htmlFor='breed' className={`basis-full max-w-[90%] text-left text-black font-bold tracking-wider mx-auto mb-2 pl-3`}>Breed</label>
          {/* <select id='breed' className='basis-full text-base h-[2.5rem] max-w-[90%] bg-white basis-full text-black mx-4 mb-4 sm:mx-auto px-3 py-1 rounded-3xl border-black border-2' value={breed} onChange={e => {setBreed(e.target.value); addToQueryParams('breed', e.target.value);}} required>
            <option value=''>Any breed</option>
            { breeds.breeds.map((element) => {
              return <option value={`${element.name.toLowerCase()}`}>{element.name}</option>
            })}
          </select> */}
          <div className='basis-full sm:mx-auto'>
            <div className='relative min-w-[250px] max-w-[90%] height-[50px] mb-8 mx-auto'>
              <select id='age' className='appearance-none w-full text-base h-[2.5rem] bg-white basis-full text-black px-3 py-1 rounded-3xl' value={breed} onChange={e => {setBreed(e.target.value); addToQueryParams('breed', e.target.value);}} required>
                <option value=''>Any breed</option>
                { breeds.breeds.map((element) => {
                  return <option value={`${element.name.toLowerCase()}`}>{element.name}</option>
                })}
              </select>
              <span className='custom-arrow absolute top-0 right-0 block bg-blue h-full w-16 pointer-events-none rounded-r-3xl'></span>
            </div>
          </div>
          <label htmlFor='age' className={`basis-full max-w-[90%] text-left text-black font-bold tracking-wider mx-auto mb-2 pl-3`}>Age</label>
          <div className='basis-full sm:mx-auto'>
            <div className='relative min-w-[250px] max-w-[90%] height-[50px] mb-8 mx-auto'>
              <select id='age' className='appearance-none w-full text-base h-[2.5rem] bg-white basis-full text-black px-3 py-1 rounded-3xl' value={age} onChange={e => {setAge(e.target.value); addToQueryParams('age', e.target.value);}} required>
                <option value=''>Any age</option>
                <option value='baby'>Baby</option>
                <option value='young'>Young</option>
                <option value='adult'>Adult</option>
                <option value='senior'>Senior</option>
              </select>
              <span className='custom-arrow absolute top-0 right-0 block bg-blue h-full w-16 pointer-events-none rounded-r-3xl'></span>
            </div>
          </div>
          <label htmlFor='size' className={`basis-full max-w-[90%] text-left text-black  font-bold tracking-wider mx-auto mb-2 pl-3`}>Size</label>
          <div className='basis-full sm:mx-auto'>
            <div className='relative min-w-[250px] max-w-[90%] height-[50px] mb-8 mx-auto'>
              <select id='size' className='appearance-none w-full text-base h-[2.5rem] bg-white basis-full text-black px-3 py-1 rounded-3xl' value={size} onChange={e => {setSize(e.target.value); addToQueryParams('size', e.target.value);}} required>
                <option value=''>Any size</option>
                <option value='small'>Small</option>
                <option value='medium'>Medium</option>
                <option value='large'>Large</option>
                <option value='xlarge'>Xlarge</option>
              </select>
              <span className='custom-arrow absolute top-0 right-0 block bg-blue h-full w-16 pointer-events-none rounded-r-3xl'></span>
            </div>
          </div>
          <div className='basis-full max-w-[90%] mx-auto mb-8 flex justify-left	items-center pl-3'>
            <span className='relative h-[1.5rem] w-[1.5rem] mr-4'>
              <input id='house_trained' type='checkbox' className='w-full h-full absolute accent-blue' name='house_trained' value={houseTrained} onChange={e => { { e.target.value === 'false' ? setHouseTrained('true') : setHouseTrained('false')}; { e.target.value === 'false' ? addToQueryParams('house_trained', 'true') : addToQueryParams('house_trained', 'false')};}} />
            </span>
            {/* <input id='house_trained' type='checkbox' className='mr-2 w-full h-full absolute accent-yellow' name='house_trained' value={houseTrained} onChange={e => { { e.target.value === 'false' ? setHouseTrained('true') : setHouseTrained('false')}; { e.target.value === 'false' ? addToQueryParams('house_trained', 'true') : addToQueryParams('house_trained', 'false')};}} /> */}
            <label for='house_trained' className={`inline text-left text-black font-bold tracking-wider`}>House-Trained</label>
          </div>
          <Link id='update-filters-btn' href={ Object.keys(queryParams).length !== 0 ? { query: queryParams } : `/search/${parameters.pets}/${parameters.state}/${parameters.city}` } passHref shallow onClick={() => { closeFilters(); scrollToStart(); }} className='flex items-center group font-bold tracking-wider hover:underline underline-offset-4 bg-blue hover:bg-darker-blue text-white px-4 py-2 mx-auto rounded-3xl hover:shadow-md mb-4'>
            <FontAwesomeIcon icon={faSliders} className='mr-2 h-[2rem] sm:h-[1.5rem] text-white group-hover:scale-110 transition-transform'/>
            Update filters
          </Link>
        </form>
      </div>
      <button onClick={() => openFilters()} className='flex xl:hidden xl:pointer-events-none items-center bg-yellow hover:bg-darker-yellow p-2 rounded-lg sm:rounded-3xl font-bold tracking-wider hover:underline underline-offset-4 text-black px-4 py-2 mx-auto shadow-md group'>
        <FontAwesomeIcon icon={faSliders} className='sm:mr-2 h-[2rem] sm:h-[1.5rem] text-black group-hover:scale-110 transition-transform'/>
        <span className='hidden sm:inline'>Filters</span>
      </button>
    </div>
  )
}