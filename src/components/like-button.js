'use client'

import $ from 'jquery';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function LikeButton({ animalId, liked }) {
  
  // const [likedSymbol, setLikedSymbol] = useState('♡');
  const [likedSymbol, setLikedSymbol] = useState('♥');
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
    console.log('animalId: ', animalId);
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
    console.log('no session feedback');

    $('.no-session-feedback').css('display', 'block');
    setTimeout(() => {
      $('.no-session-feedback').css('display', 'none');
    }, 5000);
  }

  return (
    <button className='absolute text-9xl drop-shadow-lg opacity-75' onClick={() => { session ? sendAnimalAndCheckLiked() : sendNoSessionFeedback() }}>
      <FontAwesomeIcon icon={faHeart} style={{ color: symbolColor }} />
    </button>
    // <button className='absolute text-9xl drop-shadow-lg opacity-75' style={{ color: symbolColor }} onClick={() => { session ? sendAnimalAndCheckLiked() : sendNoSessionFeedback() }}>{likedSymbol}</button>
  )
}