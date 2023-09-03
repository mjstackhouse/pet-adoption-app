'use client'

import $ from 'jquery';
import { useSession, signIn } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function LikeButton({ animalId, liked, parameters }) {

  // console.log('parameters: ', parameters);
  
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
      $('.like-button').addClass('absolute');
      $('.heart-icon').addClass('h-[4.5rem] drop-shadow-lg');
      $('.favorites-text').css('display', 'none');
    }
    else {
      $('.like-button').addClass('flex place-items-center font-bold tracking-wider hover:bg-darker-blue hover:shadow-md bg-blue text-black px-4 py-2 mx-auto sm:mx-0 rounded-3xl mb-4');
      $('.heart-icon').addClass('h-[1.5rem] drop-shadow-md');
      $('.favorites-text').css('display', 'inline');
    }
  }, []);

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

  function sendAnimalId(id) {
    fetch('../../../api/db', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ animal : id })
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return console.log(error);
    })
  }
  
  function sendAnimalAndCheckLiked() {
    sendAnimalId(animalId);
    checkLikedStatus();
  }

  function sendNoSessionFeedback() {
    $('#inner-body-container').css('filter', 'brightness(0.5)');
    $('#inner-body-container *').css('pointer-events', 'none');
    $('#inner-body-container *').css('touch-action', 'none');
    $('html').css('overflow', 'hidden');
    $('.signin-form-container').eq(0).css('display', 'flex');
    $('.signin-to-favorite').eq(0).css('display', 'block');
    $('.close-signin-btn').eq(0).css('display', 'block');
  }

  return (
    <button className='like-button' onClick={() => { session ? sendAnimalAndCheckLiked() : sendNoSessionFeedback() }}>
      <p className='favorites-text inline font-bold tracking-wider mr-2 hidden'>Add to favorites</p>
      <FontAwesomeIcon className='heart-icon opacity-50' icon={faHeart} style={{ color: symbolColor }} />
    </button>
  )
}