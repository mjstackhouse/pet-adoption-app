'use client'

import { useEffect, useState } from 'react';
import loadAuto from '@/utilities/google-api';
import fetchLocation from '@/utilities/fetch-location';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';

let locationReformatted = '';

export default function Search() {

  const [animalType, setAnimalType] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [location, setLocation] = useState(locationReformatted);
  const [locationBtnText, setLocationBtnText] = useState('Allow location in the browser');

  useEffect(() => {
    $('#location-btn').attr('disabled', 'true');

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
        $('#location-btn').attr('disabled', 'true');
        $('#location-btn').css('background-color', '#D9D9D9');
        $('#loading-icon').css('display', 'none');
        $('#location-icon').css('display', 'inline');
      }

      permissionStatus.onchange = () => {
        if (permissionStatus.state === 'granted') {
          $('#location-btn').attr('disabled', 'true');
          $('#location-btn').css('background-color', '#D9D9D9');
          $('#loading-icon').css('display', 'inline');
          $('#location-icon').css('display', 'none');
          getUserLocation();
        }
        else if (permissionStatus.state === 'denied') {
          $('#location-btn').attr('disabled', 'true');
          $('#location-btn').css('background-color', '#D9D9D9');
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
              getUserLocation();
            }
            else if (permissionStatus.state === 'denied') {
              $('#location-btn').attr('disabled', 'true');
              $('#location-btn').css('background-color', '#D9D9D9');
              setLocationBtnText('Allow location in the browser');
            }
          }
        }));
    }, { enableHighAccuracy: true });
  }
  
  return (
    <div>
      <form method='get' action={`/search/${animalType}/${state}/${city}`} className='flex flex-wrap items-center justify-center max-w-[100%]'>
        <select id='select' className='text-base h-[2.5rem] max-w-[90%] bg-white basis-full text-black mx-4 mb-4 sm:mr-4 px-3 py-1 rounded-3xl border-black border-2' value={animalType} onChange={e => setAnimalType(e.target.value)} required>
          <option value=''>Select an animal type</option>
          <option value='dog'>Dogs</option>
          <option value='cat'>Cats</option>
        </select>
        <div id='location-search-container' className='relative basis-full max-w-[90%] flex mx-4 mb-4'>
          <input id='autocomplete' className='text-base h-[2.5rem] basis-full text-black px-3 py-1 rounded-3xl border-black border-2' required></input>
          <button type='button' id='location-btn' onClick={() => addCurrentLocation()} className='text-left absolute top-[2.5rem] shadow-md bg-white text-base h-[2.5rem] w-[100%] text-black px-3 py-1 rounded-3xl hidden'>
            <FontAwesomeIcon id='loading-icon' icon={faCircleNotch} className='h-[1rem] mr-2 animate-spin' />
            <FontAwesomeIcon id='location-icon' icon={faLocationArrow} className='h-[1rem] mr-2 hidden' />
            {locationBtnText}
          </button>
        </div>
        <button id='search-btn' type='submit' className='font-bold tracking-wider bg-blue hover:bg-darker-blue text-black px-4 py-2 rounded-3xl' onClick={handleSubmit}>Search</button>
      </form>
    </div>
  )
}