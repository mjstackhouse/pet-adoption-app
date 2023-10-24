'use client'

import $ from 'jquery';
import { useSession, signIn } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function LikeButton({ animalInfo, liked, parameters }) {
  
  const [symbolColor, setSymbolColor] = useState(null);
  const [likedStatus, setLikedStatus] = useState(liked);

  const {data: session} = useSession();

  useEffect(() => {
    if (liked === true) {
      setSymbolColor('red');
    }
    else {
      setSymbolColor('gray');
    }

    if (parameters.hasOwnProperty('city')) {
      $('.like-button').addClass('absolute top-[0.6rem] right-[0.6rem] md:top-[0.6rem] md:right-[0.6rem] flex place-items-center bg-yellow p-4 rounded-full z-10');
      $('.heart-icon').addClass('h-[3.5rem] sm:h-[3rem]');
      $('.favorites-text').css('display', 'none');
    }
    else {
      $('.like-button').addClass('flex place-items-center font-bold tracking-wider hover:bg-darker-yellow bg-yellow text-black px-4 py-2 mx-auto xl:mx-0 rounded-3xl mb-4');
      $('.heart-icon').addClass('h-[1.5rem] drop-shadow-md');
      $('.favorites-text').css('display', 'inline');
    }
  }, [liked, parameters, animalInfo]);

  function checkLikedStatus() {
    if (likedStatus === true) {
      setLikedStatus(false);
      setSymbolColor('gray');
    } 
    else {
      setLikedStatus(true);
      setSymbolColor('red');
    }
  }

  function sendAnimalInfo(animalInfo) {
    fetch('../../../api/db', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ animalInfo: animalInfo })
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return console.error(error);
    })
  }
  
  function sendAnimalAndCheckLiked() {
    sendAnimalInfo(animalInfo);
    checkLikedStatus();
  }

  function closeFilters() {
    $('.signin-form-container').eq(0).css('display', 'none');
    $('#inner-body-container').css('filter', 'brightness(1)');
    $('#inner-body-container *').css('pointer-events', 'auto');
    $('#inner-body-container *').css('touch-action', 'auto');
    $('html').css('overflow-y', 'visible');
  }

  function sendNoSessionFeedback() {
    $('#inner-body-container').css('filter', 'brightness(0.5)');
    $('#inner-body-container *').css('pointer-events', 'none');
    $('#inner-body-container *').css('touch-action', 'none');
    $('html').css('overflow', 'hidden');
    $('.signin-form-container').eq(0).css('display', 'flex');
    $('.signin-to-favorite').eq(0).css('display', 'block');
    $('.close-signin-btn').eq(0).css('display', 'block');

    document.getElementById('inner-body-container').addEventListener('click', () => {
      closeFilters();
      document.getElementById('inner-body-container').removeEventListener('click', () => {
        closeFilters();
      })
    })
  }

  return (
    <button className='like-button group' onClick={() => { session ? sendAnimalAndCheckLiked() : sendNoSessionFeedback() }}>
      <FontAwesomeIcon className='heart-icon opacity-50 group-hover:scale-125 transition-all' icon={faHeart} style={{ color: symbolColor }} />
      <p className='favorites-text inline font-bold tracking-wider ml-2 hidden group-hover:underline underline-offset-4'>Add to favorites</p>
    </button>
  )
}