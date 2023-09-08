'use client'

import { useEffect, useState } from 'react';
import loadAuto from '@/utilities/google-api';
import fetchLocation from '@/utilities/fetch-location';
import fetchData from '@/utilities/fetch-data';
import Image from 'next/image';
import yellowWave2 from '../../public/yellow-wave-2.svg';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faLocationArrow, faMagnifyingGlass, faPaw, faRightLong } from '@fortawesome/free-solid-svg-icons';
import { faCircleRight } from '@fortawesome/free-regular-svg-icons';
import $ from 'jquery';
import { Bree_Serif } from 'next/font/google';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

let locationReformatted = '';

export default function Search({ types }) {

  const [animalType, setAnimalType] = useState('dog');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [location, setLocation] = useState(locationReformatted);
  const [locationBtnText, setLocationBtnText] = useState('Allow location in the browser');
  const [animalsNearbyHeading, setAnimalsNearbyHeading] = useState('Finding animals nearby...');
  const [animalsNearby, setAnimalsNearby] = useState();
  const [locationFeedbackText, setLocationFeedbackText] = useState();

  const [animalsNearby1Name, setAnimalsNearby1Name] = useState(null);
  const [animalsNearby1Img, setAnimalsNearby1Img] = useState(null);
  const [animalsNearby1Id, setAnimalsNearby1Id] = useState(null);

  const [animalsNearby2Name, setAnimalsNearby2Name] = useState(null);
  const [animalsNearby2Img, setAnimalsNearby2Img] = useState(null);
  const [animalsNearby2Id, setAnimalsNearby2Id] = useState(null);

  const [animalsNearby3Name, setAnimalsNearby3Name] = useState(null);
  const [animalsNearby3Img, setAnimalsNearby3Img] = useState(null);
  const [animalsNearby3Id, setAnimalsNearby3Id] = useState(null);

  const [animalsNearby4Name, setAnimalsNearby4Name] = useState(null);
  const [animalsNearby4Img, setAnimalsNearby4Img] = useState(null);
  const [animalsNearby4Id, setAnimalsNearby4Id] = useState(null);

  useEffect(() => {
    $('#location-btn').attr('disabled', 'true');
    $('#animals-nearby-btn').attr('disabled', 'true');

    if (document.getElementsByClassName('pac-container') !== undefined) loadAuto();

    getUserLocation();

    const locationInput = document.getElementById('autocomplete');

    locationInput.addEventListener('focus', () => {
      const locationInputValue = document.getElementById('autocomplete').value;

      if (locationInputValue === '') {
        $('#location-btn').css('display', 'block');
      }
      else {
        $('#location-btn').css('display', 'none');
      }
    })

    locationInput.addEventListener('input', () => {
      const locationInputValue = document.getElementById('autocomplete').value;

      if (locationInputValue === '') {
        $('#location-btn').css('display', 'block');
      }
      else {
        $('#location-btn').css('display', 'none');
      }
    })

    locationInput.addEventListener('blur', () => {
      setTimeout(() => {
        $('#location-btn').css('display', 'none');
      }, 500);
    })
  }, []);

  function handleSubmit() {
    const locationInput = document.getElementById('autocomplete');
    const locationSplit = locationInput.value.split(', ');
    
    setCity(locationSplit[0].toLowerCase());
    setState(locationSplit[1].toLowerCase());
  }

  async function addCurrentLocation() {

    if (locationReformatted !== '') {
      $('#autocomplete').val(locationReformatted);
    }
    else if (location !== '') $('#autocomplete').val(location);

    $('#location-btn').css('display', 'none');
  }

  async function getUserLocation() {
    const navigatorObj = window.navigator;
    const geolocationObj = navigatorObj.geolocation;

    navigatorObj.permissions.query({ name: 'geolocation' }).then((permissionStatus => {
      if (permissionStatus.state === 'granted') {
        setLocationBtnText('Use my location');
      }
      else if (permissionStatus.state === 'denied') {
        setAnimalsNearbyHeading('No animals found nearby');
        $('#location-btn').attr('disabled', 'true');
        $('#location-btn').css('background-color', '#D9D9D9');
        $('#loading-icon').css('display', 'none');
        $('#location-icon').css('display', 'inline');
        $('#allow-location-text').css('display', 'block');
        $('#animals-nearby-btn').attr('disabled', 'true');
        $('.animals-nearby-link').removeClass('animate-pulse');
        setLocationFeedbackText('Allow location in the browser to see animals nearby.');
      }

      permissionStatus.onchange = () => {
        if (permissionStatus.state === 'granted') {
          $('#location-btn').attr('disabled', 'true');
          $('#location-btn').css('background-color', '#D9D9D9');
          $('#loading-icon').css('display', 'inline');
          $('#location-icon').css('display', 'none');
          $('#allow-location-text').css('display', 'none');
          setAnimalsNearbyHeading('Finding animals nearby...');
          $('.animals-nearby-link').addClass('animate-pulse');
          getUserLocation();
        }
        else if (permissionStatus.state === 'denied') {
          setAnimalsNearbyHeading('No animals found nearby');
          $('#location-btn').attr('disabled', 'true');
          $('#location-btn').css('background-color', '#D9D9D9');
          $('#allow-location-text').css('display', 'block');
          $('#animals-nearby-btn').attr('disabled', 'true');
          $('.animals-nearby-link').removeClass('animate-pulse');
          setLocationFeedbackText('Allow location in the browser to see animals nearby.');
          setLocationBtnText('Allow location in the browser');
        }
      }
    }));

    geolocationObj.getCurrentPosition(async (position) => {
      let coordinates = position.coords;

      let latAndLong = [];
      latAndLong.push(Number(coordinates.latitude));
      latAndLong.push(Number(coordinates.longitude));

      // Monterrey, Mexico: 25.68663644085695, -100.3127446417698
      // Toronto, Ontario: 43.65364281169296, -79.38614078054408

      const locationResults = await fetchLocation(Number(coordinates.latitude), Number(coordinates.longitude));
      const locationDetails = await locationResults.results[0].address_components.slice();
      const countyRegex = /County+/;

      locationReformatted = '';

      await locationDetails.forEach((element, index) => {
        if (!(countyRegex.test(element.long_name)) && element.long_name !== 'United States' && element.long_name !== 'Canada' && element.long_name !== 'Mexico') {
          if ((index === 0 && locationDetails.length === 3) || (index === 1 && locationDetails.length >= 4)) locationReformatted += element.long_name + ', ';
          else locationReformatted += element.long_name;

          if (index === locationDetails.length - 2) {
            setLocation(locationReformatted);
            $('#location-btn').attr('disabled', null);
            $('#location-btn').css('background-color', 'white');
            $('#loading-icon').css('display', 'none');
            $('#location-icon').css('display', 'inline');

            const locationSplit = locationReformatted.split(', ');

            setCity(locationSplit[0].toLowerCase());
            setState(locationSplit[1].toLowerCase());

            fetchAnimalsNearby(animalType, locationSplit[1].toLowerCase(), locationSplit[0].toLowerCase());
          } 
        }
      });
    }, () => {
        navigatorObj.permissions.query({ name: 'geolocation' }).then((permissionStatus => {
          permissionStatus.onchange = () => {
            if (permissionStatus.state === 'granted') {
              $('#location-btn').attr('disabled', 'true');
              $('#location-btn').css('background-color', '#D9D9D9');
              $('#loading-icon').css('display', 'inline');
              $('#location-icon').css('display', 'none');
              $('#allow-location-text').css('display', 'none');
              setAnimalsNearbyHeading('Finding animals nearby...');
              $('.animals-nearby-link').addClass('animate-pulse');
              getUserLocation();
            }
            else if (permissionStatus.state === 'denied') {
              $('#location-btn').attr('disabled', 'true');
              $('#location-btn').css('background-color', '#D9D9D9');
              $('#allow-location-text').css('display', 'block');
              $('#animals-nearby-btn').attr('disabled', 'true');
              $('.animals-nearby-link').removeClass('animate-pulse');
              setLocationFeedbackText('Allow location in the browser to see animals nearby.');
              setAnimalsNearbyHeading('No animals found nearby');
              setLocationBtnText('Allow location in the browser');
            }
          }
        }));
    }, { enableHighAccuracy: true });
  }

  function fetchAnimalsNearby(type, stateArg, cityArg) {

    $('#allow-location-text').css('display', 'none');
    setAnimalsNearbyHeading('Finding animals nearby...');
    $('#animals-nearby-btn, .animals-nearby-link').css('pointer-events', 'none');
    $('#animals-nearby-btn').attr('disabled', 'true');
    $('.animals-nearby-link').addClass('animate-pulse');

    console.log('type argument: ', type);

    const spaceRegex = /\s+/;
    let noSpacesType = '';

    if (spaceRegex.test(type)) {
      noSpacesType += encodeURIComponent(type);
    }

    fetch('../../../api/data', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ type : noSpacesType !== '' ? noSpacesType : type, state : stateArg, city: cityArg })
    })
    .then(async (response) => {
      console.log('response: ', response);

      const responseData = await response.json();
      let responseDataArr = [];

      console.log('responseData: ', responseData);

      if (responseData.animals.length === 0) {
        $('#animals-nearby-btn').attr('disabled', 'true');
        $('.animals-nearby-link').removeClass('animate-pulse');
        $('.animals-nearby-link').css('background-color', '#D9D9D9');
        $('#allow-location-text').css('display', 'block');
        setLocationFeedbackText('Try changing the animal category.');
        setAnimalsNearbyHeading('No animals found nearby');

        setAnimalsNearby1Name(null);
        setAnimalsNearby1Img(null);
        setAnimalsNearby1Id(null);

        setAnimalsNearby2Name(null);
        setAnimalsNearby2Img(null);
        setAnimalsNearby2Id(null);

        setAnimalsNearby3Name(null);
        setAnimalsNearby3Img(null);
        setAnimalsNearby3Id(null);

        setAnimalsNearby4Name(null);
        setAnimalsNearby4Img(null);
        setAnimalsNearby4Id(null);
      }
      else {
        for (let i = 0; i < responseData.animals.length; i++) {
          if (responseData.animals[i].primary_photo_cropped !== null && responseDataArr.length < 4) {
            responseDataArr.push(responseData.animals[i]);
          }
        }

        setAnimalsNearbyHeading('Adoptable animals nearby');

        $('.animals-nearby-link').removeClass('animate-pulse');

        setAnimalsNearby1Name(responseDataArr[0].name.toUpperCase());
        setAnimalsNearby1Img(responseDataArr[0].primary_photo_cropped.medium);
        setAnimalsNearby1Id(responseDataArr[0].id);

        setAnimalsNearby2Name(responseDataArr[1].name.toUpperCase());
        setAnimalsNearby2Img(responseDataArr[1].primary_photo_cropped.medium);
        setAnimalsNearby2Id(responseDataArr[1].id);

        setAnimalsNearby3Name(responseDataArr[2].name.toUpperCase());
        setAnimalsNearby3Img(responseDataArr[2].primary_photo_cropped.medium);
        setAnimalsNearby3Id(responseDataArr[2].id);

        setAnimalsNearby4Name(responseDataArr[3].name.toUpperCase());
        setAnimalsNearby4Img(responseDataArr[3].primary_photo_cropped.medium);
        setAnimalsNearby4Id(responseDataArr[3].id);

        $('.animals-nearby-link').css('background-color', 'white');
        $('#animals-nearby-btn, .animals-nearby-link').css('pointer-events', 'auto');
        $('#animals-nearby-btn').attr('disabled', null);
      }

      return response;
    })
    .catch((error) => {
      return console.log(error);
    })
  }

  function setSearchBackground(type) {
    if (type === 'cat') {
      if (window.innerWidth >= 1024) $('#search-bg').css('background-image', 'url("' + '/cat-bg-desktop.jpg' + '")');
      else $('#search-bg').css('background-image', 'url("' + '/cat-bg-mobile.jpg' + '")');
    }
    else if (type === 'dog') {
      if (window.innerWidth >= 1024) $('#search-bg').css('background-image', 'url("' + '/dog-bg-desktop.png' + '")');
      else $('#search-bg').css('background-image', 'url("' + '/dog-bg-mobile.jpg' + '")');
    }
    else if (type === 'rabbit') {
      if (window.innerWidth >= 1024) $('#search-bg').css('background-image', 'url("' + '/rabbit-bg-desktop.jpg' + '")');
      else $('#search-bg').css('background-image', 'url("' + '/rabbit-bg-mobile.jpg' + '")');
    }
    else if (type === 'bird') {
      if (window.innerWidth >= 1024) $('#search-bg').css('background-image', 'url("' + '/bird-bg-desktop.jpg' + '")');
      else $('#search-bg').css('background-image', 'url("' + '/bird-bg-mobile.jpg' + '")');
    }
    else if (type === 'horse') {
      if (window.innerWidth >= 1024) $('#search-bg').css('background-image', 'url("' + '/horse-bg-desktop.jpg' + '")');
      else $('#search-bg').css('background-image', 'url("' + '/horse-bg-mobile.jpg' + '")');
    }
    else if (type === 'scales, fins & other') {
      if (window.innerWidth >= 1024) $('#search-bg').css('background-image', 'url("' + '/scalesfinsandother-bg-desktop.jpg' + '")');
      else $('#search-bg').css('background-image', 'url("' + '/scalesfinsandother-bg-mobile.jpg' + '")');
    }
    // All conditions below here have not been updated with the correct image files
    else if (type === 'small & furry') {
      if (window.innerWidth >= 1024) $('#search-bg').css('background-image', 'url("' + '/smallandfurry-bg-desktop.jpg' + '")');
      else $('#search-bg').css('background-image', 'url("' + '/smallandfurry-bg-mobile.jpg' + '")');
    }
    else if (type === 'barnyard') {
      if (window.innerWidth >= 1024) $('#search-bg').css('background-image', 'url("' + '/barnyard-bg-desktop.jpg' + '")');
      else $('#search-bg').css('background-image', 'url("' + '/barnyard-bg-mobile.jpg' + '")');
    }
  }
  
  return (
    <div className='basis-full max-w-full'>
      <div id='search-bg' className='bg-gray shadow-lg bg-fixed bg-center bg-no-repeat bg-cover'>
        <div id='search-container' className='flex flex-col items-center h-[calc(100svh-80px)] h-[calc(100vh-80px)] sm:h-[calc(100svh-90px)] sm:h-[calc(100vh-90px)] max-w-[900px] mx-auto'>
          <div className='basis-full flex flex-wrap flex-col place-content-center'>
            <div id='search-inner-container' className='bg-center bg-no-repeat bg-cover sm:px-8 sm:py-8 rounded-3xl mx-4 sm:mx-auto'>
              <div className='basis-1/2 flex flex-wrap justify-center items-end text-center sm:mx-auto mb-4'>
                <div id='intro-heading-container' className='text-white relative'>
                  <h1 id='intro-heading' className={`${bree.className} font-bold text-[2.5rem] xs:text-5xl sm:text-6xl md:text-8xl lg:text-9xl leading-tight tracking-wider drop-shadow-2xl mb-2 md:mb-4`}>
                    Welcome to PawfectMatch
                  </h1>
                  <h2 className='text-base sm:text-2xl leading-relaxed tracking-wide drop-shadow-lg mx-4 sm:mx-auto'>
                    Where loving homes and animals in need find their perfect companionship
                  </h2>
                </div>
              </div>
              <div className='basis-1/2'>
                <div className='flex flex-wrap max-w-fit flex-col px-2 py-4 sm:px-6 sm:py-8 mx-auto items-center justify-center'>
                  <div>
                    <form method='get' action={`/search/${animalType}/${state}/${city}`} className='flex flex-wrap items-center justify-center max-w-[100%]'>
                      <select id='select' className='text-base h-[2.5rem] max-w-[90%] bg-white basis-full text-black mx-4 mb-4 sm:mr-4 px-3 py-1 rounded-3xl' value={animalType} onChange={e => { setAnimalType(e.target.value); fetchAnimalsNearby(e.target.value, state, city); setSearchBackground(e.target.value); } } required>
                        <option value=''>Select an animal type</option>
                        { types.types.map((element) => {
                          return <option value={`${element.name.toLowerCase()}`}>{element.name}</option>
                        }) }
                      </select>
                      <div id='location-search-container' className='relative basis-full max-w-[90%] flex mx-4 mb-4'>
                        <input id='autocomplete' className='text-base h-[2.5rem] basis-full text-black px-3 py-1 rounded-3xl' required></input>
                        <button type='button' id='location-btn' onClick={() => addCurrentLocation()} className='text-left absolute top-[2.5rem] shadow-md bg-white text-base h-[2.5rem] w-[100%] text-black px-3 py-1 rounded-3xl hidden'>
                          <FontAwesomeIcon id='loading-icon' icon={faCircleNotch} className='h-[1rem] mr-2 animate-spin' />
                          <FontAwesomeIcon id='location-icon' icon={faLocationArrow} className='h-[1rem] mr-2 hidden' />
                          {locationBtnText}
                        </button>
                      </div>
                      <button id='search-btn' type='submit' className='font-bold tracking-wider bg-blue hover:bg-darker-blue hover:underline underline-offset-4 text-black px-4 py-2 rounded-3xl' onClick={handleSubmit}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='h-[1rem] mr-2' />
                        Find your companion
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* <div id='search-bottom' className='basis-1/3 bg-center bg-no-repeat bg-cover'></div> */}
          </div>
        </div>
      </div>
      <div id='animals-nearby-bg' className='relative bg-gray overflow-y-hidden'>
        <div id='animals-nearby-body' className='relative z-10 flex flex-col sm:flex-row sm:flex-wrap place-content-center h-[100vh] md:h-[50vh] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[900px] mx-4 sm:mx-auto'>
          <p id='allow-location-text' className='bg-white absolute top-[50%] left-[7%] sm:left-[25%] right-[7%] sm:right-[25%] z-20 text-center px-4 py-2 leading-relaxed tracking-wide mx-auto rounded-md shadow-md hidden'>
            {locationFeedbackText}
          </p>
          <div className='basis-1/6 sm:basis-full my-4 sm:my-8 flex flex-wrap'>
            <p className={`${bree.className} self-center mx-auto font-bold text-4xl xs:text-5xl tracking-wide text-center sm:mb-4`}>
              {animalsNearbyHeading}
            </p>
          </div>
          <div className='md:basis-full flex flex-wrap'>
            <span className='basis-1/2 md:basis-1/4 pr-2 md:pr-4 mb-4 md:mb-8'>
              <Link href={`/animal/${animalsNearby1Id}`} className='animals-nearby-link pointer-events-none animate-pulse flex flex-col flex-wrap items-center text-ellipsis h-[32vh] overflow-hidden bg-darker-gray rounded-3xl hover:shadow-md'>
                <div className='h-[25vh] flex self-start'>
                  <img className='grow object-cover' src={animalsNearby1Img} />
                </div>
                <div className='grow flex items-center'>
                  <p id='animals-nearby-1-name' className={`grow ${bree.className} font-bold text-xl tracking-wide text-ellipsis whitespace-nowrap overflow-hidden w-[30vw] md:w-[150px] mx-auto my-auto text-center`}>
                    {animalsNearby1Name}
                  </p>
                </div>
              </Link>
            </span>
            <span className='basis-1/2 md:basis-1/4 pl-2 md:pl-0 md:pr-4 mb-4'>
              <Link href={`/animal/${animalsNearby2Id}`} className='animals-nearby-link pointer-events-none animate-pulse flex flex-col flex-wrap items-center text-ellipsis h-[32vh] overflow-hidden bg-darker-gray rounded-3xl hover:shadow-md'>
                <div className='h-[25vh] flex self-start'>
                  <img className='grow object-cover' src={animalsNearby2Img} />
                </div>
                <div className='grow flex items-center'>
                  <p id='animals-nearby-2-name' className={`grow ${bree.className} font-bold text-xl tracking-wide text-ellipsis whitespace-nowrap overflow-hidden w-[30vw] md:w-[150px] mx-auto my-auto text-center`}>
                    {animalsNearby2Name}
                  </p>
                </div>
              </Link>
            </span>
            <span className='basis-1/2 md:basis-1/4 pr-2 md:pr-4 flex md:mb-8'>
              <Link href={`/animal/${animalsNearby3Id}`} className='animals-nearby-link pointer-events-none animate-pulse grow flex flex-col flex-wrap items-center text-ellipsis h-[32vh] overflow-hidden bg-darker-gray rounded-3xl hover:shadow-md'>
                <div className='h-[25vh] flex self-start'>
                  <img className='grow object-cover' src={animalsNearby3Img} />
                </div>
                <div className='grow flex items-center'>
                  <p id='animals-nearby-3-name' className={`grow ${bree.className} font-bold text-xl tracking-wide text-ellipsis whitespace-nowrap overflow-hidden w-[30vw] md:w-[150px] mx-auto my-auto text-center`}>
                    {animalsNearby3Name}
                  </p>
                </div>
              </Link>
            </span>
            <span className='basis-1/2 pl-2 md:pl-0 md:pr-4 flex mb-8 md:hidden'>
              <Link href={`/animal/${animalsNearby4Id}`} className='animals-nearby-link pointer-events-none animate-pulse grow flex flex-col flex-wrap items-center text-ellipsis h-[32vh] overflow-hidden bg-darker-gray rounded-3xl hover:shadow-md'>
                <div className='h-[25vh] flex self-start'>
                  <img className='grow object-cover' src={animalsNearby4Img} />
                </div>
                <div className='grow flex items-center'>
                  <p id='animals-nearby-4-name' className={`grow ${bree.className} font-bold text-xl tracking-wide text-ellipsis whitespace-nowrap overflow-hidden w-[30vw] md:w-[150px] mx-auto my-auto text-center`}>
                    {animalsNearby4Name}
                  </p>
                </div>
              </Link>
            </span>
            <span className='basis-full md:basis-1/4 flex md:inline-flex mb-4 md:mb-8 rounded-3xl'>
              <form className='flex flex-col basis-full' action={`/search/${animalType}/${state}/${city}`} method='GET'>
                <button id='animals-nearby-btn' className='md:text-4xl grow flex flex-col flex-wrap place-content-center disabled:bg-darker-gray disabled:text-[#B5B5B5] mx-auto text-left self-center font-bold tracking-wider bg-blue hover:bg-darker-blue hover:underline underline-offset-4 text-black px-4 py-2 rounded-3xl'>
                  Meet more animals nearby
                  {/* <FontAwesomeIcon icon={faRightLong} className='inline sm:blockh-[1.5rem] sm:h-[2.5rem]' /> */}
                </button>
              </form>
              {/* <Link id='animals-nearby-btn' href={`/search/${animalType}/${state}/${city}`} className='flex place-items-center pointer-events-none text-left self-center mx-auto font-bold tracking-wider bg-blue hover:bg-darker-blue text-black px-4 py-2 rounded-3xl'> */}
                {/* Meet more animals nearby */}
                {/* <FontAwesomeIcon icon={faCircleRight} className='h-[2.5rem] ml-2' /> */}
              {/* </Link> */}
            </span>
          </div>
        </div>
        <Image id='yellow-wave-2' src={yellowWave2} className='absolute bottom-0 z-0 my-auto w-[100vw] object-cover' />
      </div>
    </div>
  )
}